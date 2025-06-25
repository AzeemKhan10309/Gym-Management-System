import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const TrainerMembers = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
const [dietPlans, setDietPlans] = useState([]);
const [selectedWorkout, setSelectedWorkout] = useState('');
const [selectedDiet, setSelectedDiet] = useState('');

  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch (error) {
        console.error("Invalid token:", error);
        return;
      }
const trainerId = decoded.id;
axios.get('http://localhost:3000/api/workoutmeals/workout', {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => {
  setWorkoutPlans(res.data);
})
.catch(err => console.error("Workout Plans Error:", err));

axios.get('http://localhost:3000/api/workoutmeals/diet', {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => {
  setDietPlans(res.data);
})
.catch(err => console.error("Diet Plans Error:", err));



      axios
        .get(`http://localhost:3000/api/trainers/trainerMember/${trainerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
         
          setMembers(res.data);
        })
        .catch((err) => {
          console.error("Error fetching members:", err);
        });
    }
  }, [token]);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
    }

    if (ageYears > 0) return `${ageYears} years`;

    const diffMs = today - birthDate;
    const ageMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    const ageDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (ageMonths > 0) return `${ageMonths} months`;
    return `${ageDays} days`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not Provided";
    return new Date(dateStr).toLocaleDateString("en-GB");
  };
const assignPlansToMember = async (memberId) => {
  try {
await axios.put(`http://localhost:3000/api/workoutmeals/${memberId}/assignPlans`, {
      workoutPlanId: selectedWorkout,
      dietPlanId: selectedDiet,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert('Plans assigned successfully!');
  } catch (error) {
    console.error("Assignment failed:", error);
    alert("Failed to assign plans.");
  }
};

  if (selectedMember) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Member: {selectedMember.name}</h2>
        <p><strong>Name:</strong> {selectedMember.name}</p>
        <p><strong>Email:</strong> {selectedMember.email}</p>
        <p><strong>Phone:</strong> {selectedMember.phone}</p>
        <p><strong>Age:</strong> {calculateAge(selectedMember.date_of_birth)}</p>

        <p><strong>Membership Plan:</strong> {selectedMember.membership_plan_id?.plan_name || "N/A"}</p>
        <p><strong>Membership Start:</strong> {formatDate(selectedMember.membership_start_date)}</p>
        <p><strong>Membership End:</strong> {formatDate(selectedMember.membership_end_date)}</p>
         <div className="mt-4">
  <label className="block font-semibold mb-1">Assign Workout Plan:</label>
  <select
    value={selectedWorkout}
    onChange={(e) => setSelectedWorkout(e.target.value)}
    className="w-full border px-3 py-2 rounded"
  >
    <option value="">Select Workout Plan</option>
    {workoutPlans.map((plan) => (
      <option key={plan._id} value={plan._id}>{plan.title}</option>
    ))}
  </select>
</div>

<div className="mt-4">
  <label className="block font-semibold mb-1">Assign Diet Plan:</label>
  <select
    value={selectedDiet}
    onChange={(e) => setSelectedDiet(e.target.value)}
    className="w-full border px-3 py-2 rounded"
  >
    <option value="">Select Diet Plan</option>
    {dietPlans.map((plan) => (
      <option key={plan._id} value={plan._id}>{plan.planName}</option>
    ))}
  </select>
</div>

<button
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  onClick={() => assignPlansToMember(selectedMember._id)}
>
  Assign Plans
</button>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setSelectedMember(null)}
        >
          Back to Members
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b-4 border-indigo-500 pb-2">
        Your Members
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {members.map((member) => (
          <li
            key={member._id}
            className="bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-lg p-4 shadow-md"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">{member.name}</h3>
            <p className="text-gray-600">{member.email}</p>
            
            <button
              className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                setSelectedMember(member);
                setSelectedWorkout(member.assignedWorkoutPlan?._id || '');
                setSelectedDiet(member.assignedDietPlan?._id || '');
              }}
                >
              View Profile
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainerMembers;
