from fastapi import status , HTTPException 

from app.models.user import User,UserRole 
from app.models.services import Service  
from app.models.tour import Tour , TourStatus 
from app.models.request_service import RequestService , ServiceRequestStatus
from app.models.tour_schedule import TourSchedule 
from app.models.booking import Booking , BookingStatus



from sqlalchemy.orm import Session 
from sqlalchemy import func , case

def users_statistics_service( current_user:User ,  db: Session ):
    # func.count -> to calculate the number of users in the db 
    # scalar return one number instead of list of values 
    # or 0 as a default value 

    if current_user is None :
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail="Please login first"
        )

    if current_user.role is not UserRole.SUPER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail = "This access require only the admin"
        )

    

    total_users = db.query(func.count(User.id)).scalar() or 0

    role_counts = (
        db.query(
            User.role , func.count(User.id) 
        ).group_by(User.role).all()
    )

    users_by_role = {
        role.value: count 
        for role , count in role_counts
    }

    active_users = (
        db.query(func.count(User.id))
        .filter(User.is_active.is_(True))
        .scalar() 
        or 0 
    )

    inactive_users = total_users - active_users

    return { 
        "total_users": total_users,
        "staff": users_by_role.get(UserRole.STAFF.value, 0),
        "customers": users_by_role.get(UserRole.CUSTOMER.value, 0),
        "super_admins": users_by_role.get(
            UserRole.SUPER_ADMIN.value, 0
        ),
        "active_users": active_users,
        "inactive_users": inactive_users,
    }

def service_statistics_service(current_user:User ,db: Session):
    if current_user is None :
            raise HTTPException(
                status_code= status.HTTP_401_UNAUTHORIZED,
                detail="Please login first"
            )
    
    if current_user.role is not UserRole.SUPER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail = "This access require only the admin"
        )
    total_services = db.query(func.count(Service.id)).scalar() or 0 

    active_services = db.query(
        func.count((Service.id))
    ).filter(Service.is_active.is_(True)).scalar() or 0 

    inactive_services = total_services - active_services 

    total_requests = db.query((RequestService.id)).scalar() or 0 

    request_results = (
        db.query(
            RequestService.status , 
            func.count(RequestService.id) , 
        ).group_by(RequestService.status).all()
    )

    request_by_status ={
        "pending": 0,
        "approved": 0,
        "rejected": 0,
        "in_progress": 0,
        "completed": 0,
        "cancelled": 0,   
    }

    for request_status  ,count in request_results :
        status_value = getattr(
            request_status , "value" , request_status
        )
        request_by_status[str(status_value)] = count 

    most_requested_result = (
        db.query(
            Service.id , Service.name , func.count(RequestService.id).label("request_count"), 
        ).outerjoin(
            RequestService , RequestService.service_id == Service.id,
        ).group_by(
            Service.id , Service.name
        )
        .order_by(
            func.count(RequestService.id).desc()
            , Service.name.asc()
        ).first()
    )

    most_requested_service = None 

    if (
        most_requested_result is not None and most_requested_result.request_count > 0
    ):
         most_requested_service = {
            "id": most_requested_result.id,
            "name": most_requested_result.name,
            "request_count": most_requested_result.request_count,
        }
    return {
        "total_services": total_services,
        "active_services": active_services,
        "inactive_services": inactive_services,
        "total_requests": total_requests,
        "requests_by_status": request_by_status,
        "most_requested_service": most_requested_service,
    }


def staff_leaderboard_service( current_user: User , db:Session ):
    pass 

def customer_leaderboard():
    pass 

def tour_statistics():
    pass 

def booking_statistics():
    pass 

