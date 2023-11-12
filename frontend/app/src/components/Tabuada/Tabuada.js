import React, { useEffect, useState } from "react";
import "./Tabuada.css";
import { Box, Grid, Typography } from "@mui/material";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Tabuada = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [acertos, setAcertos] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [cards, setCards] = useState([]);
  const [feedbackTimeoutId, setFeedbackTimeoutId] = useState(null);
  //   const [answer, setAnswer] = useState("");
  //   const [isCorrect, setIsCorrect] = useState(null);

  //   const handleAnswerChange = (event) => {
  //     setAnswer(event.target.value);
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const correctAnswer = num1 * num2;
  //     setIsCorrect(parseInt(answer) === correctAnswer);
  //     setNum1(Math.floor(Math.random() * 10) + 1);
  //     setNum2(Math.floor(Math.random() * 10) + 1);
  //     setAnswer("");
  //   };

  //   const newQuestion = () => {
  //     setNum1(Math.floor(Math.random() * 10) + 1);
  //     setNum2(Math.floor(Math.random() * 10) + 1);
  //     setAnswer("");
  //     var newCards = [num1 * num2];
  //     for (let i = 0; i < 3; i++) {
  //       let randomNumber;
  //       while (
  //         randomNumber === undefined ||
  //         randomNumber == null ||
  //         randomNumber <= 0 ||
  //         newCards.includes(randomNumber)
  //       ) {
  //         randomNumber = num1 * num2 + Math.floor(Math.random() * 30) - 15;
  //       }
  //       newCards.push(randomNumber);
  //     }
  //     setCards(shuffle(newCards));
  //     console.log(num1 * num2);
  //   };

  //   const handleAnswer = (card) => {
  //     var certas = acertos;
  //     setFeedback(card === num1 * num2 ? "correct" : "wrong");
  //     if (num1 * num2 === card) {
  //       setAcertos(acertos + 1);
  //     }
  //     setNum1(Math.floor(Math.random() * 10) + 1);
  //     setNum2(Math.floor(Math.random() * 10) + 1);
  //     console.log("nova resposta");

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
    setFeedback(card === num1 * num2 ? "correct" : "wrong");
    if (num1 * num2 === card) {
      setAcertos(acertos + 1);
    }
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    clearFeedback();
  };

  useEffect(() => {
    // setNum1(Math.floor(Math.random() * 10) + 1);
    // setNum2(Math.floor(Math.random() * 10) + 1);
    // setAnswer("");
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
    // console.log(num1 * num2);
  }, [num1, num2]);

  return (
    <div className="gameScreen">
      <Typography
        variant="h1"
        component="div"
        gutterBottom
        sx={{ marginTop: "16px" }}
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
                backgroundColor: "mediumaquamarine",
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
      {/* <form onSubmit={handleSubmit}>
        <input type="number" value={answer} onChange={handleAnswerChange} />
        <button type="submit">Confirmar resposta</button>
      </form>
      {isCorrect === true && <p>Correto!</p>}
      {isCorrect === false && (
        <p>Incorreto. A resposta certa é {num1 * num2}.</p>
      )} */}
    </div>
  );
};

export default Tabuada;
