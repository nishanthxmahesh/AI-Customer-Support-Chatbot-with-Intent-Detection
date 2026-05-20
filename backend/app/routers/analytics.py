from fastapi import APIRouter

from app.services.store import store

router = APIRouter()


@router.get("/dashboard")
async def dashboard() -> dict:
    return store.dashboard()


@router.get("/{name}")
async def analytics_slice(name: str) -> dict:
    return {"name": name, "data": store.dashboard()}

