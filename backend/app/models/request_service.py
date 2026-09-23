from app.models.base import Base 
from sqlalchemy.orm import Mapped , mapped_column
from enum import Enum 
from sqlalchemy import String , Enum 

class ServiceRequestStatus(str,Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class RequestService(Base):
    __tablename__ = "request_service"

    id :Mapped[int] = mapped_column(
        primary_key=True
    )

    customer_id : None 
    service_id:None 
    assigned_staff_id:None 
    status:None 
    note:None 
    requested_at:None 
    approved_at:None 
    completed_at:None 


 