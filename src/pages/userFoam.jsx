import React, { useEffect, useState } from 'react';

const UserFoam = ({  mode = 'create', initialData = {}, onSave, onCancel, trainers, plans }) => {
const[formData , setFormData]=useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password:"",
    date_of_birth: '',
    membership_start_date: '',
    membership_end_date: '',
    membership_plan_id: '',
    trainer_id: '',
    ...initialData,
})
 useEffect(()=>{
  if(mode===`edit` && initialData){
     setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      date_of_birth: '',
      membership_start_date: '',
      membership_end_date: '',
      membership_plan_id: '',
      trainer_id: '',
      ...initialData
  
 })
}
 },[initialData,mode]);

const handleChange =(e)=>{
    const{name , value} =e.target;

    setFormData(prev=>({...prev,[name]:value}))
}
const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint =
    mode === 'edit'
      ? `http://localhost:3000/api/members/${formData._id}`
      : 'http://localhost:3000/api/members/register';

  const method = mode === 'edit' ? 'PUT' : 'POST';

  try {
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
  const errorData = await res.json();
  throw new Error(errorData.message || 'Request failed');
}

    const savedUser = await res.json();
    console.log('Submitting form data:', formData);

    onSave(savedUser);
     if (mode === 'create') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        date_of_birth: '',
        membership_start_date: '',
        membership_end_date: '',
        membership_plan_id: '',
        trainer_id: '',
      });
    }
  } catch (error) {
    alert(error.message);
  }
};


  return (
   <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update User</h2>
      {/* Add input fields for all formData keys */}
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="mb-2 p-2 border w-full" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"className="mb-2 p-2 border w-full" required={mode === 'create'}  // require password only when creating a member
/>

      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mb-2 p-2 border w-full" required />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="mb-2 p-2 border w-full" />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="mb-2 p-2 border w-full" />
      <label>Date of Birth</label>
      <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="mb-2 p-2 border w-full" />
      <label>Membership Start Date</label>
      <input type="date" name="membership_start_date" value={formData.membership_start_date?.split('T')[0] || ''} onChange={handleChange} className="mb-2 p-2 border w-full" />
      <label>Membership End Date</label>
      <input type="date" name="membership_end_date" value={formData.membership_end_date?.split('T')[0] || ''} onChange={handleChange} className="mb-2 p-2 border w-full" />
      <select
  name="membership_plan_id"
  value={formData.membership_plan_id?._id || formData.membership_plan_id || ''}
  onChange={handleChange}
  required
  className="p-2 border w-full mb-2"
>
  <option value="">-- Select Plan --</option>
  {plans.map(plan => (
    <option key={plan._id} value={plan._id}>
      {plan.plan_name}
    </option>
  ))}
</select>


     <select
        name="trainer_id"
        value={formData.trainer_id?._id || formData.trainer_id || ''}
        onChange={handleChange}
        className="p-2 border w-full mb-2"
      >
        <option value="">-- Select Trainer --</option>
        {trainers.map(trainer => (
          <option key={trainer._id} value={trainer._id}>
            {trainer.name}
          </option>
        ))}
      </select>
      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded"> 
         {mode === 'edit' ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  )
}

export default UserFoam