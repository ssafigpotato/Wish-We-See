"use client";
import styles from "./friends.module.scss";
import Header from "@/components/Header/Header";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import { useState } from "react";

interface DummyData {
  name: string;
  phone: string;
}

export default function Friends() {
  const router = useRouter();
  const [friends, setFriends] = useState<DummyData[]>([
    { name: "대주형", phone: "010-1234-5678" },
    { name: "세바스찬", phone: "010-4321-5326" },
    { name: "하이하이", phone: "010-1211-1112" },
  ]);
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false); // 폼 표시/숨기기 상태
  const [newFriend, setNewFriend] = useState<DummyData>({
    name: "",
    phone: "",
  }); // 입력값 상태

  const goBack = () => {
    router.back();
  };

  // 폼 show 핸들러. 지인 5명 초과시 추가 불가
  const handleshowForm = () => {
    setShowForm(true);
    if (friends.length >= 5) {
      setShowForm(false);
      alert("지인은 최대 5명까지만 추가할 수 있습니다.");

      return;
    }
  };

  // 폼에서 입력된 값 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFriend((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 전화번호 형식 적용
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = e.target.value
      .replace(/[^0-9]/g, "") // 숫자 이외의 문자를 제거
      .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 000-0000-0000 형식으로 변경

    setPhone(formattedPhone);
    setNewFriend((prev) => ({
      ...prev,
      phone: formattedPhone, // phone 상태를 업데이트
    }));
  };

  // 폼 제출 시 새 지인 추가
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newFriend.name && newFriend.phone) {
      setFriends((prev) => [...prev, newFriend]); // 새로운 지인 추가
      setNewFriend({ name: "", phone: "" }); // 입력값 초기화
      setShowForm(false); // 폼 숨기기
    } else {
      alert("이름과 전화번호를 입력하세요.");
    }
  };

  // 지인 삭제 함수
  const removeFriend = (index: number) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?"); // 확인창 띄움
    if (isConfirmed) {
      const updatedFriends = friends.filter((_, i) => i !== index); // index를 이용하여 해당 지인을 제외한 배열 생성
      setFriends(updatedFriends);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <button onClick={goBack} className={styles.back}>
        <IoIosArrowBack />
        뒤로가기
      </button>
      <div className={styles.title}>지인 정보</div>
      <div className={styles.warn}>지인은 최대 5명까지 추가 가능합니다.</div>

      {friends.map((friend, index) => (
        <div key={index} className={styles.div}>
          <div className={styles.friends}>
            <div className={styles.original}>
              <div className={styles.info}>
                <label>이름</label>
                <div className={styles.name}>{friend.name}</div>
                <label>전화번호</label>
                <div className={styles.phone}>
                  <span>{friend.phone}</span>
                </div>
              </div>
              <button type="submit" onClick={() => removeFriend(index)}>
                <FaMinusCircle />
              </button>
            </div>
          </div>
        </div>
      ))}

      {!showForm && (
        <div className={styles.pluscontainer}>
          <button
            className={styles.plus}
            type="button"
            // onClick={() => setShowForm(true)}
            onClick={handleshowForm}
          >
            <FaCirclePlus />
          </button>
        </div>
      )}

      {showForm && (
        <form className={styles.form}>
          <div className={styles.friends}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              name="name"
              value={newFriend.name}
              onChange={handleInputChange}
            />
            <label htmlFor="phone">전화번호</label>
            <input
              type="text"
              name="phone"
              value={newFriend.phone}
              onChange={handlePhoneChange}
              placeholder="010-0000-0000"
              maxLength={12}
            ></input>
          </div>

          <button className={styles.done} type="submit" onClick={handleSubmit}>
            완료
          </button>
        </form>
      )}
    </div>
  );
}
