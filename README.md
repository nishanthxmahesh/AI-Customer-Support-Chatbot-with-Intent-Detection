# Aria AI Customer Support Chatbot System

Aria is a full-stack support operations demo for real-time customer chat, intent classification, confidence-scored responses, escalation workflows, operator takeover, and analytics. It is intentionally production-shaped but student-friendly: the FastAPI backend works immediately with an in-memory demo store, and the same service boundaries are ready for MongoDB, HuggingFace, and Groq.

## Stack

- Frontend: React 18, Vite, TailwindCSS, React Query, Zustand, Recharts, lucide-react
- Backend: FastAPI, async WebSockets, JWT-ready auth, Motor-ready MongoDB layer
- AI: singleton intent classifier service, confidence scorer, response engine, escalation engine
- Database target: MongoDB collections for users, sessions, messages, intents, templates, KB, annotations, escalation events, operator sessions

## Local Setup

### 1. Backend

```bash
cd support-chatbot/backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload --port 8000
```

Open `http://localhost:8000/docs`.

Demo login:

```text
admin@aria.ai / admin123
```

### 2. Frontend

```bash
cd support-chatbot/frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment Variables

```env
APP_NAME="Aria Support AI"
ENVIRONMENT=development
JWT_SECRET=change-me-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_MINUTES=15
REFRESH_TOKEN_DAYS=7
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=support_chatbot
HF_MODEL_PATH=app/ml/model
USE_HF_MODEL=false
GROQ_API_KEY=
LLM_PROVIDER=mock
CORS_ORIGINS=http://localhost:5173
```

Set `USE_HF_MODEL=true` after training and saving a DistilBERT checkpoint to `backend/app/ml/model`.

## AI Pipeline Flow

1. Customer sends a message through REST or WebSocket.
2. Backend strips HTML, stores the user message, and sends the clean text to the classifier.
3. The classifier is loaded once at FastAPI startup. Demo mode uses fast keyword scoring; production mode can load `AutoModelForSequenceClassification`.
4. Classification returns `primary_intent`, `confidence`, all 17 intent scores, and processing time.
5. Confidence scorer applies global thresholds, per-intent rules, and session low-confidence tracking.
6. Escalation engine checks confidence, explicit human requests, VIP status, repeated confusion, and trigger keywords like `fraud`, `lawsuit`, and `chargeback`.
7. Response engine selects a fast template or a complex LLM-style answer, adds suggested actions, and tags the source.
8. Frontend renders the bot reply, intent drawer, confidence bar, top alternatives, suggested actions, and escalation banner when needed.

Target constraint: intent classification should return in under `500ms`. The implementation runs inference through `asyncio.run_in_executor` so model work does not block the event loop.

## HuggingFace Fine-Tuning

The training hook lives at:

```bash
backend/app/ml/train.py
```

For a real model:

1. Expand `backend/app/ml/training_data/intents.json` to 200+ examples for each of the 17 intents.
2. Load `distilbert-base-uncased` tokenizer and `AutoModelForSequenceClassification`.
3. Train for 5 epochs, learning rate `2e-5`, batch size `16`, weight decay `0.01`.
4. Use an 80/10/10 train/validation/test split.
5. Log per-intent precision, recall, F1, and confusion matrix.
6. Save the best checkpoint into `backend/app/ml/model/`.

## MongoDB Indexes

Run these in `mongosh`:

```javascript
use support_chatbot
db.sessions.createIndex({ status: 1 })
db.sessions.createIndex({ started_at: -1 })
db.messages.createIndex({ session_id: 1 })
db.messages.createIndex({ created_at: -1 })
db.intent_training_data.createIndex({ intent: 1 })
db.escalation_events.createIndex({ priority: 1 })
```

## Key Endpoints

- `POST /chat/session/start`
- `WS /ws/chat/{session_id}`
- `POST /chat/message`
- `POST /intents/classify`
- `GET /operators/queue`
- `GET /analytics/dashboard`
- `GET /sessions`
- `GET|PUT /settings/{section}`
- `GET /kb/search?q=refund`

## Notes For Student Teams

This repo uses a practical layered design:

- Routers handle HTTP/WebSocket shape.
- Services contain business logic.
- Models define request/response contracts.
- The demo store keeps the app usable before MongoDB is connected.
- The UI is complete enough for a project presentation, with clean places to replace mock data with real database queries.

The fastest path to upgrade it is: connect real MongoDB writes, add real JWT middleware, expand training data, train DistilBERT, then swap the response engine mock for Groq or another LLM provider.
