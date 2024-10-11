import Image from "next/image";
import styles from "@/components/Profile/Profile.module.scss";

interface FriendFigure {
  top?: string;
  bottom?: string;
}

interface FreindProfileProps {
  isDetail?: boolean;
  imgSrc?: string;
  name?: string;
  age?: number;
  gender?: string;
  description?: string;
  figure?: FriendFigure;
}

export default function FriendProfile({
  isDetail,
  imgSrc,
  name,
  age,
  gender,
  description,
  figure,
}: FreindProfileProps) {
  return (
    <div>
      <div className={styles["profile-container"]}>
        <div>
          <Image
            src={imgSrc}
            width={100}
            height={100}
            className={styles['profile-image']}
          />
        </div>
        <div className={styles["profile-content-container"]}>
          <div className={styles["profile-basic"]}>
            <p className={styles["profile-name"]}>{name}</p>
            <p className={styles["profile-age"]}>{gender}/{age}살</p>
          </div>
          {isDetail ?
            <div className={styles["profile-detail-container"]}>
              <div className={styles["profile-detail"]}>
                <p className={styles["profile-detail-title"]}>특이사항</p>
                <p className={styles["profile-detail-content"]}>{description}</p>
              </div>
              <div className={styles["profile-detail"]}>
                <p className={styles["profile-detail-title"]}>인상착의</p>
                <div className={styles["profile-detail-box-container"]}>
                  {figure ? 
                    ( figure.top ? (
                      <div className={styles["profile-detail-box-yellow"]}>
                        {figure.top}
                      </div>
                      ) :
                      <></>
                    )
                    : <></>
                  }
                  {figure ? 
                    ( figure.bottom ? (
                      <div className={styles["profile-detail-box-lightblue"]}>
                        {figure.bottom}
                      </div>
                      ) :
                      <></>
                    )
                    : <></>
                  }
                </div>
              </div>
            </div>
          :<></>}
        </div>
      </div>
    </div>
  );
}
