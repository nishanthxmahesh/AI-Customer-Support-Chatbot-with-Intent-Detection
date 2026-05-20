from datetime import datetime
from uuid import uuid4

from app.services.store import store


class SessionManager:
    def start(self, channel: str = "standalone", session_id: str | None = None) -> dict:
        return store.start_session(channel=channel, session_id=session_id or str(uuid4()))

    def update_customer(self, session_id: str, name: str, email: str, transcript_requested: bool) -> dict:
        session = store.start_session(session_id=session_id)
        session.update({"customer_name": name, "customer_email": email, "transcript_requested": transcript_requested})
        return session

    def end(self, session_id: str) -> dict:
        session = store.start_session(session_id=session_id)
        session.update({"status": "resolved", "ended_at": datetime.utcnow()})
        return session


session_manager = SessionManager()

