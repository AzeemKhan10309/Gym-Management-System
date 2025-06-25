import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Logout Icon

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded transition"
      >
        <FaSignOutAlt className="text-lg" />
        Logout
      </button>
    </div>
  );
};

export default Topbar;
