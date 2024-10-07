import styles from "@/app/friend/[id]/page.module.scss";

export default function Button() {
  return (
    <div className={styles['button-container']}>
      <div className={styles['red-button']}>종료</div>
      <div className={styles['blue-button']}>다음 단계</div>
    </div>
  )
}