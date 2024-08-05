import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PokemonCard from "./PokemonCard";
import { getPokemonList, battlePokemon } from "../api";

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const data = await getPokemonList();
      setPokemonList(data);
    };

    fetchPokemonList();
  }, []);

  const handleBattle = async (opponentId: string) => {
    if (selectedPokemon) {
      const result = await battlePokemon(selectedPokemon, opponentId);
      alert(`Battle result: ${result.winner}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 0, // Espacio entre tarjetas
      }}
    >
      {pokemonList.map((pokemon) => (
        <Box
          key={pokemon.id}
          sx={{
            width: { xs: "100%", sm: "48%", md: "20%" },
            padding: 1,
            boxSizing: "border-box",
          }}
        >
          <PokemonCard
            name={pokemon.name}
            attack={pokemon.attack}
            defense={pokemon.defense}
            hp={pokemon.hp}
            speed={pokemon.speed}
            imageUrl={pokemon.imageUrl}
          />
          <Box mt={1} sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              onClick={() => setSelectedPokemon(pokemon.id)}
            >
              Select
            </Button>
            <Button
              variant="contained"
              onClick={() => handleBattle(pokemon.id)}
              disabled={!selectedPokemon}
            >
              Battle
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PokemonList;
