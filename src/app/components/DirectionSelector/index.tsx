import styles from "./styles.module.css";

type TransferDirection = 'to' | 'from';

interface DirectionSelectorProps {
  direction: TransferDirection;
  onDirectionChange: (direction: TransferDirection) => void;
}

export default function DirectionSelector({ direction, onDirectionChange }: DirectionSelectorProps) {
  return (
    <div className={styles.directionSelector}>
      <div 
        className={styles.toggleContainer}
        onClick={() => onDirectionChange(direction === 'to' ? 'from' : 'to')}
      >
        <div className={`${styles.toggleBackground} ${direction === 'from' ? styles.right : ''}`} />
        <div className={`${styles.toggleOption} ${direction === 'to' ? styles.selected : ''}`}>
          Presto a
        </div>
        <div className={`${styles.toggleOption} ${direction === 'from' ? styles.selected : ''}`}>
          Me prestan
        </div>
      </div>
    </div>
  );
}
