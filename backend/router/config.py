from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.db import get_db, crud
from backend.model import Config

router = APIRouter(
    prefix="/configs"
)


@router.get("/", response_model=List[Config])
async def get_all(db: Session = Depends(get_db)):
    return crud.get_configs(db)


@router.put("/{id}")
async def edit(id: int):
    pass
