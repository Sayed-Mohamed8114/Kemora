from app.models.base import Base
from sqlalchemy.orm import Mapped , mapped_column   , relationship 
from datetime import datetime  , date , time
from sqlalchemy import DateTime , Date, Time , ForeignKey, Enum as SQLenum
from app.models.tour import Tour

from enum import Enum
from app.models.booking import Booking

class ScheduleStatus(str,Enum):
    AVAILABLE= "available"
    FULL = "full"
    CANCELLED = "cancelled"
    COMPLETED = "completed"


class TourSchedule(Base):
    __tablename__ = "tour_schedule"
    id:Mapped[int] = mapped_column(primary_key=True)
    start_date:Mapped[date] = mapped_column(Date,nullable=False)
    start_time:Mapped[time] = mapped_column(Time , nullable=False)
    capacity:Mapped[int] = mapped_column(nullable=False)
    status:Mapped[ScheduleStatus] = mapped_column(SQLenum(ScheduleStatus , values_callable=lambda enum_class: [
                    schedule.value for schedule in enum_class
                ]) , nullable=False)
    
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
    tour: Mapped["Tour"] = relationship(
        back_populates="tour_schedule" 
    )

    tour_id : Mapped[int] = mapped_column(
        ForeignKey("tours.id") ,
        nullable=False
    )

    bookings: Mapped[list["Booking"]] = relationship(
    back_populates="tour_schedule"
    )
    