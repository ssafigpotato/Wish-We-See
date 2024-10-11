import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/friend/_component/PhotoUpload/PhotoUpload.module.scss';
import Add from '/public/icons/add_photo.svg';

interface PhotoUploadProps {
  onFileUpload: (file: File) => void;  // 부모 컴포넌트로 파일 전달하는 콜백 함수
}

export default function PhotoUpload({ onFileUpload }: PhotoUploadProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);  // 이미지 미리보기 설정
      };
      reader.readAsDataURL(file);
      onFileUpload(file);  // 파일을 부모 컴포넌트로 전달
    }
  };

  return (
    <div>
      {!previewSrc && (
        <label htmlFor="file-input">
          <div className={styles['image-upload']}>
            <Add />
          </div>
        </label>
      )}

      <input
        type="file"
        id="file-input"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}  // 파일 변경 처리
      />

      {previewSrc && (
        <div className={styles['image-container']}>
          <Image src={previewSrc} alt="미리보기 이미지" fill style={{objectFit: 'contain'}} />
        </div>
      )}
    </div>
  );
}
