import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GamesListMenu from "./components/GamesListMenu";
import React from "react";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import Tabuada from "./components/Tabuada/Tabuada";

//TODO adicionar opcao de temas

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<GamesListMenu />}></Route>
        <Route path="/jogo" element={<div>teste</div>}></Route>
        <Route path="/jogodamemória" element={<MemoryGame />}></Route>
        <Route path="/tabuada" element={<Tabuada />}></Route>
      </Routes>
    </div>
  );
}

export default App;
