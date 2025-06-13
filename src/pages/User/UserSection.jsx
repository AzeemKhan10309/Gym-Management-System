import React, { useState } from 'react';
import UserFoam from '../userFoam';
import { deleteUser } from '../../../src/services/api';

const UsersSection = ({ users, setUsers, trainers, plans, loading }) => {
  const [formMode, setFormMode] = useState('view'); // 'view', 'edit', 'create'
  const [editUserId, setEditUserId] = useState(null);

  const editingUser = users.find((u) => u._id === editUserId);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      alert('Failed to delete user. Please try again.');
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = (userId) => {
    setEditUserId(userId);
    setFormMode('edit');
  };

  const handleSave = (updatedUser) => {
    if (formMode === 'create') {
      setUsers((prevUsers) => [...prevUsers, updatedUser]);
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );
    }
    setFormMode('view');
    setEditUserId(null);
  };

  const handleCancel = () => {
    setEditUserId(null);
    setFormMode('view');
  };

  const handleCreateUser = () => {
    setFormMode('create');
    setEditUserId(null);
  };

  return (
    <>
      {(formMode === 'edit' || formMode === 'create') ? (
        <UserFoam
          mode={formMode}
          initialData={formMode === 'edit' && editingUser ? editingUser : {}}
          trainers={trainers}
          plans={plans}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="bg-white shadow rounded p-4 w-full overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Total Members: {users.length}</h2>
            <button onClick={handleCreateUser} className="mb-4 text-blue-600">
              Add New User
            </button>
            <div className="overflow-x-auto max-w-full">
              <table className="w-full table-auto text-left text-sm">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Address</th>
                    <th className="p-2">DOB</th>
                    <th className="p-2">Start</th>
                    <th className="p-2">End</th>
                    <th className="p-2">Plan</th>
                    <th className="p-2">Trainer</th>
                    <th className="p-2">MemberShip No.</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="11" className="text-center py-10">Loading...</td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center py-10">No users found.</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.phone}</td>
                        <td className="p-2">{user.address}</td>
                        <td className="p-2">{new Date(user.date_of_birth).toLocaleDateString()}</td>
                        <td className="p-2">{new Date(user.membership_start_date).toLocaleDateString()}</td>
                        <td className="p-2">{new Date(user.membership_end_date).toLocaleDateString()}</td>
                        <td className="p-2">{user.membership_plan_id?.plan_name || 'N/A'}</td>
                        <td className="p-2">{user.trainer_id?.name || 'N/A'}</td>
                        <td className="p-2">{user.special_code}</td>
                        <td className="p-2">
                          <button
                            className="text-red-600 hover:underline mr-3"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => handleUpdateUser(user._id)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UsersSection;
