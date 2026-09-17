from fastapi import Depends , status , APIRouter 
from app.helpers.get_current_user import get_current_user 
from app.services.userProfile import update_profile_service 
from app.database.db import get_db 
from sqlalchemy.orm import Session 
from app.schemas.user import UserResponse, UserUpdate
from app.models.user import User


router = APIRouter(
    prefix="/updateProfile",
    tags=["UpdateProfile"]
)

@router.patch("/me" , response_model=UserResponse , status_code=status.HTTP_200_OK)
def update_profile(
    user_data : UserUpdate ,
    current_user:User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = update_profile_service(user_data=user_data , current_user=current_user,db=db)
    return user