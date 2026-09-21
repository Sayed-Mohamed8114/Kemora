from sqlalchemy.orm import Session
from app.models.servcies import Service
from app.models.user import User
from app.schemas.services import CreateService, ServiceUpdate


def get_all_services_service(db: Session):
    return db.query(Service).all()


def create_service_service(
    service_data: CreateService,
    current_user: User,
    db: Session
):
    service = Service(
        name=service_data.name,
        description=service_data.description,
        price=service_data.price,
        created_by=current_user.id,
    )

    db.add(service)
    db.commit()
    db.refresh(service)

    return service


def get_service_by_name_service(
    name: str,
    db: Session
):
    return db.query(Service).filter(
        Service.name == name
    ).first()


def edit_service_service(
    db: Session,
    data: ServiceUpdate,
    service_id: int
):
    service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if service is None:
        return None

    if data.name is not None:
        service.name = data.name

    if data.description is not None:
        service.description = data.description

    if data.price is not None:
        service.price = data.price

    if data.is_active is not None:
        service.is_active = data.is_active

    db.commit()
    db.refresh(service)

    return service


def delete_service_service(
    service_id: int,
    db: Session
):
    service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if service is None:
        return None

    db.delete(service)
    db.commit()

    return service