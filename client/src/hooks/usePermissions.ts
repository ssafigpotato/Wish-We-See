import { useEffect, useState } from "react";
import { getMessagingInstance } from "@/utils/initFirebase";
import { onMessage, getToken, Messaging } from "firebase/messaging";

export const usePermissions = () => {
  const [micPermissionRequested, setMicPermissionRequested] = useState(false);

  useEffect(() => {
    // 서비스 워커 등록
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker 등록 성공:", registration);
        })
        .catch((error) => {
          console.error("Service Worker 등록 실패:", error);
        });
    }

    const requestFcmToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const messagingInstance: Messaging | null = await getMessagingInstance();
          if (messagingInstance) {
            const token = await getToken(messagingInstance, {
              vapidKey:
                "BHZJ3_Qer_rw0EvUNHlzrTCt4JICXvebxI39KBLKcY5Op1SEqa-cCeETvlemPs3oZDVcwLjIBURscp0NX5-xGOc",
            });
            localStorage.setItem("fcm", token);
          } else {
            console.error("Messaging 인스턴스를 생성할 수 없습니다.");
          }
        } catch (error) {
          console.error("FCM 토큰을 가져오는 중 오류 발생:", error);
        }
      } else {
        console.warn("알림 권한이 거부되었습니다.");
      }
    };

    requestFcmToken();
  }, []);

  useEffect(() => {
    const listenForMessages = async () => {
      const messagingInstance: Messaging | null = await getMessagingInstance();
      if (messagingInstance) {
        onMessage(messagingInstance, (payload) => {
          console.log("포그라운드 메시지 수신:", payload);
          const serviceName = "위시";
          const notificationTitle = `${serviceName} - ${
            payload.notification?.title || "알림"
          }`;
          const notificationOptions = {
            body: payload.notification?.body || "새로운 알림이 도착했습니다.",
            icon: payload.notification?.image || "/logo.svg", // 기본 아이콘 설정
            badge: "/logo.svg", // 뱃지 아이콘 설정 (선택 사항)
            data: {
              url: payload.data?.click_action || "/", // 클릭 시 이동할 URL 포함
            },
            tag: payload.notification?.title || "default-tag", // 중복 알림 방지용 태그 설정
          };

          if (Notification.permission === "granted" && navigator.serviceWorker) {
            navigator.serviceWorker.ready.then((registration) => {
              registration.showNotification(notificationTitle, notificationOptions);
            });
          } else {
            console.warn("Notification permission is not granted.");
          }
        });
      }
    };

    listenForMessages();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // 위치 권한 요청
        if ("permissions" in navigator) {
          const locationPermission = await navigator.permissions.query({
            name: "geolocation" as PermissionName,
          });
          if (locationPermission.state !== "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log("위치 권한 허용됨:", position);
              },
              (error) => {
                console.error("위치 권한 거부됨:", error);
              }
            );
          } else {
            console.log("위치 권한 이미 허용됨");
          }
        }

        // 자이로/가속도 센서 권한 요청 (iOS Safari의 경우)
        if (
          typeof DeviceMotionEvent !== "undefined" &&
          typeof (DeviceMotionEvent as any).requestPermission === "function"
        ) {
          try {
            const motionPermissionStatus = await (
              DeviceMotionEvent as any
            ).requestPermission();
            if (motionPermissionStatus === "granted") {
              console.log("가속도 센서 권한 허용됨");
            } else {
              console.error("가속도 센서 권한 거부됨");
            }
          } catch (error) {
            console.error("가속도 센서 권한 요청 중 오류:", error);
          }
        }

        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          typeof (DeviceOrientationEvent as any).requestPermission ===
            "function"
        ) {
          try {
            const orientationPermissionStatus = await (
              DeviceOrientationEvent as any
            ).requestPermission();
            if (orientationPermissionStatus === "granted") {
              console.log("자이로 센서 권한 허용됨");
            } else {
              console.error("자이로 센서 권한 거부됨");
            }
          } catch (error) {
            console.error("자이로 센서 권한 요청 중 오류:", error);
          }
        }

        // 음성 녹음 권한 요청
        if (
          !micPermissionRequested &&
          "mediaDevices" in navigator &&
          navigator.mediaDevices.getUserMedia
        ) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            console.log("음성 녹음 권한 허용됨");
            stream.getTracks().forEach((track) => track.stop());
            setMicPermissionRequested(true);
            localStorage.setItem("micPermissionGranted", "true");
          } catch (error) {
            console.error("음성 녹음 권한 거부됨:", error);
          }
        } else {
          console.log("음성 녹음 권한 이미 요청됨");
        }
      } catch (error) {
        console.error("권한 요청 중 오류 발생:", error);
      }
    };

    const micPermissionFromStorage = localStorage.getItem("micPermissionGranted");
    if (micPermissionFromStorage === "true") {
      setMicPermissionRequested(true);
    }

    requestPermissions();
  }, [micPermissionRequested]);
};
