from app.models.base import Base 
from sqlalchemy import String ,Text 
from sqlalchemy.orm import Mapped,mapped_column

class ContactInquiry(Base):
    __tablename__= "contact_inquiry"

    id:Mapped[int]=mapped_column(primary_key=True,index=True)
    name:Mapped[str]=mapped_column(String(100),nullable=False)
    email:Mapped[str]=mapped_column(String(255),nullable=False)
    subject:Mapped[str]=mapped_column(String(255),nullable=False)
    message:Mapped[str]= mapped_column(Text,nullable=False)