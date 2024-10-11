"use client";

// hooks/useSensor.ts
import { useState, useEffect } from 'react';

interface GyroData {
  alpha: number;
  beta: number;
  gamma: number;
}

interface AccelData {
  x: number;
  y: number;
  z: number;
}

export const useSensor = () => {
  const [gyroData, setGyroData] = useState<GyroData>({ alpha: 0, beta: 0, gamma: 0 });
  const [accelData, setAccelData] = useState<AccelData>({ x: 0, y: 0, z: 0 });
  const [fallDetected, setFallDetected] = useState<boolean>(false);

  function calculateMagnitude(Ax, Ay, Az) {
    return Math.sqrt(Math.pow(Ax, 2) + Math.pow(Ay, 2) + Math.pow(Az, 2));
}

  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window && 'DeviceOrientationEvent' in window) {

      const handleOrientation = (event: DeviceOrientationEvent) => {
        const { alpha, beta, gamma } = event;
        setGyroData((prev) => {
          const newGyroData = {
            alpha: alpha ?? 0,
            beta: beta ?? 0,
            gamma: gamma ?? 0,
          };
          return newGyroData;
        });
      };

      const handleMotion = (event: DeviceMotionEvent) => {
        const accel = event.accelerationIncludingGravity;
        if (accel) {
          setAccelData((prev) => {
            const newAccelData = {
              x: accel.x ?? 0,
              y: accel.y ?? 0,
              z: accel.z ?? 0,
            };
            return newAccelData;
          });

          const magnitude = calculateMagnitude(accel.x, accel.y, accel.z);

          if (magnitude > 40) {
            console.log('낙상 감지됨');
            setFallDetected(true);
            // 일정 시간 후 fallDetected 상태를 다시 false로 설정
            setTimeout(() => {
              setFallDetected(false);
              console.log('낙상 감지 초기화');
            }, 5000); // 10초 후 다시 초기화
          }
        }
      };

      window.addEventListener('deviceorientation', handleOrientation);
      window.addEventListener('devicemotion', handleMotion);

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('devicemotion', handleMotion);
      };
    } else {
      console.warn('DeviceMotionEvent 또는 DeviceOrientationEvent를 지원하지 않는 브라우저입니다.');
    }
  }, []);

  return { gyroData, accelData, fallDetected };
};
