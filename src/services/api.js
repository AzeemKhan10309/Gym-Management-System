export const fetchTrainers=async ()=>{
    const res =await fetch("http://localhost:3000/api/trainers");
    if(!res.ok)throw new Error("Failes to fetch trainers")
          const data = await res.json();

        return data.trainers || [];
};

export const fetchUsers = async () => {
  const res = await fetch('http://localhost:3000/api/members');
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  return data.users || [];
};

export const fetchPlans = async (token)=>{
    const res = await fetch('http://localhost:3000/api/memberships', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const contentType=res.headers.get("content-type");
  if(!res.ok || !contentType.includes("application/json")){
    const text=await res.text();
    throw new Error(`unexpected response:${text}`)
  }
  const data = await res.json();
  return data.plans || [];
}

export const deleteUser = async (id) => {
  return fetch(`http://localhost:3000/api/members/${id}`, {
    method: 'DELETE',
  });
};

export const deleteTrainer = async (id) => {
  return fetch(`http://localhost:3000/api/trainers/${id}`, {
    method: 'DELETE',
  });
};