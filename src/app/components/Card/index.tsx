import { ReactNode } from "react";
import Image from "next/image";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";

import styles from "./card.module.css";

type Props = {
  card: CardAPI;
  children: ReactNode;
}

export default function Card({ card, children }: Props) {
  return (
    <div className={styles.container}>
      <Image className={styles.image} src={card.images.small} width={150} height={200} alt={card.name} />
      {children}
    </div>
  );
}
