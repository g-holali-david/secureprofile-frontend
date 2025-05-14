import axios from "axios";

// Crée une instance Axios préconfigurée
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // base de tous les endpoints
  withCredentials: true, // utile pour les cookies (refreshToken par ex.)
});

// Rafraîchit le token d'accès
export async function refreshAccessToken() {
  const res = await axiosInstance.post("/auth/refresh");
  const newToken = res.data.accessToken;

  if (newToken) {
    localStorage.setItem("accessToken", newToken);
    return newToken;
  } else {
    throw new Error("Échec du rafraîchissement du token.");
  }
}

// Déconnecte l'utilisateur
export function logoutUser() {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}

// Intercepteur pour ajouter automatiquement le token dans les headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs 401 et rafraîchir le token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // Rejoue la requête échouée
      } catch (refreshError) {
        logoutUser(); // Redirige vers login si le refresh échoue
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
