import Image from "next/image";

import styles from "./card.module.css";

type Props = {
  card: any;
}

export default function Card({ card }: Props) {
  const handleReturnCard = () => {
    // TODO: handle return
    console.log("to be returned");
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={card.images.small} alt={card.name} />
      <button className={styles.returnButton}>Devolver/devuelto</button>
      <p className={styles.detail}>{card.name}</p>
      <div className={styles.setDetails}>
        <img className={styles.setLogo} src={card.set.images.logo} alt={card.set.name} />
        <span>{card.number}/{card.set.total}</span>
      </div>
      {/* TODO: Add lang to transfer? */}
      {/* <p className={styles.detail}>{card.lang}</p> */}
    </div>
  );
}
