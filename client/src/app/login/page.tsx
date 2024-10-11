"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import LoginInput from "@/components/LoginInput";
import axiosInstance from "../api/axiosInstance";
import { usePermissions } from "@/hooks/usePermissions";
import { useUserContext } from "@/hooks/useUserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "/public/logo/logo.svg";

export default function Login() {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const { isLogged, setIsLogged } = useUserContext();
  const token = localStorage.getItem("fcm");
  const router = useRouter();

  usePermissions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    if (token) {
      try {
        const response = await axiosInstance.post("/users/login", {
          login_id: formData.id,
          password: formData.password,
          fcm_token: token,
        });

        // 로그인 성공 시 처리 로직
        if (response.status === 200) {
          localStorage.setItem("jwt_token", response.data.access_token);
          setIsLogged(true);
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("알림 설정을 하지 않으면 서비스를 이용할 수 없습니다.");
    }
  };

  // isLogged가 변경될 때마다 확인하여 리다이렉트
  useEffect(() => {
    if (isLogged) {
      router.push("/");
    }
  }, [isLogged, router]);

  return (
    <main className={styles.container}>
      <Logo />
      <form onSubmit={handleLogin}>
        <LoginInput
          type="user"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          placeholder="아이디"
        />
        <LoginInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="비밀번호"
        />
        <div className={styles.action}>
          <button className={styles["login-button"]} type="submit">
            로그인
          </button>
          <Link href={"/"} className={styles.action__register}>
            회원가입
          </Link>
        </div>
      </form>
    </main>
  );
}
