import os
from dotenv import load_dotenv
load_dotenv()
os.environ['CUDA_VISIBLE_DEVICES'] = '6'

from fastapi import FastAPI
from api import emergency_detection, vectorizer, vector_comparator
# import core.emergency_classification_by_voice.service
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


app.include_router(emergency_detection.router, prefix="/emergency", tags=["Emergency Detection"])
app.include_router(vectorizer.router, prefix="/vectorizer", tags=["Vectorizer"])
app.include_router(vector_comparator.router, prefix="/compare", tags=["Comparator"])