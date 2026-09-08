from sqlalchemy.orm import Session 
from app.models.contactInquery import ContactInquiry 
from app.schemas.contactInquires import ContactInquiryCreate 

def create_contact_inquires(db:Session , inquiry:ContactInquiryCreate):
    new_inquiry = ContactInquiry(
        name=inquiry.name , 
        email=inquiry.email,
        subject=inquiry.subject,
        message=inquiry.message
    )
    db.add(new_inquiry)
    db.commit()
    db.refresh(new_inquiry)

    return new_inquiry
