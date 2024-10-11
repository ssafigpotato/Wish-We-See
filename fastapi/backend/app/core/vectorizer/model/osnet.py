import os
import torch
import cv2
import numpy as np
from PIL import Image, ImageOps
from torchvision import transforms
from torchvision.models.segmentation import deeplabv3_resnet101
from transformers import ViTImageProcessor, ViTModel
import mediapipe as mp
import time
import uuid

device = 'cuda' if torch.cuda.is_available() else 'cpu'

# Load models
segmentation_model = deeplabv3_resnet101(pretrained=True).to(device).eval()
vit_processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224-in21k')
vit_model = ViTModel.from_pretrained('google/vit-base-patch16-224-in21k').to(device).eval()
mp_face_detection = mp.solutions.face_detection

def preprocess_image(image):
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    return transform(image).unsqueeze(0).to(device)

def preprocess_image_face(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    with mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5) as face_detection:
        results = face_detection.process(image)
        if results.detections:
            detection = results.detections[0]
            bbox = detection.location_data.relative_bounding_box
            x, y, w, h = (
                int(bbox.xmin * image.shape[1]),
                int(bbox.ymin * image.shape[0]),
                int(bbox.width * image.shape[1]),
                int(bbox.height * image.shape[0]),
            )
            face = image[y:y + h, x:x + w]
            face = Image.fromarray(face)

            original_image = Image.fromarray(image)
            full_image_tensor = preprocess_image(original_image)
            full_image_mask = extract_person_mask(full_image_tensor)
            masked_full_image = apply_mask(original_image, full_image_mask)

            unique_filename = f"masked_image_{uuid.uuid4().hex}.jpg"
            masked_image_path = os.path.join("/tmp", unique_filename)

            masked_full_image.save(masked_image_path)

            return masked_image_path  
    return None 


def extract_person_mask(image_tensor):
    with torch.no_grad():
        output = segmentation_model(image_tensor)['out']
    output_predictions = output.argmax(1).squeeze().cpu().numpy()
    person_mask = (output_predictions == 15).astype(np.uint8)
    return person_mask

def apply_mask(image, mask):
    image_np = np.array(image)
    masked_array = np.zeros_like(image_np)
    masked_array[mask == 1] = image_np[mask == 1]
    return Image.fromarray(masked_array)

def extract_face(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    height, width, _ = image.shape
    with mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5) as face_detection:
        results = face_detection.process(image)
        if results.detections:
            detection = results.detections[0]
            bbox = detection.location_data.relative_bounding_box
            x, y, w, h = int(bbox.xmin * width), int(bbox.ymin * height), int(bbox.width * width), int(bbox.height * height)
            face = image[y:y+h, x:x+w]
            face = Image.fromarray(face)
            return face, (x, y, w, h)
    return None, None

def extract_body(image, face_bbox):
    x, y, w, h = face_bbox
    height = image.size[1]
    body = image.crop((0, y + h, image.size[0], height))
    return body

def extract_features(image):
    inputs = vit_processor(images=image, return_tensors="pt").to(device)
    with torch.no_grad():
        outputs = vit_model(**inputs)
    features = outputs.last_hidden_state.mean(dim=1)
    return features

def generate_temp_image_path():
    unique_filename = f"temp_image_{uuid.uuid4().hex}.jpg"
    return f"./temp/{unique_filename}"

def extract_all_features(image_path):
    start_time = time.time()
    # Load image and generate unique temp file name
    unique_image_path = generate_temp_image_path()
    image = Image.open(image_path).convert('RGB')
    image = ImageOps.exif_transpose(image)  # Apply EXIF-based rotation
    image.save(unique_image_path)

    features = {}
    # features = []

    face, face_bbox = extract_face(unique_image_path)
    if face:
        face_tensor = preprocess_image(face)
        face_mask = extract_person_mask(face_tensor)
        masked_face = apply_mask(face, face_mask)
        # features['face'] = extract_features(masked_face)
        face_image_path = generate_temp_image_path()
        masked_face.save(face_image_path)  # 마스크가 적용된 얼굴 이미지를 저장
        face_url = face_image_path  # 저장된 얼굴 이미지 경로 추가
        
    if face_bbox:
        body = extract_body(image, face_bbox)
        body_tensor = preprocess_image(body)
        body_mask = extract_person_mask(body_tensor)
        masked_body = apply_mask(body, body_mask)
        features['body'] = extract_features(masked_body)

    else:
        full_image_tensor = preprocess_image(image)
        full_image_mask = extract_person_mask(full_image_tensor)
        masked_full_image = apply_mask(image, full_image_mask)
        features['body'] = extract_features(masked_full_image)
    # full_image_tensor = preprocess_image(image)
    # full_image_mask = extract_person_mask(full_image_tensor)
    # masked_full_image = apply_mask(image, full_image_mask)
    # features = extract_features(masked_full_image)

    end_time = time.time()
    print(f"Feature extraction time: {end_time - start_time:.4f} seconds")

    if os.path.exists(unique_image_path):
        os.remove(unique_image_path)

    torch.cuda.empty_cache()
    
    # print("Feature extraction complete:")
    # for key, value in features.items():
    #     print(f"{key}: shape {value.shape}")
    
    return features, face_url

def combine_features(features_dict):
    combined_tensor = torch.cat([features_dict[key] for key in features_dict.keys()], dim=0)
    return combined_tensor.cpu().numpy().reshape(-1).tolist()