from motor.motor_asyncio import AsyncIOMotorClient

from app.config import get_settings

client: AsyncIOMotorClient | None = None
db = None


async def connect_to_mongo() -> None:
    global client, db
    settings = get_settings()
    client = AsyncIOMotorClient(settings.mongodb_uri, serverSelectionTimeoutMS=800)
    db = client[settings.mongodb_db]
    try:
        await client.admin.command("ping")
    except Exception:
        db = None


async def close_mongo_connection() -> None:
    if client:
        client.close()


def get_db():
    return db

