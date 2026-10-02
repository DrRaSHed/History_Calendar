"""Run: uvicorn app:app --port 8000   (TTS_ENGINE=stub for a model-free smoke test)"""
from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from tts_service import HERE, TextStore, TTSService, make_engine

app = FastAPI(title="ChronosFold Egyptian TTS")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_methods=["GET", "POST"])
svc = TTSService(TextStore(HERE / "texts.json"), make_engine(), HERE / "cache")


def _known(text_id: str) -> str:
    try:
        svc.store.get(text_id)
    except KeyError:
        raise HTTPException(404, f"unknown text id: {text_id}")
    return text_id


@app.get("/api/tts/health")
async def health():
    return {"ok": True, "engine": svc.engine.name, "modelLoaded": svc.ready, "texts": len(svc.store)}


@app.get("/api/tts/{text_id}/status")
async def status(text_id: str):
    _known(text_id)
    return {"cached": svc.is_cached(text_id), "generating": svc.is_generating(text_id)}


@app.post("/api/tts/{text_id}/prefetch", status_code=202)
async def prefetch(text_id: str):
    """Start generating in the background without waiting (the player calls this for the next beat)."""
    _known(text_id)
    svc.start(text_id)
    return {"queued": True}


@app.get("/api/tts/{text_id}")
async def audio(text_id: str):
    """Generates on first request (cached afterwards). FileResponse supports HTTP Range, so <audio> can seek/stream."""
    _known(text_id)
    try:
        path: Path = await svc.audio_path(text_id)
    except Exception as e:  # model/engine failure
        raise HTTPException(503, f"TTS failed: {type(e).__name__}: {e}")
    return FileResponse(path, media_type="audio/wav", headers={"Cache-Control": "public, max-age=31536000, immutable"})
