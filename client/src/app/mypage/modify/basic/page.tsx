"use client";
import styles from "./basic.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Header from "@/components/Header/Header";
import { useRouter } from "next/navigation";

export default function BasicModify() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [height, setHeight] = useState<number | null>(null); // 키 추가

  const goBack = () => {
    router.back();
  };

  // 전화번호 형식 적용
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = e.target.value
      .replace(/[^0-9]/g, "") // 숫자 이외의 문자를 제거
      .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 000-0000-0000 형식으로 변경
    setPhone(formattedPhone);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // 이미지 미리보기 설정
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 각 입력 필드를 콘솔에 출력
    console.log("사진 미리보기:", preview);
    console.log("성별:", selectedGender);
    console.log("키:", height);
    console.log("전화번호:", phone);

    // 서버로 데이터를 전송하는 로직 추가 예정
  };

  return (
    <div className={styles.container}>
      <Header />
      <button onClick={goBack} className={styles.back}>
        <IoIosArrowBack />
        뒤로가기
      </button>
      <div className={styles.title}>기본 정보</div>
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
            // capture="environment" // 모바일 카메라 활성화
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

        <div className={styles.feature}>
          {/* 성별 선택 폼 */}
          <div className={styles.gender}>
            <div>성별</div>
            <div className={styles.box}>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleGenderChange}
              />
              <label htmlFor="male">남성</label>

              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleGenderChange}
              />
              <label htmlFor="female">여성</label>
            </div>
          </div>

          {/* 키 입력 폼 */}
          <div className={styles.height}>
            <label htmlFor="height">키</label>
            <div>
              <input
                type="number"
                id="height"
                name="height"
                value={height || ""}
                onChange={handleHeightChange}
                placeholder=""
              />
              cm
            </div>
          </div>
        </div>

        {/* 전화번호 입력 폼 */}
        <div className={styles.phone}>
          <label htmlFor="phone">전화번호</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="000-000-0000"
            maxLength={12} // 000-000-0000 형식에 맞춤
          />
        </div>

        <button
          type="submit"
          className={styles.submitbutton}
          onClick={handleSubmit}
        >
          수정하기
        </button>
      </form>
    </div>
  );
}
