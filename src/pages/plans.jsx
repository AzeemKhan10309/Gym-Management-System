import React, { useEffect, useState } from "react";
import CreatePlan from "./createPlan";

const Plans = ({ token }) => {

    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const[show,setShow]=useState(false)
    const [editData, setEditData] = useState({
        plan_name: '',
        duration_in_days: '',
        price: '',
        description: ''
    })
    const handleDeletePlan = async (planid) => {
        if (!window.confirm("Are you sure you want to delete this Plan?")) return;
        try {

            const res = await fetch(`http://localhost:3000/api/memberships/${planid}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Failed to delete user');
            setPlans(prevPlans => prevPlans.filter(plan => plan._id !== planid));
        }
        catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        }
    }
    const handleEditClick = (plan) => {
        setEditId(plan._id);
        setEditData({
            plan_name: plan.plan_name,
            duration_in_days: plan.duration_in_days,
            price: plan.price,
            description: plan.description
        })
    }
    const handleSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/memberships/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // if token is required
                },
                body: JSON.stringify(editData)
            });

            if (!res.ok) throw new Error("Failed to update plan");

            const result = await res.json();
            const updated = result.updatedPlan;

            setPlans(prevPlans =>
                prevPlans.map(p => (p._id === editId ? updated : p))
            );
            setEditId(null);
        } catch (err) {
            console.error("Error updating plan:", err);
            alert("Failed to update plan.");
        }
    }
   
    useEffect(() => {
        const fetchplans = async () => {
            try {

                const res = await fetch('http://localhost:3000/api/memberships', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (!res.ok) throw new Error("Failed to fetch ")
                const data = await res.json();

                   setPlans(data.plans || data.memberships || []);
              

            } catch (error) {
                console.error('Error fetching plans:', error);
            } finally {
                setLoading(false)
            }
        }
        fetchplans();
    }, [token]);
    return (
        <div className="bg-white shadow rounded p-4 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Membership Plans</h2>
                   <button onClick={() => setShow(true)} className="text-blue-600">Add New</button>
              </div>
            {show && (
                       <CreatePlan
                           token={token}
                           onPlanAdded={(newPlan) => {
                           setPlans(prev => [...prev, { ...newPlan, _id: newPlan._id || newPlan.id }]);
                                                      }}
                          onClose={() => setShow(false)}
                              />

                     )}

            {loading ? (
                <p>Loading...</p>
            ) : !plans || plans.length === 0 ? (
                <p>No plans found.</p>
            ) : (
                <table className="min-w-full text-left text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th className="p-2">Plan Name</th>
                            <th className="p-2">Duration</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Delete/Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(plans) && plans.map(plan => {
                            if (!plan || !plan._id) return null;
                            return (
                                <tr key={plan._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">
                                        {editId === plan._id ? (
                                            <input
                                                type="text"
                                                value={editData.plan_name}
                                                onChange={e => setEditData({ ...editData, plan_name: e.target.value })}
                                                className="border px-2 py-1"
                                            />
                                        ) : (
                                            plan.plan_name
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editId === plan._id ? (
                                            <input
                                                type="number"
                                                value={editData.duration_in_days}
                                                onChange={e => setEditData({ ...editData, duration_in_days: e.target.value })}
                                                className="border px-2 py-1"
                                            />
                                        ) : (
                                            `${plan.duration_in_days} days`
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editId === plan._id ? (
                                            <input
                                                type="number"
                                                value={editData.price}
                                                onChange={e => setEditData({ ...editData, price: e.target.value })}
                                                className="border px-2 py-1"
                                            />
                                        ) : (
                                            `₹${plan.price}`
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editId === plan._id ? (
                                            <textarea
                                                value={editData.description}
                                                onChange={e => setEditData({ ...editData, description: e.target.value })}
                                                className="border px-2 py-1 w-full"
                                            />
                                        ) : (
                                            plan.description || 'N/A'
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editId === plan._id ? (
                                            <>
                                                <button onClick={handleSubmit} className="text-green-600 mr-2">Save</button>
                                                <button onClick={() => setEditId(null)} className="text-gray-600">Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditClick(plan)} className="text-blue-600 mr-2">Edit</button>
                                                <button onClick={() => handleDeletePlan(plan._id)} className="text-red-600">Delete</button>
                                            </>
                                        )}
                                    </td>
                               
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            )}
        </div>
    );
};
export default Plans