import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentComponent = ({ memberId, onClose, onPaymentSuccess, token }) => {
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log("Fetching details for memberId:", memberId);
        const res = await axios.get(`http://localhost:3000/api/members/payment-details/${memberId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetched response:", res);
        console.log("Fetched data:", res.data);
        setMemberData(res.data);
      } catch (err) {
        console.error("Error fetching payment details", err);
        alert("Failed to fetch member details");
      }
    };

    if (memberId && token) {
      fetchDetails();
    }
  }, [memberId, token]);

  const handlePayment = async () => {
    try {
      const paymentData = {
        memberId,
        method: "Cash"
      };

      console.log("Sending payment:", paymentData);

      await axios.post(`http://localhost:3000/api/payments`, { memberId }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      alert("Payment Successful!");
      onPaymentSuccess();
      onClose();
    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment failed");
    }
  };

  if (!memberData) return <p>Loading...</p>;

  const totalFee =
    (memberData.membershipPlan?.price || 0) + (memberData.trainer?.fee || 0);

  return (
    <><div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '30px',
      width: '400px',
      margin: '20px auto',
      background: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🧾 Payment Invoice</h2>

      <div style={{ marginBottom: '15px' }}>
        <p><strong>👤 Name:</strong> {memberData.name}</p>
        <p><strong>📧 Email:</strong> {memberData.email}</p>
      </div>

      <hr />

      <div style={{ marginTop: '15px' }}>
        <h3>🏋️ Membership Plan</h3>
        <p><strong>Name:</strong> {memberData.membershipPlan?.name}</p>
        <p><strong>Price:</strong> Rs{memberData.membershipPlan?.price}</p>
        <p><strong>Duration:</strong> {memberData.membershipPlan?.duration} months</p>
      </div>

      {memberData.trainer && (
        <>
          <hr />
          <div style={{ marginTop: '15px' }}>
            <h3>🤝 Trainer Details</h3>
            <p><strong>Name:</strong> {memberData.trainer.name}</p>
            <p><strong>Fee:</strong> Rs{memberData.trainer.fee}</p>
          </div>
        </>
      )}

      <hr />

      <h3 style={{ textAlign: 'right', marginTop: '20px' }}>
  <span>💰 Total Fee: <span style={{ color: '#2e8b57' }}>Rs {totalFee}</span></span>
</h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
        <button
          onClick={handlePayment}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e8b57',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Confirm Payment
        </button>
        <button
          onClick={onClose}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ccc',
            color: '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
    </>
  );
};

export default PaymentComponent;
