import html
import re
import time
from concurrent.futures import ThreadPoolExecutor

from app.config import get_settings
from app.models.intent import INTENT_COLORS

executor = ThreadPoolExecutor(max_workers=4)


class IntentClassifier:
    def __init__(self) -> None:
        self.is_loaded = False
        self.model = None
        self.tokenizer = None
        self.labels = list(INTENT_COLORS.keys())
        self.keywords = {
            "order_tracking": ["track", "package", "order", "delivered", "shipment"],
            "billing_inquiry": ["charged", "invoice", "bill", "billing", "receipt"],
            "refund_request": ["refund", "money back", "reimburse"],
            "complaint": ["unacceptable", "angry", "disappointed", "ridiculous"],
            "product_info": ["specs", "available", "size", "color", "feature"],
            "account_access": ["login", "password", "account", "reset"],
            "cancellation": ["cancel", "subscription", "stop my plan"],
            "shipping_issue": ["damaged", "wrong item", "shipping", "missing package"],
            "technical_support": ["crashing", "bug", "not working", "error", "feature"],
            "payment_failed": ["declined", "payment failed", "card"],
            "returns": ["return label", "return this", "send back"],
            "promotions": ["discount", "coupon", "offer", "promo"],
            "feedback": ["suggestion", "feedback", "great service"],
            "escalation_request": ["human", "agent", "manager", "representative"],
            "greeting": ["hello", "hi", "hey"],
            "farewell": ["bye", "goodbye", "thanks bye"],
        }

    def load_once(self) -> None:
        if self.is_loaded:
            return
        settings = get_settings()
        if settings.use_hf_model:
            try:
                from transformers import AutoModelForSequenceClassification, AutoTokenizer

                self.tokenizer = AutoTokenizer.from_pretrained(settings.hf_model_path)
                self.model = AutoModelForSequenceClassification.from_pretrained(settings.hf_model_path)
            except Exception:
                self.model = None
        self.is_loaded = True

    def sanitize(self, text: str) -> str:
        cleaned = re.sub(r"<[^>]*>", "", html.unescape(text)).strip()
        return cleaned[:4000]

    def classify_sync(self, raw_text: str) -> dict:
        start = time.perf_counter()
        text = self.sanitize(raw_text).lower()
        scores = {label: 1.2 for label in self.labels}
        for label, words in self.keywords.items():
            for word in words:
                if word in text:
                    scores[label] += 28
        if any(word in text for word in ["lawsuit", "fraud", "legal action", "bbb", "chargeback"]):
            scores["escalation_request"] += 38
            scores["complaint"] += 20
        if len(text.split()) <= 2 and any(word in text for word in ["hi", "hey", "hello"]):
            scores["greeting"] += 55
        total = sum(scores.values())
        normalized = {k: round((v / total) * 100, 1) for k, v in scores.items()}
        primary = max(normalized, key=normalized.get)
        confidence = normalized[primary]
        if confidence < 40:
            primary = "out_of_scope"
            confidence = max(confidence, normalized["out_of_scope"])
        return {
            "primary_intent": primary,
            "confidence": round(confidence, 1),
            "all_scores": dict(sorted(normalized.items(), key=lambda item: item[1], reverse=True)),
            "processing_time_ms": int((time.perf_counter() - start) * 1000),
        }

    async def classify(self, text: str) -> dict:
        import asyncio

        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(executor, self.classify_sync, text)


classifier = IntentClassifier()

