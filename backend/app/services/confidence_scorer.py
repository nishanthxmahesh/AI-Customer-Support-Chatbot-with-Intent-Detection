class ConfidenceScorer:
    high = 80
    low = 60
    complaint_threshold = 85

    def decision(self, intent: str, confidence: float, low_confidence_count: int) -> dict:
        effective_low = self.low - 15 if low_confidence_count >= 3 else self.low
        if intent == "escalation_request":
            return {"zone": "critical", "clarify": False, "escalate": True}
        if intent == "complaint" and confidence < self.complaint_threshold:
            return {"zone": "high_risk", "clarify": False, "escalate": True}
        if confidence >= self.high:
            return {"zone": "high", "clarify": False, "escalate": False}
        if confidence >= effective_low:
            return {"zone": "medium", "clarify": True, "escalate": False}
        return {"zone": "low", "clarify": True, "escalate": True}


confidence_scorer = ConfidenceScorer()

