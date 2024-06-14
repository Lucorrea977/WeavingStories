// utils/validation.js

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  // Función para validar la fortaleza de la contraseña
  function validatePassword(password) {
    // La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }
  
  module.exports = {
    validateEmail,
    validatePassword,
  };
  