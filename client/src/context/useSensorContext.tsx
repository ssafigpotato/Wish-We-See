"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { useSensor } from "@/hooks/useSensor";
import getLocation from "@/utils/getLocation";
import audioRecording from "@/utils/audioRecording";
import axiosInstance from "@/app/api/axiosInstance";
import { InfoModal } from "@/components/Modal/InfoModal";
import { Modal } from "@/components/Modal/Modal";

interface SensorContextProps {
  emergency: boolean;
}

const SensorContext = createContext<SensorContextProps | undefined>(undefined);

export const SensorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { fallDetected } = useSensor();
  const [emergency, setEmergency] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleEmergencyResponse = async () => {
    setIsModalOpen(false);
    if (timerId) clearTimeout(timerId); // 타이머 취소

    setEmergency(true);
    setIsInfoModalOpen(true);

    try {
      // 음성 녹음을 시작
      setModalContent("음성녹음 시작");
      const audioBlob = await audioRecording();

      if (audioBlob) {
        setModalContent("음성 녹음 완료, 서버로 전송 시작");
        await sendDataToServer(audioBlob);
      }
    } catch (error) {
      console.error("Error getting location or starting recording:", error);
    }
  };

  const handleModalCancel = () => {
    if (timerId) clearTimeout(timerId); // 타이머 취소
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (fallDetected && !isInfoModalOpen) {
      console.log("낙상 감지됨, 모달 열기");
      setIsModalOpen(true);

      // 5초 후 자동으로 handleModalCancelOrTimeout 실행
      const timeoutId = setTimeout(() => {
        handleEmergencyResponse();
      }, 7000);

      setTimerId(timeoutId);
    }
  }, [fallDetected]);

  // 서버로 데이터 전송 함수
  const sendDataToServer = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "fall-detection.wav");

    try {
      const response = await axiosInstance.post("/cautions/voice", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === 1) {
        setModalContent("위기 감지! 지인에게 알림 전송");
        const location = await getLocation();
        if (location) {
          const { latitude, longitude } = location.coords; // 위도 경도
          await axiosInstance.post("/cautions/gps", {
            location_latitude: latitude,
            location_longitude: longitude,
          });
        }
      } else {
        setModalContent("위기를 감지하지 못했습니다. 종료합니다.");
      }
    } catch (error) {
      setModalContent("위기를 감지하지 못했습니다. 종료합니다.");
      console.error(error);
    } finally {
      setIsInfoModalOpen(false);
    }
  };

  return (
    <SensorContext.Provider value={{ emergency }}>
      {children}
      {isModalOpen && (
        <Modal
          message="위험이 감지되었습니다. 괜찮으세요?"
          onConfirm={handleEmergencyResponse}
          onCancel={handleModalCancel}
          title="위험 감지"
          cancel="도움이 필요해요"
          ok="괜찮아요"
        />
      )}
      {isInfoModalOpen && <InfoModal message={modalContent} title="알림" />}
    </SensorContext.Provider>
  );
};
