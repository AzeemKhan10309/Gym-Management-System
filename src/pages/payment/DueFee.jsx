import React, { useState, useEffect } from "react";
import axios from "axios";

const DueFee = ({ token }) => {
    const [overdue, setOverdue] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/payments/notifications`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (res.data.success) {
                    setOverdue(res.data.overdue || []);
                    setUpcoming(res.data.upcoming || []);
                }
            })
            .catch(err => {
                console.error(err);
                setOverdue([]);
                setUpcoming([]);
            });
    }, [token]);

    return (
        <div className="my-4">
            {overdue.length === 0 && upcoming.length === 0 && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                    <h2 className="font-bold">All caught up!</h2>
                    <p>No overdue or upcoming payments in the next 5 days.</p>
                </div>
            )}

            {overdue.length > 0 && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <h2 className="font-bold">Overdue Payments:</h2>
                    <ul>
                        {overdue.map((payment, index) => (
                            <li key={index}>
                                {payment.memberName} - Due on {payment.dueDate}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {upcoming.length > 0 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
                    <h2 className="font-bold">Upcoming Payments (Next 5 Days):</h2>
                    <ul>
                        {upcoming.map((payment, index) => (
                            <li key={index}>
                                {payment.memberName} - Due on {payment.dueDate}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DueFee;
