from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.helpers.get_current_user import get_current_user
from app.database.db import get_db
from app.models.user import User

from app.schemas.tour_schedules import (
    TourScheduleCreateRequest,
    UpdateTourScheduleRequest,
    TourScheduleResponse,
    UpdateTourScheduleStatus
)

from app.services.tour_schedules import (
    create_tour_schedule_service,
    get_tour_schedule_by_id_service,
    get_schedules_by_tour_service,
    get_all_tour_schedules_service,
    update_tour_schedule_service,
    change_schedule_status_service
)


router = APIRouter(
    prefix="/tour_schedules",
    tags=["tour schedules"]
)


@router.post(
    "/{tour_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=TourScheduleResponse
)
def create_tour_schedule(
    tour_id: int,
    data: TourScheduleCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_tour_schedule_service(
        tour_id=tour_id,
        data=data,
        db=db,
        current_user=current_user
    )


@router.get(
    "/tour/{tour_id}",
    response_model=list[TourScheduleResponse],
    status_code=status.HTTP_200_OK
)
def get_schedules_by_tour(
    tour_id: int,
    db: Session = Depends(get_db)
):
    return get_schedules_by_tour_service(
        db=db,
        tour_id=tour_id
    )


@router.get(
    "/",
    response_model=list[TourScheduleResponse],
    status_code=status.HTTP_200_OK
)
def get_all_tour_schedules(
    db: Session = Depends(get_db)
):
    return get_all_tour_schedules_service(db=db)


@router.get(
    "/{schedule_id}",
    response_model=TourScheduleResponse,
    status_code=status.HTTP_200_OK
)
def get_tour_schedule_by_id(
    schedule_id: int,
    db: Session = Depends(get_db)
):
    return get_tour_schedule_by_id_service(
        db=db,
        schedule_id=schedule_id
    )


@router.patch(
    "/{schedule_id}",
    response_model=TourScheduleResponse,
    status_code=status.HTTP_200_OK
)
def update_tour_schedule(
    schedule_id: int,
    data: UpdateTourScheduleRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return update_tour_schedule_service(
        db=db,
        schedule_id=schedule_id,
        data=data,
        current_user=current_user
    )


@router.patch(
    "/{schedule_id}/status",
    response_model=TourScheduleResponse,
    status_code=status.HTTP_200_OK
)
def change_schedule_status(
    schedule_id: int,
    data: UpdateTourScheduleStatus,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return change_schedule_status_service(
        db=db,
        data=data,
        current_user=current_user,
        schedule_id=schedule_id
    )