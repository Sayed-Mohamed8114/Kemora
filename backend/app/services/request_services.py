from app.models.user import User, UserRole
from app.models.services import Service
from app.models.request_service import RequestService, ServiceRequestStatus
from fastapi import HTTPException , status

from datetime import datetime , timezone

from app.schemas.request_service import ServiceRequestCreate

from sqlalchemy.orm import Session , joinedload


# Customers

def request_service_service(
    db: Session,
    data: ServiceRequestCreate,
    user: User
):
    service = db.query(Service).filter(
        Service.id == data.service_id,
        Service.is_active.is_(True)
    ).first()

    if service is None:
        raise HTTPException(
            status_code=404,
            detail="Service not found or inactive"
        )

    request = RequestService(
        service_id=data.service_id,
        customer_id=user.id,
        note=data.note,
        status=ServiceRequestStatus.PENDING
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    return request


# Admins

def get_all_services_requests_service(db: Session):
    requests = ( db.query(RequestService).options(
        joinedload(RequestService.service),
        joinedload(RequestService.customer),
        joinedload(RequestService.assigned_staff)
    ).all()
    )
    return [
        {
            "id": request.id,
            "service_id": request.service_id,
            "service_name": request.service.name,
            "customer_id": request.customer_id,
            "customer_name": request.customer.name,
            "assigned_staff_id": request.assigned_staff_id,
            "staff_name": (
                request.assigned_staff.name
                if request.assigned_staff
                else None
            ),
            "note": request.note,
            "status": request.status,
            "requested_at": request.requested_at,
            "approved_at": request.approved_at,
            "completed_at": request.completed_at,
        }
        for request in requests
    ]


def get_service_request_by_id_service(
    db: Session,
    request_id: int
):
    request = db.query(RequestService).filter(
        RequestService.id == request_id
    ).first()

    return request


def approve_request_service(
    db: Session,
    request_id: int
):
    request = db.query(RequestService).filter(
        RequestService.id == request_id
    ).first()

    if request is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service request not found"
            )
    
    if request.status != ServiceRequestStatus.PENDING:
        raise HTTPException(
            status_code = status.HTTP_406_NOT_ACCEPTABLE,
            detail = "you can only accept the request if it's pending "
        )

    request.status = ServiceRequestStatus.APPROVED
    request.approved_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(request)

    return request


def reject_request_service(
    db: Session,
    request_id: int
):
    request = db.query(RequestService).filter(
        RequestService.id == request_id
    ).first()

    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service request not found"
        )

    if request.status != ServiceRequestStatus.PENDING:
        raise HTTPException(
            status_code = status.HTTP_406_NOT_ACCEPTABLE,
            detail = "you can only reject the request if it's pending "
        )

    request.status = ServiceRequestStatus.REJECTED

    db.commit()
    db.refresh(request)

    return request


def assign_request_to_staff_service(
    db: Session,
    staff_id: int,
    request_id: int
):
    staff = db.query(User).filter(
        User.id == staff_id,
        User.role == UserRole.STAFF
    ).first()

    if staff is None:
        return None

    request = db.query(RequestService).filter(
        RequestService.id == request_id
    ).first()

    if request is None:
        return None

    if request.status != ServiceRequestStatus.APPROVED:
        return None

    request.assigned_staff_id = staff.id

    db.commit()
    db.refresh(request)

    return request


# Staff

def get_assigned_requests_service(
    db: Session,
    staff_id: int
):
    staff = db.query(User).filter(
        User.id == staff_id,
        User.role == UserRole.STAFF
    ).first()

    if staff is None:
        return None

    requests = db.query(RequestService).filter(
        RequestService.assigned_staff_id == staff_id
    ).all()

    return requests


def start_request_service(
    db: Session,
    request_id: int,
    staff_id: int
):
    request = db.query(RequestService).filter(
        RequestService.id == request_id
    ).first()

    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service request not found"
        )

    if request.assigned_staff_id != staff_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not assigned to this request"
        )

    if request.status != ServiceRequestStatus.APPROVED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only approved requests can be started"
        )

    request.status = ServiceRequestStatus.IN_PROGRESS

    db.commit()
    db.refresh(request)

    return request


def complete_request_service(
    db: Session,
    request_id: int,
    staff_id: int
):
    request = db.query(RequestService).filter(
        RequestService.id == request_id
    ).first()

    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service request not found"
        )

    if request.assigned_staff_id != staff_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not assigned to this request"
        )

    if request.status != ServiceRequestStatus.IN_PROGRESS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only approved requests can be started"
        )

    request.status = ServiceRequestStatus.COMPLETED
    request.completed_at = datetime.utcnow

    db.commit()
    db.refresh(request)

    return request