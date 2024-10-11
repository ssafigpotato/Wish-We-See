import axiosInstance from "@/app/api/axiosInstance";

// interface PostData {
//   additional_info:Info;
//   additional_image:File;
// }

// export interface Info {
//   missing_person_id:number;
//   additional_content:string;
// }

const postData = async (data: FormData) => {
  try {
    const response = await axiosInstance.post('/missing-persons/add', data, {
      headers: {
        'Content-Type': 'multipart/form-data',  // multipart/form-data로 설정
      }});
    console.log('서버 응답:', response.status);
    return response.status === 201;
  } catch (error) {
    console.error('POST 요청 오류:', error);
    throw error;
  }
};

export default postData;
