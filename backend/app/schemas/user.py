from pydantic import BaseModel,Field ,EmailStr , ConfigDict

class UserCreate(BaseModel):
    name:str = Field(min_length=5,max_length=50)
    email:EmailStr
    password:str = Field(min_length=5 , max_length=50)

class UserResponse(BaseModel):
    id:int 
    name:str
    email:EmailStr
    model_config = ConfigDict(from_attributes=True)

class UserLogin(BaseModel):
    email:EmailStr
    password:str