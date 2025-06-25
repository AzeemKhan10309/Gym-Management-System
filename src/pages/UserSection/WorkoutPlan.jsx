import React from 'react';

const WorkoutPlan = ({ user }) => {
  const workoutPlan = user?.assignedWorkoutPlan;

  if (!workoutPlan) {
    return <p>No workout plan assigned.</p>;
  }

  const days = Array.isArray(workoutPlan.days) ? workoutPlan.days : [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Workout Plan</h2>
      <p className="text-lg font-semibold">{workoutPlan.title}</p>

      {days.length === 0 ? (
        <p className="text-gray-500 mt-2">No workout days available.</p>
      ) : (
        days.map((day, index) => (
          <div key={index} className="mt-4 p-4 border rounded bg-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{day.day}</h3>
            <p><strong>Warmup:</strong> {day.warmup}</p>
            {day.optional && <p><strong>Optional:</strong> {day.optional}</p>}

            {Array.isArray(day.exercises) && day.exercises.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Exercises:</p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  {day.exercises.map((ex, idx) => (
                    <li key={idx}>
                      {ex.name} — {ex.sets} sets × {ex.reps} reps
                      {ex.notes && <> ({ex.notes})</>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutPlan;
