import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GamesListMenu from "./components/GamesListMenu";
import React from "react";
import QuizzGame from "./components/QuizzGame/QuizzGame";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import Tabuada from "./components/Tabuada/Tabuada";
import JogoDaVelha from "./components/JogoDaVelha/JogoDaVelha";

//TODO adicionar opcao de temas

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<GamesListMenu />}></Route>
        <Route path="/jogodamemória" element={<MemoryGame />}></Route>
        <Route path="/tabuada" element={<Tabuada />}></Route>
        <Route path="/perguntaserespostas" element={<QuizzGame />}></Route>
        <Route path="/jogodavelha" element={<JogoDaVelha />}></Route>
      </Routes>
    </div>
  );
}

export default App;
