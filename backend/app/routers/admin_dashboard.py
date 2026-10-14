from fastapi import Depends , HTTPException , status , APIRouter

from app.models.user import User , UserRole 
from app.helpers.get_current_user import get_current_user 
from app.services.admin_dashboard import users_statistics_service , service_statistics_service
from app.database.db import get_db

from sqlalchemy.orm import Session 

router = APIRouter(
    prefix="/admin_dashboard",
    tags=["admin_dashboard"]
)

@router.get(
    "/users" , status_code=status.HTTP_200_OK
)
def users_statistics(
    current_user:User = Depends(get_current_user) , 
    db: Session = Depends(get_db)
):
    return users_statistics_service(current_user=current_user , db = db )

@router.get(
    "/services" , status_code=status.HTTP_200_OK
)
def services_statistics(
    current_user:User = Depends(get_current_user) , 
    db: Session = Depends(get_db)
):
    return service_statistics_service(current_user=current_user , db = db )
 