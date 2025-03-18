'use server'

import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";

interface CardCount extends CardAPI {
  count: number;
}

export async function createTransfer(from: string, to: string, cardList: Record<string, CardCount>) {
	const list = Object.values(cardList).map(card => {
		return {
			id: card.id,
			count: card.count
		}
	});
	const body =JSON.stringify({
		from,
		to,
		list
	});
	const response = await fetch('http://localhost:3000/api/transfers', {
		method: 'POST',
		body
	});
	console.log(response);
}
