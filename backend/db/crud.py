from sqlalchemy.orm import Session

from db import Config


def get_configs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Config).offset(skip).limit(limit).all()
