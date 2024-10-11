from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from core.vector_similarity.service import VectorSimilarityService
import os
import requests
import shutil
import uuid

router = APIRouter()
vector_similarity_service = VectorSimilarityService()

class ImageComparisonRequest(BaseModel):
    image_url: str
    situation_id: int

@router.post("/silhouette/")
async def compare_images(rq: ImageComparisonRequest):
    image_url = rq.image_url
    situation_id = str(rq.situation_id)
    temp_dir = "./temp/"
    os.makedirs(temp_dir, exist_ok=True)

    # 이미지 경로 설정
    image_filename1 = f"temp_image1_{uuid.uuid4().hex}.jpg"
    image_filename2 = f"temp_image2_{uuid.uuid4().hex}.jpg"
    
    temp_image1_path = os.path.join(temp_dir, image_filename1)
    temp_image2_path = os.path.join(temp_dir, image_filename2)

    try:
        stored_vector = vector_similarity_service.get_vector_by_situation_id(situation_id)
        print(stored_vector)
        if stored_vector is None:
            raise ValueError("Vector not found for given situation ID.")
        store_url = stored_vector['matches'][0]['metadata']['image_url']
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
        
    try:
        response1 = requests.get(image_url, stream=True)
        response1.raise_for_status()
        response2 = requests.get(store_url, stream=True)
        response2.raise_for_status()

        with open(temp_image1_path, "wb") as buffer:
            shutil.copyfileobj(response1.raw, buffer)
        with open(temp_image2_path, "wb") as buffer:
            shutil.copyfileobj(response2.raw, buffer)


    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File download failed: {str(e)}")


    # result = vector_similarity_service.compare_with_vector(temp_image1_path, temp_image_path2, stored_vector[0]['values'])
    result = vector_similarity_service.compare_with_vector(temp_image1_path, temp_image2_path)


    # os.remove(temp_image_path1)
    # os.remove(temp_image_path2)

    return {"similarity_score": result}
