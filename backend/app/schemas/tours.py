from pydantic import BaseModel , ConfigDict , Field

from app.models.tour import TourStatus
from app.schemas.user import UserResponse

from decimal import Decimal
from datetime import datetime

class CreateTourRequest(BaseModel):

    title:str 
    description:str 
    location:str 
    duration:str 
    price:Decimal = Field(gt=0)

class UpdateTourRequest(BaseModel):

    title:str | None = None
    description:str | None = None
    location:str | None = None
    duration:str | None = None
    price:Decimal | None  = Field(default=None , gt=0) 

class TourResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    title:str 
    description:str 
    location:str
    duration:str 
    price:Decimal
    status:TourStatus
    created_by:int 
    created_at:datetime
    updated_at:datetime 
    creator:UserResponse
    image_url:str | None

class ChangeTourStatusRequest(BaseModel):
    status: TourStatus