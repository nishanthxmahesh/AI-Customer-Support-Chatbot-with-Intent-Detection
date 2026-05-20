from datetime import datetime
from pydantic import BaseModel, Field


class ChatMessageIn(BaseModel):
    session_id: str
    message: str = Field(min_length=1, max_length=4000)


class CustomerInfoIn(BaseModel):
    session_id: str
    name: str
    email: str
    transcript_requested: bool = False


class ChatPayload(BaseModel):
    response_text: str
    intent: str
    confidence: float
    all_scores: dict[str, float]
    escalation_required: bool
    escalation_reason: str | None = None
    suggested_actions: list[dict]
    response_source: str
    session_id: str
    processing_time_ms: int
    created_at: datetime

