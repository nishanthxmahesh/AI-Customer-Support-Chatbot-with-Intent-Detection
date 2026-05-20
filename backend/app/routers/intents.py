from fastapi import APIRouter, BackgroundTasks

from app.models.intent import INTENT_COLORS, ClassificationRequest
from app.services.intent_classifier import classifier

router = APIRouter()
retrain_state = {"status": "idle", "progress": 0, "results": None}


@router.post("/classify")
async def classify(payload: ClassificationRequest) -> dict:
    return await classifier.classify(payload.text)


@router.post("/classify/batch")
async def classify_batch(payload: list[ClassificationRequest]) -> list[dict]:
    return [await classifier.classify(item.text) for item in payload]


@router.get("")
async def list_intents() -> list[dict]:
    return [
        {"name": name, "color": color, "examples": 200, "last_retrained": "2026-05-20", "f1": round(0.82 + i * 0.006, 2)}
        for i, (name, color) in enumerate(INTENT_COLORS.items())
    ]


@router.post("/{name}/examples")
async def add_example(name: str, payload: dict) -> dict:
    return {"ok": True, "intent": name, "text": payload.get("text")}


@router.delete("/{name}/examples/{example_id}")
async def delete_example(name: str, example_id: str) -> dict:
    return {"ok": True, "intent": name, "example_id": example_id}


def fake_retrain() -> None:
    retrain_state.update({"status": "completed", "progress": 100, "results": {"macro_f1_before": 0.84, "macro_f1_after": 0.87}})


@router.post("/retrain")
async def retrain(background_tasks: BackgroundTasks) -> dict:
    retrain_state.update({"status": "running", "progress": 12, "results": None})
    background_tasks.add_task(fake_retrain)
    return retrain_state


@router.get("/retrain/status")
async def retrain_status() -> dict:
    return retrain_state


@router.post("/test")
async def test(payload: ClassificationRequest) -> dict:
    return await classifier.classify(payload.text)

