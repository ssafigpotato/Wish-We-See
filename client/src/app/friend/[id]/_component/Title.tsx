import styles from "@/app/friend/[id]/page.module.scss";

interface TitleProps {
  name:string;
}

export default function Title ({name}:TitleProps) {
  return (
    <div className={styles.title}>
      <p>{name}</p>
    </div>
  )
}