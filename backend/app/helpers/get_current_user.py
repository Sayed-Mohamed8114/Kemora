from fastapi.security import HTTPAuthorizationCredentials,HTTPBearer 
from fastapi import HTTPException , status , Depends 
from sqlalchemy.orm import Session
import jwt
from app.core.config import settings
from app.database.db import get_db
from app.models.user import User

bearer_schema = HTTPBearer()

def get_current_user(credentials:HTTPAuthorizationCredentials =Depends(bearer_schema), db:Session=Depends(get_db)):
    token = credentials.credentials
    payload = jwt.decode(
        token, 
        settings.JWT_SECRET_KEY,
        algorithms=settings.JWT_ALGORITHM
    )

    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token"
        )

    user = db.query(User).filter(
        User.id == int(user_id)
    ).first()
    if user is None :
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user
    

