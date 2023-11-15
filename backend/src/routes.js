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
    password: "1234",
  },
  {
    id: 3,
    name: "Igor",
    type: "kid",
    userName: "igor",
    password: "1234",
  },
];

const games = [
  // { title: "cores", category: "baby", categoryDescription: "De 0 a 4 anos" },
  // { title: "numeros", category: "baby", categoryDescription: "De 0 a 4 anos" },
  // { title: "letras", category: "baby", categoryDescription: "De 0 a 4 anos" },
  // {
  //   title: "cobrinha",
  //   category: "baby",
  //   categoryDescription: "De 0 a 4 anos",
  // },
  {
    title: "jogo da velha",
    category: "baby",
    categoryDescription: "De 0 a 4 anos",
  },
  {
    title: "jogo da memória",
    category: "kid",
    categoryDescription: "De 5 a 10 anos",
  },
  { title: "tabuada", category: "kid", categoryDescription: "De 5 a 10 anos" },
  // {
  //   title: "soletrando",
  //   category: "kid",
  //   categoryDescription: "De 5 a 10 anos",
  // },
  {
    title: "perguntas e respostas",
    category: "teen",
    categoryDescription: "Maior que 10 anos",
  },
  // {
  //   title: "curiosidades",
  //   category: "teen",
  //   categoryDescription: "Maior que 10 anos",
  // },
  // {
  //   title: "ingles",
  //   category: "teen",
  //   categoryDescription: "Maior que 10 anos",
  // },
  // {
  //   title: "jogos de lógica",
  //   category: "teen",
  //   categoryDescription: "Maior que 10 anos",
  // },
];

const quizzQuestions = [
  {
    question: "Qual é a capital da França?",
    options: ["Paris", "Londres", "Berlim", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Qual é a capital da Alemanha?",
    options: ["Paris", "Londres", "Berlim", "Madrid"],
    answer: "Berlim",
  },
  {
    question: "Qual é a capital da Espanha?",
    options: ["Paris", "Londres", "Berlim", "Madrid"],
    answer: "Madrid",
  },
  {
    question: "Qual é a capital da Inglaterra?",
    options: ["Paris", "Londres", "Berlim", "Madrid"],
    answer: "Londres",
  },
  {
    question: "Quem foi a primeira pessoa a viajar no Espaço?",
    options: [
      "Yuri Gagarin",
      "A cadela Laika",
      "Neil Armstrong",
      "Marcos Pontes",
    ],
    answer: "Yuri Gagarin",
  },
  {
    question: "Qual a montanha mais alta do mundo?",
    options: [
      "Pico da Neblina",
      "Monte Chimborazo",
      "Mauna Kea",
      "Monte Everest",
    ],
    answer: "Monte Everest",
  },
  {
    question: "Onde se localiza Machu Picchu?",
    options: ["Colômbia", "Peru", "Bolívia", "Índia"],
    answer: "Peru",
  },
  {
    question: "Quem inventou a lâmpada?",
    options: ["Graham Bell", "Thomas Edison", "Henry Ford", "Santos Dumont"],
    answer: "Thomas Edison",
  },
  {
    question:
      "Quanto tempo a Terra demora para dar uma volta completa em torno dela mesma?",
    options: [
      "Aproximadamente 24 horas",
      "365 dias",
      "7 dias",
      "30 ou 31 dias",
    ],
    answer: "Aproximadamente 24 horas",
  },
  {
    question: "A que temperatura a água ferve?",
    options: ["200 ºC", "0 ºC", "180 ºC", "100 ºC"],
    answer: "100 ºC",
  },
  {
    question: "Quantos ossos temos no nosso corpo?",
    options: ["126", "206", "300", "18"],
    answer: "206",
  },
  {
    question: "Qual o maior planeta do sistema solar?",
    options: ["Marte", "Mercúrio", "Terra", "Júpiter"],
    answer: "Júpiter",
  },
  {
    question: "Qual o planeta mais próximo do Sol?",
    options: ["Terra", "Júpiter", "Mercúrio", "Marte"],
    answer: "Mercúrio",
  },
  {
    question: "Qual o nome popular do cloreto de sódio?",
    options: ["Sal de cozinha", "Fermento", "Vinagre", "Água"],
    answer: "Sal de cozinha",
  },
  {
    question: "Em que país foi construído o Muro de Berlim?",
    options: ["Estados Unidos", "China", "Coreia do Norte", "Alemanha"],
    answer: "Alemanha",
  },
  {
    question: "Em que região se localiza o estado de Minas Gerais?",
    options: ["Sudeste", "Centro-Oeste", "Norte", "Sul"],
    answer: "Sudeste",
  },
  {
    question: "Qual o plural de chapéu?",
    options: ["Chapéis", "Chapéus", "Chapéuzes", "Chapuzes"],
    answer: "Chapéus",
  },
  {
    question: "Qual a primeira mulher a ganhar um prêmio Nobel?",
    options: [
      "Madre Teresa de Calcutá",
      "Marie Curie",
      "Elizabeth Blackweel",
      "Valentina Tereshkova",
    ],
    answer: "Marie Curie",
  },
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

routes.post("/login", (req, res) => {
  const { userName, password } = req.body;

  const user = users.find(
    (user) => user.userName === userName && user.password === password
  );

  if (user) {
    return res.status(200).json({ name: user.name, type: user.type });
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

routes.get("/getQuizzQuestions", (req, res) => {
  try {
    var question = shuffle(quizzQuestions)[0];
    question.options = shuffle(question.options);
    return res.status(200).json(question);
  } catch (e) {
    return res
      .status(401)
      .json({ message: "ops, parece que ocorreu um problema..." });
  }
});

routes.post("/listGames", (req, res) => {
  const { category } = req.body;

  return res
    .status(200)
    .json(games.filter((game) => game.category == category));
});

module.exports = routes;
