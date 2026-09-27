from fastapi import APIRouter , status  , Depends 

from sqlalchemy.orm import Session

from app.schemas.tours import ChangeTourStatusRequest , TourResponse , CreateTourRequest , UpdateTourRequest
from app.database.db import get_db
from app.helpers.get_current_user import get_current_user
from app.helpers.require_super_admin import is_super_admin
from app.services.tours import create_tour_service , get_all_tours_by_me_service , get_tour_by_id_service , get_all_tours_for_admin_service , tours_for_customers_service , update_tour_service , change_tour_status_service
from app.models.user import User

router = APIRouter(
    prefix="/tours",
    tags=["tours"]
)


@router.post(
    "/",
    response_model=TourResponse,
    status_code=status.HTTP_201_CREATED
)
def create_tour(
    data: CreateTourRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_tour_service(
        db=db,
        data=data,
        current_user=current_user
    )


@router.get(
    "/admin",
    response_model=list[TourResponse]
)
def get_tours_for_admin(
    db: Session = Depends(get_db),
    current_user: User = Depends(is_super_admin)
):
    return get_all_tours_for_admin_service(db=db)


@router.get(
    "/staff",
    response_model=list[TourResponse]
)
def get_tours_by_staff(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_all_tours_by_me_service(
        db=db,
        current_user=current_user
    )


@router.get(
    "/customer",
    response_model=list[TourResponse]
)
def get_tours_for_customers(
    db: Session = Depends(get_db)
):
    return tours_for_customers_service(db=db)


@router.patch(
    "/{tour_id}/status",
    response_model=TourResponse
)
def change_tour_status(
    tour_id: int,
    data: ChangeTourStatusRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return change_tour_status_service(
        db=db,
        tour_id=tour_id,
        data=data,
        current_user=current_user
    )


@router.patch(
    "/{tour_id}",
    response_model=TourResponse
)
def update_tour(
    tour_id: int,
    data: UpdateTourRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return update_tour_service(
        db=db,
        data=data,
        tour_id=tour_id,
        current_user=current_user
    )


@router.get(
    "/{tour_id}",
    response_model=TourResponse
)
def get_tour_by_id(
    tour_id: int,
    db: Session = Depends(get_db)
):
    return get_tour_by_id_service(
        db=db,
        tour_id=tour_id
    )