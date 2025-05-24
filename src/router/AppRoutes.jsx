import React from "react";
import { Routes, Route } from "react-router-dom";

import PokemonListWithModal from "../components/PokemonListWithModal/PokemonListWithModal";
import WhosThatPokemon from "../components/whosThatPokemon/WhosThatPokemon";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PokemonListWithModal />} />
      <Route path="/pokemon/:id" element={<PokemonListWithModal />} />
      <Route path="/whos-that-pokemon" element={<WhosThatPokemon />} />
    </Routes>
  );
};

export default AppRoutes;