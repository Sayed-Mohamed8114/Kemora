from pydantic import BaseModel , ConfigDict 
from app.models.request_service import ServiceRequestStatus
from datetime import datetime 

class ServiceRequestCreate(BaseModel):
    service_id:int 
    note:str | None = None

class ServiceRequestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int 
    service_id:int 
    customer_id:int
    assigned_staff_id:int | None = None
    note:str | None
    status:ServiceRequestStatus
    requested_at: datetime
    approved_at: datetime | None = None
    completed_at: datetime | None = None
    
class AssignStaffRequest(BaseModel):
    staff_id:int