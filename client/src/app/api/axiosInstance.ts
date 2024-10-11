import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://j11a202.p.ssafy.io/api", // API의 기본 URL
  headers: {
    "Content-Type": "application/json", // 기본 헤더 설정
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage에서 JWT 토큰 가져오기
    const token = localStorage.getItem("jwt_token");

    // 토큰이 존재하면 Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정 (선택 사항)
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터 반환
    return response;
  },
  (error) => {
    // JWT 토큰 만료 또는 인증 오류 처리
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirecting to login");
      // 로그인 페이지로 리디렉션 또는 로그아웃 처리 등
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
