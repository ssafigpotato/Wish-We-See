import React from "react";
import styles from "./index.module.scss";
import { CiUser, CiLock } from "react-icons/ci";

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "user" | "password";
}

export default function LoginInput({ type = "password", ...props }: LoginInputProps) {
  return (
    <div className={styles.container}>
      {type === "password" ? <CiLock size="32px" /> : <CiUser size="32px" />}
      <input className={styles.input} type={type === "password" ? "password" : "text"} {...props} />
    </div>
  );
}
