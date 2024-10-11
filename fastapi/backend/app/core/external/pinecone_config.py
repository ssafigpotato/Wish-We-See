from pinecone import Pinecone, ServerlessSpec
import os
# from dotenv import load_dotenv
# load_dotenv()

pinecone_api_key = os.getenv("PINECONE_API_KEY")

pc = Pinecone(api_key=pinecone_api_key)

index_name = 'missing-image-embedding'

pinecone_index = pc.Index(index_name)