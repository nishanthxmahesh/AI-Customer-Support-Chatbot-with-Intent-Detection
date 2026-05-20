from pydantic import BaseModel, EmailStr


class LoginIn(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class RegisterIn(LoginIn):
    full_name: str
    role: str = "operator"

