from typing import List, Optional

from pydantic import BaseModel


class Keyword(BaseModel):
    id: Optional[int]
    word: str
    score: int

    class Config:
        orm_mode = True


class KeywordCreate(Keyword):
    sheet_config_id: int


class ConfigBase(BaseModel):
    id: Optional[int]
    sheet_name: str
    threshold: int


class Config(ConfigBase):
    keywords: List[Keyword]

    class Config:
        orm_mode = True
