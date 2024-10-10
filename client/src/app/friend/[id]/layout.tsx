import FreindInfo from "@/app/friend/[id]/page";
import Header from '@/components/Header/Header'

import styles from "@/app/friend/[id]/page.module.scss";
import HeaderArea from "@/components/Header/HeaderArea";

export default function FreindInfoPage () {
  return (
    <>
      <HeaderArea />
      <div className={styles['container']}>
        <Header />
        <FreindInfo />
      </div>
    </>
  )
}