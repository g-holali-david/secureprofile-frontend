import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth";

// Enregistrement d'un nouvel utilisateur
export const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData);
  return response.data;
};

// Connexion de l'utilisateur
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  const { accessToken, refreshToken } = response.data;

  // 💡 Stocke les tokens localement pour usage futur (auth, refresh, etc.)
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return response.data;
};
