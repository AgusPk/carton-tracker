"use client"

import styles from "./styles.module.css"

type Props = {
  setCount: (count: number) => void
  count: number
  comment?: string
  onCommentChange?: (comment: string) => void
}

export default function CardCounter({ setCount, count, comment = "", onCommentChange }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.counterWrapper}>
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
      {onCommentChange && (
        <input
          type="text"
          className={styles.commentInput}
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          aria-label="Card comment"
        />
      )}
    </div>
  )
}

