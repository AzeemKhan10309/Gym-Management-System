import React, { useState , useEffect} from "react";
import Sidebar from "./Sidebar"; // or UserSidebar
import Topbar from "./Topbar";
import MyProfile from "./MyProfile";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import DietPlan from "./DietPlan";
import WorkoutPlan from "./WorkoutPlan";

// Dashboard welcome card
const DashboardOverview = ({ name }) => (
  <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6 rounded-lg shadow mb-6">
    <h2 className="text-xl font-bold mb-1">Welcome back, {name} 👋</h2>
    <p className="text-sm">
      We're glad to see you again. Here's a quick overview of your gym's progress.
    </p>
  </div>
);

const Dashboard = () => {
   const token = localStorage.getItem("token");

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [user, setUser] = useState(null);

  
useEffect(() => {

   const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      console.log("Decoded userId:", userId); // 👈 Check what this logs

      axios.get(`http://localhost:3000/api/members/details/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setUser(response.data);
      }).catch(error => {
        console.error("Error fetching user data:", error);
      });
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, []);
  const viewMap = {
    "Dashboard": user ? <DashboardOverview name={user.name} /> : <p>Loading...</p>,
    "My Profile": user ? <MyProfile user={user} /> : <p>Loading profile...</p>,
    "My Plans": user ? <DietPlan user={user} /> : <p>Loading profile...</p>,
        "My Workout Plan": user ? <WorkoutPlan user={user} /> : <p>Loading profile...</p>

  };
  return (
    <div className="flex">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        token={token}
      />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Topbar />
        <main className="p-6">
          {viewMap[activeItem] || <div>Page not found</div>}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
