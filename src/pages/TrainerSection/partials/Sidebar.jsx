import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const menuItems = ['Clients', 'Create Workout', 'View All Plans', 'Create Meal', 'View All Diet'];

const Sidebar = ({ activeItem, onNavigate, token }) => {
  const [trainerName, setTrainerName] = useState('');

  useEffect(() => {
  if (token) {
    const decoded = jwtDecode(token);
    setTrainerName(decoded.name);
  }
}, [token]);

  return (
    <aside className="w-64 bg-blue-600 text-black flex flex-col min-h-screen">
      <div className="p-4 font-bold text-xl border-b border-blue-400">ADMIN {trainerName}</div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => onNavigate(item)}
                className={`w-full text-left block py-2 px-4 rounded ${
                  activeItem === item
                    ? 'bg-blue-500 text-black'
                    : 'hover:bg-blue-500 text-black'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
