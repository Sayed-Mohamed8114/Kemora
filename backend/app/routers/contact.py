from fastapi import APIRouter , Depends , status 
from app.database.db import get_db 
from app.schemas.contactInquires import ContactInquiryCreate,ContactInquiryCreateResponse , ContactInquiryResponse
from app.services.contact import create_contact_inquires_service , get_all_contact_inquires_service,delete_contact_inquires_service
from sqlalchemy.orm import Session
from app.helpers.require_super_admin import is_super_admin

router = APIRouter(
    prefix="/api/contact-inquiries",
    tags=["contactUs"]
)

@router.post("/",response_model=ContactInquiryCreateResponse,status_code=status.HTTP_201_CREATED)
def create_inquiry(
    inquiry:ContactInquiryCreate,
    db:Session = Depends(get_db)
):
    new_inquiry = create_contact_inquires_service(
        db=db , inquiry=inquiry
    )

    return {
        "message": "Your feedback has been submitted successfully",
        "data": {
            "id": new_inquiry.id,
            "name": new_inquiry.name,
            "email": new_inquiry.email,
            "subject": new_inquiry.subject,
            "message": new_inquiry.message
        }
    }

@router.get("/",response_model=list[ContactInquiryResponse],status_code = status.HTTP_200_OK)
def get_all_inquires(
    db: Session = Depends(get_db),
    current_user = Depends(is_super_admin),
):
    return get_all_contact_inquires_service(db)

@router.delete("/{inquiry_id}" , response_model=ContactInquiryResponse , status_code=status.HTTP_200_OK)
def delete_contact_inquiry(inquiry_id:int , current_user = Depends(is_super_admin),db: Session=Depends(get_db)):
    return delete_contact_inquires_service(db=db , inquiry_id=inquiry_id)

    