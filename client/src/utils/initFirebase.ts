import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyBbhjkoB6zMvvZeNziBNpUt_f8vuPclxPM",
  authDomain: "missing-f99bf.firebaseapp.com",
  projectId: "missing-f99bf",
  storageBucket: "missing-f99bf.appspot.com",
  messagingSenderId: "816803031689",
  appId: "1:816803031689:web:59c7e6446a5638587e3458",
  measurementId: "G-22SLLTV3PR",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Messaging 초기화
export const getMessagingInstance = async () => {
  const supported = await isSupported();
  if (supported) {
    return getMessaging(app);
  }
  console.warn("Firebase Messaging을 지원하지 않는 브라우저입니다.");
  return null;
};
