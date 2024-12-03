'use client'

import { useCallback, useState } from "react";
import CardList from "../CardList";
import debounce from "lodash.debounce";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";

export default function CardSearch() {
  const [cardsFound, setCardsFound] = useState<Card[]>([]);

  const getCards = useCallback(debounce(async (card: string) => {
    const cards = await PokemonTCG.findCardsByQueries({ q: `name:*${card}*`, });
    setCardsFound(cards);
  }, 300), []);

  return (
    <>
      <input type="text" placeholder="Buscar por nombre de carta" onChange={(e) => getCards(e.target.value)} />    
      <CardList cards={cardsFound} />
    </>
  )
}