from app.models.base import Base
from sqlalchemy import String , TEXT , Boolean , DateTime , Numeric ,ForeignKey
from sqlalchemy.orm import  Mapped , mapped_column ,relationship
from decimal import Decimal
from datetime import datetime 

from typing import TYPE_CHECKING 
if TYPE_CHECKING:
    from app.models.user import User

class Service(Base):
    __tablename__ = "services"

    id : Mapped[int] = mapped_column(
        primary_key=True
    )

    name : Mapped[str] = mapped_column(
        String(255),
        nullable=False 
    )

    description : Mapped[str] = mapped_column(
        TEXT,
        nullable=False
    )

    price : Mapped[Decimal] = mapped_column(
        Numeric(10,2) , 
        nullable=False 
    ) 

    is_active : Mapped[bool] = mapped_column(
        Boolean ,
        nullable=False ,
        default=True 
    )

    created_at : Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False, 
        default= datetime.utcnow 
    )

    updated_at : Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    created_by : Mapped[int] = mapped_column(
        ForeignKey("users.id"), 
        nullable=False 
    )

    creator : Mapped["User"] = relationship(
        "User" , 
        back_populates="services",
        foreign_keys=[created_by]
    )

    service_requests = relationship(
        "RequestService" , 
        back_populates="service"
    )