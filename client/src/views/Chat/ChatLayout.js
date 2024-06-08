import React from 'react';
import ChatHistory from '../../components/ChatHistory';
import ChatInput from '../../components/ChatInput';

function ChatLayout({ isLoading }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AstroBot</h1>
      {isLoading && <p>Cargando...</p>}
      <ChatHistory />
      <ChatInput />
    </div>
  );
}

export default ChatLayout;
