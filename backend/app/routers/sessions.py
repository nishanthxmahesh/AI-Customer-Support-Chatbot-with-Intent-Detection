from fastapi import APIRouter

from app.services.store import store

router = APIRouter()


@router.get("")
async def sessions() -> list[dict]:
    return list(store.sessions.values()) or store.queue()


@router.get("/{session_id}")
async def session_detail(session_id: str) -> dict:
    return {"session": store.start_session(session_id=session_id), "messages": store.session_messages(session_id)}


@router.get("/{session_id}/messages")
async def session_messages(session_id: str) -> list[dict]:
    return store.session_messages(session_id)


@router.patch("/{session_id}/resolve")
async def resolve(session_id: str) -> dict:
    session = store.start_session(session_id=session_id)
    session["status"] = "resolved"
    return session


@router.post("/{session_id}/export")
async def export(session_id: str) -> dict:
    return {"session": store.start_session(session_id=session_id), "messages": store.session_messages(session_id)}

