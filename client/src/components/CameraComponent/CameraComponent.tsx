"use client";

import React, { CSSProperties, useState } from "react";
import styles from "./index.module.scss";
import axiosInstance from "@/app/api/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import getLocation from "@/utils/getLocation";

const CameraInputComponent: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [currentPoint, setCurrentPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const params = useParams();
  const id = params.id; // URL에서 가져온 'id' 파라미터 값
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      setStartPoint({ x, y });
      setCurrentPoint({ x, y });
      setIsDragging(true);
      e.preventDefault(); // 사진 안에서 터치 시작 시 스크롤 방지
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!isDragging || !startPoint) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      setCurrentPoint({ x, y });
      e.preventDefault(); // 사진 안에서 터치 이동 시 스크롤 방지
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isDragging) {
      setIsDragging(false);
      e.preventDefault(); // 터치 종료 시 스크롤 방지 (사진 안에서만)
    }
  };

const getSelectionStyles = (): CSSProperties => {
  if (!startPoint || !currentPoint) {
    return { display: "none" };
  }

  const x = Math.min(startPoint.x, currentPoint.x);
  const y = Math.min(startPoint.y, currentPoint.y);
  const width = Math.abs(currentPoint.x - startPoint.x);
  const height = Math.abs(currentPoint.y - startPoint.y);

  return {
    display: "block",
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    position: "absolute",
    border: "2px dashed white",
    pointerEvents: "none" as "none", // TypeScript에서 올바른 타입으로 지정
  };
};

  const handleUploadPhoto = async () => {
    if (imageSrc && startPoint && currentPoint) {
      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        const location = await getLocation();
        if (location) {
          const { latitude, longitude } = location.coords; // 위도 경도

          const formData = new FormData();
          formData.append("report_image", blob, "photo.jpg");
          formData.append(
            "report_detail",
            JSON.stringify({
              report_content: additionalInfo,
              report_location_latitude: latitude,
              report_location_longitude: longitude,
              startX: String(startPoint.x),
              startY: String(startPoint.y),
              endX: String(currentPoint.x),
              endY: String(currentPoint.y),
            })
          );

          await axiosInstance
            .post(`/reports/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res.data);
            });
        }

        console.log("이미지 및 좌표와 추가 정보 전송 성공");
      } catch (error) {
        console.error("이미지 및 좌표 전송 실패:", error);
      } finally {
        alert("소중한 제보 감사합니다.");
        router.push("/");
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalInfo(e.target.value);
  };

  return (
    <div className={styles.container}>
      {!imageSrc ? (
        <>
          <label htmlFor="file" className={styles.button}>
            제보하기
          </label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file"
          />
        </>
      ) : (
        <div
          className={styles["image-wrapper"]}
          style={{ position: "relative", display: "inline-block" }}>
          <img
            src={imageSrc}
            alt="Captured"
            style={{
              width: "100%",
              height: "auto",
              userSelect: "none",
              borderRadius: "8px",
              touchAction: "none", // 사진에서만 스크롤 방지
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <div style={getSelectionStyles()} />
          <div className={styles["text-title"]}>추가 정보 입력</div>
          <textarea
            className={styles["text-area"]}
            placeholder="특이사항(선택)"
            value={additionalInfo}
            onChange={handleTextareaChange}></textarea>
          <button className={styles["button"]} onClick={handleUploadPhoto}>
            사진 업로드
          </button>
          {/* <button className={`${styles["button"]} ${styles["button--red"]}`} onClick={() => setImageSrc(null)}>
            다시 찍기
          </button> */}
        </div>
      )}
    </div>
  );
};

export default CameraInputComponent;
