import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import PokemonCard from "./PokemonCard";
import { getPokemonList } from "../api";

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<any | null>(null);
  const [battleResult, setBattleResult] = useState<any | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const data = await getPokemonList();
      setPokemonList(data);
    };

    fetchPokemonList();
  }, []);

  const handleSelectPokemon = (pokemonId: number) => {
    setSelectedPokemon(pokemonId);

    // Selección aleatoria de un contrincante diferente
    const opponent = pokemonList.find((pokemon) => pokemon.id !== pokemonId);
    setSelectedOpponent(opponent || null);
  };

  const handleBattle = async () => {
    if (selectedPokemon && selectedOpponent) {
      try {
        const pokemon1Id = selectedPokemon;
        const pokemon2Id = selectedOpponent.id;

        const result = await fetch("http://localhost:3000/battle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pokemon1Id,
            pokemon2Id,
          }),
        });

        const data = await result.json();

        setBattleResult(data.winner);
      } catch (error) {
        console.error("Error during battle:", error);
      }
    }
  };

  const selectedPokemonDetails = pokemonList.find(
    (pokemon) => pokemon.id === selectedPokemon
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pokémon List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {pokemonList.map((pokemon) => (
          <Box
            key={pokemon.id}
            sx={{
              width: { xs: "100%", sm: "48%", md: "20%" },
              padding: 1,
              boxSizing: "border-box",
              border:
                pokemon.id === selectedPokemon ? "2px solid #3f51b5" : "none",
              borderRadius: 1,
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
                onClick={() => handleSelectPokemon(pokemon.id)}
                disabled={
                  selectedPokemon !== null && selectedPokemon !== pokemon.id
                }
              >
                {selectedPokemon === pokemon.id ? "Selected" : "Select"}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {selectedPokemonDetails && (
        <Card sx={{ mt: 4, maxWidth: 300 }}>
          <CardMedia
            component="img"
            height="140"
            image={selectedPokemonDetails.imageUrl}
            alt={selectedPokemonDetails.name}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {selectedPokemonDetails.name}
            </Typography>
            <Box mt={2}>
              <Typography variant="body2">Attack</Typography>
              <LinearProgress
                variant="determinate"
                value={(selectedPokemonDetails.attack / 200) * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
              <Typography variant="body2">Defense</Typography>
              <LinearProgress
                variant="determinate"
                value={(selectedPokemonDetails.defense / 200) * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
              <Typography variant="body2">HP</Typography>
              <LinearProgress
                variant="determinate"
                value={(selectedPokemonDetails.hp / 200) * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
              <Typography variant="body2">Speed</Typography>
              <LinearProgress
                variant="determinate"
                value={(selectedPokemonDetails.speed / 200) * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {selectedOpponent && (
        <Card sx={{ mt: 4, maxWidth: 300 }}>
          <CardMedia
            component="img"
            height="140"
            image={selectedOpponent.imageUrl}
            alt={selectedOpponent.name}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {selectedOpponent.name}
            </Typography>
            {/* Mostrar estadísticas del oponente */}
            <Box mt={2}>
              <Typography variant="body2">Attack</Typography>
              <LinearProgress
                variant="determinate"
                value={(selectedOpponent.attack / 200) * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
              <Typography variant="body2">Defense</Typography>
              <LinearProgress
                variant="determinate"
                value={(selectedOpponent.defense / 200) * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
              <Typography variant="body2">HP</Typography>
              <LinearProgress
                variant="determinate"
                value={(selectedOpponent.hp / 200) * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
              <Typography variant="body2">Speed</Typography>
              <LinearProgress
                variant="determinate"
                value={(selectedOpponent.speed / 200) * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleBattle}
          disabled={!selectedPokemon || !selectedOpponent}
        >
          Battle
        </Button>
      </Box>

      {battleResult && battleResult.name && (
        <Typography variant="h6" mt={2}>
          The winner is {battleResult.name}
        </Typography>
      )}
    </Box>
  );
};

export default PokemonList;
