import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const CreateMeal = ({token , editData ,onSuccess}) => {
let trainerId = null;

if (token) {
  try {
    const decoded = jwtDecode(token);
    trainerId = decoded.id; 
  } catch (error) {
    console.error("Invalid token:", error);
  }
}
const [planName, setPlanName] = useState('');
  const [dietPlan, setDietPlan] = useState([])
  useEffect(() => {
    if (editData) {
      setPlanName(editData.planName || '');

      const mappedDays = daysOfWeek.map((dayName) => {
        const existing = editData.diet.find((d) => d.day === dayName);
        return {
          day: dayName,
          breakfast: existing?.breakfast || '',
          midMorningSnack: existing?.midMorningSnack || '',
          lunch: existing?.lunch || '',
          eveningSnack: existing?.eveningSnack || '',
          dinner: existing?.dinner || '',
          postDinnerSnack: existing?.postDinnerSnack || '',
        };
      });

      setDietPlan(mappedDays);
    } else {
      setPlanName('');
      setDietPlan(daysOfWeek.map((day) => ({
        day,
        breakfast: '',
        midMorningSnack: '',
        lunch: '',
        eveningSnack: '',
        dinner: '',
        postDinnerSnack: '',
      })));
    }
  }, [editData]);
  const handleChange=(dayIndex,field,value)=>{
    const updatedplan=[...dietPlan];
    updatedplan[dayIndex][field]=value;
    setDietPlan(updatedplan)
  }
 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const filteredPlan = dietPlan.filter((day) =>
        Object.values(day).some((value) => value.trim() !== '')
      );

      const payload = {
        trainerId,
        planName,
        diet: filteredPlan,
      };

      if (editData && editData._id) {
        await axios.put(
          `http://localhost:3000/api/workoutmeals/diet/${editData._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Diet plan updated successfully!');
      } else {
        await axios.post(
          'http://localhost:3000/api/workoutmeals/diet',
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Diet plan created successfully!');
      }

      if (onSuccess) onSuccess(); // Inform parent to reset state & refresh list

    } catch (error) {
      console.error('Error saving diet plan:', error);
      alert('Error saving diet plan');
    }
  };

  return (
<form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Create Diet Plan</h2>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-1 text-gray-700">Plan Name</label>
        <input
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          placeholder="e.g. Weight Gain Week 1"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {dietPlan.map((day, index) => (
        <div key={index} className="mb-6 border border-gray-300 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-green-600 mb-4">{day.day}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['breakfast', 'midMorningSnack', 'lunch', 'eveningSnack', 'dinner', 'postDinnerSnack'].map(meal => (
              <div key={meal}>
                <label className="block font-medium text-gray-700 capitalize">{meal.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  value={day[meal]}
                  onChange={(e) => handleChange(index, meal, e.target.value)}
                  placeholder={`Enter ${meal}`}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-4"
      >
        Save Diet Plan
      </button>
    </form>
  );
};
  


export default CreateMeal