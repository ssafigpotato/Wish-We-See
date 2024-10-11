from fastapi import APIRouter, UploadFile, HTTPException
from pydantic import BaseModel
from core.emergency_classification_by_voice.service import process_audio_file
from core.external.service import classify_text
import os
import requests
import shutil

router = APIRouter()

class FileUrl(BaseModel):
    file_url: str

@router.post("/detect/")
async def detect_emergency(file_data: FileUrl):
    file_url = file_data.file_url
    temp_file_path = f"./temp/temp_file.wav"
    os.makedirs(os.path.dirname(temp_file_path), exist_ok=True)

    try:
        response = requests.get(file_url, stream=True)
        response.raise_for_status()
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(response.raw, buffer)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File download failed: {str(e)}")

    results = process_audio_file(temp_file_path)
    context = " ".join([f"{item['speaker']}: {item['transcription']}" for item in results])

    classification_result = classify_text(context=context)
    label = classification_result.replace("Label: ", "").strip()

    os.remove(temp_file_path)

    return {"classification": label}
