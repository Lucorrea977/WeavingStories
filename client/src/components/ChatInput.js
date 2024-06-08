
// ChatInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../redux/reducer/chatSlice'; // Actualiza la ruta si es necesario

function ChatInput() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      try {
        await dispatch(sendMessage(message)).unwrap();
        setMessage('');
        setError(null);
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Error sending message');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="px-4 py-2 ml-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Enviar</button>
      {error && <p className="text-red-500 ml-2">{error}</p>}
    </form>
  );
}

export default ChatInput;
