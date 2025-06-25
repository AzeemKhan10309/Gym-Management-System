import React, { useState } from 'react';

import Sidebar from '../TrainerSection/partials/Sidebar';
import Topbar from '../TrainerSection/partials/Topbar';
import Client from "../TrainerSection/Clients"
import CreateWorkout from './CreateWorkout';
import ViewAllPlans from './ViewAllPlans';
import CreateMeal from './CreateMeal';
import ViewAllDietPlans from './ViewAllDietPlans';
const Dashboard = () => {
 const [activePage, setActivePage] = useState('Clients');
 const [editData, setEditData] = useState(null);
 const [refreshToggle, setRefreshToggle] = useState(false);
 const handleEdit = (plan , type =`workout`) => {
    setEditData(plan); 
     if (type === 'workout') {
    setActivePage("Create Workout");
  } else if (type === 'diet') {
    setActivePage("Create Meal");
  }

  };
  const handleSuccess = (source) => {
  setEditData(null);
  setRefreshToggle(prev => !prev);

  if (source === "diet") {
    setActivePage("View All Diet");
  } else if (source === "workout") {
    setActivePage("View All Plans");
  }
};
 const token = localStorage.getItem('token');
  return (
    <div className="flex min-h-screen bg-gray-100">
<Sidebar activeItem={activePage} onNavigate={setActivePage} token={token} />
      <main className="flex-1 p-6">
        <Topbar />
       {activePage === "Clients"  && <Client/>}
       {activePage === "Create Workout"  && <CreateWorkout token={token} editData={editData} onSuccess={() => handleSuccess("workout")}/>}
       {activePage === "View All Plans"  && <ViewAllPlans token={token} onEdit={handleEdit} refresh={refreshToggle} />}
       {activePage === "Create Meal"  && <CreateMeal token={token} editData={editData} onSuccess={() => handleSuccess("diet")} />}
       {activePage === "View All Diet"  && <ViewAllDietPlans token={token} onEdit={(plan)=>handleEdit(plan,`diet`)} refresh={refreshToggle} />}



      </main>
    </div>
  );
};

export default Dashboard;
