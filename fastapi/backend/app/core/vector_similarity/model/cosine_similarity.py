import torch
import torch.nn.functional as F

def calculate_cosine_similarity(vector1, vector2):
    cos_sim = F.cosine_similarity(vector1, vector2)
    return cos_sim.item()
