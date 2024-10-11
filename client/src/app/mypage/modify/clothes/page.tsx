"use client";
import styles from "./clothes.module.scss";
import Header from "@/components/Header/Header";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import useSafezoneStore from "@/store/useSafeZoneStore";
import Link from "next/link";

export default function Clothes() {
  const { uploadAppearanceInfo, userAppearanceInfo } = useSafezoneStore();
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일 상태 추가

  const [preview, setPreview] = useState<string | null>(null);
  const [top, setTop] = useState<string | null>(null); // 상의
  const [bottom, setBottom] = useState<string | null>(null); // 하의
  const [special, setSpecial] = useState<string | null>(null); // 특이사항
  const router = useRouter();

  // const goBack = () => {
  //   router.back();
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // 이미지 미리보기 설정
      };
      reader.readAsDataURL(file);
      setImageFile(file); // 선택한 파일 저장
    }
  };

  const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTop(String(e.target.value));
  };

  const handleBottomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBottom(String(e.target.value));
  };

  const handleSpecialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecial(String(e.target.value));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !top || !bottom || !special) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 서버로 데이터를 전송하는 로직 추가
    try {
      // API에 보낼 데이터 구조
      const appearanceInfo = {
        top_color: top,
        bottom_color: bottom,
        detail: special,
      };

      // 이미지와 함께 데이터를 전송
      await uploadAppearanceInfo(appearanceInfo, imageFile);

      alert("등록이 완료되었습니다."); // 성공 시 알림 표시
      router.push("/mypage"); // mypage로 이동

      console.log("데이터가 성공적으로 전송되었습니다.");
      // 성공 시 처리 로직 (예: 알림 표시, 페이지 이동)
    } catch (error) {
      console.error("데이터 전송 중 오류 발생:", error);
    }

    // 각 입력 필드를 콘솔에 출력
    console.log("사진 :", imageFile);
    console.log("상의: ", top);
    console.log("하의: ", bottom);
    console.log("특이사항: ", special);

    // 서버로 데이터를 전송하는 로직 추가 예정
  };

  return (
    <div className={styles.container}>
      <Header />
      <Link href="/mypage" className={styles.back}>
        <IoIosArrowBack />
        뒤로가기
      </Link>
      {/* <button onClick={goBack} className={styles.back}>
        <IoIosArrowBack />
        뒤로가기
      </button> */}
      <div className={styles.title}>인상 착의</div>
      <form>
        {/* 사진 입력 폼 */}
        <div className={styles.photo}>
          <div className={styles.insert}>
            <div>사진</div>
            <label htmlFor="photo">
              <AiFillPlusCircle />
            </label>
          </div>
          <input
            type="file"
            id="photo"
            accept="image/*"
            capture="environment" // 모바일 카메라 활성화
            onChange={handleFileChange} // 파일 선택시 호출
          />
          <div
            // className={`${styles.preview} ${preview ? styles.hasImage : ""}`}
            className={`${styles.preview} `}
          >
            {preview ? (
              <img src={preview} alt="사진 미리보기" />
            ) : (
              <span>사진 미리보기</span> // 기본 미리보기 텍스트 (원하는 경우)
            )}
          </div>
        </div>

        <div className={styles.clothe}>
          <label htmlFor="top">상의</label>
          <div>
            <input
              type="string"
              id="top"
              name="top"
              value={top || ""}
              onChange={handleTopChange}
              placeholder=""
            />
          </div>
        </div>
        <div className={styles.clothe}>
          <label htmlFor="bottom">하의</label>
          <div>
            <input
              type="string"
              id="bottom"
              name="bottom"
              value={bottom || ""}
              onChange={handleBottomChange}
              placeholder=""
            />
          </div>
        </div>
        <div className={styles.clothe}>
          <label htmlFor="special">특이사항</label>
          <div>
            <input
              type="string"
              id="special"
              name="special"
              value={special || ""}
              onChange={handleSpecialChange}
              placeholder=""
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitbutton}
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
