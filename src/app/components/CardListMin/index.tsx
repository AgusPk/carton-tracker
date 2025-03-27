import { Card as CardAPI } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import Image from 'next/image';

import trashIcon from '@/app/icons/ic-trash.svg';

import styles from './styles.module.css';

interface CardListMinProps {
  cardCounter: Record<string, CardAPI & { count: number }>;
  removeCard: (card: CardAPI) => void;
}

export default function CardListMin({ cardCounter, removeCard }: CardListMinProps) {
  return (
    <ul className={styles.addedCardsList}>
      {Object.values(cardCounter).length === 0 && <li>Cuando agregues cartas, apareceran aca</li>}
      {Object.values(cardCounter).map((card) => (
        <li className={styles.cardItem} key={card.id}>
          <Image src={trashIcon} className={styles.trashIcon} alt="Eliminar" onClick={() => removeCard(card)} />
          <span className={styles.cardName}>
            {card.name} {card.number}/{card.set.total} x{card.count}
          </span>
        </li>
      ))}
    </ul>
  );
}
