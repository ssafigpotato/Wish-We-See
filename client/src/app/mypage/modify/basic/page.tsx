import styles from "./basic.module.scss";
import { FaArrowLeft } from "react-icons/fa";

export default function BasicModify() {
  return (
    <div className={styles.container}>
      <button>
        <FaArrowLeft />
        뒤로가기
      </button>
      <div className={styles.title}>기본 정보</div>
      <div>사진</div>
      <div>사진 입력 폼</div>
      <div>성별 폼</div>
      <div>키 폼</div>
      <div>전화번호</div>
    </div>
  );
}
