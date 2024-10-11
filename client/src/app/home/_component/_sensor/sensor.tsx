import styles from "./sensor.module.scss";
import { usePermissions } from "@/hooks/usePermissions";
import { useState, useEffect } from "react";

// Sensor 인터페이스 정의
interface Sensor {
  name: string;
  isGranted: boolean;
}

export default function SensorStatus() {
  const [micPermissionGranted, setMicPermissionGranted] = useState(false); // 마이크
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false); //위치
  const [gyroPermissionGranted, setGyroPermissionGranted] = useState(false); // 센서
  const [accelPermissionGranted, setAccelPermissionGranted] = useState(false); // 센서

  usePermissions(); // 훅 호출

  useEffect(() => {
    // 마이크 권한 상태 로컬스토리지에서 불러옴
    const micPermission = localStorage.getItem("micPermissionGranted");
    setMicPermissionGranted(micPermission === "true");

    // 위치 권한 상태 체크
    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((result) => {
          setLocationPermissionGranted(result.state === "granted");
        });
    }

    // 자이로 센서 권한 상태 체크
    const checkGyroPermissions = async () => {
      try {
        const motionPermission = await (
          DeviceMotionEvent as any
        ).requestPermission?.();

        if (
          motionPermission === "granted"
          // orientationPermission === "granted"
        ) {
          setGyroPermissionGranted(true);
        }
      } catch (error) {
        console.error("센서 권한 상태 확인 중 오류:", error);
      }
    };

    // 가속도 센서 권한 상태 체크
    const checkAccelPermissions = async () => {
      try {
        const orientationPermission = await (
          DeviceOrientationEvent as any
        ).requestPermission?.();
        if (
          // motionPermission === "granted"
          orientationPermission === "granted"
        ) {
          setAccelPermissionGranted(true);
        }
      } catch (error) {
        console.error("센서 권한 상태 확인 중 오류:", error);
      }
    };

    checkGyroPermissions();
    checkAccelPermissions();
  }, []);

  // 권한 정보 담은 배열
  const sensors: Sensor[] = [
    { name: "마이크", isGranted: micPermissionGranted },
    { name: "위치센서", isGranted: locationPermissionGranted },
    { name: "자이로센서", isGranted: gyroPermissionGranted },
    { name: "가속도센서", isGranted: accelPermissionGranted },
  ];

  return (
    <div className={styles.container}>
      {sensors.map((sensor, index) => (
        <div key={index} className={styles.sensorbox}>
          <div className={styles.title}>{sensor.name}</div>
          <div className={styles.box}>
            <div
              className={`${styles.light} ${
                sensor.isGranted ? styles.greenLight : styles.redLight
              }`}
            ></div>
            <div className={styles.goodorbad}>
              {sensor.isGranted ? "좋음" : "나쁨"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
