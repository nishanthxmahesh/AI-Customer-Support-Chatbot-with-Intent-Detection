from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.db.mongo import connect_to_mongo, close_mongo_connection
from app.routers import analytics, auth, chat, intents, misc, operators, sessions
from app.services.intent_classifier import classifier

settings = get_settings()

app = FastAPI(title=settings.app_name, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup() -> None:
    await connect_to_mongo()
    classifier.load_once()


@app.on_event("shutdown")
async def shutdown() -> None:
    await close_mongo_connection()


app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(chat.router, tags=["chat"])
app.include_router(intents.router, prefix="/intents", tags=["intents"])
app.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
app.include_router(operators.router, prefix="/operators", tags=["operators"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(misc.router, tags=["knowledge-base-settings"])


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "model_loaded": classifier.is_loaded}
