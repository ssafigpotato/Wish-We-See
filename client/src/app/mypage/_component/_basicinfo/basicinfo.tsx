import styles from "./basicinfo.module.scss";
import useSafezoneStore from "@/store/useSafeZoneStore";
import { useState, useEffect } from "react";

export default function BasicInfo() {
  const { userBasicInfo, fetchUserInfo } = useSafezoneStore();
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div>
      {userBasicInfo ? (
        <div className={styles.container}>
          <img
            className={styles.img}
            src={userBasicInfo.face_img}
            alt="기본사진"
          />
          <div className={styles.info}>
            <div>이름</div>
            {/* 2,4,6애는 각각 로그인한 사용자의 정보를 불러와야함 */}
            <div>{userBasicInfo.name}</div>
            <div>성별</div>
            <div>{userBasicInfo.gender}</div>
            <div>나이</div>
            <div>{userBasicInfo.age}</div>
          </div>
        </div>
      ) : (
        <p>사용자 기본 정보를 불러오는 중...</p>
      )}
    </div>
  );
}
