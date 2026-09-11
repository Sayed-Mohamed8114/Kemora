from pydantic import BaseModel,Field ,EmailStr , ConfigDict
from app.models.user import UserRole

class UserCreate(BaseModel):
    name:str = Field(min_length=5,max_length=50)
    email:EmailStr
    password:str = Field(min_length=5 , max_length=50)

class UserResponse(BaseModel):
    id:int 
    name:str
    email:EmailStr
    role:UserRole
    is_active : bool
    model_config = ConfigDict(from_attributes=True)

class UserLogin(BaseModel):
    email:EmailStr
    password:str

class TokenResponse(BaseModel):
    access_token:str 
    token_type:str
    user:UserResponse