from fastapi import APIRouter

router = APIRouter(
    prefix="/configs"
)


@router.get("/")
async def get_all():
    pass


@router.put("/{id}")
async def edit(id: int):
    pass
