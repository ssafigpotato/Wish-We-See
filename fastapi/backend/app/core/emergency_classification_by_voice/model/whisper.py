import os
import torch
from transformers import WhisperProcessor, WhisperForConditionalGeneration
from dotenv import load_dotenv

load_dotenv()

class WhisperSTT:
    def __init__(self):
        self.processor = WhisperProcessor.from_pretrained("openai/whisper-medium", language="ko", task="transcribe")
        self.model = WhisperForConditionalGeneration.from_pretrained('spow12/whisper-medium-zeroth_korean').cuda()

    def transcribe(self, audio_data):
        input_features = self.processor(audio_data, sampling_rate=16000, return_tensors="pt", padding=True).input_features.cuda()
        predicted_ids = self.model.generate(
            input_features,
            num_beams=5,
            max_length=448,
            length_penalty=1.0,
            early_stopping=True
        )
        transcription = self.processor.batch_decode(predicted_ids, skip_special_tokens=True)
        return transcription
