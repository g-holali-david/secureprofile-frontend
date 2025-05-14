import React, { useState } from "react";
import { changePassword } from "../services/userService";
import "../styles/ChangePassword.css";

function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 12) {
      setError("Le nouveau mot de passe doit contenir au moins 12 caractères.");
      return;
    }

    try {
      await changePassword(form.oldPassword, form.newPassword);
      setSuccess("Mot de passe mis à jour avec succès.");
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError("Erreur : " + msg);
    }
  };

  return (
    <div className="password-container">
      <form onSubmit={handleSubmit} className="password-form">
        <h3>Changer le mot de passe</h3>
        {error && <div className="password-error">{error}</div>}
        {success && <div className="password-success">{success}</div>}

        <input
          type="password"
          name="oldPassword"
          placeholder="Mot de passe actuel"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe (min. 12 caractères)"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default ChangePassword;
