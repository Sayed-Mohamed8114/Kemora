from pydantic import BaseModel,Field ,EmailStr , ConfigDict
from app.models.user import UserRole , UserGender

class UserResponse(BaseModel):
    id:int 
    name:str
    email:EmailStr
    role:UserRole
    is_active : bool
    gender:UserGender 
    phone:str
    model_config = ConfigDict(from_attributes=True)

class UserLogin(BaseModel):
    email:EmailStr
    password:str

class TokenResponse(BaseModel):
    access_token:str 
    token_type:str
    user:UserResponse

class StaffCreate(BaseModel):
    name:str = Field(min_length=5,max_length=50)
    email:EmailStr
    password:str = Field(min_length=5 , max_length=50)

class StaffUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=5, max_length=50)
    email: EmailStr | None = None
    is_active:bool | None = None

class CustomerCreate(BaseModel):
    name:str = Field(min_length=5, max_length=50)
    email:EmailStr
    password:str = Field(min_length=5, max_length=50)

class CustomerResponse(BaseModel):
    id:int 
    name:str 
    email:EmailStr
    is_active:bool 
    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    name:str | None  = Field(default=None , min_length=5 , max_length=50)
    email:EmailStr | None =None
    gender: UserGender | None=None 
    phone:str | None=None  

class ChangePasswordRequest(BaseModel):
    current_password:str 
    new_password:str = Field(min_length=8 , max_length=50)
