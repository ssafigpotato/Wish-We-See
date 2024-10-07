"use client";

import styles from "./page.module.scss";
import Main from "./home/page";
import { usePermissions } from "@/hooks/usePermissions";

export default function Home() {

  usePermissions();

  return (
    <div className={styles.test}>
      <Main></Main>
    </div>
  );
}
