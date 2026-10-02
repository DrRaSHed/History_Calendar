# Egyptian TTS server (optional)

Reads the saved Arabic narration (`texts.json`, ids like `mansa-musa:0`) with `NAMAA-Space/NAMAA-Egyptian-TTS`; wavs are cached in `cache/` by SHA-256 of the text.

    pip install -r requirements.txt          # torch (CUDA build) first
    npx tsx scripts/export-ar-texts.ts       # refresh texts.json after editing src/data/ar
    cd tts-server && uvicorn app:app --port 8000
    npm run dev                              # Vite proxies /api/tts -> :8000

Env: `TTS_ENGINE=stub` (tone, no model), `TTS_DEVICE`, `TTS_REFERENCE_WAV` (voice/style prompt), `TTS_MODEL_REV`.
API: `GET /api/tts/{id}` (wav, Range), `GET .../status`, `POST .../prefetch`, `GET /api/tts/health`.
