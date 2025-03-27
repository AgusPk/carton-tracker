"use client"

import styles from "./styles.module.css"

type Props = {
  setCount: (count: number) => void
  count: number
}

export default function CardCounter({ setCount, count }: Props) {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setCount(count - 1 < 0 ? 0 : count - 1)}
        disabled={count === 0}
        aria-label="Decrease count"
      >
        -
      </button>
      <span className={styles.countContainer}>{count}</span>
      <button className={styles.button} onClick={() => setCount(count + 1)} aria-label="Increase count">
        +
      </button>
    </div>
  )
}

