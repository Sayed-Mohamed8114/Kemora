from pydantic import BaseModel , Field , ConfigDict 
from decimal import Decimal
from datetime import datetime


class CreateService(BaseModel):
    name:str 
    description:str 
    price:Decimal 

class ServiceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    name:str 
    description:str 
    price:Decimal 
    is_active:bool 
    created_at:datetime 
    updated_at:datetime 
    created_by:int

class ServiceUpdate(BaseModel):
    name:str | None = None
    description:str | None = None
    price:Decimal  | None = None
    is_active:bool | None = None
     

    