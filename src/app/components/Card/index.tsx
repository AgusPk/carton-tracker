'use client';

import { ReactNode } from "react";
import Image from "next/image";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";

import { Transfer } from "@/types/types";

import styles from "./styles.module.css";

type Props = {
  card: CardAPI | Transfer;
  children: ReactNode;
  cardType: "card" | "transfer";
}

export default function Card({ card, children, cardType = "card" }: Props) {
  
  let image;
  switch (cardType) {
    case "card":
      image = 'images' in card ? card.images?.small : "";
      break;
    case "transfer":
      image = 'cardImage' in card ? card.cardImage : "";
      break;
    default:
      image = "";
  }

  return (
    <div className={styles.container}>
      {image && (
        <Image className={styles.image} src={image} width={200} height={255} alt={card.name || ""} />
      )}
      {children}
    </div>
  );
}
