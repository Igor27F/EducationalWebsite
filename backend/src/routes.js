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

module.exports = routes;
