import React from "react";

const Topbar = () => {
  return (
    <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow">
      <span className="text-lg font-semibold">Gym Management System</span>
      <div className="text-sm">Administrator ⬇️</div>
    </header>
  );
};

export default Topbar;
