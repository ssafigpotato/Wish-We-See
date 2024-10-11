import torch
import torch.nn.functional as F
import time

def calculate_cosine_similarity(vector1, vector2):
    start_time = time.time()
    cos_sim = F.cosine_similarity(vector1, vector2)
    # print(vector1)
    # print(vector2)
    end_time = time.time()
    print(f"Cosine similarity calculation time: {end_time - start_time:.4f} seconds")
    return cos_sim.item()
