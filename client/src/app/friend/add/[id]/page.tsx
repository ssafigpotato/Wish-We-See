"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile/Profile";
import Title from "@/components/Title/Title";
import Button from "@/app/friend/_component/Button/Button";
import ButtonContainer from "@/app/friend/_component/Button/ButtonContainer";
import PhotoUpload from "@/app/friend/_component/PhotoUpload/PhotoUpload";
import styles from "@/app/friend/add/[id]/page.module.scss";
import postData from "@/app/friend/_component/PhotoUpload/PhotoUploadFetch";
import fetchFriendDetail from "@/app/friend/_component/FriendDetailFetch";
import { FriendDetailData } from "@/app/friend/[id]/page";

export default function FriendInfoAdd() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
  const [id, setId] = useState<string | null>(null); // URL에서 추출한 ID 값 저장
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택된 파일
  const [description, setDescription] = useState(""); // 특이사항
  const [response, setResponse] = useState<FriendDetailData>();
  const [isLoading, setLoding] = useState<boolean>(true);
  const [isError, setError] = useState<string | null>("");

  // 클라이언트 사이드에서만 id 값을 설정
  useEffect(() => {
    const pathSegments = pathname.split("/");
    const idFromPath = pathSegments[pathSegments.length - 1];
    setId(idFromPath); // URL의 마지막 부분에서 id 추출
  }, [pathname]);

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

  const handleFileUpload = (file: File) => {
    setSelectedFile(file); // 파일 상태 저장
  };

  const handleClickCancel = () => {
    router.back()
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("최근 이미지를 등록해주세요!");
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    const additionalContent = {
      missing_person_id: id,
      additional_content: description,
    };
    formData.append("additional_info", JSON.stringify(additionalContent)); // 특이사항 추가
    formData.append("additional_image", selectedFile); // 이미지 파일 추가

    try {
      const response = await postData(formData); // postData 함수로 데이터 전송
      if (response) {
        router.push(`/friend/${id}`);
      }
    } catch (error) {
      console.error("데이터 전송 실패:", error);
    }
  };

  return (
    <div className={styles["main-container"]}>
      <Title name="추가 정보 입력" heading="h1" />
      <Title name="기본 정보" heading="h2" />
      <Profile
        isDetail={false}
        imgSrc={response?.additional_img_url}
        name={response?.missing_person_name}
        age={response?.missing_person_age}
        gender={response?.missing_person_gender}
      />
      <Title name="최근 사진 등록" heading="h2" />
      <PhotoUpload onFileUpload={handleFileUpload} />{" "}
      {/* PhotoUpload에서 파일 가져오기 */}
      <Title name="특이사항" heading="h2" />
      <textarea
        placeholder="특이사항(선택)"
        className={styles["description"]}
        value={description}
        onChange={(e) => setDescription(e.target.value)} // 특이사항 저장
      />
      <ButtonContainer>
        <Button
          color="red"
          title="취소"
          onClick={handleClickCancel}
        />
        <Button color="blue" title="진행" onClick={handleSubmit} />{" "}
        {/* handleSubmit을 onClick에 연결 */}
      </ButtonContainer>
    </div>
  );
}
