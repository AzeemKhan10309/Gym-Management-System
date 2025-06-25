import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const menuItems = ['Dashboard', 'My Profile', 'My Plans', 'My Workout Plan', 'Logout'];
const handleLogout = () => {
  localStorage.removeItem("user");      // remove user data
  localStorage.removeItem("token");     // if you're storing JWT
  window.location.href = "/";      // redirect to login page
};

const UserSidebar = ({ activeItem, onNavigate, token }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name || 'User');
    }
  }, [token]);

  return (
    <aside className="w-64 bg-gray-800 min-h-screen">
      <div className="bg-blue-600 p-4 text-black font-bold">
        Welcome, {userName}
      </div>
      <nav className="flex flex-col space-y-1 p-4 text-sm">
        <ul className="space-y-2 w-full">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => item === 'Logout' ? handleLogout() : onNavigate(item)}
                className={`w-full text-left py-2 px-4 rounded transition-colors duration-200
    ${activeItem === item
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-500 text-black hover:text-white'}
  `}
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

export default UserSidebar;
