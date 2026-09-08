from fastapi import APIRouter , Depends , HTTPException , status 
from app.database.db import get_db 
from app.schemas.contactInquires import ContactInquiryCreate,ContactInquiryCreateResponse
from app.services.contact import create_contact_inquires
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/api/contact-inquiries",
    tags=["contactUs"]
)

@router.post("/",response_model=ContactInquiryCreateResponse,status_code=status.HTTP_201_CREATED)
def create_inquiry(
    inquiry:ContactInquiryCreate,
    db:Session = Depends(get_db)
):
    new_inquiry = create_contact_inquires(
        db=db , inquiry=inquiry
    )

    return {
        "message": "Your inquiry has been submitted successfully",
        "data": {
            "id": new_inquiry.id,
            "name": new_inquiry.name,
            "email": new_inquiry.email,
            "subject": new_inquiry.subject,
            "message": new_inquiry.message
        }
    }