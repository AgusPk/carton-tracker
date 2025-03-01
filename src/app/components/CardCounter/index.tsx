import styles from "./cardCounter.module.css";

type Props = {
  setCount: (count: number) => void;
  count: number;
}

export default function CardCounter({ setCount, count }: Props) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setCount(count - 1)}>-</button>
      <span className={styles.countContainer}>{count}</span>
      <button className={styles.button} onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}