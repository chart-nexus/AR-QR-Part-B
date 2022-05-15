from typing import Optional, List

from pydantic import BaseModel


class File(BaseModel):
    id: Optional[int]
    folder_location: str
    file_path: str
    need_verify: bool
    page: int

    class Config:
        orm_mode = True


class Page(BaseModel):
    page: int
    score: int

    class Config:
        orm_mode = True


class PageSheetNamePatch(BaseModel):
    page_list: List[int]
    sheet_name: str
