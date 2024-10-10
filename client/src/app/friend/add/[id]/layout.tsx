import FreindInfoAdd from "@/app/friend/add/[id]/page";
import Header from "@/components/Header/Header";

import styles from "@/app/friend/add/[id]/page.module.scss";
import HeaderArea from "@/components/Header/HeaderArea";

export default function FreindInfoAddPage() {
  return (
    <>
      <HeaderArea />
      <div className={styles["container"]}>
        <Header />
        <FreindInfoAdd />
      </div>
    </>
  );
}
