'use client'

import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";

import styles from "./cardList.module.css";
import { ReactNode } from "react";

type Props = {
  cards: CardAPI[];
  renderItem: (card: CardAPI, index: number) => ReactNode;
};

export default function CardList({ cards, renderItem }: Props) {

  if (!cards.length) return <div>No cards found!</div>
  return (
    <div className={styles.listContainer}>
      {cards.map((card, index) => renderItem(card, index) )}
    </div>
  );
}
