import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";
import Card from "../Card";

import styles from "./cardList.module.css";

type Props = {
  cards: CardAPI[];
};

export default function CardList({ cards }: Props) {

  return (
    <div className={styles.listContainer}>
      {cards.map((card, index) => (
        <Card key={`${card.name}-${index}`} card={card} /> 
      ))}
    </div>
  );
}