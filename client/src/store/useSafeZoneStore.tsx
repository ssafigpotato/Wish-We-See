import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "@/app/api/axiosInstance";

// user기본정보
interface UserBasicInfo {
  name: string;
  gender: string;
  age: number;
  address: string;
  height: number;
  phone: string;
  user_id: number;
  login_id: string;
  face_img: string;
}

// 유저추가정보(인상착의)
interface UserAdditionalInfo {
  detail: string;
  user_id: number;
  appearance_img_url: string;
  top_color: string;
  bottom_color: string;
}
// 유저 지인정보
interface UserContactInfo {
  contact_id: number;
  receiver_name: string;
  receiver_phone: string;
}

// 유저 외관 정보 (인상착의)
interface UserAppearanceInfo {
  top_color: string;
  bottom_color: string;
  detail: string;
}

interface SafezoneState {
  isSafezone: boolean;
  userBasicInfo: UserBasicInfo | null;
  userAdditionalInfo: UserAdditionalInfo | null;
  userContactInfo: UserContactInfo[] | null;

  userAppearanceInfo: UserAppearanceInfo | null;
  uploadAppearanceInfo: (
    // 외관 정보와 이미지를 업로드하는 함수
    info: UserAppearanceInfo,
    imageFile: File
  ) => Promise<void>;

  setSafezone: (value: boolean) => void;
  fetchUserInfo: () => Promise<void>; // API를 호출하여 사용자 정보를 가져오는 함수
}

const useSafezoneStore = create<SafezoneState>()(
  persist(
    (set) => ({
      isSafezone: true, // 기본값을 true로 설정
      userBasicInfo: null, // 유저 기본 정보 초기값
      userAdditionalInfo: null, // 유저 추가 정보 초기값
      userContactInfo: null, // 유저 연락처 정보 초기값
      userAppearanceInfo: null,

      setSafezone: (value: boolean) => set({ isSafezone: value }),

      // 유저 정보 가져오기
      fetchUserInfo: async () => {
        try {
          const response = await axiosInstance.get("/users");
          const { user_basic_info, user_additional_info, user_contact_info } =
            response.data;

          // 받아온 데이터를 상태에 저장
          set({
            userBasicInfo: user_basic_info,
            userAdditionalInfo: user_additional_info,
            userContactInfo: user_contact_info,
            // 추가 정보에 따라 isSafezone 업데이트
            // null 일때 true, null이 아닐 때 false로 할 거야
            isSafezone: user_additional_info ? false : true,
          });
          console.log(response);
        } catch (error) {
          console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
          throw error;
        }
      },

      // 외관 정보와 이미지를 업로드하는 함수
      uploadAppearanceInfo: async (
        info: UserAppearanceInfo,
        imageFile: File
      ) => {
        const formData = new FormData();

        // JSON 데이터를 formData에 추가
        formData.append(
          "appearance_detail",
          JSON.stringify({
            top_color: info.top_color,
            bottom_color: info.bottom_color,
            detail: info.detail,
          })
        );

        // 이미지 파일을 formData에 추가
        formData.append("appearance_image", imageFile);

        try {
          const response = await axiosInstance.post(
            "/users/appearances",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // multipart 형식으로 전송
              },
            }
          );

          // 요청 성공 시 상태 업데이트 (필요시)
          set({ userAppearanceInfo: info });
          console.log("사용자 외관 정보 업로드 성공:", response.data);
        } catch (error) {
          console.error("사용자 외관 정보 업로드 중 오류 발생:", error);
          throw error;
        }
      },
    }),
    {
      name: "safezone-storage", // localStorage에 저장될 key 이름
      partialize: (state) => ({ isSafezone: state.isSafezone }), // isSafezone만 저장
    }
  )
);

export default useSafezoneStore;
