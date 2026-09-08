from pydantic import EmailStr , Field ,BaseModel
# base model is responsible about the data that coming from the api 
class ContactInquiryCreate(BaseModel):
    name:str = Field(min_length=5 , max_length=100)
    email:EmailStr 
    subject:str = Field(min_length=5,max_length=255)
    message:str = Field(min_length=5)



class ContactInquiryCreateResponse(BaseModel):
    message:str 
    data:ContactInquiryCreate