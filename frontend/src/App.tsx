import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Game from './Pages/Game';

const App = () => {
  const handleLogin = () => {
    window.location.href = '/game';
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={<Game/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
