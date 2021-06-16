import { create } from "apisauce";

export const HOST = "https://pokeapi.co/api/v2/pokemon";

const api = create({
  baseURL: HOST,
});

export default api;
