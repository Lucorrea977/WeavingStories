import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ identifier: identifier.trim(), password }))
      .then(() => {
        navigate('/profile');
      })
      .catch((error) => {
        const { response } = error;
        if (response) {
          const { status, data } = response;
          if (status === 404) {
            setErrorMessage(data.message || 'Usuario no encontrado.');
          } else if (status === 401) {
            setErrorMessage(data.message || 'Contraseña incorrecta.');
          } else {
            setErrorMessage('Error en el inicio de sesión. Por favor intente de nuevo.');
          }
        } else {
          setErrorMessage('Error de red. Verifique su conexión y vuelva a intentarlo.');
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input 
          type="text" 
          placeholder="Email o Nombre de usuario" 
          value={identifier} 
          onChange={(e) => setIdentifier(e.target.value)} 
          className="w-full border rounded py-2 px-3 mb-4" 
        />
        <div className="relative mb-4">
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full border rounded py-2 px-3" 
          />
          <label className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600">
            <input 
              type="checkbox" 
              onChange={togglePasswordVisibility} 
              className="mr-1"
            />
            Mostrar contraseña
          </label>
        </div>
        {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
      </form>
      <p className="mt-4">¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:underline">Registrarse</Link></p>
      <p><Link to="/forgot-password" className="text-blue-500 hover:underline">¿Has olvidado tu contraseña?</Link></p>
    </div>
  );
}

export default LoginPage;
