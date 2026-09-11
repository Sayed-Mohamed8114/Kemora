from app.services.auth import find_user
from fastapi import status , APIRouter , Depends ,HTTPException
from app.schemas.user import UserResponse , UserLogin , TokenResponse
from sqlalchemy.orm import Session 
from app.database.db import get_db 
from app.core.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/login",response_model=TokenResponse,status_code=status.HTTP_200_OK)
def login(
        credentials: UserLogin,db: Session=Depends(get_db)):
    user = find_user(credentials.email,credentials.password,db)
    if not user: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid email or password"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="your account is inactive"
        )
    access_token = create_access_token({
        "sub":str(user.id),
        "role":user.role.value
    })

    return {
        "access_token":access_token,
        "token_type":"bearer",
        "user":user
    }
