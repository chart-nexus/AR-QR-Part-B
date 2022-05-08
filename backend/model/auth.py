from pydantic import BaseModel


class Login(BaseModel):
    username: str
    password: str


class Refresh(BaseModel):
    token: str


class Jwt(BaseModel):
    access_token: str
    refresh_token: str
