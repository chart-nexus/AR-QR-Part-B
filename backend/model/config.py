from typing import List

from pydantic import BaseModel


class Keyword(BaseModel):
    id: int
    word: str
    score: int

    class Config:
        orm_mode = True


class Config(BaseModel):
    id: int
    sheet_name: str
    threshold: int
    keywords: List[Keyword]

    class Config:
        orm_mode = True
