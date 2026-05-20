TEMPLATES = {
    "greeting": "Hey there! I'm Aria, your AI support assistant. What can I help you with today?",
    "farewell": "You're welcome. I’ll keep this conversation available if you need anything else.",
    "order_tracking": "I can help track that. Share your order number and I’ll check the latest shipment status.",
    "promotions": "Current offers vary by region and account type. I can check eligible discounts for you.",
    "product_info": "I can help with product details. Tell me the product name and what specification you need.",
    "account_access": "I can help you regain access. Try resetting your password first, and I can connect you to an agent if that fails.",
}

COMPLEX = {
    "complaint": "I’m sorry this has been frustrating. I’ll capture the details and make sure the right support team reviews it quickly.",
    "billing_inquiry": "I can help review that billing question. Please share the invoice number or charge date so we can narrow it down.",
    "technical_support": "Let’s troubleshoot this step by step. What device, browser, and error message are you seeing?",
    "payment_failed": "Payment failures are often caused by bank declines, address mismatch, or expired cards. I can help check the next best step.",
    "cancellation": "I can help with cancellation options and make sure you understand any billing impact before changes are made.",
    "refund_request": "I can check refund eligibility for you. Please share the order number and reason for the refund request.",
}

ACTIONS = {
    "refund_request": ["Check Refund Eligibility", "Start Return Process", "Speak to an Agent"],
    "order_tracking": ["Track My Order", "Report Missing Package"],
    "billing_inquiry": ["View Invoice", "Dispute a Charge", "Speak to Billing"],
    "technical_support": ["Run Troubleshooter", "Open Help Article", "Speak to an Agent"],
}


class ResponseEngine:
    async def generate(self, intent: str, confidence: float, decision: dict, history: list[dict]) -> dict:
        if intent in TEMPLATES:
            source = "template"
            text = TEMPLATES[intent]
        else:
            source = "llm" if intent in COMPLEX else "template"
            text = COMPLEX.get(intent, "I want to make sure I understand. Could you add one more detail about what you need?")
        if decision["clarify"] and not decision["escalate"]:
            text += f" Just to confirm, are you asking about {intent.replace('_', ' ')}?"
        return {
            "response_text": text,
            "response_source": source,
            "suggested_actions": [
                {"label": label, "action_type": label.lower().replace(" ", "_")}
                for label in ACTIONS.get(intent, ["Speak to an Agent"])
            ],
        }


response_engine = ResponseEngine()

