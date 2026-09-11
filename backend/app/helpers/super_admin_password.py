from app.core.security import hash_password 
from app.core.config import settings 

hashed_password = hash_password(settings.SUPER_ADMIN_PASSWORD) 

