import api from "./";

export const getPokemon = (limit: number, offset: number) => {
  return api.get(`?limit=${limit}&offset=${offset}`);
};

export const getPokemonDetail = (pokemonId: string) => {
  return api.get(`/${pokemonId}`);
};
