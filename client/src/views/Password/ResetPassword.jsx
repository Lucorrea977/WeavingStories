import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions/authActions';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    if (!validatePassword(newPassword)) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número.');
      return;
    }
    dispatch(resetPassword({ newPassword }, token)).then((response) => {
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirigir después de 3 segundos
    }).catch((error) => {
      setMessage('Error al restablecer la contraseña.');
    });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={`w-full border border-gray-300 rounded-md py-2 px-3 mb-4 ${passwordError && 'border-red-500'}`}
          required
        />
        {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>} {/* Mensaje de error */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirmar Nueva Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full border border-gray-300 rounded-md py-2 px-3 mb-4 ${passwordError && 'border-red-500'}`}
          required
        />
        <div className="mb-4">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          Mostrar contraseñas
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Restablecer Contraseña</button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default ResetPasswordPage;