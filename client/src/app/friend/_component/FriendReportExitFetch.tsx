import axiosInstance from "@/app/api/axiosInstance";


const fetchReportExit = async (id:number) => {
  try {
    const response = await axiosInstance.post('/missing-persons/add', {
      user_id : id
    })
    console.log('서버 응답:', response.status);
    return response.status === 201;
  } catch (error) {
    console.error('POST 요청 오류:', error);
    throw error;
  }
};

export default fetchReportExit;
