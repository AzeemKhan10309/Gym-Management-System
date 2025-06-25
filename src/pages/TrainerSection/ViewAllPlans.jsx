import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAllPlans = ({ token, onEdit, refresh }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/workoutmeals/workout', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(res.data);
      } catch (err) {
        console.error(err);
        alert('Error fetching workout plans');
      }
    };
    fetchPlans();
  }, [token, refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/workoutmeals/workout/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(plans.filter((plan) => plan._id !== id));
      alert('Workout plan deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('Error deleting workout plan.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Your Workout Plans</h2>

      {plans.length === 0 ? (
        <p className="text-gray-500">No workout plans found.</p>
      ) : (
        plans.map((plan) => (
          <div key={plan._id} className="mb-10 bg-white shadow-md rounded-lg overflow-hidden border">
            <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
              <h3 className="text-xl font-bold text-indigo-700">{plan.title}</h3>
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                  onClick={() => onEdit(plan)}
                >
                  Edit
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 text-gray-700 uppercase">
                  <tr>
                    <th className="px-4 py-2">Day</th>
                    <th className="px-4 py-2">Exercise</th>
                    <th className="px-4 py-2">Sets</th>
                    <th className="px-4 py-2">Reps</th>
                    <th className="px-4 py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.days.map((day, i) =>
                    day.exercises.map((ex, idx) => (
                      <tr key={`${i}-${idx}`} className="border-t">
                        <td className="px-4 py-2 font-semibold">{idx === 0 ? day.day : ''}</td>
                        <td className="px-4 py-2">{ex.name}</td>
                        <td className="px-4 py-2">{ex.sets}</td>
                        <td className="px-4 py-2">{ex.reps}</td>
                        <td className="px-4 py-2">{ex.notes || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAllPlans;
