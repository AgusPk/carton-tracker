'use client'

import { useCallback, useState } from "react";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import debounce from "lodash.debounce";

import CardList from "../CardList";
import Card from "../Card";
import CardCounter from "../CardCounter";

import styles from "./styles.module.css";


type Props = {
  cardCounter: Record<string, CardAPI & { count: number }>;
  handleCounterChange: (card: CardAPI, newCount: number) => void;
}

export default function CardSearch({ cardCounter, handleCounterChange }: Props) {
  const [cardsFound, setCardsFound] = useState<CardAPI[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);

  const getCards = useCallback(debounce(async (card: string) => {
    setLoadingCards(true);
    const cards = await PokemonTCG.findCardsByQueries({ q: `name:*${card}* legalities.standard:legal`, });
    setCardsFound(cards);
    setLoadingCards(false);
  }, 300), []);

  return (
    <div>
      <input type="text" className={styles.searchInput} placeholder="Buscar por nombre de carta" onChange={(e) => getCards(e.target.value)} />    
      {loadingCards && <p>Cargando...</p>}
      <CardList cards={cardsFound} renderItem={(card, index) => (
        <Card key={`${card.name}-${index}`} card={card}>
          <CardCounter count={cardCounter[card.id]?.count || 0} setCount={(newCount) => handleCounterChange(card, newCount)} />
        </Card>
      )} />
    </div>
  )
}
