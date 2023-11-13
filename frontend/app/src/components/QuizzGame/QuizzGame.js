import React, { useEffect, useState } from "react";
import "./QuizzGame.css";
import flor from "./flower.png";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";

const QuizzGame = () => {
  const [question, setQuestion] = useState("");
  const [acertos, setAcertos] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
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

  const handleGetQuestion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getQuizzQuestions"
      );
      setQuestion(response.data.question);
      setOptions(response.data.options);
      setAnswer(response.data.answer);
    } catch (e) {
      if (!e?.response) {
        console.log("Erro ao acessar o servidor");
      }
    }
  };

  const handleAnswer = (card) => {
    setFeedback(answer === card ? "correct" : "wrong");
    if (answer === card) {
      setAcertos(acertos + 1);
    }
    clearFeedback();
    handleGetQuestion();
  };

  useEffect(() => {
    handleGetQuestion();
  }, []);

  return (
    <div className="QuizzGameScreen">
      <Typography
        variant="h1"
        component="div"
        gutterBottom
        sx={{ marginTop: "16px" }}
      >
        {question}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ width: "80%", margin: "auto", marginTop: "0" }}
      >
        {options.map((card, index) => (
          <Grid
            item
            key={index}
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
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
                backgroundImage: `url(${flor})`,
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

export default QuizzGame;
