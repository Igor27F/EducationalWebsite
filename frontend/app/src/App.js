import { ThemeProvider, createTheme } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import GamesListMenu from "./components/GamesListMenu";
import React from "react";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import Tabuada from "./components/Tabuada/Tabuada";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  // const [selectedGame, setSelectedGame] = React.useState("");

  return (
    <div className="App">
      {/* <ThemeProvider theme={darkTheme}> */}
      {/* <Router> */}
      <Header />
      <Routes>
        <Route exact path="/" element={<GamesListMenu />}></Route>
        <Route path="/jogo" element={<div>teste</div>}></Route>
        <Route path="/jogodamemória" element={<MemoryGame />}></Route>
        <Route path="/tabuada" element={<Tabuada />}></Route>
      </Routes>
      {/* </Router> */}
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
