# Egyptian TTS server (optional)

Reads the saved Arabic narration (`texts.json`, ids like `mansa-musa:0`) with `NAMAA-Space/NAMAA-Egyptian-TTS`; wavs are cached in `cache/` by SHA-256 of the text.

    pip install -r requirements.txt          # torch (CUDA build) first
    npx tsx scripts/export-ar-texts.ts       # refresh texts.json after editing src/data/ar
    cd tts-server && uvicorn app:app --port 8000
    npm run dev                              # Vite proxies /api/tts -> :8000

Env: `TTS_ENGINE=stub` (tone, no model), `TTS_DEVICE`, `TTS_REFERENCE_WAV` (voice/style prompt), `TTS_MODEL_REV`.
API: `GET /api/tts/{id}` (wav, Range), `GET .../status`, `POST .../prefetch`, `GET /api/tts/health`.

## Static narration (what the deployed site uses)

    .venv/Scripts/python generate_static.py   # voice 1: all story beats -> public/audio/<event>-<beat>.mp3 (resumable)
    .venv/Scripts/python generate_static.py --voice voices/namaa_female.wav --out female   # voice 2 -> public/audio/female/

The player probes `/audio/gobekli-tepe-0.mp3` first, then this API, then falls back to browser voices.
If `/audio/female/gobekli-tepe-0.mp3` exists, a narrator switch appears; a missing female clip falls back to voice 1.
Downloads ~3.2 GB once (base Chatterbox vocoder/voice + NAMAA's Egyptian T3). On CPU ≈ 1.5–2.5 min per beat.
