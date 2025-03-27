'use server'

import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export async function findCard(cardName: string) {
  const cardList = await PokemonTCG.findCardsByQueries({
    q: `name:"*${cardName}*" legalities.standard:legal`
  });
  return cardList;
}
