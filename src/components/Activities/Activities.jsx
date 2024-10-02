import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Activities = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch attendance data from API
  useEffect(() => {
    axios.get('https://school-management-five-iota.vercel.app/classes/attendance/')
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the attendance data!", error);
      });
  }, []);

  // Filter function
  const filteredData = attendanceData.filter(item => {
    return (
      (dateFilter === '' || item.date === dateFilter) &&
      (statusFilter === '' || item.status === statusFilter)
    );
  });

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>

      <div className="flex mb-4">
        {/* Date Filter */}
        <div className="mr-4">
          <label className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Roll No</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((attendance, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{attendance.roll_no}</td>
                <td className="px-4 py-2">{attendance.date}</td>
                <td className={`px-4 py-2 ${attendance.status === 'Absent' ? 'text-red-500' : 'text-green-500'}`}>
                  {attendance.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
