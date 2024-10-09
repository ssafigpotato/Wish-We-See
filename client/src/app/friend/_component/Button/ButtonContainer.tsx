import styles from "@/app/friend/_component/Button/Button.module.scss";

interface ButtonComponentProps {
  children : React.ReactNode
}

export default function ButtonContainer ({ children }:ButtonComponentProps) {
  return (
    <div className={styles['button-container']}>
      {children}
    </div>
  )
}