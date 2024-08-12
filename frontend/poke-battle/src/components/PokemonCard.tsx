import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

interface PokemonCardProps {
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  imageUrl: string;
  showDetails?: boolean;
}


const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  attack,
  defense,
  hp,
  speed,
  imageUrl,
  showDetails = false,
}) => (
  <Card>
    <CardMedia component="img" height="140" image={imageUrl} alt={name} />
    <CardContent>
      <Typography variant="h6">{name}</Typography>
      {showDetails && (
        <Box mt={2}>
          <DetailBar label="Attack" value={attack} />
          <DetailBar label="Defense" value={defense} />
          <DetailBar label="HP" value={hp} />
          <DetailBar label="Speed" value={speed} />
        </Box>
      )}
    </CardContent>
  </Card>
);

interface DetailBarProps {
  label: string;
  value: number;
}

const DetailBar: React.FC<DetailBarProps> = ({ label, value }) => (
  <Box mt={1}>
    <Typography variant="body2" gutterBottom>
      {label}: {value}
    </Typography>
    <Box
      sx={{
        height: 10,
        width: `${value}%`,
        backgroundColor: "#3f51b5",
        borderRadius: 1,
      }}
    />
  </Box>
);

export default PokemonCard;
