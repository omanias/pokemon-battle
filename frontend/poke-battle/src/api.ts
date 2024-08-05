import axios from "axios";

const API_URL = "http://localhost:3000"; // Cambia esto según la URL de tu backend

export const getPokemonList = async () => {
  const response = await axios.get(`${API_URL}/pokemon`);
  return response.data;
};

export const battlePokemon = async (pokemonId1: string, pokemonId2: string) => {
  const response = await axios.post(`${API_URL}/battle`, {
    pokemonId1,
    pokemonId2,
  });
  return response.data;
};
