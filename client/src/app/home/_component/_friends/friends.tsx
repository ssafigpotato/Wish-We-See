"use client";
import styles from "./friends.module.scss";
import { fetchFriends } from "./fiendsfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FriendsStatusProps {
  name?: string;
  face_img_url?: string;
  dangerous_level: number;
  $color: "red" | "blue" | "yellow";
  situation_id: number;
}

export default function FriendsStatus(): JSX.Element {
  const [friends, setFriends] = useState<FriendsStatusProps[]>([]); // 친구 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const router = useRouter();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsData = await fetchFriends(); // 친구 데이터 가져오기
        console.log("친구 데이터",friendsData)
        setFriends(friendsData); // 친구 상태 업데이트
        // console.log("사진", face_img_url);
        // console.log("이름", name);
        // console.log("위험레벨", dangerous_level);
      } catch (error) {
        setError("데이터를 가져오는 데 실패했습니다."); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    getFriends(); // 친구 데이터 가져오기 호출
  }, []);

  // 지인상태 상세정보로 넘어가는 함수
  const goFriendsDetail = (situation_id: number): void => {
    router.push(`/friend/${situation_id}`);
  };

  return (
    <div>
      {friends.map((friend, index) => {
        let color;
        if (friend.dangerous_level === 0) {
          color = "blue"; // 안전
        } else if (friend.dangerous_level === 1) {
          color = "yellow"; // 의심
        } else {
          color = "red"; // 위험 (2단계 이상)
        }

        const FriendsClass = `${styles.friends} ${styles[color]}`;

        return (
          // 추후 onClick 이벤트 넣고, id와 situation_id에 해당하는 값 넣어주기!
          <button className={FriendsClass} key={index} onClick={() => goFriendsDetail(friend.situation_id)}>
            <img
              className={styles.img}
              src={friend.face_img_url}
              alt={friend.name}
            />
            <div className={styles.name}>{friend.name}</div>
            <div className={styles.status}>
              {friend.dangerous_level === 0
                ? "안전"
                : friend.dangerous_level === 1
                ? "의심"
                : "위급"}
            </div>
          </button>
        );
      })}
    </div>
  );
}
