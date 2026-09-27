from sqlalchemy.orm import Session 

from fastapi import HTTPException , status 

from app.models.user import User , UserRole 
from app.models.tour import Tour , TourStatus 
from app.models.tour_schedule import ScheduleStatus , TourSchedule
from app.schemas.tour_schedules import TourScheduleCreateRequest , UpdateTourScheduleRequest  , UpdateTourScheduleStatus 

def create_tour_schedule(
    db: Session,
    current_user: User,
    data: TourScheduleCreateRequest,
    tour_id: int
):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first"
        )

    if current_user.role == UserRole.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customers are not allowed to create schedules"
        )

    tour = db.query(Tour).filter(
        Tour.id == tour_id
    ).first()

    if tour is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tour not found"
        )

    if current_user.role == UserRole.STAFF:
        if tour.created_by != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Staff can only create schedules for their own tours"
            )

    if tour.status != TourStatus.PUBLISHED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't create a schedule for an unpublished tour"
        )

    tour_schedule = TourSchedule(
        tour_id=tour_id,
        start_date=data.start_date,
        start_time=data.start_time,
        capacity=data.capacity
    )

    db.add(tour_schedule)
    db.commit()
    db.refresh(tour_schedule)

    return tour_schedule
    
