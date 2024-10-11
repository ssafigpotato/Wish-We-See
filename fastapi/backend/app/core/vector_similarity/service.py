from core.vectorizer.model.osnet import extract_all_features, preprocess_image_face
from core.vector_similarity.model.cosine_similarity import calculate_cosine_similarity
import core.vector_similarity.model.face_compare
from core.vector_similarity.model.face_compare import verify_images
from core.external.pinecone_config import pinecone_index
import torch
import numpy as np
import time
# import deepface

class VectorSimilarityService:
    def compare(self, image1_path, image2_path):
        features1 = extract_all_features(image1_path)
        features2 = extract_all_features(image2_path)
        similarities = {}
        if 'face' in features1 and 'face' in features2:
            similarities['face'] = calculate_cosine_similarity(features1['face'], features2['face'])
        
        similarities['body'] = calculate_cosine_similarity(features1['body'], features2['body'])
        return similarities

    # def compare_with_vector(self, image_path1, image_path2, stored_vector):
    def compare_with_vector(self, image_path1, image_path2):
        image_vector1, face1 = extract_all_features(image_path1)
        image_vector2, face2 = extract_all_features(image_path2)

        result = {}
        # if 'face' in features:
        result['face'] = verify_images(face1, face2)
        result['body'] = calculate_cosine_similarity(image_vector1['body'], image_vector2['body'])
        
        return result

    def get_vector_by_situation_id(self, situation_id: str):
        start_time = time.time()
        result = pinecone_index.query(
            vector=None, 
            id=situation_id,
            top_k=1,
            # include_values=True,
            include_metadata=True
        )
        end_time = time.time()
        print(f"Pinecone query time: {end_time - start_time:.4f} seconds")
        if result['matches']:
            # return np.array(result['matches'][0]['values'])
            return result
        return None