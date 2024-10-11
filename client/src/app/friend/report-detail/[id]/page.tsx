"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axiosInstance";
import styles from "./page.module.scss";
import { useRouter, useParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

interface ReportData {
  report_id: number;
  report_content: string;
  report_location_latitude: string;
  report_location_longitude: string;
  created_at: string; // Date 타입이 아닌 string으로 수정
  report_img_url: string;
}

export default function ReportDetailPage() {
  const router = useRouter();
  const { id, situation_id } = useParams(); // URL 파라미터에서 id와 situation_id 가져오기
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    // API 호출
    const fetchReportData = async () => {
      try {
        const response = await axiosInstance.get(`/reports/${situation_id}/${id}`);
        setReportData(response.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchReportData();
  }, [situation_id, id]);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className={styles["main-container"]}>
      <button
        className={styles["back-button"]}
        onClick={() => router.push("/friend/report")}
      >
        <FaChevronLeft size={32} /> 목록으로 돌아가기
      </button>
      <p className={styles["section-title"]}>실종자 정보</p>
      <p className={styles["section-title"]}>제보 상세</p>
      <div className={styles["image-container"]}>
        <img src={reportData.report_img_url || ""} alt="missing" />
      </div>
      <div className={styles["info-container"]}>
        <div className={styles.info}>
          <span>특이사항</span>
          <span>{reportData.report_content}</span>
        </div>
        <div className={styles.info}>
          <span>제보일시</span>
          <span>{formatDate(reportData.created_at)}</span> {/* 날짜 포맷 적용 */}
        </div>
        <div className={styles.info}>
          <span>제보위치</span>
          <span>{reportData.report_location_latitude}</span>
        </div>
      </div>
      <section>지도</section>
    </main>
  );
}
