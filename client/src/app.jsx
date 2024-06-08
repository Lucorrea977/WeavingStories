import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import ChatPage from './views/Chat/ChatPage';
import HomePage from './views/Home/HomePage';

function App() {
    return (
     
 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
    

    );
  }
  
  export default App;