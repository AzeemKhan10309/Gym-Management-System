import axios from "axios";
import React, { useState, useEffect } from "react";
import Payment from "../payment/payment";
import ViewAttendance from "../../pages/Attendence/ViewAttendence";

const AddAttendance = ({ token }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [member, setMember] = useState(null);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [showAttendance, setShowAttendance] = useState(false);

  const handleFeePaid = () => {
    setShowPayment(true);
  };

  const handleViewAttendance = (memberId) => {
    setSelectedMemberId(memberId);
    setShowAttendance(true);
  };

  const handlePaymentSuccess = () => {
    if (member) {
      setMember({ ...member, isFeePaid: true });
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) return setSuggestions([]);
      try {
        const res = await axios.get(`http://localhost:3000/api/members/search?q=${query}`);
        setSuggestions(res.data);
      } catch {
        setSuggestions([]);
      }
    };
    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const selectMember = (member) => {
    setMember(member);
    setQuery(member.name);
    setSuggestions([]);
    setMessage("");
    setShowAttendance(false); // Reset attendance view if switching member
  };

  const markAttendance = async () => {
    if (!member) return;
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/attendance",
        {
          memberId: member._id,
          status: "present",
          date: new Date(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Attendance marked!");
      setQuery("");
      setMember(null);
      setShowSearch(false);
      setShowAttendance(false);
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("⚠️ Attendance already marked for today.");
      } else {
        setMessage("❌ Error marking attendance.");
        console.error("Attendance error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      {!showSearch && (
        <button
          onClick={() => setShowSearch(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Mark Attendance
        </button>
      )}

      {showSearch && (
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter Member Name"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setMember(null);
              setMessage("");
            }}
          />

          {suggestions.length > 0 && !member && (
            <ul className="absolute w-full bg-white border max-h-48 overflow-y-auto z-10 shadow-lg">
              {suggestions.map((item) => (
                <li
                  key={item._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectMember(item)}
                >
                  {item.name} ({item.special_code})
                </li>
              ))}
            </ul>
          )}

          {member && (
            <div className="mt-2">
              <h3 className="font-semibold">Member Found:</h3>
              <p><strong>Name:</strong> {member.name}</p>
              <p><strong>Code:</strong> {member.special_code}</p>
              <p style={{ color: member.isFeePaid ? "green" : "red" }}>
                Fee: {member.isFeePaid ? "Paid" : "Not Paid"}
              </p>

              {!member.isFeePaid && (
                <button
                  onClick={handleFeePaid}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300"
                >
                  Mark Fee as Paid
                </button>
              )}

              <button
                onClick={() => handleViewAttendance(member._id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                Show All Attendance
              </button>

              {showPayment && (
                <Payment
                  memberId={member._id}
                  onClose={() => setShowPayment(false)}
                  onPaymentSuccess={handlePaymentSuccess}
                  token={token}
                />
              )}

              {showAttendance && selectedMemberId && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Attendance for {member.name}</h3>
                  <ViewAttendance memberId={selectedMemberId} token={token} />
                </div>
              )}

              <button
                onClick={markAttendance}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Marking..." : "Confirm Attendance"}
              </button>
            </div>
          )}

          {message && <p className="mt-4 text-green-700 font-medium">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default AddAttendance;
