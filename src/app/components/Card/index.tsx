import { ReactNode } from "react";
import Image from "next/image";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";

import styles from "./styles.module.css";
import { Transfer } from "@/types/types";

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
        <Image className={styles.image} src={image} width={150} height={200} alt={card.name || ""} />
      )}
      {children}
    </div>
  );
}
