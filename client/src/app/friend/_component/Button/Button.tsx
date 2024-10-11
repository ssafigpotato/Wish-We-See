'use client'
import React, { useState, useEffect } from 'react';
import styles from "@/app/friend/_component/Button/Button.module.scss";

interface ButtonProps {
  title: string;
  onClick: () => void
  color?: 'red' | 'blue' | 'light-blue';
  iconName?: string;
}

export default function Button({ title, color, iconName, onClick }: ButtonProps) {
  const [Icon, setIcon] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (iconName) {
      // 동적 import 사용
      import(`/public/icons/${iconName}.svg`)
        .then((module) => {
          setIcon(() => module.default); // 아이콘 모듈 설정
        })
        .catch((err) => console.error(`Error loading icon: ${err}`));
    }
  }, [iconName]); // iconSrc 변경 시 동적으로 import

  return (
    <div className={styles[`${color ? `${color}-button` : 'button'}`]} onClick={onClick}>
      <div className={styles['button-inner']}>
        {Icon && <Icon />} {/* 동적으로 로드된 아이콘 표시 */}
        <div className={styles['button-text']}>
          {title}
        </div>
      </div>
    </div>
  );
}