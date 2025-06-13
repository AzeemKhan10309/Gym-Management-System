import React from 'react';

const Header = () => (
  <header
    className="relative h-32 flex items-center justify-between px-6 text-white"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1571019613914-85f342c91f99?auto=format&fit=crop&w=1600&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Black overlay for readability */}
    <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

    {/* Content */}
    <div className="relative z-10 flex justify-between w-full items-center">
      {/* Gym Name */}
      <h1 className="text-3xl font-extrabold">FitZone Gym</h1>

      {/* User Avatar */}
      <img
        src="https://i.pravatar.cc/40"
        alt="Admin Avatar"
        className="rounded-full w-10 h-10 border-2 border-white shadow-md"
      />
    </div>
  </header>
);

export default Header;
