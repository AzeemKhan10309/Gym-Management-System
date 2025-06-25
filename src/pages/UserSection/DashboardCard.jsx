import React from "react";

const StatCard = ({ color, icon, number, label }) => {
  return (
    <div className={`p-4 rounded shadow text-white flex justify-between items-center ${color}`}>
      <div>
        <p className="text-2xl font-bold">{number}</p>
        <p className="text-sm font-semibold">{label}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
};

export default StatCard;
