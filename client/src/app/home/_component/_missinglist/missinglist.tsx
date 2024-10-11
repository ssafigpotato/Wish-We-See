"use client";
import styles from "./missinglist.module.scss";
import { GoArrowRight } from "react-icons/go";
import { fetchMissing } from "./missinglistfetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MissingData {
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
  created_at: string;
}

export default function Missing() {
  const [missingData, setMissingData] = useState<MissingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMissing();
        setMissingData(data); // 가져온 데이터를 state에 설정
        console.log(data);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        setError("실종자 정보를 가져오는 데 오류가 발생했습니다."); // 오류 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData(); // 데이터 가져오기 호출
  }, []); // 빈 배열로 인해 컴포넌트가 처음 렌더링될 때만 호출

  const goReport = (id: number): void => {
    router.push(`/report/${id}}`);
  };
  // const createdAt = new Date(missingData.created_at);
  return (
    <div>
      <div className={styles.len}>전체({missingData.length})</div>
      {missingData.map((data) => (
        <div className={styles.container} key={data.missing_person_id}>
          <img
            className={styles.img}
            src={data.missing_person_face_img}
            alt="실종자이미지"
          />
          <div className={styles.info}>
            <div className={styles.basic}>
              <div>{data.missing_person_name}</div>
              <div>
                {data.missing_person_gender} / {data.missing_person_age}
              </div>
            </div>
            <div>
              <div className={`${styles.clothes} ${styles.top}`}>
                {data.missing_person_top_color}
              </div>
              <div className={`${styles.clothes} ${styles.bottom}`}>
                {data.missing_person_bottom_color}
              </div>
            </div>
            <div className={styles.detail}>
              <div>특이사항</div>
              <div>{data.missing_person_detail}</div>
              <div>발생일자</div>
              <div>{data.created_at}</div>
              <div>발생위치</div>
              <div>
                서울시 강남구 역삼동
                {/* {data.missing_person_last_location_latitude},{" "}
                {data.missing_person_last_location_longitude} */}
              </div>
            </div>
          </div>
          {/* 추후 routerpush 추가해줘야함 */}
          <button
            className={styles.btn}
            onClick={() => goReport(data.missing_person_id)}
          >
            상세보기
            <GoArrowRight />
          </button>
        </div>
      ))}
    </div>
  );
}
