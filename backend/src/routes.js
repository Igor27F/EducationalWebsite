const express = require("express");

const routes = express.Router();
const users = [
  {
    id: 1,
    name: "admin",
    type: "parent",
    userName: "admin",
    password: "admin",
  },
  {
    id: 2,
    name: "Crianca",
    type: "kid",
    userName: "crianca",
    password: "123",
  },
];

const games = [
  { title: "cores", category: "De 0 a 4 anos" },
  { title: "numeros", category: "De 0 a 4 anos" },
  { title: "letras", category: "De 0 a 4 anos" },
  { title: "jogo da memória", category: "De 5 a 10 anos" },
  { title: "cobrinha", category: "De 5 a 10 anos" },
  { title: "soletrando", category: "De 5 a 10 anos" },
  { title: "perguntas e respostas", category: "Mais que 10 anos" },
  { title: "curiosidades", category: "Mais que 10 anos" },
  { title: "ingles", category: "Mais que 10 anos" },
  { title: "jogos de logica", category: "Mais que 10 anos" },
];

routes.post("/login", (req, res) => {
  const { userName, password } = req.body;

  const user = users.find(
    (user) => user.userName === userName && user.password === password
  );

  if (user) {
    return res.status(200).json({ name: user.userName, type: user.type });
  }

  return res.status(401).json({ message: "Credenciais invalidas" });
});

routes.get("/getGames", (req, res) => {
  try {
    return res
      .status(200)
      .json(games.sort((a, b) => -b.title.localeCompare(a.title)));
  } catch (e) {
    return res
      .status(401)
      .json({ message: "ops, parece que ocorreu um problema..." });
  }
});

module.exports = routes;
