"""Render one beat with a reference voice for audition: python sample_voice.py <voice.wav> <text-id> <out.mp3>"""
import json
import os
import sys
import tempfile
from pathlib import Path

ref, text_id, out = sys.argv[1:4]
os.environ["TTS_REFERENCE_WAV"] = str(Path(ref).resolve())
from generate_static import wav_to_mp3  # noqa: E402
from tts_service import HERE, ChatterboxEngine  # noqa: E402

text = json.loads((HERE / "texts.json").read_text(encoding="utf-8"))[text_id]
engine = ChatterboxEngine()
engine.load()
with tempfile.TemporaryDirectory() as d:
    wav = Path(d) / "x.wav"
    engine.synthesize(text, wav)
    wav_to_mp3(wav, Path(out))
print("wrote", out)
