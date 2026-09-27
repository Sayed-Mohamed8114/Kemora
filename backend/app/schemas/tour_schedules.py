from pydantic import BaseModel , ConfigDict , Field

from datetime import  date , time , datetime

from app.models.tour_schedule import ScheduleStatus 
from app.schemas.tours import TourResponse

class TourScheduleCreateRequest(BaseModel):
    start_date:date
    start_time:time 
    capacity:int = Field(gt=0)

class UpdateTourScheduleStatus(BaseModel):
    status:ScheduleStatus

class UpdateTourScheduleRequest(BaseModel):
    start_date: date | None = None
    start_time: time | None = None
    capacity: int | None = Field(default=None, gt=0)

class TourScheduleResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:int 
    start_date:date
    start_time:time 
    capacity:int 
    status:ScheduleStatus
    created_at:datetime
    updated_at:datetime
    tour_id:int
    tour:TourResponse


    
