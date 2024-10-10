import axiosInstance from "@/app/api/axiosInstance";

const fetchFriendDetail = async (situation_id: number) => {
  try {
    const response = await axiosInstance.get(`/missing-persons?situation_id=${situation_id}`);
    console.log("서버 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("GET 요청 오류:", error);
    throw error;
  }
};

export default fetchFriendDetail;
