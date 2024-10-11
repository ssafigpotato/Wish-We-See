from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from core.vectorizer.service import VectorizerService
import os
import requests
import shutil
import uuid

router = APIRouter()
vectorizer_service = VectorizerService()

class ImageVectorizeRequest(BaseModel):
    image_url: str
    situation_id: int

@router.post("/vectorize/")
async def vectorize_image(rq: ImageVectorizeRequest):
    image_url = rq.image_url
    situation_id = str(rq.situation_id)
    
    # Generate a unique filename using UUID
    unique_filename = f"temp_image_{uuid.uuid4().hex}.jpg"
    temp_image_path = os.path.join("./temp/", unique_filename)
    os.makedirs(os.path.dirname(temp_image_path), exist_ok=True)

    try:
        # Download the image from the URL
        response = requests.get(image_url, stream=True)
        response.raise_for_status()
        with open(temp_image_path, "wb") as buffer:
            shutil.copyfileobj(response.raw, buffer)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File download failed: {str(e)}")

    # Vectorize the image
    vector = vectorizer_service.vectorize(temp_image_path)

    # Clean up: remove the temporary image file
    os.remove(temp_image_path)

    try:
        # Save the vector associated with the situation ID
        vectorizer_service.save_vector(situation_id, vector, image_url)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"situation_id": situation_id}

@router.get("/vectorize/{situation_id}")
async def get_vector(situation_id: str):
    try:
        # Retrieve the vector by situation ID
        vector = vectorizer_service.get_vector_by_case_id(situation_id)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

    if vector is None:
        raise HTTPException(status_code=404, detail="Vector not found")

    return {"situation_id": situation_id, "vector": vector}
