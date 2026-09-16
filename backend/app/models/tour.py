from enum import Enum
from datetime import datetime
from decimal import Decimal
from sqlalchemy import (
    String,
    Text,
    ForeignKey,
    Enum as SQLenum,
    DateTime,
    Numeric,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base
from app.models.user import User
from app.models.tour_schedule import TourSchedule
from app.models.booking import Booking

class TourStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class Tour(Base):
    __tablename__ = "tours"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    location: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    duration: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )

    image_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    status: Mapped[TourStatus] = mapped_column(
        SQLenum(
            TourStatus,
            values_callable=lambda enum_class: [
                member.value for member in enum_class
            ]
        ),
        nullable=False,
        default=TourStatus.DRAFT
    )

    created_by: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
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

    creator: Mapped["User"] = relationship(
        back_populates="created_tours"
    )

    tour_schedule:Mapped[list["TourSchedule"]] = relationship(
        back_populates="tour"
    )


'''
now the relation between user and tours is 
1 user created many tours but tour created by one user 
now also we have that the tour have many tour schedules 
'''