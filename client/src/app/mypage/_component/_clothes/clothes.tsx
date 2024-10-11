import { useEffect } from "react";
import styles from "./clothes.module.scss";
import useSafezoneStore from "@/store/useSafeZoneStore";

export default function Clothes() {
  const { fetchUserInfo, userAdditionalInfo } = useSafezoneStore();
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={userAdditionalInfo?.appearance_img_url}
        alt="인상착의"
      />
      <div className={styles.box}>
        <div>상의</div>
        <div>{userAdditionalInfo?.top_color}</div>
        <div>하의</div>
        <div>{userAdditionalInfo?.bottom_color}</div>
        <div>특이사항</div>
        <div>{userAdditionalInfo?.detail}</div>
      </div>
    </div>
  );
}
