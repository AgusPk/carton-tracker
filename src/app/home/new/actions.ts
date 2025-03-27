'use server'

import { CardCount } from "@/types/types";

export async function createTransfer(from: string, to: string, cardList: Record<string, CardCount>) {
	const list = Object.values(cardList).map(card => {
		return {
			id: card.id,
			count: card.count,
			name: card.name,
			imageUrl: card.images.small
		}
	});
	const body = JSON.stringify({
		from,
		to,
		list
	});
	const response = await fetch(`${process.env.BASE_URL}/api/transfers`, {
		method: 'POST',
		body
	});
	console.log(response);
	return response.ok;
}
