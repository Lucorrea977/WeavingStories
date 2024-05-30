import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import Register from './views/Login/Register';
import ChangePassword from './views/Login/ChangePassword';

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/* Otros routes */}
      </Routes>
  
  );
};

export default App;