import styles from "./clothes.module.scss";

export default function Clothes() {
  return (
    <div className={styles.container}>
      <img className={styles.img} src="./" alt="인상착의" />
      <div className={styles.box}>
        <div>상의</div>
        <div>주황색 외투</div>
        <div>하의</div>
        <div>초록색 바지</div>
        <div>특이사항</div>
        <div>오늘 양말 거꾸로 신음</div>
      </div>
    </div>
  );
}
