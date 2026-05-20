from fastapi import APIRouter

from app.services.store import store

router = APIRouter()


@router.get("")
async def operators() -> list[dict]:
    return store.operators


@router.get("/queue")
async def queue() -> list[dict]:
    return store.queue()


@router.post("/assign")
async def assign(payload: dict) -> dict:
    return {"ok": True, **payload}


@router.post("/{operator_id}/takeover/{session_id}")
async def takeover(operator_id: str, session_id: str) -> dict:
    session = store.start_session(session_id=session_id)
    session.update({"status": "operator", "assigned_operator_id": operator_id})
    return session


@router.post("/{operator_id}/return/{session_id}")
async def return_to_bot(operator_id: str, session_id: str) -> dict:
    session = store.start_session(session_id=session_id)
    session.update({"status": "bot", "assigned_operator_id": None, "escalation_required": False})
    return session


@router.get("/{operator_id}/performance")
async def performance(operator_id: str) -> dict:
    return {"operator_id": operator_id, "chats_handled": 28, "avg_handle_time_seconds": 412, "csat_avg": 4.3}


@router.post("/{operator_id}/macros")
async def save_macro(operator_id: str, payload: dict) -> dict:
    return {"ok": True, "operator_id": operator_id, **payload}


@router.get("/{operator_id}/macros")
async def macros(operator_id: str) -> list[dict]:
    return [{"id": "m1", "text": "I’ve located your account and I’m reviewing it now."}]

