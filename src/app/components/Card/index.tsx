"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import type { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk"

import type { Transfer } from "@/types/types"

import styles from "./styles.module.css"

type Props = {
  card: CardAPI | Transfer
  children: ReactNode
  cardType: "card" | "transfer"
}

export default function Card({ card, children, cardType = "card" }: Props) {
  let image
  switch (cardType) {
    case "card":
      image = "images" in card ? card.images?.small : ""
      break
    case "transfer":
      image = "cardImage" in card ? card.cardImage : ""
      break
    default:
      image = ""
  }

  return (
    <div className={styles.container}>
      {image && (
        <Image
          className={styles.image}
          src={image || "/placeholder.svg"}
          width={150}
          height={200}
          alt={card.name || ""}
        />
      )}
      <div className={styles.cardContent}>{children}</div>
    </div>
  )
}

