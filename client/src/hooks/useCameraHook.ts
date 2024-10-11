import { useState, useEffect, useRef } from "react";

interface UseCameraResult {
  videoRef: React.RefObject<HTMLVideoElement>;
  startCamera: (isRear?: boolean) => Promise<void>;
  stopCamera: () => void;
  takePhoto: () => string | null;
  toggleCamera: () => Promise<void>;
  setZoom: (zoomLevel: number) => void;
  isCameraActive: boolean;
  error: string | null;
}

export const useCamera = (): UseCameraResult => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isRearCamera, setIsRearCamera] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const getCameraDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === "videoinput");
  };

  const startCamera = async (isRear: boolean = true) => {
    setError(null);
    if (videoRef.current) {
      try {
        const devices = await getCameraDevices();
        const device = devices.find((d) =>
          isRear ? d.label.toLowerCase().includes("back") : d.label.toLowerCase().includes("front")
        );

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: device ? device.deviceId : undefined,
          },
        });

        videoRef.current.srcObject = stream;
        videoRef.current.play();
        streamRef.current = stream;
        setIsCameraActive(true);
        setIsRearCamera(isRear);
      } catch (err) {
        setError("카메라 접근이 허용되지 않았거나, 오류가 발생했습니다.");
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
    }
  };

  const toggleCamera = async () => {
    stopCamera();
    await startCamera(!isRearCamera);
  };

  const setZoom = (zoomLevel: number) => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities();
      if (capabilities.zoom) {
        const constraints = {
          advanced: [{ zoom: Math.min(Math.max(zoomLevel, capabilities.zoom.min), capabilities.zoom.max) }],
        };
        videoTrack.applyConstraints(constraints);
      } else {
        console.warn("줌 기능을 지원하지 않는 카메라입니다.");
      }
    }
  };

  // 사진 촬영 기능
  const takePhoto = (): string | null => {
    if (!videoRef.current) return null;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return null;

    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg");
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    startCamera,
    stopCamera,
    takePhoto,
    toggleCamera,
    setZoom,
    isCameraActive,
    error,
  };
};
