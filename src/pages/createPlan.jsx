import React from 'react'
import {useState} from "react";

const CreatePlan = ({token,onPlanAdded , onClose}) => {
    const[formData,setFormData]=useState({
        plan_name:"",
        duration_in_days: "",
        price: "",
        description: ""
    })

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const handleSubmit =async (e)=>{
         e.preventDefault();
         try{
            const res=await fetch("http://localhost:3000/api/memberships",{
                method:"POST",
                 headers: {
                           "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                           },
                body:JSON.stringify(formData)
            })

        const data = await res.json();
        if (!res.ok){throw new Error(data.message || "Failed to add plan");}

        console.log(data)
         onPlanAdded(data.membership);
        setFormData({ plan_name: "", duration_in_days: "", price: "", description: "" });
         onClose();

         }catch (err) {
            console.error("Error adding plan:", err);
             alert(err);
    }

    }

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input name="plan_name" placeholder="Plan Name" value={formData.plan_name} onChange={handleChange} className="border p-2" />
      <input type="number" name="duration_in_days" placeholder="Duration (in days)" value={formData.duration_in_days} onChange={handleChange} className="border p-2" />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2" />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 col-span-full" />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-full sm:col-span-1">Add Plan</button>
    </form>
  )
}

export default CreatePlan