export interface PokemonAPIResponse {
    id: string;
    name: string;
    images: { small: string };
}

export interface PokemonCard {
    id: string;
    name: string;
    imageUrl: string;
    owner: string;
    holder: string;
}
