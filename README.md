# Frontend - SecureProfile (React)

Ce projet frontend est l'interface utilisateur d'une application sécurisée d'inscription, d'authentification et de gestion de profil utilisateur.

## 📦 Technologies utilisées

- **React** (Vite)
- **Axios** (requêtes HTTP)
- **React Router DOM** (navigation)
- **JWT** (authentification)
- **CSS Modules** (ou fichiers CSS dédiés dans `src/styles`)
- **Icons**: react-icons (FontAwesome)
- **Sécurité côté client**: nettoyage d'entrée (anti-injection)

## 📁 Structure des dossiers

```
src/
├── components/           → composants UI partagés
├── middleware/           → inputSanitizer.js
├── pages/                → RegisterForm.jsx, LoginForm.jsx, Dashboard.jsx, etc.
├── services/             → authService.js, userService.js
├── styles/               → *.css pour chaque page
├── utils/                → axiosInstance.js
└── App.jsx               → Routing principal
```

---

## ✅ Fonctionnalités implémentées

### 🔐 Authentification
- Formulaire de **connexion** (`LoginForm.jsx`)
  - Auth via `username` + `password`
  - Redirection vers `/dashboard`
  - Gestion des erreurs avec message visuel
  - JWT stocké dans `localStorage`
  - Rafraîchissement automatique du token via interceptors (`axiosInstance.js`)
  - Middleware `logoutUser()` si token invalide

- Formulaire d’**inscription** (`RegisterForm.jsx`)
  - Validation des champs (email regex, mot de passe > 12 caractères)
  - Nettoyage (`sanitizeInput`) contre injections (`middleware/inputSanitizer.js`)
  - Redirection automatique vers `/login` après succès

---

### 👤 Dashboard utilisateur
- Récupération des infos via `GET /users/me`
- Affiche :
  - Avatar (photo ou image par défaut)
  - Prénom, nom, username, email (en clair)
  - Rôle + statut activé (badge rond vert ou rouge)
- Boutons :
  - Modifier le profil → `/profile/edit`
  - Changer mot de passe → `/password/change`
  - Supprimer compte → `/delete-account`
  - Se déconnecter (token supprimé + redirection `/login`)

---

## 🚦 Routes React Router

- `/register` : inscription
- `/login` : connexion
- `/dashboard` : tableau de bord utilisateur
- `/profile/edit` : modification du profil (à implémenter)
- `/password/change` : changement du mot de passe
- `/delete-account` : suppression de compte (à implémenter)
- `*` : fallback → "Page non trouvée"

---

## 🛡️ Sécurité côté frontend

- Entrées utilisateur filtrées par regex (anti-injection SQL/balises)
- Token JWT transmis dans `Authorization: Bearer` via Axios interceptor
- Si `401 Unauthorized`, tentative automatique de refresh avec `/auth/refresh`

---

## 📌 À faire

- Pages : `/delete-account`, `/profile/edit`
- Upload avatar
- Guard React (bloquer accès dashboard sans token valide)
- Composant `PrivateRoute`