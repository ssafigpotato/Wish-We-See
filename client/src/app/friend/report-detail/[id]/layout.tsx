import Header from "@/components/Header/Header";

import styles from "./page.module.scss";
import HeaderArea from "@/components/Header/HeaderArea";
import ReportDetailPage from "./page";

export default function ReportDetailLayout() {
  return (
    <>
      <HeaderArea />
      <div className={styles["container"]}>
        <Header />
        <ReportDetailPage />
      </div>
    </>
  );
}
