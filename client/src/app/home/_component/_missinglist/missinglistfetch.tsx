import axiosInstance from "@/app/api/axiosInstance";

// 실종자 목록을 가져오는 함수
export const fetchMissing = async () => {
  try {
    const response = await axiosInstance.get("/missing-persons/all"); // 실종자 목록
    console.log(response);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("실종자 데이터를 가져오는 중 오류 발생:", error);
    throw error; // 에러를 호출자에게 전달
  }
};
