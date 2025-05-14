import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await loginUser(credentials); // Appel à l’API d’authentification
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Échec de la connexion";
      setError(message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Connexion</h2>

        {error && <div className="login-error">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={credentials.username}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">Se connecter</button>

        <p className="login-link">
          Pas encore inscrit ? <a href="/register">Créer un compte</a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
