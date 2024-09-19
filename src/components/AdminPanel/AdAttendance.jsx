import React, { useState, useEffect } from "react";
import axios from "axios"; // Include Axios directly

const AdAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    roll_no: "",
    status: "Absent",
  });
  const [filters, setFilters] = useState({
    date: "",
    status: "",
  });
  const [errors, setErrors] = useState("");

  // Replace with your actual token
  const token = localStorage.getItem("token");

  // Base URL for API requests
  const apiUrl = "https://amader-school.up.railway.app/";

  // Fetch attendance data and student list
  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, [filters]);

  // Fetch attendance records
  const fetchAttendance = async () => {
    try {
      const params = {};
      if (filters.date) params.date = filters.date;
      if (filters.status) params.status = filters.status;

      const response = await axios.get(`${apiUrl}classes/attendance/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params,
      });

      setAttendance(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Fetch student list
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${apiUrl}academics/students-list/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleCreate = async () => {
    const existingRecord = attendance.find(
      (item) => item.roll_no === formData.roll_no
    );

    if (existingRecord) {
      setErrors("Attendance record for this roll number already exists.");
      return;
    }

    try {
      console.log("Form submission:",formData);
      
      await axios.post(`${apiUrl}classes/attendance/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      fetchAttendance(); // Refresh the list
      setErrors(""); // Clear errors
    } catch (error) {
      console.error("Error creating attendance:", error);
    }
  };

  // Handle attendance update
  const handleUpdate = async (id) => {
    try {
      await axios.put(`${apiUrl}classes/attendance/${id}/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      fetchAttendance(); // Refresh the list
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  // Handle attendance deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}classes/attendance/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      fetchAttendance(); // Refresh the list
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  // Get student name by roll number
  const getStudentName = (roll_no) => {
    const student = students.find(student => student.roll_no === roll_no);
    return student ? `${student.first_name} ${student.last_name}` : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Attendance Management</h1>

        {errors && <p className="text-red-500 mb-4">{errors}</p>}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          {/* Attendance Form */}
          <form className="flex flex-col gap-4 mb-4">
            <select
              name="roll_no"
              value={formData.roll_no}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select Roll No</option>
              {students.map(student => (
                <option key={student.roll_no} value={student.roll_no}>
                  {student.roll_no} - {student.first_name} {student.last_name}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            <button
              type="button"
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Attendance
            </button>
          </form>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              placeholder="Filter by Date"
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          {/* Attendance List */}
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {attendance.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.roll_no}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStudentName(item.roll_no)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdAttendance;
