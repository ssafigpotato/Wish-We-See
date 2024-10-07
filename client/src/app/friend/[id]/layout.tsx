import FreindInfo from "@/app/friend/[id]/page";
import Header from '@/app/friend/[id]/_component/Header'

import styles from "@/app/friend/[id]/page.module.scss";

export default function FreindInfoPage () {
  return (
    <div className={styles['container']}>
      <Header />
      <FreindInfo />
    </div>
  )
}