import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";

export interface Transfer extends Partial<CardAPI> {
	_id: string;
	from: string;
	to: string;
	amount: number;
	cardId: string;
	cardName: string;
	cardImage: string;
	date: string;
	comment?: string;
}

export interface CardCount extends CardAPI {
  count: number;
  comment?: string;
}
