import uuid 
from pathlib import Path 
from fastapi import HTTPException , UploadFile , status

# this is the place we will save the uploads in it to live in the server 
UPLOAD_DIR = Path('uploads/tours')
# here we tell if we don't have the dir please make it 
UPLOAD_DIR.mkdir(parents=True , exist_ok=True)

# the allowed types we will use them and make the user upload 
ALLOWED_TYPES= {
    "image/jpeg",
    "image/png",
    "image/webp",
}
# max size of our cover  = 5MB
MAX_FILE_SIZE = 5 * 1024 * 1024


async def save_upload_file(file:UploadFile):
    if file.content_type not in ALLOWED_TYPES :
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail= "Only JPEG, PNG, and WEBP images are allowed"
        )

    content =  await file.read()
    if len(content) > MAX_FILE_SIZE :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image size must be less than 5 MB"
        ) 

    # uuid make a long string to solve the problem of the duplicates in the names 
    extension = Path(file.filename).suffix.lower()
    filename = f"{uuid.uuid4()}{extension}"

    # now to save the file 
    file_path = UPLOAD_DIR / filename 
    with file_path.open("wb") as buffer :
        buffer.write(content)

    return f"/uploads/tours/{filename}"
    

"""
    UploadFile
    │
    ▼
Check content type
    │
    ├── invalid → HTTP 400
    │
    ▼
Read file
    │
    ▼
Check size
    │
    ├── > 5MB → HTTP 400
    │
    ▼
Generate UUID
    │
    ▼
Create file path
    │
    ▼
Write bytes to disk
    │
    ▼
Return URL
"""