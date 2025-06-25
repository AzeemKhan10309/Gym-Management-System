import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';
import TrainerDashboard from './pages/TrainerSection/Dashboard.jsx';
import UserDashboard from './pages/UserSection/Dashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      {/* other routes */}
    </Routes>
  );
}

export default App;
