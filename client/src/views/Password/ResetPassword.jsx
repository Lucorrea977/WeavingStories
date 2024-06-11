// ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions/authActions';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ newPassword }, token));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;