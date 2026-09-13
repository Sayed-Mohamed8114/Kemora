from fastapi import HTTPException,status,Depends
from app.models.user import UserRole
from app.helpers.get_current_user import get_current_user
def is_super_admin(current_user=Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="super admin access require"
        )
    return current_user