import React from 'react';

const PaySuccess = () => {
  const handleHomeLinkClick = (event) => {
    event.preventDefault();
    window.location.href = 'https://amader-cst.netlify.app/';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
        <p className="text-lg mb-4">Your payment has been processed successfully. Thank you for your transaction!</p>
        <p className="mb-6">Thank you.</p>
        <button 
          onClick={handleHomeLinkClick} 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default PaySuccess;
