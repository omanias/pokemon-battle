import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

interface PokemonCardProps {
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  imageUrl: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  attack,
  defense,
  hp,
  speed,
  imageUrl,
}) => (
  <Card>
    <CardMedia component="img" height="140" image={imageUrl} alt={name} />
    <CardContent>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="body2">Attack: {attack}</Typography>
      <Typography variant="body2">Defense: {defense}</Typography>
      <Typography variant="body2">HP: {hp}</Typography>
      <Typography variant="body2">Speed: {speed}</Typography>
    </CardContent>
  </Card>
);

export default PokemonCard;
