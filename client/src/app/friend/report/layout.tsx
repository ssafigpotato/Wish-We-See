import FreindReportList from "@/app/friend/report/page";
import Header from "@/components/Header/Header";

import styles from "@/app/friend/report/page.module.scss";
import HeaderArea from "@/components/Header/HeaderArea";

export default function FreindReportListPage() {
  return (
    <>
      <HeaderArea />
      <div className={styles["container"]}>
        <Header />
        <FreindReportList />
      </div>
    </>
  );
}
