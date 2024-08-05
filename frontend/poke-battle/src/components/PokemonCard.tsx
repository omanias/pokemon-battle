import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  LinearProgress,
  Box,
} from "@mui/material";

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
}) => {
  const maxStatValue = 10;

  return (
    <Card sx={{ maxWidth: 100, minWidth: 200 }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Box mb={1}>
          <Typography variant="body2">Attack</Typography>
          <LinearProgress
            variant="determinate"
            value={(attack / maxStatValue) * 100}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box>
        <Box mb={1}>
          <Typography variant="body2">Defense</Typography>
          <LinearProgress
            variant="determinate"
            value={(defense / maxStatValue) * 100}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box>
        <Box mb={1}>
          <Typography variant="body2">HP</Typography>
          <LinearProgress
            variant="determinate"
            value={(hp / maxStatValue) * 100}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box>
        <Box mb={1}>
          <Typography variant="body2">Speed</Typography>
          <LinearProgress
            variant="determinate"
            value={(speed / maxStatValue) * 100}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
