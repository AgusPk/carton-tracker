'use client'

import { useState } from "react";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import CardSearch from "@/app/components/CardSearch";
import { CardCount } from "@/types/types";
import { createTransfer } from "./actions";
import Input from "@/app/components/Input";

import styles from "./styles.module.css";
import CardListMin from "@/app/components/CardListMin";
import Button from "@/app/components/Button";

export default function NewTransfer() {
  const { user } = useUser();
  const [cardCounter, setCardCounter] = useState<Record<string, CardCount>>({});
  const [to, setTo] = useState(''); 
  const [createLoading, setCreateLoading] = useState(false);
  const router = useRouter();

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
      if (response) {
        toast.success('Prestamo creado correctamente');
        router.push('/home');
      }
    }
  }

  return (
    <>
      <h1 className={styles.title}>Nuevo prestamo</h1>
      <div className={styles.newTransferContainer}>
        <div className={styles.newTransferForm}>
          <Input
            placeholder="A quien le prestas?"
            value={to}
            className={styles.nameInput}
            onChange={(value) => setTo(value)}
          />
          <Button type="button" onClick={handleSubmit}>Confirmar</Button>
        </div>
        <div className={styles.cardListContainer}>
          <CardListMin cardCounter={cardCounter} removeCard={(cardId) => onCounterChange(cardId, 0)} />
          <CardSearch cardCounter={cardCounter} handleCounterChange={onCounterChange}/>
        </div>
      </div>
    </>
  )
}
