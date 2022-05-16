import os
import sys
from datetime import datetime

from fastapi import FastAPI, Request
from jose import JWTError
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from .service import decode_token
from .router import login, config, keyword, file
from .util.url import match_urls

app = FastAPI()

SKIP_PATH = ('/login', '/login/', '/login/refresh', '/files/(\d+)/pdf')


@app.middleware("http")
async def is_authenticated(request: Request, call_next):
    if not match_urls(request.url.path, SKIP_PATH):
        try:
            jwt = request.headers["Authorization"][7:]
            decoded_token = decode_token(jwt)
            if datetime.utcfromtimestamp(decoded_token["exp"]) <= datetime.utcnow():
                return JSONResponse(content={"detail": "session timeout"}, status_code=401)
        except (JWTError, KeyError):
            return JSONResponse(content={"detail": "unable to decode jwt"}, status_code=401)

    response = await call_next(request)
    return response


app.include_router(login.router)
app.include_router(config.router)
app.include_router(keyword.router)
app.include_router(file.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
