from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException, Response
from jose import jwt
from passlib.context import CryptContext

from app.config import get_settings
from app.models.user import LoginIn, RegisterIn

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
DEMO_USERS = {"admin@aria.ai": {"password": "admin123", "role": "admin", "full_name": "Priya Shah"}}


def make_token(email: str, role: str, minutes: int) -> str:
    settings = get_settings()
    payload = {"sub": email, "role": role, "exp": datetime.utcnow() + timedelta(minutes=minutes)}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


@router.post("/login")
async def login(payload: LoginIn, response: Response) -> dict:
    user = DEMO_USERS.get(payload.email)
    if not user or payload.password != user["password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    settings = get_settings()
    access = make_token(payload.email, user["role"], settings.access_token_minutes)
    refresh = make_token(payload.email, user["role"], settings.refresh_token_days * 24 * 60)
    response.set_cookie("refresh_token", refresh, httponly=True, samesite="lax")
    return {"access_token": access, "user": {"email": payload.email, "role": user["role"], "full_name": user["full_name"]}}


@router.post("/register")
async def register(payload: RegisterIn) -> dict:
    DEMO_USERS[payload.email] = {"password": payload.password, "role": payload.role, "full_name": payload.full_name}
    return {"ok": True, "email": payload.email}


@router.post("/logout")
async def logout(response: Response) -> dict:
    response.delete_cookie("refresh_token")
    return {"ok": True}


@router.post("/refresh")
async def refresh() -> dict:
    return {"ok": True}


@router.patch("/operator-status")
async def operator_status(payload: dict) -> dict:
    return {"ok": True, "status": payload.get("status", "online"), "last_heartbeat_at": datetime.utcnow().isoformat()}

