from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Aria Support AI"
    environment: str = "development"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_minutes: int = 15
    refresh_token_days: int = 7
    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db: str = "support_chatbot"
    hf_model_path: str = "app/ml/model"
    use_hf_model: bool = False
    groq_api_key: str = ""
    llm_provider: str = "mock"
    cors_origins: str = "http://localhost:5173"

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()

