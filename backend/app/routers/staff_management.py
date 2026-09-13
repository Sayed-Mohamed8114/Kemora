from fastapi import status , APIRouter , Depends ,HTTPException
from app.schemas.user import UserResponse , StaffCreate ,StaffUpdate
from sqlalchemy.orm import Session 
from app.database.db import get_db 
from app.helpers.require_super_admin import is_super_admin
from app.services.staff import create_staff_service,edit_staff_service,delete_staff_service ,get_all_staff_service,get_staff_by_name

router = APIRouter(
    prefix="/staff_management",
    tags=["staff_management"]
)

@router.post("/",response_model=UserResponse,status_code=status.HTTP_201_CREATED)
def create_staff(
    data:StaffCreate ,current_user=Depends(is_super_admin),db: Session=Depends(get_db)
):
    new_staff = create_staff_service(db=db,staff=data)
    return new_staff

@router.patch("/{user_id}" , response_model=UserResponse , status_code=status.HTTP_200_OK)
def edit_staff(
    user_id:int,data:StaffUpdate, 
    current_user=Depends(is_super_admin), db: Session=Depends(get_db),
):
    edited_staff=edit_staff_service(db=db,user_id=user_id ,data=data)
    if edited_staff is None:
        raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Staff not found"
    )
    return edited_staff

@router.delete("/{user_id}" ,response_model=UserResponse , status_code=status.HTTP_200_OK)
def delete_staff(
    user_id:int, current_user=Depends(is_super_admin),db: Session=Depends(get_db)
):
    deleted_staff = delete_staff_service(db=db , user_id=user_id)
    if deleted_staff is None:
        raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Staff not found"
        )
    return deleted_staff


@router.get("/",response_model=list[UserResponse],status_code=status.HTTP_200_OK)
def get_all_staff(
    db: Session = Depends(get_db) , current_user = Depends(is_super_admin)
):
    return get_all_staff_service(db=db)
      

@router.get("/{name}",response_model=UserResponse,status_code=status.HTTP_200_OK)
def get_staff_with_name(
    name:str,
    db: Session=Depends(get_db),current_user=Depends(is_super_admin) 
):
    user = get_staff_by_name(name=name,db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="staff not found"
        )
    return user
