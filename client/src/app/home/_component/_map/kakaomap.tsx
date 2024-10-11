"use client";

import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from "./kakaomap.module.scss";
import getLocation from "@/utils/getLocation";

const ReactKakaoMap = () => {
  // 현 위치 불러오기
  const [currentCoords, setCurrentCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const currentLocation = async () => {
    try {
      const position = await getLocation(); // 위치 정보 요청
      if (position) {
        const { latitude, longitude } = position.coords; // 위도 경도
        setCurrentCoords({ lat: latitude, lng: longitude });
        console.log(`현재 위치: 위도 ${latitude}, 경도 ${longitude}`);
      } else {
        console.log("위치 정보를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("위치 정보를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    currentLocation();
  }, []);

  // 카카오맵 불러오기
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      setScriptLoad(true);
    });
  }, []);

  return (
    <div className={styles.container}>
      {scriptLoad && currentCoords ? (
        // 추후 센터에 현재 위치 위도 경도 불러와야함
        <Map
          center={{ lat: currentCoords.lat, lng: currentCoords.lng }}
          style={{ width: "22.5rem", height: "20rem" }}
          level={3}
        >
          <MapMarker
            position={{ lat: currentCoords.lat, lng: currentCoords.lng }}
          />
        </Map>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ReactKakaoMap;
