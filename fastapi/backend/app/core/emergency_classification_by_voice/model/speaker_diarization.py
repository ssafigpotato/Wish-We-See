import os
import torch
from pyannote.audio import Pipeline
# from dotenv import load_dotenv

# os.environ['CUDA_VISIBLE_DEVICES'] = '6'
# load_dotenv()

class SpeakerDiarization:
    def __init__(self):
        huggingface_token = os.getenv("HUGGINGFACE_TOKEN")
        self.pipeline = Pipeline.from_pretrained(
            "pyannote/speaker-diarization-3.1",
            use_auth_token=huggingface_token
        )
        self.pipeline.to(torch.device("cuda"))

    def diarize(self, wav_path: str):
        return self.pipeline(wav_path)
