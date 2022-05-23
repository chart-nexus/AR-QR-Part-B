from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import FileResponse

from backend.db import get_db, crud, database
from backend.model import File, PageSheetNamePatch, Page
from scoring.config import DbConfigLoader
from scoring.scoring_engine import ScoringEngine, PageExtractor

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


@router.get("/{file_id}/pages", response_model=List[PageSheetNamePatch])
async def get_success_pages(file_id: int, db: Session = Depends(get_db)):
    result = []
    configs = crud.get_configs(db)
    for config in configs:
        pages = crud.get_pages_by_config(db, file_id, config.sheet_name)
        result.append(PageSheetNamePatch(sheet_name=config.sheet_name, page_list=[page.page for page in pages]))
    return result

@router.post("/{file_id}/score")
def process(file_id: int, db: Session = Depends(get_db)):
    config_loader = DbConfigLoader(database)
    configs = config_loader.load()
    scoring_engine = ScoringEngine(configs, PageExtractor())
    file = crud.get_file(db, file_id)
    results = scoring_engine.score_folder(file.folder_location)
    crud.score_page(db, file_id, results)
