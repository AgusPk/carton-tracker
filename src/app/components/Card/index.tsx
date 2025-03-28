"use client"

import { ReactNode } from "react"
import Image from "next/image"
import type { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk"
import type { Transfer } from "@/types/types"
import styles from "./styles.module.css"

type Props = {
	card: CardAPI | Transfer;
	children: ReactNode;
	cardType?: "card" | "transfer";
	onClick?: () => void;
}

export default function Card({ card, children, cardType = "card", onClick }: Props) {
	const handleClick = (e: React.MouseEvent) => {
		// If the click target is or is inside the cardContent div, don't trigger the card click
		if (!e.target || (e.target as HTMLElement).closest(`.${styles.cardContent}`)) {
			return;
		}
		onClick?.();
	};

	return (
		<div className={styles.container} onClick={handleClick}>
			<Image
				src={cardType === "card" ? (card as CardAPI).images.small : (card as Transfer).cardImage}
				alt={cardType === "card" ? (card as CardAPI).name : (card as Transfer).cardName}
				width={245}
				height={342}
				className={styles.image}
			/>
			<div className={styles.cardContent}>
				{children}
			</div>
		</div>
	)
}

