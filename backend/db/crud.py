from typing import List

from sqlalchemy.orm import Session

from backend.model import ConfigBase, Keyword
import db as entity
from backend.model.config import KeywordCreate


def get_configs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(entity.Config).offset(skip).limit(limit).all()


def edit_config(db: Session, config_id: int, config: ConfigBase):
    config.id = config_id
    db.query(entity.Config).filter(entity.Config.id == config_id).update(config.dict())
    db.commit()


def add_keyword(db: Session, keyword: KeywordCreate):
    db_keyword = entity.Keyword(sheet_config_id=keyword.sheet_config_id, score=keyword.score, word=keyword.word)
    db.add(db_keyword)
    db.commit()
    db.refresh(db_keyword)
    return db_keyword


def edit_keyword(db: Session, keyword_id: int, keyword: Keyword):
    keyword.id = keyword_id
    db.query(entity.Keyword).filter(entity.Keyword.id == keyword_id).update(keyword.dict())
    db.commit()


def delete_keyword(db: Session, keyword_id: int):
    db.query(entity.Keyword).filter_by(id=keyword_id).delete()
    db.commit()


def get_files(db: Session, skip: int = 0, limit: int = 100):
    return db.query(entity.File).offset(skip).limit(limit).all()


def get_file(db: Session, file_id: int):
    return db.query(entity.File).get(file_id)


def update_pages(db: Session, file_id: int, page_list: List[int], sheet_name: str):
    db.query(entity.Page).filter(entity.Page.file_id == file_id, entity.Page.page.in_(page_list))\
        .update({"sheet": sheet_name, "done_by": "HUMAN", "status": "PASS"})
    db.commit()
