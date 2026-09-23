from app.models.user import User , UserRole 
from app.models.services import Service 
from app.models.request_service import RequestService , ServiceRequestStatus

from app.schemas.request_service import ServiceRequestCreate , AssignStaffRequest 

from sqlalchemy.orm import Session 

# for customers 
def request_service_service():
    pass

# for admins 
def get_all_service_requests_service():
    pass 

def get_service_request_by_id_service():
    pass 

def approve_request_service():
    pass

def reject_request_service():
    pass 

def assign_request_to_staff_service():
    pass

# for staff 
def get_assigned_requests_service():
    pass 

def start_request_service():
    pass 

def complete_request_service():
    pass 
