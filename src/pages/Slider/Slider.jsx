import React from 'react';

const Sidebar = ({ active, setActive }) => {
  const menuItems = [
    { key: 'trainers', label: '👨‍🏫 Trainers' },
    { key: 'users', label: '👥 Users' },
    { key: 'plans', label: '📋 Membership Plans' },
    { key: 'add-attendance', label: '➕ Add Attendance' },
    { key: 'fee-dueDate', label: '💰 Fee Due Members' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-blue-100 text-black h-screen flex flex-col shadow-lg">
      <div className="text-2xl font-bold px-6 py-5 border-b border-blue-300">
        Gym Management
      </div>
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-3">
          {menuItems.map(({ key, label }) => (
            <li key={key}>
              <button
                onClick={() => active !== key && setActive(key)}
                className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 font-medium
                  ${
                    active === key
                      ? 'bg-blue-400 text-black font-semibold shadow-inner'
                      : 'hover:bg-blue-300 hover:text-black'
                  }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
