from sqlalchemy.orm import Session 
from app.models.contactInquery import ContactInquiry 
from app.schemas.contactInquires import ContactInquiryCreate 

def create_contact_inquires_service(db:Session , inquiry:ContactInquiryCreate):
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

def get_all_contact_inquires_service(db: Session):
    return db.query(ContactInquiry).all()

def delete_contact_inquires_service(db:Session,inquiry_id:int):
    inquiry  =db.query(ContactInquiry).filter(
        ContactInquiry.id == inquiry_id
    ).first()
    if inquiry is None:
        return None 
    db.delete(inquiry)
    db.commit()
    return inquiry
