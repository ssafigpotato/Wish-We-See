import styles from "@/app/friend/_component/Title/Title.module.scss";

interface TitleProps {
  name: string;
  heading: string;
}

export default function Title({ name, heading }: TitleProps) {
  return (
    <div
      className={`${
        heading === "h1"
          ? styles["title-h1"]
          : heading === "h2"
          ? styles["title-h2"]
          : styles["title-h3"]
      }`}
    >
      <p>{name}</p>
    </div>
  );
}
