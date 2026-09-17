from app.models.user import User 
from app.schemas.user import UserUpdate , ChangePasswordRequest 
from sqlalchemy.orm import Session 
from fastapi import HTTPException , status
from app.core.security import password_hash

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
    
def change_password_service(current_user:User , password_data:ChangePasswordRequest , db: Session):
    if not password_hash.verify(
        password_data.current_password , current_user.password_hash
    ):
        raise HTTPException (
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )

    if password_hash.verify(
        password_data.new_password , current_user.password_hash
    ):
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="New password must be different from current password"
        )
    current_user.password_hash = password_hash.hash(
        password_data.new_password
    )

    db.commit()
    return {"message":"Password changed successfully"}
