import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

import Card from "../Card";

import styles from "./cardList.module.css";

type Props = {
  cards: any[];
};

export default async function CardList({ cards }: Props) {
  // PokemonTCG.findCardsByQueries({ id:  })
  const queryURL = new URL("https://api.pokemontcg.io/v2/cards?");
  queryURL.searchParams.append("q", cards.map((card) => `id:${card}`).join(" OR "));

  const response = await fetch(queryURL);
  const { data }: { data: any[]} = await response.json();  

  return (
    <div className={styles.listContainer}>
      {data?.map((card, index) => (
        <Card key={`${card.name}-${index}`} card={card} />
      ))}
    </div>
  );
}