from fastapi import APIRouter

router = APIRouter(
    prefix="/keywords"
)


@router.post()
def add_keyword():
    pass


@router.put()
def edit_keyword():
    pass


@router.delete()
def delete_keyword():
    pass
