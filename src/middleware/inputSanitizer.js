// src/middleware/inputSanitizer.js

export function sanitizeInput(input) {
  const blacklistPattern = /('|--|;|\/\*|\*\/|drop|select|insert|delete|update|where|=)/i;

  if (!input || typeof input !== 'string') return '';

  // Supprime les espaces excessifs et caractères invisibles
  const cleaned = input.trim().replace(/\s\s+/g, ' ');

  // Vérifie si l'entrée contient un pattern dangereux
  if (blacklistPattern.test(cleaned)) {
    throw new Error("Entrée invalide détectée.");
  }

  return cleaned;
}
