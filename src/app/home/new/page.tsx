'use client'

import { useState } from "react";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useUser } from "@auth0/nextjs-auth0/client";

import CardSearch from "@/app/components/CardSearch";
import { CardCount } from "@/types/types";
import { createTransfer } from "./actions";

import styles from "./styles.module.css";
import Input from "@/app/components/Input";

export default function NewTransfer() {
  const { user } = useUser();
  const [cardCounter, setCardCounter] = useState<Record<string, CardCount>>({});
  const [to, setTo] = useState(''); 
  const [createLoading, setCreateLoading] = useState(false);

  const onCounterChange = (card: CardAPI, newCount: number) => {
    if (newCount === 0) {
      const newCardCounter = { ...cardCounter };
      delete newCardCounter[card.id];
      setCardCounter(newCardCounter);
    } else {
      setCardCounter({ ...cardCounter, [card.id]: { ...card, count: newCount } });
    }
  }

  const handleSubmit = async () => {
    if (user && Object.values(cardCounter).length > 0) {
      setCreateLoading(true);
      const response = await createTransfer(user.email || '', to, cardCounter);
      setCreateLoading(false);
    }
  }

  return (
    <div className={styles.newTransferPage}>
      <h1>Nuevo prestamo</h1>
      <div className={styles.newTransferContainer}>
        <div className={styles.newTransferForm}>
          <label htmlFor="userName">A quien le prestas?</label>
          <Input
            id="userName"
            value={to}
            onChange={(value) => setTo(value)}
          />
          <button type="button" onClick={handleSubmit}>Confirmar</button>
        </div>
        <div className={styles.cardListContainer}>
          <ul className={styles.addedCardsList}>
            {Object.values(cardCounter).map((card) => (
              <li key={card.id}>{card.name} {card.number}/{card.set.total} x{card?.count}</li>
            ))}
          </ul>
          <CardSearch cardCounter={cardCounter} handleCounterChange={onCounterChange}/>
        </div>
      </div>
    </div>
  )
}
