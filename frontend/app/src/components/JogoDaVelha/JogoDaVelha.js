import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./JogoDaVelha.css";

const JogoDaVelha = () => {
  const [tabuleiro, setTabuleiro] = useState([
    "",
    "",
    "",
    "",
    "O",
    "",
    "",
    "",
    "",
  ]);
  const [vencedor, setVencedor] = useState("");
  const [vitorias, setVitorias] = useState(0);

  const jogar = (bloco) => {
    if (tabuleiro[bloco] !== "" || vencedor !== "") return;
    var novoTabuleiro = [...tabuleiro];
    novoTabuleiro[bloco] = "X";
    setTabuleiro(novoTabuleiro);

    if (vencedor === "" && novoTabuleiro.includes("")) {
      var random = Math.floor(Math.random() * 9);
      while (novoTabuleiro[random] !== "") {
        random = Math.floor(Math.random() * 9);
      }
      novoTabuleiro[random] = "O";
      setTabuleiro(novoTabuleiro);
    }
  };

  useEffect(() => {
    if (
      tabuleiro[0] === tabuleiro[1] &&
      tabuleiro[1] === tabuleiro[2] &&
      tabuleiro[0] !== ""
    ) {
      setVencedor(tabuleiro[0]);
    }
    if (
      tabuleiro[3] === tabuleiro[4] &&
      tabuleiro[4] === tabuleiro[5] &&
      tabuleiro[3] !== ""
    ) {
      setVencedor(tabuleiro[3]);
    }
    if (
      tabuleiro[6] === tabuleiro[7] &&
      tabuleiro[7] === tabuleiro[8] &&
      tabuleiro[6] !== ""
    ) {
      setVencedor(tabuleiro[6]);
    }
    if (
      tabuleiro[0] === tabuleiro[3] &&
      tabuleiro[3] === tabuleiro[6] &&
      tabuleiro[0] !== ""
    ) {
      setVencedor(tabuleiro[0]);
    }
    if (
      tabuleiro[1] === tabuleiro[4] &&
      tabuleiro[4] === tabuleiro[7] &&
      tabuleiro[1] !== ""
    ) {
      setVencedor(tabuleiro[1]);
    }
    if (
      tabuleiro[2] === tabuleiro[5] &&
      tabuleiro[5] === tabuleiro[8] &&
      tabuleiro[2] !== ""
    ) {
      setVencedor(tabuleiro[2]);
    }
    if (
      tabuleiro[0] === tabuleiro[4] &&
      tabuleiro[4] === tabuleiro[8] &&
      tabuleiro[0] !== ""
    ) {
      setVencedor(tabuleiro[0]);
    }
    if (
      tabuleiro[2] === tabuleiro[4] &&
      tabuleiro[4] === tabuleiro[6] &&
      tabuleiro[2] !== ""
    ) {
      setVencedor(tabuleiro[2]);
    }

    if (tabuleiro.every((bloco) => bloco !== "" && vencedor === "")) {
      setVencedor("Empate");
    }
    console.log(tabuleiro);
  }, [tabuleiro, vencedor]);

  useEffect(() => {
    if (vencedor !== "") {
      if (vencedor === "X") {
        setVitorias(vitorias + 1);
      }
      setTimeout(() => {
        setTabuleiro(
          vencedor === "X"
            ? ["", "", "", "", "O", "", "", "", ""]
            : ["", "", "", "", "", "", "", "", ""]
        );
        setVencedor("");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vencedor]);
  return (
    <div className="JogoDaVelhaScreen">
      <Typography
        variant="h1"
        component="div"
        gutterBottom
        sx={{ marginTop: "16px", color: "white" }}
      >
        Jogo da Velha
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "16px",
          color: "red",
          gap: 0,
          width: "40%",
          height: "55%",
        }}
        justifyContent="center"
      >
        {tabuleiro.map((bloco, index) => (
          <Grid key={index} item xs={4}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "white",
                border: "1px solid black",
              }}
              onClick={() => jogar(index)}
            >
              <Typography
                variant="h3"
                component="div"
                gutterBottom
                position={"absolute"}
              >
                {tabuleiro[index]}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {vencedor !== "" && (
        <Box
          sx={{
            height: "35%",
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor:
              vencedor === "X"
                ? "#4BB543"
                : vencedor === "O"
                ? "#FF0000"
                : "#FFA500",
            position: "absolute",
            left: 0,
            right: 0,
            top: "40%",
            margin: "auto",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h1"
            component="div"
            gutterBottom
            sx={{ marginTop: "16px", color: "black" }}
          >
            {vencedor === "X"
              ? "Parabéns, você ganhou!"
              : vencedor === "O"
              ? "Que pena, você perdeu."
              : "Empate"}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {vitorias} vitórias
          </Typography>
        </Box>
      )}
    </div>
  );
};
export default JogoDaVelha;
