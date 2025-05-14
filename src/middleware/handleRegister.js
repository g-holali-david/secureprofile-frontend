import { registerUser } from '../services/authService';
import { validateEmail } from '../utils/validators';

export async function handleRegister(e, formData, setErrorMessage, setSuccessMessage, resetForm, navigate) {
  e.preventDefault();

  if (!validateEmail(formData.email)) {
    setErrorMessage("L'adresse e-mail n'est pas valide.");
    return;
  }

  try {
    await registerUser(formData);
    setSuccessMessage("Inscription réussie !");
    resetForm();
    setTimeout(() => navigate('/login'), 1500); // Redirection après succès
  } catch (err) {
    const backendError = err.response?.data?.message || err.response?.data?.error || err.message;
    setErrorMessage("Erreur lors de l'inscription : " + backendError);
  }
}
