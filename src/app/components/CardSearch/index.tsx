'use client'

import { useState, useEffect, useRef } from "react";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";
import debounce from 'lodash.debounce';

import CardList from "../CardList";
import Card from "../Card";
import CardCounter from "../CardCounter";
import Input from "../Input";
import searchIcon from "../../icons/ic-search.svg";

import { findCard } from "./actions";

import styles from "./styles.module.css";
import Image from "next/image";

type Props = {
  cardCounter: Record<string, CardAPI & { count: number }>;
  handleCounterChange: (card: CardAPI, newCount: number) => void;
}

export default function CardSearch({ cardCounter, handleCounterChange }: Props) {
  const [cardsFound, setCardsFound] = useState<CardAPI[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [card, setCard] = useState<string>('');

  const debouncedSearchRef = useRef(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setCardsFound([]);
        return;
      }
      setLoadingCards(true);
      const cards = await findCard(term);
      setCardsFound(cards);
      setLoadingCards(false);
    }, 500)
  );

  useEffect(() => {
    const search = debouncedSearchRef.current;
    search(card);
    return () => {
      search.cancel();
    };
  }, [card]);

  return (
    <div className={styles.cardSearchContainer}>
      <Input
        id="search-card"
        value={card}
        placeholder="Buscar por nombre de carta"
        onChange={(value) => setCard(value)}
        icon={<Image width={24} height={24} src={searchIcon} alt="Buscar" />}
      />
      {loadingCards && <p>Cargando...</p>}
      <CardList cards={cardsFound} renderItem={(card, index) => (
        <Card key={`${card.name}-${index}`} card={card} cardType="card">
          <CardCounter
            count={cardCounter[card.id]?.count || 0}
            setCount={(newCount) => handleCounterChange(card, newCount)}
          />
        </Card>
      )} />
    </div>
  )
}
