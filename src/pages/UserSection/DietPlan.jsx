import React from 'react';

const DietPlan = ({ user }) => {
  const dietPlan = user?.assignedDietPlan;

  if (!dietPlan) {
    return <p>No diet plan assigned.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Diet Plan</h2>
      <p className="font-bold text-lg">{dietPlan.planName}</p>

      {dietPlan.diet.map((dayPlan, index) => (
        <div key={index} className="mt-4 p-4 border rounded shadow-sm bg-gray-50">
          <h3 className="font-semibold mb-2">{dayPlan.day}</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Breakfast:</strong> {dayPlan.breakfast}</li>
            <li><strong>Mid-Morning Snack:</strong> {dayPlan.midMorningSnack}</li>
            <li><strong>Lunch:</strong> {dayPlan.lunch}</li>
            <li><strong>Evening Snack:</strong> {dayPlan.eveningSnack}</li>
            <li><strong>Dinner:</strong> {dayPlan.dinner}</li>
            <li><strong>Post-Dinner Snack:</strong> {dayPlan.postDinnerSnack}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DietPlan;
