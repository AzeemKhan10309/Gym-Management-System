import React, { useEffect } from 'react'
import { useState } from 'react'
const CreateTrainer = ({ token, onTrainerAdded, onClose,initialData = null, mode = "add" }) => {
 const[formData , setFormData]=useState({
      name: '',
    email: '',
    phone: '',
    expertise: '',
    working_hours: '',
    password:""
 })
 const handleChange =(e)=>{
setFormData({...formData,[e.target.name]: e.target.value})
 }
 useEffect(()=>{
    if(initialData){
        setFormData({...initialData,password:""})
    }

 },[initialData])


 const handleSubmit = async (e) => {
 e.preventDefault();
 try{
    const url= mode==="edit" ? "http://localhost:3000/api/trainers/${initialData._id"
                             : 'http://localhost:3000/api/trainers/register';

         const method=mode==="edit" ?"PUT" :"POST"
         const res=await fetch(url,{
            method,
                headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
         })
       
    const data= await res.json()
    if(!res.ok) throw new Error("Failed To Add New Trainer")
        onTrainerAdded(data.trainer ||data.Trainer )
    onClose();
 } catch (error) {
    console.error(error);
 }
 }

  return (
   <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded">
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2" />
       {mode === 'create' && (
       <input
       type="password"
       name="password"
       value={formData.password || ''}
       onChange={handleChange}
       placeholder="Password"
       className="mb-2 p-2 border w-full"
       required
  />
)}
      
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2" />
       <input type="text" name="fee" value={formData.fee} onChange={handleChange} placeholder="fee" className="border p-2" />

      <input type="text" name="expertise" value={formData.expertise} onChange={handleChange} placeholder="Expertise" className="border p-2" />
      <input type="text" name="working_hours" value={formData.working_hours} onChange={handleChange} placeholder="Working Hours" className="border p-2" />
      <div className="col-span-full flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Trainer</button>
        <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  )
}

export default CreateTrainer