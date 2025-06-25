import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAllDietPlans = ({ token , onEdit }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/workoutmeals/diet', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(res.data);
      } catch (err) {
        console.error(err);
        alert('Error fetching Diet plans');
      }
    };

    fetchPlans();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/workoutmeals/diet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(plans.filter((plan) => plan._id !== id));
      alert('Diet plan deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('Error deleting diet plan.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Your Diet Plans</h2>

      {plans.length === 0 ? (
        <p className="text-gray-500">No diet plans found.</p>
      ) : (
        plans.map((plan) => (
          <div key={plan._id} className="mb-10 bg-white shadow-md rounded-lg overflow-hidden border">
            <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
              <h3 className="text-xl font-bold text-green-800">{plan.planName}</h3>
              <button
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                  onClick={() => onEdit(plan)}
                >
                  Edit
                </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                onClick={() => handleDelete(plan._id)}
              >
                Delete
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-green-100 text-green-800 uppercase">
                  <tr>
                    <th className="px-4 py-2">Day</th>
                    <th className="px-4 py-2">Breakfast</th>
                    <th className="px-4 py-2">Mid-Morning</th>
                    <th className="px-4 py-2">Lunch</th>
                    <th className="px-4 py-2">Evening Snack</th>
                    <th className="px-4 py-2">Dinner</th>
                    <th className="px-4 py-2">Post-Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.diet.map((day, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2 font-semibold">{day.day}</td>
                      <td className="px-4 py-2">{day.breakfast}</td>
                      <td className="px-4 py-2">{day.midMorningSnack}</td>
                      <td className="px-4 py-2">{day.lunch}</td>
                      <td className="px-4 py-2">{day.eveningSnack}</td>
                      <td className="px-4 py-2">{day.dinner}</td>
                      <td className="px-4 py-2">{day.postDinnerSnack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAllDietPlans;
