"use client";

import React, { ReactNode, createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserContextProps {
  userName: string | null;
  isLogged: boolean;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 초기 로그인 상태를 로컬 스토리지에서 확인
    const storedToken = localStorage.getItem("jwt_token");

    if (storedToken) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }

    setLoading(false); // 로딩 완료
  }, []);

  useEffect(() => {
    // 로그인되지 않았을 경우 /login 페이지로 이동
    if (!loading && !isLogged) {
      router.push("/login");
    }
  }, [isLogged, router, loading]);

  // 로딩 중일 때 아무것도 렌더링하지 않음
  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{ userName, isLogged, setUserName, setIsLogged }}
    >
      {children}
    </UserContext.Provider>
  );
};
