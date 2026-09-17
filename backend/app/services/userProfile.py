from app.models.user import User 
from app.schemas.user import UserUpdate  , ChangePasswordRequest 
from sqlalchemy.orm import Session 
from fastapi import HTTPException , status

def update_profile_service(
    user_data: UserUpdate,
    current_user: User,
    db: Session
):
    if user_data.email is not None:
        existing_email = (
            db.query(User)
            .filter(
                User.email == user_data.email,
                User.id != current_user.id
            )
            .first()
        )

        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email is already registered",
            )

        current_user.email = user_data.email

    if user_data.name is not None:
        current_user.name = user_data.name

    if user_data.phone is not None :
        current_user.phone = user_data.phone 

    if user_data.gender is not None :
        current_user.gender = user_data.gender

    db.commit()
    db.refresh(current_user)

    return current_user
    
def update_password(current_user:User , user_data:ChangePasswordRequest , db: Session):
    pass