import React, { useState, useEffect } from 'react';
import Plans from './plans';
import { fetchTrainers, fetchUsers, fetchPlans } from '../services/api';
import Sidebar from './Slider/Slider';
import Header from './Slider/Header';
import TrainersSection from './Trainer/TrainersSection';
import UsersSection from './User/UserSection';
import AddAttendance from './Attendence/AddAttendance';
import DueFee from "../pages/payment/DueFee";
const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [active, setActive] = useState('fee-dueDate');
  const [trainers, setTrainers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch data
  const fetchData = async () => {

    setLoading(true);
    try {
      const [trainerData, userData, planData] = await Promise.all([
        fetchTrainers(),
        fetchUsers(),
        fetchPlans(token),
      ]);
      setTrainers(trainerData);
      setUsers(userData);
      setPlans(planData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [active]);


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
           <Sidebar active={active} setActive={setActive} />


      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
       <Header/>

        {/* Main Section */}
        <main className="p-6 space-y-6">
{active === 'add-attendance' && <AddAttendance token={token} />}

{active === 'fee-dueDate' && <DueFee token={token}/>}

          {/* Trainers Section */}
          {active === 'trainers' && (
          <TrainersSection
              token={token}
              trainers={trainers}
              setTrainers={setTrainers}
              fetchData={fetchData}
              loading={loading}
            />
          )}

          {/* Plans Section */}
          {active === 'plans' && <Plans token={token} />}

          {/* Users Section */}
          {active === 'users' && (
                 <UsersSection
              users={users}
              setUsers={setUsers}
              trainers={trainers}
              plans={plans}
              loading={loading}
            />
          )}

       
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
