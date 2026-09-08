from fastapi import FastAPI ,HTTPException ,Request
from app.routers.contact import router as contact_router
from fastapi.responses import JSONResponse 
from fastapi.exceptions import RequestValidationError 

app = FastAPI()

@app.exception_handler(HTTPException)
async def http_exception_handler(
    request : Request , 
    exc:HTTPException
):
    return JSONResponse(
        status_code=exc.status_code ,
        content={
            "success":False,
            "message":exc.detail
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request , 
    exc : RequestValidationError
):
    return JSONResponse(
        status_code=422 ,
        content={
            "success":False,
            "message":"validation error.",
            "error":exc.errors()
        }
    )

@app.exception_handler(Exception)
async def global_exception_handler(request:Request , exc:Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success":False,
            "message" :"something went wrong on the server."
        }
    )

app.include_router(contact_router)