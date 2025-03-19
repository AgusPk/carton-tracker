'use server'

import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export const findCard = async (cardName: string) => {
  const cardList = await PokemonTCG.findCardsByQueries({ q: `name:${cardName}` });
  return cardList;
}
