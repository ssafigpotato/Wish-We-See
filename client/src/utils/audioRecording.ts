// audioRecording.ts
const audioRecording = async (): Promise<Blob | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm", // 기본 녹음 형식
    });
    const audioChunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    return new Promise((resolve, reject) => {
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

        // WAV 형식으로 변환
        try {
          const wavBlob = await convertToWav(audioBlob);
          resolve(wavBlob);
        } catch (error) {
          console.error("WAV 변환 중 오류 발생:", error);
          reject(error);
        }
      };

      mediaRecorder.onerror = (event) => {
        reject(event.error);
      };

      mediaRecorder.start();

      // 5초간 녹음 후 중지
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    });
  } catch (error) {
    console.error("Error recording audio:", error);
    return null;
  }
};

// audio/webm을 audio/wav 형식으로 변환하는 함수
const convertToWav = async (audioBlob: Blob): Promise<Blob> => {
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const numOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numOfChannels * 2 + 44;
  const wavBuffer = new ArrayBuffer(length);
  const view = new DataView(wavBuffer);

  // WAV 파일 헤더 작성
  writeWavHeader(view, audioBuffer);

  // PCM 데이터 작성
  const pcmData = new Int16Array(wavBuffer, 44);
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let channel = 0; channel < numOfChannels; channel++) {
      const sample = audioBuffer.getChannelData(channel)[i];
      pcmData[i * numOfChannels + channel] = Math.max(-1, Math.min(1, sample)) * 0x7fff;
    }
  }

  return new Blob([view], { type: "audio/wav" });
};

// WAV 파일 헤더 작성 함수
const writeWavHeader = (view: DataView, audioBuffer: AudioBuffer) => {
  const sampleRate = audioBuffer.sampleRate;
  const numChannels = audioBuffer.numberOfChannels;
  const bitsPerSample = 16;
  const blockAlign = numChannels * bitsPerSample / 8;
  const byteRate = sampleRate * blockAlign;

  // 'RIFF' chunk descriptor
  view.setUint32(0, 0x52494646, false); // "RIFF" in ASCII
  view.setUint32(4, 36 + audioBuffer.length * numChannels * 2, true); // Chunk size
  view.setUint32(8, 0x57415645, false); // "WAVE" in ASCII

  // 'fmt ' sub-chunk
  view.setUint32(12, 0x666d7420, false); // "fmt " in ASCII
  view.setUint32(16, 16, true); // Sub-chunk size
  view.setUint16(20, 1, true); // Audio format (1 = PCM)
  view.setUint16(22, numChannels, true); // Number of channels
  view.setUint32(24, sampleRate, true); // Sample rate
  view.setUint32(28, byteRate, true); // Byte rate
  view.setUint16(32, blockAlign, true); // Block align
  view.setUint16(34, bitsPerSample, true); // Bits per sample

  // 'data' sub-chunk
  view.setUint32(36, 0x64617461, false); // "data" in ASCII
  view.setUint32(40, audioBuffer.length * numChannels * 2, true); // Sub-chunk 2 size
};

export default audioRecording;
