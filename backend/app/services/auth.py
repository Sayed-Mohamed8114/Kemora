from sqlalchemy.orm import Session 
from app.models.user import User
from app.core.security import verify_password  , password_hash
from app.schemas.user import CustomerCreate
from fastapi import HTTPException ,status
from app.models.user import UserRole

def find_user(email:str,password:str,db:Session):
    user = db.query(User).filter(
        User.email == email 
    ).first() 
    if not user :
        return None 
    correct_pass = verify_password(
        password,user.password_hash
    )

    if not correct_pass:
        return None 

    return user

def register_service(user_data:CustomerCreate ,db:Session):
    existing_email = db.query(User).filter(
        User.email == user_data.email 
    ).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already regiestered"
        )
    password_hashed = password_hash.hash(user_data.password) 
    new_user = User(
        name=user_data.name,
        email = user_data.email ,
        password_hash = password_hashed,
        role=UserRole.CUSTOMER,
        is_active = True
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user) 
    return new_user

