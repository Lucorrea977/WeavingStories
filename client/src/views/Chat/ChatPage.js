import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/reducer/chatSlice';
import ChatLayout from './ChatLayout';

function ChatPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.chat.isLoading);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  return (
    <ChatLayout isLoading={isLoading} />
  );
}

export default ChatPage;
