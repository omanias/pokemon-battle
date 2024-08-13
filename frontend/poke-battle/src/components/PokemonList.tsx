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
  const [battleDone, setBattleDone] = useState(false);

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
    const otherPokemons = pokemonList.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    if (otherPokemons.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherPokemons.length);
      const opponent = otherPokemons[randomIndex];
      setSelectedOpponent(opponent);
    } else {
      setSelectedOpponent(null);
    }
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
        setBattleDone(true);
      } catch (error) {
        console.error("Error during battle:", error);
      }
    }
  };

  const handleResetBattle = () => {
    setSelectedPokemon(null);
    setSelectedOpponent(null);
    setBattleResult(null);
    setBattleDone(false);
  };

  const selectedPokemonDetails = pokemonList.find(
    (pokemon) => pokemon.id === selectedPokemon
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Please select your character...
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {pokemonList.map((pokemon) => (
          <Box
            key={pokemon.id}
            sx={{
              width: { xs: "100%", sm: "48%", md: "20%" },
              padding: 1,
              boxSizing: "border-box",
              backgroundColor:
                pokemon.id === selectedPokemon
                  ? "rgba(63, 81, 181, 0.1)" // Color de fondo para el Pokémon seleccionado
                  : "none",
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

      <Box
        mt={1}
        sx={{ display: "flex", gap: 30, justifyContent: "center", mt: 10 }}
      >
        {selectedPokemonDetails && (
          <Card
            sx={{
              mt: 4,
              maxWidth: 150,
              backgroundColor:
                battleResult && battleResult.id === selectedPokemonDetails.id
                  ? "rgba(76, 175, 80, 0.2)" // Color de fondo verde para el ganador
                  : "none",
              borderRadius: 1,
            }}
          >
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
          <Card
            sx={{
              mt: 4,
              maxWidth: 150,
              backgroundColor:
                battleResult && battleResult.id === selectedOpponent.id
                  ? "rgba(76, 175, 80, 0.2)" // Color de fondo verde para el ganador
                  : "none",
              borderRadius: 1,
            }}
          >
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
      </Box>

      {selectedPokemon && selectedOpponent && !battleDone && (
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={handleBattle}
            disabled={!selectedPokemon || !selectedOpponent}
          >
            Fight ! ! !
          </Button>
        </Box>
      )}
      {battleResult && (
        <Typography variant="h6" mt={2}>
          The winner is {battleResult.name}
        </Typography>
      )}
      {battleDone && (
        <Box mt={2}>
          <Button variant="contained" onClick={handleResetBattle}>
            Restart Battle
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PokemonList;
