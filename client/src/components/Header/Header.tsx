"use client";

import Link from 'next/link'
import User from '/public/icons/user.svg'
import Logout from '/public/icons/logout.svg'
import Logo from '/public/logo/header.svg'
import styles from "./header.module.scss";
import axiosInstance from '@/app/api/axiosInstance';
import { useUserContext } from '@/hooks/useUserContext';

export default function Header() {
  const { setIsLogged } = useUserContext();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      localStorage.removeItem("jwt_token");
      setIsLogged(false);
    }
  };

  return (
    <header className={styles['header-container']}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.menu}>
          <Link href="/mypage">
            <User />
          </Link>
          {/* 로그아웃 버튼을 Link가 아닌 button으로 변경 */}
          <button className={styles.logoutButton} onClick={handleLogout}>
            <Logout />
          </button>
        </div>
      </div>
    </header>
  );
}
