from app.models.base import Base 
from sqlalchemy.orm import Mapped , mapped_column
from sqlalchemy import String ,Boolean , Enum as SQLenum , DateTime
from enum import Enum 
from datetime import datetime

class UserRole(str,Enum):
    SUPER_ADMIN="super_admin" 
    STAFF="staff" 


class User(Base):
    __tablename__="users"
    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str]= mapped_column(String(50),nullable=False)
    email:Mapped[str] = mapped_column(String(255),nullable=False , unique=True, index=True)
    password_hash:Mapped[str] = mapped_column(String(255) , nullable=False)
    role: Mapped[UserRole] = mapped_column(SQLenum(UserRole,values_callable=lambda enum_class:[member.value for member in enum_class] ),nullable=False)
    is_active:Mapped[bool] = mapped_column(Boolean,default=True,nullable=False)
    created_at :Mapped[datetime] = mapped_column(DateTime,default=datetime.utcnow,nullable=False)
    updated_at:Mapped[datetime] = mapped_column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow,nullable=False)

