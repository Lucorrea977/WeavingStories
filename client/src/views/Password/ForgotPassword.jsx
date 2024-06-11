// ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/actions/authActions';

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
