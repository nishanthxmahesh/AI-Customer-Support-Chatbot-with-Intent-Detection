from datetime import datetime

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.models.chat import ChatMessageIn, CustomerInfoIn
from app.models.session import SessionStart
from app.services.confidence_scorer import confidence_scorer
from app.services.escalation_engine import escalation_engine
from app.services.intent_classifier import classifier
from app.services.response_engine import response_engine
from app.services.session_manager import session_manager
from app.services.store import store

router = APIRouter()


async def process_message(session_id: str, message: str) -> dict:
    session = session_manager.start(session_id=session_id)
    store.add_message({"session_id": session_id, "role": "user", "content": classifier.sanitize(message)})
    result = await classifier.classify(message)
    low_count = session.get("low_confidence_count", 0) + (1 if result["confidence"] < 60 else 0)
    session["low_confidence_count"] = low_count
    decision = confidence_scorer.decision(result["primary_intent"], result["confidence"], low_count)
    escalation = escalation_engine.evaluate(message, result["primary_intent"], result["confidence"], session, decision)
    generated = await response_engine.generate(result["primary_intent"], result["confidence"], decision, store.session_messages(session_id)[-6:])
    session.update(
        {
            "status": "escalated" if escalation["should_escalate"] else "bot",
            "primary_intent": result["primary_intent"],
            "overall_confidence": result["confidence"],
            "escalation_required": escalation["should_escalate"],
            "escalation_reason": escalation["reason"],
            "escalation_priority": escalation["priority"],
        }
    )
    bot_message = store.add_message(
        {
            "session_id": session_id,
            "role": "bot",
            "content": generated["response_text"],
            "intent_label": result["primary_intent"],
            "intent_confidence": result["confidence"],
            "all_intent_scores": result["all_scores"],
            "response_source": generated["response_source"],
            "escalation_triggered": escalation["should_escalate"],
            "suggested_actions": generated["suggested_actions"],
            "processing_time_ms": result["processing_time_ms"],
        }
    )
    return {
        "response_text": generated["response_text"],
        "intent": result["primary_intent"],
        "confidence": result["confidence"],
        "all_scores": result["all_scores"],
        "escalation_required": escalation["should_escalate"],
        "escalation_reason": escalation["reason"],
        "suggested_actions": generated["suggested_actions"],
        "response_source": generated["response_source"],
        "session_id": session_id,
        "message_id": bot_message["id"],
        "processing_time_ms": result["processing_time_ms"],
        "created_at": datetime.utcnow().isoformat(),
    }


@router.post("/chat/session/start")
async def start_session(payload: SessionStart) -> dict:
    return session_manager.start(channel=payload.channel, session_id=payload.session_id)


@router.post("/chat/message")
async def chat_message(payload: ChatMessageIn) -> dict:
    return await process_message(payload.session_id, payload.message)


@router.patch("/chat/session/{session_id}/end")
async def end_session(session_id: str) -> dict:
    return session_manager.end(session_id)


@router.post("/chat/customer-info")
async def customer_info(payload: CustomerInfoIn) -> dict:
    return session_manager.update_customer(payload.session_id, payload.name, payload.email, payload.transcript_requested)


@router.post("/chat/feedback")
async def feedback(payload: dict) -> dict:
    return {"ok": True, "feedback": payload}


@router.post("/chat/action")
async def action(payload: dict) -> dict:
    return {"ok": True, "received": payload}


@router.websocket("/ws/chat/{session_id}")
async def websocket_chat(websocket: WebSocket, session_id: str) -> None:
    await websocket.accept()
    session_manager.start(session_id=session_id, channel="widget")
    try:
        while True:
            data = await websocket.receive_json()
            payload = await process_message(session_id, data.get("message", ""))
            await websocket.send_json(payload)
    except WebSocketDisconnect:
        return

