import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../services/userService";
import "../styles/DeleteAccount.css";

function DeleteAccount() {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteMyAccount();
      localStorage.removeItem("accessToken");
      navigate("/register");
    } catch (err) {
      setError("Erreur lors de la suppression du compte.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-container">
      <div className="delete-card">
        <h2>Supprimer mon compte</h2>
        <p>Cette action est <strong>irréversible</strong>. Êtes-vous sûr ?</p>

        {error && <div className="delete-error">{error}</div>}

        {!confirm ? (
          <button className="confirm-btn" onClick={() => setConfirm(true)}>
            Oui, je veux supprimer mon compte
          </button>
        ) : (
          <button className="delete-btn" onClick={handleDelete} disabled={loading}>
            {loading ? "Suppression..." : "Confirmer la suppression"}
          </button>
        )}

        <button className="cancel-btn" onClick={() => navigate("/dashboard")}>
          Annuler
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
