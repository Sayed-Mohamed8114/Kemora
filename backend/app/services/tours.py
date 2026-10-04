from app.models.tour import Tour , TourStatus 
from app.models.user import User  , UserRole
from app.schemas.tours import CreateTourRequest , UpdateTourRequest , ChangeTourStatusRequest
from app.services.file import save_upload_file

from fastapi import status , HTTPException  , UploadFile 

from sqlalchemy.orm import Session


def create_tour_service(db:Session , data:CreateTourRequest , current_user:User):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED ,
            detail= "please login first to add a tour"
        )
    if current_user.role not in [UserRole.SUPER_ADMIN , UserRole.STAFF]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN ,
            detail= "You don't have the access to create tour " 
        )
    tour = Tour(
        title = data.title,
        description = data.description , 
        location = data.location ,
        duration = data.duration ,
        price = data.price,
        created_by = current_user.id, 
    )

    db.add(tour)
    db.commit()
    db.refresh(tour)
    return tour
    
def get_all_tours_for_admin_service(db: Session):
    return db.query(Tour).all()

def get_all_tours_by_me_service(
    db: Session,
    current_user: User
):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first"
        )

    if current_user.role != UserRole.STAFF:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only staff can access their tours"
        )

    tours = db.query(Tour).filter(
        Tour.created_by == current_user.id
    ).all()

    return tours

def tours_for_customers_service(db: Session):
    tours = db.query(Tour).filter(
        Tour.status == TourStatus.PUBLISHED
    ).all()

    return tours

def get_tour_by_id_service(db: Session , tour_id:int):
    tour = db.query(Tour).filter(
        Tour.id == tour_id
    ).first()
    return tour 

    
def update_tour_service(
    db: Session,
    data: UpdateTourRequest,
    tour_id: int,
    current_user: User
):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first"
        )

    tour = db.query(Tour).filter(
        Tour.id == tour_id
    ).first()

    if tour is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tour not found"
        )

    if current_user.role == UserRole.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customers can't edit tours"
        )

    if current_user.role == UserRole.STAFF:
        if tour.created_by != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Staff can only edit their own tours"
            )

    if data.title is not None:
        tour.title = data.title

    if data.description is not None:
        tour.description = data.description

    if data.location is not None:
        tour.location = data.location

    if data.duration is not None:
        tour.duration = data.duration

    if data.price is not None:
        tour.price = data.price

    db.commit()
    db.refresh(tour)

    return tour

def change_tour_status_service(
    db: Session,
    tour_id: int,
    data: ChangeTourStatusRequest,
    current_user: User
):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first"
        )

    tour = db.query(Tour).filter(
        Tour.id == tour_id
    ).first()

    if tour is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tour not found"
        )

    if current_user.role == UserRole.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customers can't change tour status"
        )

    if current_user.role == UserRole.STAFF:
        if tour.created_by != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Staff can only change the status of their own tours"
            )

    tour.status = data.status

    db.commit()
    db.refresh(tour)

    return tour

async def upload_tour_cover_service(
        db: Session ,
        current_user : User ,
        file:UploadFile,
        tour_id:int
):
    if current_user is None :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED ,
            detail= "Please login first"
        )
    if current_user.role not in [UserRole.STAFF , UserRole.SUPER_ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail = "You are not allowed to add cover to tour"
        )
    tour = db.query(Tour).filter(
        Tour.id == tour_id
    ).first()

    if tour is None :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tour not found"
        )

    if current_user.role is UserRole.STAFF :
        if tour.created_by != current_user.id :
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Staff can only upload covers for their own tours"
            )
    image_url  = await save_upload_file(file)
    tour.image_url = image_url 

    db.commit()
    db.refresh(tour)

    return tour

def delete_tour_service(
    db: Session,
    current_user: User,
    tour_id: int
):
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first"
        )

    if current_user.role not in [UserRole.STAFF, UserRole.SUPER_ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete tours"
        )

    tour = db.query(Tour).filter(
        Tour.id == tour_id
    ).first()

    if tour is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tour not found"
        )

    if current_user.role is UserRole.STAFF:
        if tour.created_by != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Staff can only delete their own tours"
            )

    db.delete(tour)
    db.commit()

    return "Tour has been deleted successfully"