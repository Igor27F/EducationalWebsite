import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Header handleGameSelected={(jogo) => console.log(jogo)} />
          <Routes>
            <Route exact path="/" element={<div></div>}></Route>
            <Route path="jogo" element={<div></div>}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
