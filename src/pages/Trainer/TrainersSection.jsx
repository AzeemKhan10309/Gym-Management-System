import React, { useState } from 'react';
import CreateTrainer from './createTrainer';
import { deleteTrainer } from '../../..//src/services/api';

const TrainersSection = ({ token, trainers, setTrainers, fetchData, loading }) => {
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const [trainerFormMode, setTrainerFormMode] = useState('add');
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleAddTrainerClick = () => {
    setTrainerFormMode('add');
    setSelectedTrainer(null);
    setShowTrainerForm(true);
  };

  const handleEditTrainerClick = (trainer) => {
    setTrainerFormMode('edit');
    setSelectedTrainer(trainer);
    setShowTrainerForm(true);
  };

  const handleTrainerFormClose = () => {
    setTrainerFormMode('add');
    setSelectedTrainer(null);
    setShowTrainerForm(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this trainer?`)) return;
    try {
      await deleteTrainer(id);
      setTrainers((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      alert('Failed to delete trainer. Please try again.');
      console.error('Error deleting trainer:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 max-w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Trainers List</h2>
      <button onClick={handleAddTrainerClick} className="mb-4 text-blue-600">
        Add New
      </button>

      {showTrainerForm && (
        <CreateTrainer
          token={token}
          mode={trainerFormMode}
          initialData={selectedTrainer}
          onTrainerAdded={fetchData}
          onClose={handleTrainerFormClose}
        />
      )}

      <table className="w-full table-auto text-left text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Fee</th>

            <th className="p-2 hidden sm:table-cell">Expertise</th>
            <th className="p-2">Working Hours</th>
            <th className="p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="p-2 text-center">Loading...</td>
            </tr>
          ) : trainers.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-2 text-center">No trainers found.</td>
            </tr>
          ) : (
            trainers.map((trainer) => (
              <tr key={trainer._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{trainer.name}</td>
                <td className="p-2">{trainer.email}</td>
                <td className="p-2">{trainer.phone}</td>
                 <td className="p-2">{trainer.fee}</td>

                <td className="p-2 hidden sm:table-cell">{trainer.expertise || 'N/A'}</td>
                <td className="p-2">{trainer.working_hours || 'N/A'}</td>
                <td className="p-2">
                  <button
                    className="text-red-600 hover:underline mr-3"
                    onClick={() => handleDelete(trainer._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEditTrainerClick(trainer)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrainersSection;
