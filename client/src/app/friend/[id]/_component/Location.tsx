import Map from "@/app/friend/[id]/_component/Map"

import styles from "@/app/friend/[id]/page.module.scss";
export default function Location () {
  return (
    <div className={styles['location-container']}>
      <div className={styles['location-info']}>
        <p className={styles['location-text']}>강남구 역삼동 근처</p>
        <p className={styles['location']}>마지막 위치</p>
      </div>
      <Map />
    </div>
  )
}