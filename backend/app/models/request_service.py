from app.models.base import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Enum as SQLenum, ForeignKey, DateTime 

from enum import Enum
from datetime import datetime


class ServiceRequestStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class RequestService(Base):
    __tablename__ = "request_service"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    note: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    customer_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    service_id: Mapped[int] = mapped_column(
        ForeignKey("services.id"),
        nullable=False
    )

    assigned_staff_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True
    )

    status: Mapped[ServiceRequestStatus] = mapped_column(
        SQLenum(
            ServiceRequestStatus,
            values_callable=lambda enum_class: [
                status.value for status in enum_class
            ]
        ),
        default=ServiceRequestStatus.PENDING,
        nullable=False
    )

    requested_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    approved_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )

    customer = relationship(
        "User" , 
        foreign_keys=[customer_id] , 
        back_populates="customer_requests"
    )

    assigned_staff = relationship(
        "User" , 
        foreign_keys=[assigned_staff_id],
        back_populates="assigned_requests"
    )

    service = relationship(
        "Service" , 
        back_populates="service_requests"
    )