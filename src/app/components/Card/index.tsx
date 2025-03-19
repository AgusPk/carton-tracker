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
      <p className={styles.detail}>{card.name}</p>
      <div className={styles.setDetails}>
        <Image className={styles.setLogo} src={card.set.images.logo} width={50} height={25} alt={card.set.name} />
        <span>{card.number}/{card.set.total}</span>
      </div>
      {/* TODO: Add lang to transfer? */}
      {/* <p className={styles.detail}>{card.lang}</p> */}
    </div>
  );
}
