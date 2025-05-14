import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/userService";
import defaultAvatar from "../assets/default-avatar.png";
import { FaUserEdit, FaKey, FaTrash, FaSignOutAlt } from "react-icons/fa";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error("Erreur récupération user", err);
        setError("Impossible de charger les informations utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (loading) {
    return <div className="dashboard-loader">Chargement...</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-panel">
        <div className="dashboard-header">
          <img
            src={user?.avatarUrl || defaultAvatar}
            alt="Avatar"
            className="dashboard-avatar"
          />
          <h2>{user.firstName || user.username}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="dashboard-role"> Rôle : {user.role?.name}</span>
            <span
              className={`dashboard-status ${
                user.enabled ? "status-active" : "status-inactive"
              }`}
              title={user.enabled ? "Compte activé" : "Compte désactivé"}
            ></span>
          </div>
        </div>

        {error && <p className="dashboard-error">{error}</p>}

        <div className="dashboard-info">
          <p><strong>Nom complet :</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
          <p><strong>Email :</strong> {user.email}</p>
        </div>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/profile/edit")}><FaUserEdit /> Modifier le profil</button>
          <button onClick={() => navigate("/password/change")}><FaKey /> Changer le mot de passe</button>
          <button onClick={() => navigate("/delete-account")}><FaTrash /> Supprimer le compte</button>
          <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Déconnexion</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
