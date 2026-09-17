from enum import Enum
from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    DateTime,
    Text,
    Enum as SQLenum,
    ForeignKey,
    Numeric,
    Integer,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from typing import TYPE_CHECKING 
if TYPE_CHECKING:
    from app.models.user import User 
    from app.models.tour_schedule import TourSchedule




class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    number_of_people: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )

    total_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )

    status: Mapped[BookingStatus] = mapped_column(
        SQLenum(
            BookingStatus,
            values_callable=lambda enum_class: [
                booking.value for booking in enum_class
            ]
        ),
        nullable=False,
        default=BookingStatus.PENDING
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    customer_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    tour_schedule_id: Mapped[int] = mapped_column(
        ForeignKey("tour_schedules.id"),
        nullable=False
    )

    customer: Mapped["User"] = relationship(
        "User",
        back_populates="bookings"
    )

    tour_schedule: Mapped["TourSchedule"] = relationship(
        "TourSchedule",
        back_populates="bookings"
    )

''' the overall relationships between tables 
User 1 ───────< Tour
Tour 1 ───────< TourSchedule
TourSchedule 1 ───────< Booking
User(Customer) 1 ───────< Booking
'''