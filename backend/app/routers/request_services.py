from fastapi import APIRouter, status, Depends

from app.helpers.get_current_user import get_current_user
from app.helpers.require_super_admin import is_super_admin

from app.database.db import get_db

from sqlalchemy.orm import Session

from app.schemas.request_service import (
    ServiceRequestCreate,
    ServiceRequestResponse,
    AssignStaffRequest
)

from app.services.request_services import (
    request_service_service,
    get_all_service_requests_service,
    get_service_request_by_id_service,
    approve_request_service,
    reject_request_service,
    assign_request_to_staff_service,
    get_assigned_requests_service,
    start_request_service,
    complete_request_service
)


router = APIRouter(
    prefix="/request_service",
    tags=["request_service"]
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=ServiceRequestResponse
)
def request_service(
    data: ServiceRequestCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return request_service_service(
        db=db,
        data=data,
        user=user
    )




@router.get(
    "/all",
    status_code=status.HTTP_200_OK,
    response_model=list[ServiceRequestResponse]
)
def get_all_services_requests(
    db: Session = Depends(get_db),
    current_user=Depends(is_super_admin)
):
    return get_all_service_requests_service(
        db=db
    )


@router.get(
    "/{request_id}",
    status_code=status.HTTP_200_OK,
    response_model=ServiceRequestResponse
)
def get_service_request_by_id(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(is_super_admin)
):
    return get_service_request_by_id_service(
        db=db,
        request_id=request_id
    )


@router.patch(
    "/approve/{request_id}",
    status_code=status.HTTP_200_OK,
    response_model=ServiceRequestResponse
)
def approve_service_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(is_super_admin)
):
    return approve_request_service(
        db=db,
        request_id=request_id
    )


@router.patch(
    "/reject/{request_id}",
    status_code=status.HTTP_200_OK,
    response_model=ServiceRequestResponse
)
def reject_service_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(is_super_admin)
):
    return reject_request_service(
        db=db,
        request_id=request_id
    )


@router.patch(
    "/assign/{request_id}",
    status_code=status.HTTP_200_OK,
    response_model=ServiceRequestResponse
)
def assign_request_to_staff(
    request_id: int,
    data: AssignStaffRequest,
    db: Session = Depends(get_db),
    current_user=Depends(is_super_admin)
):
    return assign_request_to_staff_service(
        db=db,
        staff_id=data.staff_id,
        request_id=request_id
    )



@router.get(
    "/staff/my",
    status_code=status.HTTP_200_OK,
    response_model=list[ServiceRequestResponse]
)
def get_my_assigned_requests(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_assigned_requests_service(
        db=db,
        staff_id=current_user.id
    )


@router.patch(
    "/staff/start/{request_id}",
    status_code=status.HTTP_200_OK,
    response_model=ServiceRequestResponse
)
def start_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return start_request_service(
        db=db,
        request_id=request_id,
        staff_id=current_user.id
    )


@router.patch(
    "/staff/complete/{request_id}",
    status_code=status.HTTP_200_OK,
    response_model=ServiceRequestResponse
)
def complete_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return complete_request_service(
        db=db,
        request_id=request_id,
        staff_id=current_user.id
    )