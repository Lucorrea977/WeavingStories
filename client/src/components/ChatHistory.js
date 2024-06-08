
import React from 'react';
import ChatMessage from './ChatMessage';
import { useSelector } from 'react-redux';

function ChatHistory() {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <div className="chat-history">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message.message} isUser={message.userId === 1} />
      ))}
    </div>
  );
}

export default ChatHistory;
