import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
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
    <>
      <Grid container spacing={2}>
        {pokemonList.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
            <PokemonCard
              name={pokemon.name}
              attack={pokemon.attack}
              defense={pokemon.defense}
              hp={pokemon.hp}
              speed={pokemon.speed}
              imageUrl={pokemon.imageUrl}
            />
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
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PokemonList;
