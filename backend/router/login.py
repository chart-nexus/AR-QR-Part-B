from datetime import datetime

from fastapi import APIRouter, HTTPException
from jose import JWTError

from backend.model import Jwt, Login, Refresh
from backend.service import create_access_token, create_refresh_token, decode_token

router = APIRouter(
    prefix="/login"
)


@router.post("/", response_model=Jwt)
async def login(login_param: Login):
    if login_param.username == "admin" and login_param.password == "admin":
        access_token = create_access_token()
        refresh_token = create_refresh_token()
        return Jwt(access_token=access_token, refresh_token=refresh_token)

    raise HTTPException(status_code=401, detail="Wrong Credential")


@router.post("/refresh", response_model=Jwt)
async def refresh(token: Refresh):
    try:
        decoded_token = decode_token(token.token)
        if datetime.utcfromtimestamp(decoded_token["exp"]) > datetime.utcnow():
            access_token = create_access_token()
            refresh_token = create_refresh_token()
            return Jwt(access_token=access_token, refresh_token=refresh_token)
    except JWTError:
        raise HTTPException(status_code=401, detail="Unable to decode token")

    raise HTTPException(status_code=401, detail="Unable to refresh token")
