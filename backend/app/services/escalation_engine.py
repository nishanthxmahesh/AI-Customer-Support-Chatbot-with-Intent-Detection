LEGAL_KEYWORDS = ["lawsuit", "fraud", "legal action", "unacceptable", "cancel account", "ridiculous", "report you", "bbb", "chargeback"]


class EscalationEngine:
    def evaluate(self, message: str, intent: str, confidence: float, session: dict, confidence_decision: dict) -> dict:
        text = message.lower()
        keyword = next((word for word in LEGAL_KEYWORDS if word in text), None)
        if keyword:
            return self._result(True, "keyword_trigger", "urgent", self.team_for(intent), keyword)
        if session.get("is_vip"):
            return self._result(True, "vip", "urgent", self.team_for(intent))
        if intent == "escalation_request":
            return self._result(True, "explicit_request", "high", "general_support")
        if confidence_decision["escalate"]:
            return self._result(True, "low_confidence", "medium", self.team_for(intent))
        if session.get("message_count", 0) > 6 and not session.get("resolution_detected", False):
            return self._result(True, "timeout", "low", self.team_for(intent))
        return self._result(False, None, "low", self.team_for(intent))

    def team_for(self, intent: str) -> str:
        if intent in ["billing_inquiry", "payment_failed", "refund_request"]:
            return "billing"
        if intent in ["technical_support", "account_access"]:
            return "technical"
        return "general_support"

    def _result(self, should: bool, reason: str | None, priority: str, team: str, trigger: str | None = None) -> dict:
        return {
            "should_escalate": should,
            "reason": reason,
            "priority": priority,
            "recommended_team": team,
            "trigger_message": trigger,
            "context_summary": "Recent messages indicate the customer may need human assistance.",
        }


escalation_engine = EscalationEngine()

