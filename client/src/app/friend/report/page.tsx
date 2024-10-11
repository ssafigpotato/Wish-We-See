"use client";
import styles from "@/app/friend/report/page.module.scss";
import Title from "@/components/Title/Title";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import fetchFriendReportList from "@/app/friend/_component/FriendReportListFetch";

interface FriendReportList {
  report_id: number;
  report_content: string;
  report_location_latitude: number;
  report_location_longitude: number;
  created_at: string;
  report_img_url: string;
}

export default function FriendReportList() {
  const router = useRouter();
  const searchParams = useSearchParams(); // 현재 경로 가져오기
  const [id, setId] = useState<string | null>(null); // URL에서 추출한 ID 값 저장
  const [response, setResponse] = useState<FriendReportList[]>([]); // 제보 리스트를 상태로 관리
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<string | null>("");

  // URL에서 id 추출
  useEffect(() => {
    const paramData = searchParams.get("situation_id");
    setId(paramData);
  }, [searchParams]);

  // 제보 목록 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFriendReportList(Number(id));
        setResponse(data);
      } catch {
        setError("데이터를 가져오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData(); // id가 있을 때만 데이터 가져오기
  }, [id]);

  // 제보 클릭 시 처리
  const handleClick = (reportId: number) => {
    router.push(`/friend/report-detail/${reportId}?situation_id=${id}`); // 클릭한 제보 상세 페이지로 이동
  };

  // if (isLoading) return <div>로딩 중...</div>;
  // if (isError) return <div>{isError}</div>;

  const candidate = response[0];

  return (
    <div className={styles["main-container"]}>
      <Title name="제보 목록" heading="h2" />
      <Title name="가장 유력한 제보" heading="h3" />
      <div className={styles["main-report"]}>
        {response.length ? (
          <div
            className={styles.card}
            onClick={() => handleClick(candidate.report_id)}
          >
            <Image
              src={candidate.report_img_url}
              alt="제보 이미지"
              width={80}
              height={80}
            />
            {reports_percents[0] > 80 ? (
              <p className={styles["high"]}>{sns_percents[0]}%</p>
            ) : sns_percents[0] > 40 ? (
              <p className={styles["middle"]}>{sns_percents[0]}%</p>
            ) : (
              <p className={styles["low"]}>{sns_percents[0]}%</p>
            )}
          </div>
        ) : (
          <p> 아직 제보가 없습니다. </p>
        )}
      </div>

      {/* 다른 섹션들 */}
      <Title name="SNS 분석 결과" heading="h3" />
      <div className={styles["report"]}>
        {sns_reports.map((report, index) => {
          return (
            <div
              key={report.report_id}
              className={styles.card}
              onClick={() => handleClick(report.report_id)}
            >
              <Image
                src={report.report_img_url}
                alt="제보 이미지"
                width={80}
                height={80}
              />
              {sns_percents[index] > 80 ? (
                <p className={styles["high"]}>{sns_percents[index]}%</p>
              ) : sns_percents[index] > 40 ? (
                <p className={styles["middle"]}>{sns_percents[index]}%</p>
              ) : (
                <p className={styles["low"]}>{sns_percents[index]}%</p>
              )}
            </div>
          );
        })}
      </div>

      <Title name="실시간 방송 분석 결과" heading="h3" />
      <div className={styles["report"]}>
        {live_reports.map((report, index) => {
          return (
            <div
              key={report.report_id}
              className={styles.card}
              onClick={() => handleClick(report.report_id)}
            >
              <Image
                src={report.report_img_url}
                alt="제보 이미지"
                width={80}
                height={80}
              />
              {live_percents[index] > 80 ? (
                <p className={styles["high"]}>{live_percents[index]}%</p>
              ) : live_percents[index] > 40 ? (
                <p className={styles["middle"]}>{live_percents[index]}%</p>
              ) : (
                <p className={styles["low"]}>{live_percents[index]}%</p>
              )}
            </div>
          );
        })}
      </div>

      <Title name="제보 분석 결과" heading="h3" />
      <div className={styles["report"]}>
        {response.length ? response.map((report, index) => {
            return (
              <div
                key={report.report_id}
                className={styles.card}
                onClick={() => handleClick(report.report_id)}
              >
                <Image
                  src={report.report_img_url}
                  alt="제보 이미지"
                  width={80}
                  height={80}
                  className={styles.img}
                />
                {reports_percents[index] > 80 ? (
                  <p className={styles["high"]}>{reports_percents[index]}%</p>
                ) : reports_percents[index] > 40 ? (
                  <p className={styles["middle"]}>{reports_percents[index]}%</p>
                ) : (
                  <p className={styles["low"]}>{reports_percents[index]}%</p>
                )}
              </div>
            );
          }) : (<p>아직 제보가 없습니다.</p>)}
      </div>
    </div>
  );
}

const sns_reports = [
  {
    report_id: 404,
    report_content: "제보1",
    report_location_latitude: 37.4979,
    report_location_longitude: 127.028,
    created_at: "2024-10-07T16:34:15",
    report_img_url:
      "https://img.freepik.com/free-photo/people-showing-support-respect-with-yellow-background-suicide-prevention-day_23-2151607929.jpg?t=st=1728379213~exp=1728382813~hmac=d92c093bcab47c94b50c7a635b927595cefc15977a86a4e11f7951566ccdf153&w=1380",
  },
  {
    report_id: 406,
    report_content: "제보2",
    report_location_latitude: 37.4995,
    report_location_longitude: 127.031,
    created_at: "2024-10-07T16:34:15",
    report_img_url:
      "https://img.freepik.com/free-photo/high-angle-gorgeous-woman-outdoors-sun_23-2148803630.jpg?t=st=1728379252~exp=1728382852~hmac=a392658fc9fe362ee28691a24c077792b1c82a1f03d875c596033ec8e39362da&w=826",
  },
  {
    report_id: 407,
    report_content: "제보3",
    report_location_latitude: 37.4991,
    report_location_longitude: 127.033,
    created_at: "2024-10-07T16:34:15",
    report_img_url:
      "https://img.freepik.com/free-photo/high-angle-gorgeous-woman-outdoors-sun_23-2148803630.jpg?t=st=1728379252~exp=1728382852~hmac=a392658fc9fe362ee28691a24c077792b1c82a1f03d875c596033ec8e39362da&w=826",
  },
  {
    report_id: 407,
    report_content: "제보3",
    report_location_latitude: 37.4991,
    report_location_longitude: 127.033,
    created_at: "2024-10-07T16:34:15",
    report_img_url:
      "https://img.freepik.com/free-photo/high-angle-gorgeous-woman-outdoors-sun_23-2148803630.jpg?t=st=1728379252~exp=1728382852~hmac=a392658fc9fe362ee28691a24c077792b1c82a1f03d875c596033ec8e39362da&w=826",
  },
];

const live_reports = [
  {
    report_id: 404,
    report_content: "제보1",
    report_location_latitude: 37.4979,
    report_location_longitude: 127.028,
    created_at: "2024-10-07T16:34:15",
    report_img_url:
      "https://img.freepik.com/free-photo/people-showing-support-respect-with-yellow-background-suicide-prevention-day_23-2151607929.jpg?t=st=1728379213~exp=1728382813~hmac=d92c093bcab47c94b50c7a635b927595cefc15977a86a4e11f7951566ccdf153&w=1380",
  },
  {
    report_id: 406,
    report_content: "제보2",
    report_location_latitude: 37.4995,
    report_location_longitude: 127.031,
    created_at: "2024-10-07T16:34:15",
    report_img_url:
      "https://img.freepik.com/free-photo/high-angle-gorgeous-woman-outdoors-sun_23-2148803630.jpg?t=st=1728379252~exp=1728382852~hmac=a392658fc9fe362ee28691a24c077792b1c82a1f03d875c596033ec8e39362da&w=826",
  },
  {
    report_id: 407,
    report_content: "제보3",
    report_location_latitude: 37.4991,
    report_location_longitude: 127.033,
    created_at: "2024-10-07T16:34:15",
    report_img_url:
      "https://img.freepik.com/free-photo/high-angle-gorgeous-woman-outdoors-sun_23-2148803630.jpg?t=st=1728379252~exp=1728382852~hmac=a392658fc9fe362ee28691a24c077792b1c82a1f03d875c596033ec8e39362da&w=826",
  },
];

const sns_percents = [
  2, 20, 35, 22, 19, 19, 18, 17, 9, 11, 27, 45, 26, 29, 10, 34, 45, 3, 37, 21,
  11, 41, 6, 45, 4, 25, 32, 6, 46, 28,
];
const live_percents = [
  21, 3, 21, 25, 12, 17, 20, 18, 23, 18, 1, 22, 17, 14, 9, 19, 7, 16, 4, 7, 12,
  14, 2, 18, 18, 10, 14, 13, 13, 27,
];
const reports_percents = [
  92, 79, 40, 34, 75, 50, 45, 33, 72, 16, 6, 56, 13, 41, 37, 8, 10, 66, 2, 61,
  14, 76, 87, 77, 21, 44, 41, 86, 23, 10,
];
