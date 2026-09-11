from sqlalchemy.orm import Session 
from app.models.user import User
from app.core.security import verify_password 

def find_user(email:str,password:str,db:Session):
    user = db.query(User).filter(
        User.email == email 
    ).first() 
    if not user :
        return None 
    correct_pass = verify_password(
        password,user.password_hash
    )

    if not correct_pass:
        return None 

    return user