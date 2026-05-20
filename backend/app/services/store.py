from datetime import datetime, timedelta
from uuid import uuid4

from app.models.intent import INTENT_COLORS


class DemoStore:
    def __init__(self) -> None:
        self.sessions: dict[str, dict] = {}
        self.messages: list[dict] = []
        self.operators = [
            {"id": "op_1", "full_name": "Sarah Chen", "role": "operator", "operator_status": "online", "active_chat_ids": []},
            {"id": "op_2", "full_name": "Marcus Reed", "role": "operator", "operator_status": "busy", "active_chat_ids": ["demo-billing"]},
            {"id": "op_3", "full_name": "Priya Shah", "role": "admin", "operator_status": "online", "active_chat_ids": []},
        ]

    def start_session(self, channel: str = "standalone", session_id: str | None = None) -> dict:
        sid = session_id or str(uuid4())
        self.sessions.setdefault(
            sid,
            {
                "session_id": sid,
                "customer_name": None,
                "customer_email": None,
                "status": "active",
                "channel": channel,
                "primary_intent": None,
                "overall_confidence": 0,
                "escalation_required": False,
                "escalation_reason": None,
                "escalation_priority": "low",
                "assigned_operator_id": None,
                "low_confidence_count": 0,
                "is_vip": False,
                "message_count": 0,
                "started_at": datetime.utcnow(),
                "ended_at": None,
            },
        )
        return self.sessions[sid]

    def add_message(self, message: dict) -> dict:
        message = {"id": str(uuid4()), "created_at": datetime.utcnow(), **message}
        self.messages.append(message)
        session = self.start_session(session_id=message["session_id"])
        session["message_count"] += 1
        return message

    def session_messages(self, session_id: str) -> list[dict]:
        return [m for m in self.messages if m["session_id"] == session_id]

    def dashboard(self) -> dict:
        total = max(len(self.sessions), 42)
        return {
            "kpis": [
                {"label": "Total Conversations Today", "value": total, "delta": "+12.4%"},
                {"label": "Bot Resolution Rate", "value": "78.0%", "delta": "+3.1%"},
                {"label": "Avg Confidence Score", "value": "81.4%", "delta": "+1.8%"},
                {"label": "Escalation Rate", "value": "22.0%", "delta": "-2.6%"},
                {"label": "Avg Bot Response Time", "value": "143ms", "delta": "-18ms"},
                {"label": "CSAT Score", "value": "3.8/5", "delta": "+0.2"},
            ],
            "intent_distribution": [
                {"name": name, "value": (i + 3) * 8, "color": color}
                for i, (name, color) in enumerate(list(INTENT_COLORS.items())[:8])
            ],
            "confidence_histogram": [
                {"bucket": "<40%", "count": 9, "escalation": 91},
                {"bucket": "40-59%", "count": 24, "escalation": 68},
                {"bucket": "60-79%", "count": 64, "escalation": 31},
                {"bucket": "80-89%", "count": 108, "escalation": 12},
                {"bucket": "90-100%", "count": 142, "escalation": 4},
            ],
            "volume": [
                {"time": f"{h}:00", "bot": 18 + h % 6, "escalated": 4 + h % 3, "abandoned": h % 4}
                for h in range(8, 19)
            ],
            "live_feed": [
                {"ago": "3s", "intent": "billing_inquiry", "confidence": 91.3, "escalated": False},
                {"ago": "12s", "intent": "complaint", "confidence": 78.1, "escalated": True},
                {"ago": "28s", "intent": "order_tracking", "confidence": 94.8, "escalated": False},
            ],
            "active_sessions": len([s for s in self.sessions.values() if s["status"] in ["active", "bot", "operator"]]) + 18,
            "operators_online": "3 / 5 online",
            "queue_depth": len(self.queue()),
        }

    def queue(self) -> list[dict]:
        records = [s for s in self.sessions.values() if s.get("escalation_required")]
        if not records:
            now = datetime.utcnow()
            records = [
                {
                    "session_id": "demo-billing",
                    "customer_name": "Avery Morgan",
                    "primary_intent": "billing_inquiry",
                    "escalation_reason": "keyword_trigger",
                    "escalation_priority": "urgent",
                    "started_at": now - timedelta(minutes=7),
                    "message_count": 8,
                },
                {
                    "session_id": "demo-refund",
                    "customer_name": "Anonymous Guest",
                    "primary_intent": "refund_request",
                    "escalation_reason": "low_confidence",
                    "escalation_priority": "medium",
                    "started_at": now - timedelta(minutes=3),
                    "message_count": 5,
                },
            ]
        return records


store = DemoStore()

