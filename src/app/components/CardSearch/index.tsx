"use client"

import { useState, useEffect, useRef } from "react"
import type { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk"
import debounce from "lodash.debounce"
import Image from "next/image"
import Card from "../Card"
import CardCounter from "../CardCounter"
import Input from "../Input"
import searchIcon from "../../icons/ic-search.svg"

import { findCard } from "./actions"

import styles from "./styles.module.css"

type Props = {
  cardCounter: Record<string, CardAPI & { count: number; comment?: string }>
  handleCounterChange: (card: CardAPI, newCount: number) => void
  handleCommentChange: (card: CardAPI, comment: string) => void
}

export default function CardSearch({ cardCounter, handleCounterChange, handleCommentChange }: Props) {
  const [cardsFound, setCardsFound] = useState<CardAPI[]>([])
  const [loadingCards, setLoadingCards] = useState(false)
  const [card, setCard] = useState<string>("")

  const debouncedSearchRef = useRef(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setCardsFound([])
        return
      }
      setLoadingCards(true)
      const cards = await findCard(term)
      setCardsFound(cards)
      setLoadingCards(false)
    }, 500),
  )

  useEffect(() => {
    const search = debouncedSearchRef.current
    search(card)
    return () => {
      search.cancel()
    }
  }, [card])

  return (
    <div className={styles.cardSearchContainer}>
      <div>
        <div className={styles.searchHeader}>
          <h3 className={styles.searchTitle}>Buscar cartas</h3>
        </div>
        <Input
          id="search-card"
          value={card}
          placeholder="Buscar por nombre de carta"
          onChange={(value) => setCard(value)}
          icon={<Image width={24} height={24} src={searchIcon || "/placeholder.svg"} alt="Buscar" />}
        />
      </div>

      {loadingCards && (
        <div className={styles.loadingMessage}>
          <div className={styles.spinner} />
          <span>Buscando cartas...</span>
        </div>
      )}

      <div className={styles.cardList}>
        {cardsFound.map((card, index) => (
          <Card key={`${card.name}-${index}`} card={card} cardType="card">
            <CardCounter
              count={card.id ? cardCounter[card.id]?.count || 0 : 0}
              comment={card.id ? cardCounter[card.id]?.comment || "" : ""}
              setCount={(newCount) => handleCounterChange(card as CardAPI, newCount)}
              onCommentChange={(comment) => handleCommentChange(card as CardAPI, comment)}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

