from pydantic import BaseModel, Field


INTENT_COLORS = {
    "order_tracking": "#3B82F6",
    "billing_inquiry": "#8B5CF6",
    "refund_request": "#F97316",
    "complaint": "#EF4444",
    "product_info": "#14B8A6",
    "account_access": "#6366F1",
    "cancellation": "#EC4899",
    "shipping_issue": "#EAB308",
    "technical_support": "#06B6D4",
    "payment_failed": "#F43F5E",
    "returns": "#F59E0B",
    "promotions": "#22C55E",
    "feedback": "#64748B",
    "escalation_request": "#991B1B",
    "greeting": "#0EA5E9",
    "farewell": "#6B7280",
    "out_of_scope": "#78716C",
}


class ClassificationRequest(BaseModel):
    text: str = Field(min_length=1, max_length=4000)


class ClassificationResult(BaseModel):
    primary_intent: str
    confidence: float
    all_scores: dict[str, float]
    processing_time_ms: int

