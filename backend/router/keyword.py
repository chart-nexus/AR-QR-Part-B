from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.db import get_db, crud
from backend.model.config import KeywordCreate, Keyword

router = APIRouter(
    prefix="/keywords"
)


@router.post("/", response_model=KeywordCreate)
def add_keyword(keyword: KeywordCreate, db: Session = Depends(get_db)):
    return crud.add_keyword(db, keyword)


@router.put("/{keyword_id}")
def edit_keyword(keyword_id: int, keyword: Keyword, db: Session = Depends(get_db)):
    return crud.edit_keyword(db, keyword_id, keyword)


@router.delete("/{keyword_id}")
def delete_keyword(keyword_id: int, db: Session = Depends(get_db)):
    return crud.delete_keyword(db, keyword_id)
