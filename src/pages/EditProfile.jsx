import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/userService";
import "../styles/EditProfile.css";

function EditProfile() {
  const [form, setForm] = useState({ firstName: "", lastName: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile()
      .then((user) => {
        setForm({ firstName: user.firstName || "", lastName: user.lastName || "" });
      })
      .catch(() => setError("Impossible de charger les données."));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(form);
      setSuccess("Profil mis à jour avec succès.");
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError("Erreur : " + msg);
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h3>Modifier le profil</h3>

        {error && <div className="profile-error">{error}</div>}
        {success && <div className="profile-success">{success}</div>}

        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={form.lastName}
          onChange={handleChange}
        />

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default EditProfile;
