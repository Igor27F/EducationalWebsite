import { useState } from "react";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        JSON.stringify({ userName, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
    } catch (e) {
      if (!e?.response) {
        setError("Erro ao acessar o servidor");
      } else if (e.response.status === 401) {
        setError("Usuario ou senha invalidos");
      }
    }
  };

  return (
    <div className="login-form-wrap">
      <h2>Login</h2>
      <form className="login-form">
        <input
          type="text"
          name="login"
          placeholder="digite aqui seu login"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="digite aqui sua senha"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn-login"
          onClick={(e) => handleLogin(e)}
        >
          Entrar
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default Login;
