import React from "react";
import PokemonList from "../components/PokemonList";
import { Box } from "@mui/material";

const BattlePage: React.FC = () => (
  <div>
    <Box sx={{ textAlign: "center" }}>
      <h1>Pókemon Battle</h1>
    </Box>
    <PokemonList />
  </div>
);

export default BattlePage;
