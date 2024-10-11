from core.vectorizer.model.osnet import extract_all_features, combine_features
import pinecone
from core.external.pinecone_config import pinecone_index

class VectorizerService:
    def vectorize(self, image_path):
        features, _ = extract_all_features(image_path)
        return features['body']

    def save_vector(self, situation_id, vector, image_url):
        try:
            # pinecone_index.upsert([(case_id, vector)])
            vector = vector.tolist()[0]
            pinecone_index.upsert(
                vectors=[
                    {
                        "id": situation_id,
                        "values": vector, 
                        "metadata": {
                            "image_url": image_url
                        }
                    }
                ]
            )
        except Exception as e:
            raise ValueError(f"Failed to index vector: {str(e)}")

    # def get_vector_by_case_id(self, case_id):
    #     try:
    #         response = pinecone_index.query(ids=[case_id], top_k=1, include_values=True)
    #         print(response)
    #         return response if response else None
    #     except Exception as e:
    #         raise ValueError(f"Failed to retrieve vector: {str(e)}")
