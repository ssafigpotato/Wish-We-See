import ReportInfo from '@/app/report/[id]/page';
import Header from '@/components/Header/Header'

import styles from "@/app/report/[id]/page.module.scss";
import HeaderArea from "@/components/Header/HeaderArea";

export default function ReportInfoPage () {
  return (
    <>
      <HeaderArea />
      <div className={styles['container']}>
        <Header />
        <ReportInfo />
      </div>
    </>
  )
}