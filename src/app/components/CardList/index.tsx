'use client'

import { ReactNode } from "react";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { Transfer } from "@/types/types";

import styles from "./styles.module.css";

type Props = {
  cards: CardAPI[] | Transfer[];
  renderItem: (card: CardAPI | Transfer, index: number) => ReactNode;
};

export default function CardList({ cards, renderItem }: Props) {
  return (
    <div className={styles.listContainer}>
      {cards.map((card, index) => renderItem(card, index))}
    </div>
  );
}
