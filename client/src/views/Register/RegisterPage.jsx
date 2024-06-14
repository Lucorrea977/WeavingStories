import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/actions/authActions';

function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook para redirección

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número.');
      return;
    }
    dispatch(registerUser(formData))
      .then((response) => {
        console.log('Registro exitoso:', response);
        navigate('/'); // Redirigir al login
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        // Mostrar un mensaje de error si es necesario
      });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${passwordError && 'border-red-500'}`}
            />
            <label
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <input
                type="checkbox"
                className="mr-1"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              Mostrar contraseña
            </label>
          </div>
          {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>} {/* Mensaje de error */}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

