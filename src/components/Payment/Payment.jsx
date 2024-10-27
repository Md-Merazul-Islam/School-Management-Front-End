import React, { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [cusPhone, setCusPhone] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const MONTH_CHOICES = [
    { value: "JAN", label: "January" },
    { value: "FEB", label: "February" },
    { value: "MAR", label: "March" },
    { value: "APR", label: "April" },
    { value: "MAY", label: "May" },
    { value: "JUN", label: "June" },
    { value: "JUL", label: "July" },
    { value: "AUG", label: "August" },
    { value: "SEP", label: "September" },
    { value: "OCT", label: "October" },
    { value: "NOV", label: "November" },
    { value: "DEC", label: "December" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      amount,
      cus_name: cusName,
      cus_email: cusEmail,
      cus_phone: cusPhone,
      month,
      user_id: userId,
    };

    console.log("Submitting payment data:", paymentData);

    try {
      const response = await axios.post(
        "https://school-management-five-iota.vercel.app/payment/api/",
        paymentData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response.data);
      setPaymentResponse(response.data);
      setError("");
    } catch (error) {
      console.error("API error:", error.response?.data);
      setError(
        "Payment failed: " + (error.response?.data?.message || error.message)
      );
      setPaymentResponse(null);
    }
  };

  useEffect(() => {
    if (paymentResponse && paymentResponse.payment_url) {
      window.location.href = paymentResponse.payment_url;
    }
  }, [paymentResponse]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Make a Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Amount:
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              value={cusName}
              onChange={(e) => setCusName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={cusEmail}
              onChange={(e) => setCusEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="tel"
              value={cusPhone}
              onChange={(e) => setCusPhone(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Month:
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a month</option>
              {MONTH_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Pay Now
          </button>
        </form>

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Payment;
