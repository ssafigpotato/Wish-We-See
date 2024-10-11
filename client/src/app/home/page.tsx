"use client";
import styles from "./home.module.scss";
import SensorStatus from "./_component/_sensor/sensor";
import FriendsStatus from "./_component/_friends/friends";
import ReactKakaoMap from "./_component/_map/kakaomap";
import Missing from "./_component/_missinglist/missinglist";
import useSafezoneStore from "@/store/useSafeZoneStore";
import { useEffect, useState } from "react";

export default function Main() {
  const { fetchUserInfo, isSafezone } = useSafezoneStore();
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <div className={styles.sensor}>
          <div className={styles.title}>센서상태</div>
          <SensorStatus />
        </div>
        <div className={styles.friends}>
          <div className={styles.title}>지인상태</div>
          <FriendsStatus />
        </div>
      </div>
      <div className={styles.location}>
        <div className={styles.title}>현재 내 위치</div>
        <div className={styles.box}>
          <div className={styles.reallocation}>강남구 역삼동 근처</div>
          <div
            className={
              styles.safezone + (isSafezone ? "" : ` ${styles.warning}`)
            }
          >
            {isSafezone ? "안전" : "안전 유의 지역 진입"}
          </div>
        </div>
        <div className={styles.map}>
          <ReactKakaoMap />
        </div>
      </div>
      <div className={styles.missinglist}>
        <div className={styles.title}> 실종자 정보 목록</div>
        <div className={styles.info}>
          {/* 추후 API연결시 목록의 개수로 가져와야함  */}
        </div>
        <Missing />
      </div>
    </div>
  );
}
