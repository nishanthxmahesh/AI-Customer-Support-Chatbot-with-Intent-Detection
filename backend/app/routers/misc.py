from fastapi import APIRouter

router = APIRouter()

SETTINGS = {
    "bot": {"bot_name": "Aria", "welcome_message": "Hey there! I'm Aria, your AI support assistant."},
    "thresholds": {"high": 80, "low": 60},
    "escalation-rules": {"keywords": ["lawsuit", "fraud", "chargeback"], "vip_domains": ["enterprise.example"]},
    "response-engine": {"provider": "mock", "max_words": 120},
    "operator": {"max_concurrent_chats": 3, "auto_assign": "manual"},
    "csat": {"enabled": True, "scale": "5 stars"},
    "working-hours": {"timezone": "Asia/Calcutta", "outside_hours_behavior": "bot_take_message"},
    "safety-filters": {"banned_words": [], "default_severity": "escalate"},
}

KB = [
    {"id": "kb_1", "title": "Refund timelines", "content": "Approved refunds usually post in 3-5 business days.", "tags": ["refund"], "active": True},
    {"id": "kb_2", "title": "Order tracking", "content": "Customers can track packages with their order number.", "tags": ["orders"], "active": True},
]

TEMPLATES = [
    {"id": "tpl_1", "intent": "order_tracking", "template_text": "Share your order number and I’ll check the shipment.", "priority": 1, "is_active": True}
]


@router.get("/kb")
async def list_kb() -> list[dict]:
    return KB


@router.get("/kb/search")
async def search_kb(q: str = "") -> list[dict]:
    needle = q.lower()
    return [item for item in KB if needle in item["title"].lower() or needle in item["content"].lower()]


@router.post("/kb")
async def create_kb(payload: dict) -> dict:
    item = {"id": f"kb_{len(KB) + 1}", **payload}
    KB.append(item)
    return item


@router.put("/kb/{item_id}")
async def update_kb(item_id: str, payload: dict) -> dict:
    return {"id": item_id, **payload}


@router.delete("/kb/{item_id}")
async def delete_kb(item_id: str) -> dict:
    return {"ok": True, "id": item_id}


@router.get("/templates")
async def list_templates(intent: str | None = None) -> list[dict]:
    return [tpl for tpl in TEMPLATES if intent is None or tpl["intent"] == intent]


@router.post("/templates")
async def create_template(payload: dict) -> dict:
    item = {"id": f"tpl_{len(TEMPLATES) + 1}", **payload}
    TEMPLATES.append(item)
    return item


@router.put("/templates/{template_id}")
async def update_template(template_id: str, payload: dict) -> dict:
    return {"id": template_id, **payload}


@router.delete("/templates/{template_id}")
async def delete_template(template_id: str) -> dict:
    return {"ok": True, "id": template_id}


@router.post("/annotations")
async def create_annotation(payload: dict) -> dict:
    return {"id": "ann_demo", **payload}


@router.get("/annotations/{session_id}")
async def annotations(session_id: str) -> list[dict]:
    return [{"id": "ann_demo", "session_id": session_id, "tag": "qa_review", "note": "Good escalation timing."}]


@router.delete("/annotations/{annotation_id}")
async def delete_annotation(annotation_id: str) -> dict:
    return {"ok": True, "id": annotation_id}


@router.get("/settings/{section}")
async def get_settings_section(section: str) -> dict:
    return SETTINGS.get(section, {})


@router.put("/settings/{section}")
async def put_settings_section(section: str, payload: dict) -> dict:
    SETTINGS[section] = payload
    return payload
