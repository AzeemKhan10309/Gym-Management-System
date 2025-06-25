import React from "react";

const MyProfile = ({ user }) => {
    const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

  if (!user) return <p>Loading profile data...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Age:</strong>{" "}{user.date_of_birth? `${calculateAge(user.date_of_birth)} years`: "N/A"}</p>
<p>
  <strong>Membership Start:</strong>{" "}
  {user.membership_start_date
    ? new Date(user.membership_start_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A"}
</p>
<p>
<strong>Membership End:</strong>{" "}
  {user.membership_end_date
    ? new Date(user.membership_end_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A"}
</p>
<p><strong>Membership Plan:</strong> {user.membership_plan_id?.planName || "N/A"}</p>

<p><strong>Trainer Name:</strong> {user.trainer_id?.name || "N/A"}</p>
      </div>
    </div>
  );
};

export default MyProfile;
