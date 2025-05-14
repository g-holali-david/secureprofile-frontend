import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm"; 
import Dashboard from "./pages/Dashboard"; 
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import DeleteAccount from "./pages/DeleteAccount";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/password/change" element={<ChangePassword />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="*" element={<p>Page non trouvée</p>} />
      </Routes>
    </div>
  );
}

export default App;
