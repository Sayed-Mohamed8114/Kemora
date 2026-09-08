from fastapi import FastAPI 
from app.database.db import engine

app = FastAPI()
@app.get("/")
async def home():
    try:
        with engine.connect() as connection:
            return "connected successfully"
    except Exception as e :
        return {"error":str(e)}