"""Egyptian-Arabic TTS service: saved text -> NAMAA-Egyptian-TTS -> cached .wav."""
from __future__ import annotations

import asyncio
import hashlib
import json
import math
import os
import struct
import time
import threading
import wave
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).parent
MODEL_ID = "NAMAA-Space/NAMAA-Egyptian-TTS"
MODEL_REV = os.getenv("TTS_MODEL_REV", "main")
BASE_ID = "ResembleAI/chatterbox"


def _fetch(repo: str, name: str, revision: str = "main", attempts: int = 8) -> str:
    """hf_hub_download with retries; a partial download resumes on the next attempt."""
    from huggingface_hub import hf_hub_download

    for i in range(attempts):
        try:
            return hf_hub_download(repo_id=repo, filename=name, revision=revision)
        except Exception as e:
            if i == attempts - 1:
                raise
            print(f"download {repo}/{name} failed ({type(e).__name__}); retrying", flush=True)
            time.sleep(min(60, 5 * 2**i))
    raise RuntimeError("unreachable")


def _place(src: str, dst: Path) -> None:
    """Hard-link a cached file into the checkpoint dir (no extra disk use); copy if linking isn't possible."""
    src = os.path.realpath(src)  # the HF cache entry may itself be a (relative) symlink into blobs/
    if dst.exists() or dst.is_symlink():
        dst.unlink()
    try:
        os.link(src, dst)
    except OSError:
        import shutil

        shutil.copyfile(src, dst)


class TextStore:
    """Saved narration text, loaded from texts.json (see scripts/export-ar-texts.ts)."""

    def __init__(self, path: Path):
        self._path = path
        self._data: dict[str, str] = {}
        self.reload()

    def reload(self) -> None:
        self._data = json.loads(self._path.read_text(encoding="utf-8"))

    def get(self, text_id: str) -> str:
        return self._data[text_id]  # KeyError -> 404 in the API

    def __len__(self) -> int:
        return len(self._data)


class StubEngine:
    """No model: a short tone whose length follows the text. For wiring/tests only."""

    name = "stub"
    sample_rate = 16000

    def load(self) -> None: ...

    def synthesize(self, text: str, out: Path) -> None:
        time.sleep(float(os.getenv("STUB_DELAY", "0")))
        n = int(self.sample_rate * min(8.0, 0.5 + len(text) / 40))
        with wave.open(str(out), "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(self.sample_rate)
            w.writeframes(b"".join(struct.pack("<h", int(6000 * math.sin(2 * math.pi * 220 * i / self.sample_rate))) for i in range(n)))


class ChatterboxEngine:
    """NAMAA-Egyptian-TTS = Chatterbox multilingual + Egyptian T3 weights (per the model card)."""

    name = "chatterbox"

    def __init__(self) -> None:
        self.model = None
        self.sample_rate = 24000
        self.prompt = os.getenv("TTS_REFERENCE_WAV") or None  # optional voice/style reference

    def load(self) -> None:
        import torch
        from chatterbox import mtl_tts

        device = os.getenv("TTS_DEVICE") or ("cuda" if torch.cuda.is_available() else "cpu")
        model = mtl_tts.ChatterboxMultilingualTTS.from_local(self._assemble_checkpoint(), device)
        self.model, self.sample_rate = model, model.sr

    @staticmethod
    def _assemble_checkpoint() -> Path:
        """Same result as the model card (base Chatterbox multilingual with NAMAA's Egyptian T3 weights swapped in),
        but downloads only the files actually loaded: ~3.2 GB instead of ~8.6 GB for both full repos."""
        ckpt = HERE / "ckpt"
        ckpt.mkdir(exist_ok=True)
        for name in ("ve.pt", "s3gen.pt", "grapheme_mtl_merged_expanded_v1.json", "Cangjie5_TC.json", "conds.pt"):
            _place(_fetch(BASE_ID, name), ckpt / name)
        _place(_fetch(MODEL_ID, "t3_mtl23ls_v2.safetensors", MODEL_REV), ckpt / "t3_mtl23ls_v2.safetensors")
        if os.getenv("TTS_VOICE") == "namaa":  # try the conds.pt shipped in NAMAA's repo instead of the base default voice
            _place(_fetch(MODEL_ID, "conds.pt", MODEL_REV), ckpt / "conds.pt")
        return ckpt

    def synthesize(self, text: str, out: Path) -> None:
        import torchaudio as ta

        kwargs = {"audio_prompt_path": self.prompt} if self.prompt else {}
        wav = self.model.generate(text, language_id="ar", **kwargs)
        ta.save(str(out), wav, self.sample_rate, encoding="PCM_S", bits_per_sample=16)


def make_engine():
    return StubEngine() if os.getenv("TTS_ENGINE", "chatterbox") == "stub" else ChatterboxEngine()


class TTSService:
    def __init__(self, store: TextStore, engine, cache_dir: Path):
        self.store, self.engine = store, engine
        self.cache = cache_dir
        self.cache.mkdir(parents=True, exist_ok=True)
        # One worker: the model is not thread-safe and a single GPU is the bottleneck anyway.
        # Generation therefore never runs on (or blocks) the asyncio event loop.
        self._pool = ThreadPoolExecutor(max_workers=1, thread_name_prefix="tts")
        self._inflight: dict[str, asyncio.Future] = {}
        self._load_lock = threading.Lock()
        self._loaded = False

    @property
    def ready(self) -> bool:
        return self._loaded

    def key(self, text: str) -> str:
        ref = os.getenv("TTS_REFERENCE_WAV", "")
        return hashlib.sha256(f"{self.engine.name}|{MODEL_REV}|{ref}|{text}".encode("utf-8")).hexdigest()

    def path_for(self, text_id: str) -> Path:
        return self.cache / f"{self.key(self.store.get(text_id))}.wav"

    def is_cached(self, text_id: str) -> bool:
        return self.path_for(text_id).exists()

    def is_generating(self, text_id: str) -> bool:
        return self.key(self.store.get(text_id)) in self._inflight

    def _generate(self, text: str, path: Path) -> None:
        with self._load_lock:  # lazy, once
            if not self._loaded:
                self.engine.load()
                self._loaded = True
        tmp = path.with_suffix(".tmp.wav")
        self.engine.synthesize(text, tmp)
        os.replace(tmp, path)  # atomic: readers never see a half-written file

    def start(self, text_id: str) -> asyncio.Future | None:
        """Kick off (or join) generation. Returns None if already cached."""
        text = self.store.get(text_id)
        path, key = self.cache / f"{self.key(text)}.wav", self.key(text)
        if path.exists():
            return None
        fut = self._inflight.get(key)
        if fut is None:
            fut = asyncio.get_running_loop().run_in_executor(self._pool, self._generate, text, path)
            self._inflight[key] = fut
            fut.add_done_callback(lambda f, k=key: (self._inflight.pop(k, None), f.exception()))
        return fut

    async def audio_path(self, text_id: str) -> Path:
        fut = self.start(text_id)
        if fut is not None:
            await asyncio.shield(fut)  # a client disconnect must not cancel the shared job
        return self.path_for(text_id)
