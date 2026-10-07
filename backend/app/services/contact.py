from sqlalchemy.orm import Session 
from app.models.contactInquery import ContactInquiry 
from app.schemas.contactInquires import ContactInquiryCreate 
from app.models.user import User , UserRole
from fastapi import HTTPException , status

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

def get_all_contact_inquires_service(db: Session , current_user :User):
    if current_user is None :
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail= "please login first to access and manage inquiries"
        )

    if current_user.role == UserRole.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="you can see your own inquiries only"
        )
    
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

def get_my_inquires_service(db: Session , current_user:User):
    if current_user is None :
        raise HTTPException (
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail= "Please login first"
        )
    customer_email = current_user.email
    inquires = db.query(ContactInquiry).filter(
        ContactInquiry.email == customer_email
    ).all()

    return inquires

    
