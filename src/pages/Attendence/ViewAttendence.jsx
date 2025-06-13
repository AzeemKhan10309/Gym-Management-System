import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberAttendance = ({ memberId , token}) => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (!memberId) return;

    axios.get(`http://localhost:3000/api/attendance/${memberId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => setAttendance(res.data))
      .catch((err) => console.error(err));
  }, [memberId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧍‍♂️ Attendance for Member</h2>
      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="table-auto w-full bg-white shadow rounded">
          <thead className="bg-blue-100 text-black">
            <tr>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record._id}>
                <td className="py-2 px-4 border">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MemberAttendance;
