import { Card as CardAPI } from 'pokemon-tcg-sdk-typescript/dist/sdk';

import styles from './styles.module.css';


interface CardListMinProps {
  cardCounter: Record<string, CardAPI & { count: number }>;
}

export default function CardListMin({ cardCounter }: CardListMinProps) {
  return (
    <ul className={styles.addedCardsList}>
      {Object.values(cardCounter).map((card) => (
        <li key={card.id}>{card.name} {card.number}/{card.set.total} x{card.count}</li>
      ))}
    </ul>
  );
}
