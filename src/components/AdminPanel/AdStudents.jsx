import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Admin from "../Admin/Admin";

const API_BASE_URL = 'https://amader-school.up.railway.app/academics';

const AdStudents = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [studentForm, setStudentForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    photo: null,
    class_name: '',
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchClasses();

    if (id) {
      fetchStudent(id);
    }
  }, [id]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/`);
      setStudents(response.data);
    } catch (error) {
      setErrorMessage('Error fetching students: ' + (error.response ? error.response.data : error.message));
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/classes/`);
      setClasses(response.data);
    } catch (error) {
      setErrorMessage('Error fetching classes: ' + (error.response ? error.response.data : error.message));
    }
  };

  const fetchStudent = async (studentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/${studentId}/`);
      setEditingStudent(response.data);
      setStudentForm({
        username: response.data.username,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        address: response.data.address,
        photo: null,
        class_name: response.data.class_name,
      });
    } catch (error) {
      setErrorMessage('Error fetching student for editing: ' + (error.response ? error.response.data : error.message));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm({
      ...studentForm,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setStudentForm({
      ...studentForm,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(studentForm).forEach((key) => {
      formData.append(key, studentForm[key]);
    });

    try {
      if (editingStudent) {
        await axios.put(`${API_BASE_URL}/students/${editingStudent.id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage('Student updated successfully!');
        setEditingStudent(null);
      } else {
        await axios.post(`${API_BASE_URL}/students/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage('Student added successfully!');
      }
      fetchStudents();
      resetForm();
      navigate('/admin/students');
    } catch (error) {
      setErrorMessage('Error saving student: ' + (error.response ? error.response.data : error.message));
    }
  };

  const resetForm = () => {
    setStudentForm({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      photo: null,
      class_name: '',
    });
    setSuccessMessage(''); // Reset success message
    setErrorMessage(''); // Reset error message
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setStudentForm({
      username: student.username,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      phone_number: student.phone_number,
      address: student.address,
      photo: null,
      class_name: student.class_name,
    });
    setSuccessMessage(''); // Reset success message when editing
    setErrorMessage(''); // Reset error message when editing
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${API_BASE_URL}/students/${id}/`);
        setSuccessMessage('Student deleted successfully!');
        fetchStudents();
      } catch (error) {
        setErrorMessage('Error deleting student: ' + (error.response ? error.response.data : error.message));
      }
    }
  };

  return (
    <Admin>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Students and Classes</h1>

        {/* Display success message */}
        {successMessage && <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{successMessage}</div>}
        {/* Display error message */}
        {errorMessage && <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{errorMessage}</div>}

        {/* Student Form */}
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={studentForm.username}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={studentForm.first_name}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={studentForm.last_name}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={studentForm.email}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={studentForm.phone_number}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={studentForm.address}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="p-2 border rounded"
            />
            <select
              name="class_name"
              value={studentForm.class_name}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - Section {cls.section}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
        </form>

        {/* Students List */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Students List</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Username</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border p-2">{student.username}</td>
                  <td className="border p-2">{`${student.first_name} ${student.last_name}`}</td>
                  <td className="border p-2">{student.email}</td>
                  <td className="border p-2">{student.phone_number}</td>
                  <td className="border p-2">{student.class_name}</td>
                  <td className="border p-2">
                  <Link to={`/admin/students/edit/${student.id}`} className="text-blue-500 hover:underline" onClick={() => handleEdit(student)}>
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(student.id)} className="text-red-500 ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};

export default AdStudents;
