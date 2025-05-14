import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { sanitizeInput } from "../middleware/inputSanitizer";
import "../styles/RegisterForm.css"; 
import { validateEmail } from "../utils/validators";
import messages from "../constants/messages";


function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
    setSuccessMessage("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorMessage(messages.error.invalidEmail);
      return;
    }

    try {
      const cleanedData = {
        username: sanitizeInput(formData.username),
        email: sanitizeInput(formData.email),
        password: formData.password,
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
      };

      await registerUser(cleanedData);
      setSuccessMessage(messages.success.register);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const backendError =
        err.response?.data?.message || err.response?.data?.error || err.message;
      setErrorMessage(messages.error.registerFailed + backendError);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Créer un compte</h2>

        {errorMessage && <div className="register-error">{errorMessage}</div>}
        {successMessage && <div className="register-success">{successMessage}</div>}

        <input type="text" name="username" placeholder="Nom d'utilisateur" value={formData.username} onChange={handleChange} className="register-input" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="register-input" required />
        <input type="password" name="password" placeholder="Mot de passe (min. 12 caractères)" value={formData.password} onChange={handleChange} className="register-input" required minLength={12} />
        <input type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} className="register-input" />
        <input type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} className="register-input" />

        <button type="submit" className="register-button">S'inscrire</button>

        <p className="register-link">
          Déjà inscrit ? <a href="/login">Se connecter</a>
        </p>
        <p className="register-link">
          <a href="/forgot-password">Mot de passe oublié ?</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
