import React, { useEffect, useState } from "react";
import "./Tabuada.css";
import nuvem from "./nuvem.png";
import { Box, Grid, Typography } from "@mui/material";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Tabuada = () => {
  const [difficulty, setDifficulty] = useState(1);
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [acertos, setAcertos] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [cards, setCards] = useState([]);
  const [feedbackTimeoutId, setFeedbackTimeoutId] = useState(null);

  const clearFeedback = () => {
    if (feedbackTimeoutId) {
      clearTimeout(feedbackTimeoutId);
    }
    setFeedbackTimeoutId(
      setTimeout(() => {
        setFeedback("");
      }, 1000)
    );
  };

  const handleAnswer = (card) => {
    var acertou = card === num1 * num2;
    setFeedback(acertou ? "correct" : "wrong");
    if (acertou) {
      setAcertos(acertos + 1);
      setDifficulty(difficulty + 0.1);
    } else {
      setDifficulty(difficulty - 0.3);
      if (difficulty < 1) {
        setDifficulty(1);
      }
    }
    setNum1(Math.floor(Math.random() * 10 * difficulty) + 1);
    setNum2(Math.floor(Math.random() * 10 * difficulty) + 1);
    clearFeedback();
  };

  useEffect(() => {
    var newCards = [num1 * num2];
    for (let i = 0; i < 3; i++) {
      let randomNumber;
      while (
        randomNumber === undefined ||
        randomNumber == null ||
        randomNumber <= 0 ||
        newCards.includes(randomNumber)
      ) {
        randomNumber = num1 * num2 + Math.floor(Math.random() * 30) - 15;
      }
      newCards.push(randomNumber);
    }
    setCards(shuffle(newCards));
  }, [num1, num2]);

  return (
    <div className="tableGameScreen">
      <Typography
        variant="h1"
        component="div"
        gutterBottom
        sx={{ marginTop: "16px", color: "white" }}
      >
        {num1} x {num2}?
      </Typography>
      <Grid container spacing={2} sx={{ width: "80%", margin: "auto" }}>
        {cards.map((card, index) => (
          <Grid
            item
            key={index}
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "250px",
                width: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                // backgroundColor: "orange",
                backgroundImage: `url(${nuvem})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              onClick={() => handleAnswer(card)}
            >
              <Typography variant="h3" component="div" gutterBottom>
                {card}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {feedback === "correct" && (
        <Box
          sx={{
            height: "15%",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#4BB543",
            position: "absolute",
            left: 0,
            right: 0,
            top: "20%",
            margin: "auto",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" component="div" gutterBottom>
            Parabéns, você acertou!
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {acertos} acertos
          </Typography>
        </Box>
      )}
      {feedback === "wrong" && (
        <Box
          sx={{
            height: "15%",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "red",
            position: "absolute",
            left: 0,
            right: 0,
            top: "20%",
            margin: "auto",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" component="div" gutterBottom>
            Resposta incorreta
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Tabuada;
