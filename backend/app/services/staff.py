from sqlalchemy.orm import Session
from app.schemas.user import StaffCreate
from app.models.user import User , UserRole
from app.core.security import password_hash
from fastapi import HTTPException , status

def create_staff_service(db: Session , staff:StaffCreate):
    existing_user = db.query(User).filter(
        staff.email == User.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail= "Email is already registered"
        )
    hashed_password = password_hash.hash(staff.password)
    new_staff = User(
        name=staff.name,
        email=staff.email,
        password_hash=hashed_password,
        role=UserRole.STAFF,
        is_active=True
        )
    db.add(new_staff)
    db.commit()
    db.refresh(new_staff)
    return new_staff
    