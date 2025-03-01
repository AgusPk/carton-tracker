'use client'

import { useState } from "react";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useUser } from "@auth0/nextjs-auth0/client";

import CardSearch from "@/app/components/CardSearch";

import styles from "./styles.module.css";
import { createTransfer } from "./actions";

interface CardCount extends CardAPI {
  count: number;
}

export default function NewTransfer() {
  const { user } = useUser();
  const [cardCounter, setCardCounter] = useState<Record<string, CardCount>>({});
  const [to, setTo] = useState<string>(''); 
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const onCounterChange = (card: CardAPI, newCount: number) => {
    setCardCounter({ ...cardCounter, [card.id]: { ...card, count: newCount } });
  }

  const handleSubmit = async () => {
    if (user) {
      setCreateLoading(true);
      const response = await createTransfer(user.email || '', to, cardCounter);
      console.log(response);
      setCreateLoading(false);
    }
  }

  return (
    <div>
      <h1>Nuevo prestamo</h1>
      <form>
        <label htmlFor="userName">A quien le prestas?</label>
        <input id="userName" type="text" onChange={(e) => setTo(e.target.value)} value={to} />
        <button type="button" onClick={handleSubmit}>Confirmar</button>
      </form>
      <div className={styles.cardListContainer}>
        <CardSearch cardCounter={cardCounter} handleCounterChange={onCounterChange}/>
        <ul>
          {Object.values(cardCounter).map((card) => (
            <li key={card.id}>{card.name} {card.number}/{card.set.total} x{card?.count}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
