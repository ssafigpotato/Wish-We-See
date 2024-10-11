import torch
from torchvision import models, transforms
from PIL import Image
import numpy as np
from scipy.spatial.distance import cosine

# GPU 사용 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# VGG 모델을 GPU로 이동
vgg = models.vgg16(weights='DEFAULT').to(device).eval()

def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB')
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    return preprocess(image).unsqueeze(0).to(device)  # 배치 차원 추가 및 GPU로 이동

def verify_images(img1: str, img2: str):
    img1 = preprocess_image(img1)
    img2 = preprocess_image(img2)

    with torch.no_grad():
        embedding1 = vgg(img1).cpu().numpy().flatten()  # GPU에서 계산 후 CPU로 이동
        embedding2 = vgg(img2).cpu().numpy().flatten()  # GPU에서 계산 후 CPU로 이동

    similarity = 1 - cosine(embedding1, embedding2)

    return similarity  # 임계값 조정 가능
