import axiosInstance from "@/app/api/axiosInstance";

// 친구 목록을 가져오는 함수
export const fetchFriends = async () => {
  const token = localStorage.getItem("jwt_token");
  try {
    const response = await axiosInstance.get("/users/conditions"); // 친구 API 엔드포인트 수정
    console.log("토큰", token);
    return response.data; // 친구 데이터 반환
  } catch (error) {
    console.log("토큰", token);
    console.error("친구 데이터를 가져오는 중 오류 발생:", error);
    throw error; // 에러를 호출자에게 전달
  }
};
