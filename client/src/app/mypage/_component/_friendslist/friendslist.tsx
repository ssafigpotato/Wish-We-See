import styles from "./friendslist.module.scss";
import useSafezoneStore from "@/store/useSafeZoneStore";
import { useEffect, useState } from "react";

export default function FriendsList() {
  const { fetchUserInfo, userContactInfo } = useSafezoneStore();
  // 데이터를 API에서 받아오기
  useEffect(() => {
    fetchUserInfo(); // 컴포넌트가 렌더링될 때 사용자 정보 가져오기
  }, [fetchUserInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>이름</div>
        <div>전화번호</div>
      </div>
      {userContactInfo ? (
        userContactInfo.map((friend, index) => (
          <div key={index} className={styles.person}>
            <div>{friend.receiver_name}</div>
            <span>{friend.receiver_phone}</span>
          </div>
        ))
      ) : (
        <p>등록된 지인이 없습니다.</p>
      )}
    </div>
  );
}
