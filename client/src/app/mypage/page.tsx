"use client";
import styles from "./mypage.module.scss";
import BasicInfo from "./_component/_basicinfo/basicinfo";
import Clothes from "./_component/_clothes/clothes";
import FriendsList from "./_component/_friendslist/friendslist";
import { GoPencil } from "react-icons/go";
import Header from "@/components/Header/Header";
import { useRouter } from "next/navigation";

export default function Mypage() {
  const router = useRouter();

  // 기본정보 수정, 인상착의 등록, 지인정보 수정 페이지로  router
  const goBasicInfoModify = () => {
    router.push("/mypage/modify/basic");
  };
  const goClothesModify = () => {
    router.push("/mypage/modify/clothes");
  };
  const goFriednsList = () => {
    router.push("/mypage/modify/friends");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.title}>
        <div className={styles.padding}>기본 정보</div>
        <button onClick={goBasicInfoModify} className={styles.padding}>
          <GoPencil className={styles.modify} />
        </button>
      </div>
      <BasicInfo />
      <div className={styles.title}>
        인상 착의
        <button onClick={goClothesModify}>
          <GoPencil className={styles.modify} />
        </button>
      </div>
      <Clothes />
      <div className={styles.title}>
        지인 정보
        <button onClick={goFriednsList}>
          <GoPencil className={styles.modify} />
        </button>
      </div>
      <FriendsList />
    </div>
  );
}
