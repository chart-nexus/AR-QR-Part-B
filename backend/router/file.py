from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import FileResponse

from backend.db import get_db, crud
from backend.model import File, PageSheetNamePatch

router = APIRouter(
    prefix="/files"
)


@router.get("/", response_model=List[File])
async def get_all(db: Session = Depends(get_db)):
    return crud.get_files(db)


@router.get("/{file_id}/pdf", response_class=FileResponse)
async def get_pdf(file_id: int, db: Session = Depends(get_db)):
    file = crud.get_file(db, file_id)
    return file.file_path


@router.patch("/{file_id}/pages/update")
async def update_page_sheet(file_id: int, page_sheet_name_patch: PageSheetNamePatch, db: Session = Depends(get_db)):
    crud.update_pages(db, file_id, page_sheet_name_patch.page_list, page_sheet_name_patch.sheet_name)
