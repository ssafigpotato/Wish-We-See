from fastapi import FastAPI
from app.api import emergency
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

app = FastAPI()

# 라우터 등록
app.include_router(emergency.router)
