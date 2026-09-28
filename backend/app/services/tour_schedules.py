from sqlalchemy.orm import Session 

from fastapi import HTTPException , status 

from app.models.user import User , UserRole 
from app.models.tour import Tour , TourStatus 
from app.models.tour_schedule import ScheduleStatus , TourSchedule
from app.schemas.tour_schedules import TourScheduleCreateRequest , UpdateTourScheduleRequest  , UpdateTourScheduleStatus 

def create_tour_schedule_service(
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
    
def get_all_tour_schedules_service(db: Session):
    return db.query(TourSchedule).all()

def get_tour_schedule_by_id_service(db: Session , schedule_id:int):
    tour_schedule = db.query(TourSchedule).filter(
        TourSchedule.id == schedule_id
    ).first()

    if tour_schedule is None :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="this schedule is not found "
        )

    return tour_schedule 

def get_schedules_by_tour_service(
    db: Session,
    tour_id: int
):
    tour = db.query(Tour).filter(
        Tour.id == tour_id
    ).first()

    if tour is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This tour is not found"
        )

    return db.query(TourSchedule).filter(
        TourSchedule.tour_id == tour_id
    ).all()

def update_tour_schedule_service(
    db: Session,
    schedule_id: int,
    data: UpdateTourScheduleRequest,
    current_user: User
):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first"
        )

    if current_user.role == UserRole.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customers can't change schedules"
        )

    schedule = db.query(TourSchedule).filter(
        TourSchedule.id == schedule_id
    ).first()

    if schedule is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Schedule not found"
        )

    if current_user.role == UserRole.STAFF:
        if schedule.tour.created_by != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Staff can only edit schedules of their own tours"
            )

    if data.capacity is not None:
        schedule.capacity = data.capacity

    if data.start_date is not None:
        schedule.start_date = data.start_date

    if data.start_time is not None:
        schedule.start_time = data.start_time

    db.commit()
    db.refresh(schedule)

    return schedule


def change_schedule_status_service(
    db: Session,
    data: UpdateTourScheduleStatus,
    current_user: User,
    schedule_id: int
):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first"
        )

    if current_user.role == UserRole.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customers can't change schedule status"
        )

    schedule = db.query(TourSchedule).filter(
        TourSchedule.id == schedule_id
    ).first()

    if schedule is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Schedule not found"
        )

    if current_user.role == UserRole.STAFF:
        if schedule.tour.created_by != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Staff can only change status of schedules for their own tours"
            )

    schedule.status = data.status

    db.commit()
    db.refresh(schedule)

    return schedule