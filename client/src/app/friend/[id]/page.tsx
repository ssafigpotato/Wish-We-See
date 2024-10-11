"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import KakaoMap from "@/components/Map/KakaoMap";
import Profile from "@/components/Profile/Profile";
import Title from "@/components/Title/Title";
import Button from "@/app/friend/_component/Button/Button";
import ButtonContainer from "@/app/friend/_component/Button/ButtonContainer";
import styles from "@/app/friend/[id]/page.module.scss";
import fetchFriendDetail from "@/app/friend/_component/FriendDetailFetch";
import fetchReportExit from "@/app/friend/_component/FriendReportExitFetch";

export interface FriendDetailData {
  missing_person_id: number;
  missing_person_face_img: string;
  missing_person_name: string;
  missing_person_gender: string;
  missing_person_age: number;
  missing_person_top_color: string;
  missing_person_bottom_color: string;
  missing_person_detail: string;
  missing_person_last_location_latitude: number;
  missing_person_last_location_longitude: number;
  additional_info: string;
  additional_img_url: string;
  created_at: string;
  situation_id: number;
}

export default function FreindInfo() {
  const emergence: number = 3;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); // 현재 경로 가져오기
  const [situation_id, setSituationId] = useState<string | null>(null); // URL에서 추출한 ID 값 저장
  const [id, setId] = useState<string | null>(null); // URL에서 추출한 ID 값 저장
  const [response, setResponse] = useState<FriendDetailData>();
  const [isLoading, setLoding] = useState<boolean>(true);
  const [isError, setError] = useState<string | null>("");

  useEffect(() => {
    const paramData = searchParams.get("situation_id");
    setSituationId(paramData);
    const pathSegments = pathname.split("?")[0].split("/");
    const idFromPath = pathSegments[pathSegments.length - 1];
    setId(idFromPath); // URL의 마지막 부분에서 id 추출
  }, [pathname, searchParams]);

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
  },[]);

  const handleClickNext = () => {
    router.push(`/friend/add/${id}`);
  };

  const handleClickExit = () => {
    const fetchExit = async () => {
      try {
        const data = await fetchReportExit(Number(id));
        if (data) {
          router.push("/");
        } else {
          console.log("데이터 전송 오류");
        }
      } catch (error) {
        console.error("데이터 전송 실패:", error);
      }
    };

    fetchExit();
  };
  const handleClickReport = () => {
    const ok = confirm("경찰에 신고하시겠습니까?");
    if (ok) {
      alert("신고가 완료되었습니다.");
      router.push("/");
    }
  };
  const handleClickReportList = () => {
    router.push(`/friend/report?situation_id=${situation_id}`);
  };

  return (
    <div className={styles["main-container"]}>
      <Title name="기본 정보" heading="h2" />
      {isLoading ? (
        <p>Loading..</p>
      ) : (
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
      )}
      {emergence === 2 ? (
        <>
          <Title name="마지막 위치" heading="h2" />
          <KakaoMap isMarkLegend={true} isMarkLocation={true} />
          <ButtonContainer>
            <Button color="red" title="종료" onClick={handleClickExit} />
            <Button color="blue" title="다음 단계" onClick={handleClickNext} />
          </ButtonContainer>
        </>
      ) : emergence === 3 ? (
        <>
          <Title name="예상 위치" heading="h2" />
          <KakaoMap
            isMarkLegend={true}
            isMarkLocation={true}
            isInput={true}
            lng={response?.missing_person_last_location_longitude}
            lat={response?.missing_person_last_location_latitude}
          />
          <div className={styles["button-gap"]}>
            <ButtonContainer>
              <Button color="red" title="종료" onClick={handleClickExit} />
              <Button
                color="blue"
                title="경찰 신고"
                iconName="emergency"
                onClick={handleClickReport}
              />
            </ButtonContainer>
            <ButtonContainer>
              <Button
                color="light-blue"
                title="제보 목록"
                onClick={handleClickReportList}
              />
            </ButtonContainer>
          </div>
        </>
      ) : emergence === 4 ? (
        <div className={styles["button-gap"]}>
          <ButtonContainer>
            <Button
              color="light-blue"
              title="제보 목록"
              onClick={handleClickReportList}
            />
          </ButtonContainer>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
