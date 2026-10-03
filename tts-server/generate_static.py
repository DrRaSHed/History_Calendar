"""Pre-generate all story-beat narration to public/audio/<event>-<beat>.mp3 (resumable; skips existing files).

    .venv/Scripts/python generate_static.py [--limit N] [--only mansa-musa] [--engine stub]
"""
from __future__ import annotations

import argparse
import json
import os
import re
import tempfile
import time
import wave
from pathlib import Path

import lameenc

HERE = Path(__file__).parent
OUT = HERE.parent / "public" / "audio"


def wav_to_mp3(wav_path: Path, mp3_path: Path, kbps: int = 64) -> None:
    with wave.open(str(wav_path), "rb") as w:
        rate, ch, pcm = w.getframerate(), w.getnchannels(), w.readframes(w.getnframes())
    enc = lameenc.Encoder()
    enc.set_bit_rate(kbps)
    enc.set_in_sample_rate(rate)
    enc.set_channels(ch)
    enc.set_quality(2)
    tmp = mp3_path.with_suffix(".part")
    tmp.write_bytes(enc.encode(pcm) + enc.flush())
    os.replace(tmp, mp3_path)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--only", default="")
    ap.add_argument("--engine", default=os.getenv("TTS_ENGINE", "chatterbox"))
    # Reference voice prompt (default: the model's built-in voice). Second narrator:
    #   --voice voices/namaa_female.wav --out female   -> public/audio/female/
    ap.add_argument("--voice", default=os.getenv("TTS_REFERENCE_WAV", ""))
    ap.add_argument("--out", default="", help="subfolder of public/audio for this voice")
    args = ap.parse_args()
    os.environ["TTS_ENGINE"] = args.engine
    os.environ["TTS_REFERENCE_WAV"] = str(Path(args.voice).resolve()) if args.voice else ""
    out_dir = OUT / args.out if args.out else OUT

    from tts_service import make_engine

    texts = json.loads((HERE / "texts.json").read_text(encoding="utf-8"))
    todo = [(k, v) for k, v in texts.items() if re.search(r":\d+$", k) and args.only in k]  # beats only; synopsis is not narrated
    out_dir.mkdir(parents=True, exist_ok=True)
    engine = make_engine()
    engine.load()
    done = 0
    for n, (key, text) in enumerate(todo, 1):
        mp3 = out_dir / f"{key.replace(':', '-')}.mp3"
        if mp3.exists():
            continue
        if args.limit and done >= args.limit:
            break
        t0 = time.time()
        with tempfile.TemporaryDirectory() as d:
            wav = Path(d) / "x.wav"
            engine.synthesize(text, wav)
            wav_to_mp3(wav, mp3)
        done += 1
        print(f"[{n}/{len(todo)}] {mp3.name} {mp3.stat().st_size // 1024} KB {time.time() - t0:.0f}s", flush=True)
    print("complete" if all((out_dir / f"{k.replace(':', '-')}.mp3").exists() for k, _ in todo) else "partial (re-run to resume)")


if __name__ == "__main__":
    main()
