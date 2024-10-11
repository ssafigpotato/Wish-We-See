import os
import librosa
from pydub import AudioSegment
from .model.speaker_diarization import SpeakerDiarization
from .model.whisper import WhisperSTT
import uuid

speaker_diarization = SpeakerDiarization()
whisper_stt = WhisperSTT()

def convert_to_wav_if_needed(audio_path: str):
    if not audio_path.endswith('.wav'):
        audio = AudioSegment.from_file(audio_path)
        wav_path = audio_path.rsplit('.', 1)[0] + '.wav'
        audio.export(wav_path, format="wav")
        return wav_path
    return audio_path

def process_audio_file(audio_path: str):
    wav_path = convert_to_wav_if_needed(audio_path)
    diarization = speaker_diarization.diarize(wav_path)
    audio = AudioSegment.from_file(wav_path)

    results = []
    for i, (turn, _, speaker) in enumerate(diarization.itertracks(yield_label=True)):
        start_time = turn.start * 1000
        end_time = turn.end * 1000
        speaker_audio = audio[start_time:end_time]

        speaker_wav = f"./temp_speaker_{uuid.uuid4().hex}.wav"
        speaker_audio.export(speaker_wav, format="wav")

        data, _ = librosa.load(speaker_wav, sr=16000)
        transcription = whisper_stt.transcribe(data)

        results.append({
            'speaker': speaker,
            'transcription': transcription[0]
        })

        os.remove(speaker_wav)

    return results
