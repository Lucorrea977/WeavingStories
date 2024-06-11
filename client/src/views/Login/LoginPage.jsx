import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Obtiene la función de navegación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then(() => {
      // Si el inicio de sesión es exitoso, redirige al usuario a la página de inicio
      navigate('/home');
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded py-2 px-3" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
      </form>
      <p className="mt-4">¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:underline">Registrarse</Link></p>
      <p><Link to="/forgot-password" className="text-blue-500 hover:underline">¿Has olvidado tu contraseña?</Link></p>
    </div>
  );
}

export default LoginPage;