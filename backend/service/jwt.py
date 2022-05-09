from datetime import timedelta, datetime

from jose import jwt

SECRET_KEY = "secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 week


def create_refresh_token():
    return create_token({}, timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))


def create_access_token():
    return create_token({}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))


def create_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
