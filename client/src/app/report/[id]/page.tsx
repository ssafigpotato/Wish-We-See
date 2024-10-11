"use client";

import KaKaoMap from "@/components/Map/KakaoMap";
import Profile from "@/components/Profile/Profile";
import Title from "@/components/Title/Title";
import CameraInputComponent from "@/components/CameraComponent/CameraComponent";
import styles from "@/app/friend/[id]/page.module.scss";
import { useState, useEffect } from "react";
import fetchFriendDetail from "@/app/friend/_component/FriendDetailFetch";
import { FriendDetailData } from "@/app/friend/[id]/page";

export default function ReportInfo() {
  const [isReport, setClickReport] = useState<boolean>(false);
  const [response, setResponse] = useState<FriendDetailData>();
  const [isLoading, setLoding] = useState<boolean>(true);
  const [isError, setError] = useState<string | null>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFriendDetail(1);
        setResponse(data);
      } catch {
        setError("데이터를 가져오지 못했습니다.");
      } finally {
        setLoding(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setClickReport(true);
  };

  return (
    <div className={styles["main-container"]}>
      {isReport ? (
        <></>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Title name="기본 정보" heading="h2" />
          <Profile
            isDetail={true}
            imgSrc={response?.additional_img_url}
            name={response?.missing_person_name}
            age={response?.missing_person_age}
            gender={response?.missing_person_gender}
            description={response?.missing_person_detail}
            figure={{
              top: response?.missing_person_top_color,
              bottom: response?.missing_person_bottom_color,
            }}
          />
          <Title name="마지막 위치" heading="h2" />
          <KaKaoMap
            isInput={true}
            isMarkLocation={true}
            lng={response?.missing_person_last_location_longitude}
            lat={response?.missing_person_last_location_latitude}
          />
        </>
      )}
      <div onClick={handleClick}>
        <CameraInputComponent />
      </div>
    </div>
  );
}
