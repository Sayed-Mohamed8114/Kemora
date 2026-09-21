from fastapi import APIRouter , status , HTTPException , Depends
from app.schemas.services import ServiceResponse , CreateService , ServiceUpdate
from app.services.services import create_service_service ,edit_service_service , delete_service_service , get_all_services_service , get_service_by_name_service 
from app.helpers.require_super_admin import is_super_admin 
from app.helpers.get_current_user import get_current_user
from app.database.db import get_db 
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/services",
    tags=["services"]
)

@router.post("/", response_model=ServiceResponse , status_code=status.HTTP_201_CREATED)
def create_service(data:CreateService , db:Session = Depends(get_db),current_user = Depends(is_super_admin)):
    service = create_service_service(service_data=data,current_user=current_user , db=db)
    return service

@router.get("/" , response_model=list[ServiceResponse] , status_code=status.HTTP_200_OK)
def get_all_services(
    db: Session = Depends(get_db)
):
    return get_all_services_service(db=db)

@router.delete("/{service_id}",status_code=status.HTTP_200_OK)
def delete_service(
    service_id:int , db: Session=Depends(get_db) , current_user=Depends(is_super_admin)
):
    return delete_service_service(service_id=service_id , db=db) 

@router.get("/name/{name}" , response_model=ServiceResponse , status_code=status.HTTP_200_OK)
def get_service_by_name(
    name:str , db: Session = Depends(get_db)
):
    return get_service_by_name_service(name=name,db=db)

@router.patch("/{service_id}" , response_model=ServiceResponse , status_code=status.HTTP_200_OK)
def edit_service(
    service_id:int , data:ServiceUpdate , 
    current_user = Depends(is_super_admin), 
    db: Session = Depends(get_db)
):
    service = edit_service_service(db=db,data=data,service_id=service_id)
    return service