import styles from "./mypage.module.scss";
import BasicInfo from "./_component/_basicinfo/basicinfo";

export default function Mypage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>기본 정보</div>
      <BasicInfo />

      <div className={styles.title}>인상 착의</div>
      <div> 인상착의 카드 </div>
      <div className={styles.title}>지인 정보</div>
      <div>이름 전화번호~~</div>
    </div>
  );
}
