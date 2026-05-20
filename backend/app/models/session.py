from datetime import datetime
from pydantic import BaseModel, Field


class SessionStart(BaseModel):
    session_id: str | None = None
    channel: str = "standalone"


class SessionRecord(BaseModel):
    session_id: str
    customer_name: str | None = None
    customer_email: str | None = None
    status: str = "active"
    primary_intent: str | None = None
    overall_confidence: float = 0
    escalation_required: bool = False
    escalation_reason: str | None = None
    escalation_priority: str = "low"
    assigned_operator_id: str | None = None
    low_confidence_count: int = 0
    is_vip: bool = False
    message_count: int = 0
    started_at: datetime = Field(default_factory=datetime.utcnow)
    ended_at: datetime | None = None

