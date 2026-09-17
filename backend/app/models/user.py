from enum import Enum
from datetime import datetime
from sqlalchemy import String, Boolean, Enum as SQLenum, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.booking import Booking

from typing import TYPE_CHECKING 
if TYPE_CHECKING:
    from app.models.tour import Tour
    from app.models.booking import Booking


class UserRole(str, Enum):
    SUPER_ADMIN = "super_admin"
    STAFF = "staff"
    CUSTOMER = "customer"

class UserGender(str , Enum):
    MALE="male"
    FEMALE="female"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
        index=True
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    role: Mapped[UserRole] = mapped_column(
        SQLenum(
            UserRole,
            values_callable=lambda enum_class: [
                member.value for member in enum_class
            ]
        ),
        nullable=False
    )

    gender : Mapped[UserGender|None] = mapped_column(
        SQLenum(
            UserGender,
            values_callable = lambda enum_class:[
                gender.value for gender in enum_class 
            ]
        ) , 
        nullable=True
    )

    phone : Mapped[str|None] = mapped_column(
        String(255) , nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
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

    created_tours: Mapped[list["Tour"]] = relationship(
        back_populates="creator"
    )

    bookings: Mapped[list["Booking"]] = relationship(
    back_populates="customer"
    )