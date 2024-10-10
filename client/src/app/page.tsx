"use client";

import styles from "./page.module.scss";
import Main from "./home/page";
import Header from "@/components/Header/Header"
import HeaderArea from "@/components/Header/HeaderArea";

export default function App() {

  return (
    <>
      <HeaderArea />
      <div className={styles.test}>
        <Header />
        <Main></Main>
      </div>
    </>
  );
}
