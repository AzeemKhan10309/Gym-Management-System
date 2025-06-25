import React, { useState, useEffect } from 'react';
import axios from 'axios';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const WorkoutPlanForm = ({ token, editData, onSuccess }) => {
  const [planName, setPlanName] = useState('');
  const [days, setDays] = useState(
    daysOfWeek.map(day => ({
      day,
      warmup: '',
      optional: '',
      exercises: [{ name: '', sets: '', reps: '', notes: '' }]
    }))
  );

  useEffect(() => {
    if (editData) {
      setPlanName(editData.title || '');
      const mergedDays = daysOfWeek.map(day => {
        const existingDay = editData.days.find(d => d.day === day);
        return existingDay
          ? {
              day,
              warmup: existingDay.warmup || '',
              optional: existingDay.optional || '',
              exercises: existingDay.exercises.length > 0
                ? existingDay.exercises
                : [{ name: '', sets: '', reps: '', notes: '' }]
            }
          : {
              day,
              warmup: '',
              optional: '',
              exercises: [{ name: '', sets: '', reps: '', notes: '' }]
            };
      });
      setDays(mergedDays);
    }
  }, [editData]);

  const handleDayChange = (dayIndex, field, value) => {
    const updated = [...days];
    updated[dayIndex][field] = value;
    setDays(updated);
  };

  const handleExerciseChange = (dayIndex, exIndex, field, value) => {
    const updated = [...days];
    updated[dayIndex].exercises[exIndex][field] = value;
    setDays(updated);
  };

  const addExercise = (dayIndex) => {
    const updated = [...days];
    updated[dayIndex].exercises.push({ name: '', sets: '', reps: '', notes: '' });
    setDays(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredDays = days
      .map(day => ({
        day: day.day,
        warmup: day.warmup,
        optional: day.optional,
        exercises: day.exercises.filter(ex => ex.name.trim() !== '')
      }))
      .filter(day => day.exercises.length > 0);

    try {
      if (editData) {
        await axios.put(
          `http://localhost:3000/api/workoutmeals/workout/${editData._id}`,
          { title: planName, days: filteredDays },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Workout plan updated!');
      } else {
        await axios.post(
          'http://localhost:3000/api/workoutmeals/workout',
          { title: planName, days: filteredDays },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Workout plan created!');
      }

      // Reset form
      setPlanName('');
      setDays(
        daysOfWeek.map(day => ({
          day,
          warmup: '',
          optional: '',
          exercises: [{ name: '', sets: '', reps: '', notes: '' }]
        }))
      );
      onSuccess(); // Notify parent to refresh
    } catch (err) {
      console.error('Error saving workout plan:', err.response?.data || err.message);
      alert(`Error: ${err.response?.data?.message || 'Failed to save plan'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white shadow-lg rounded p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        {editData ? 'Edit' : 'Create'} Workout Plan
      </h2>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-1 text-gray-700">Plan Name</label>
        <input
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          placeholder="e.g. Fat Loss Week 1"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {days.map((dayObj, dayIndex) => (
        <div key={dayIndex} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">{dayObj.day}</h3>

          <input
            type="text"
            placeholder="Warm-up (e.g. 5–10 min cardio)"
            value={dayObj.warmup}
            onChange={(e) => handleDayChange(dayIndex, 'warmup', e.target.value)}
            className="mb-2 w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Optional Activity (e.g. 10 min cycling)"
            value={dayObj.optional}
            onChange={(e) => handleDayChange(dayIndex, 'optional', e.target.value)}
            className="mb-4 w-full border rounded px-3 py-2"
          />

          {dayObj.exercises.map((ex, exIndex) => (
            <div key={exIndex} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
              <input
                type="text"
                placeholder="Exercise Name"
                value={ex.name}
                onChange={(e) => handleExerciseChange(dayIndex, exIndex, 'name', e.target.value)}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Sets"
                value={ex.sets}
                onChange={(e) => handleExerciseChange(dayIndex, exIndex, 'sets', e.target.value)}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Reps"
                value={ex.reps}
                onChange={(e) => handleExerciseChange(dayIndex, exIndex, 'reps', e.target.value)}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Notes (optional)"
                value={ex.notes}
                onChange={(e) => handleExerciseChange(dayIndex, exIndex, 'notes', e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => addExercise(dayIndex)}
            className="bg-green-500 text-white text-sm px-3 py-1 rounded mt-2"
          >
            + Add Exercise
          </button>
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-4"
      >
        {editData ? 'Update' : 'Save'} Workout Plan
      </button>
    </form>
  );
};

export default WorkoutPlanForm;
