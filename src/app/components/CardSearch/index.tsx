'use client'

import { useState } from "react";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";

import CardList from "../CardList";
import Card from "../Card";
import CardCounter from "../CardCounter";

import { findCard } from "./actions";
import styles from "./styles.module.css";
import Input from "../Input";
import debounce from "lodash.debounce";

type Props = {
  cardCounter: Record<string, CardAPI & { count: number }>;
  handleCounterChange: (card: CardAPI, newCount: number) => void;
}

export default function CardSearch({ cardCounter, handleCounterChange }: Props) {
  const [cardsFound, setCardsFound] = useState<CardAPI[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [card, setCard] = useState<string>('');

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingCards(true);
    const cards = await findCard(card);
    setCardsFound(cards);
    setLoadingCards(false);
  }
  
  // const submitDebounce = debounce(handleSubmit, 1000);

  return (
    <div className={styles.cardSearchContainer}>
      <form onSubmit={handleSubmit}>
        <Input
          id="search-card"
          value={card}
          placeholder="Buscar por nombre de carta"
          onChange={(value) => setCard(value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {loadingCards && <p>Cargando...</p>}
      <CardList cards={cardsFound} renderItem={(card, index) => (
        <Card key={`${card.name}-${index}`} card={card}>
          <CardCounter
            count={cardCounter[card.id]?.count || 0}
            setCount={(newCount) => handleCounterChange(card, newCount)}
          />
        </Card>
      )} />
    </div>
  )
}
