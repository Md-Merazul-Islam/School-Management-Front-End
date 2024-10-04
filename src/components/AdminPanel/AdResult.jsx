import React, { useState, useEffect } from "react";
import Admin from "../Admin/Admin";
import axios from "axios";
import { Link } from "react-router-dom";

const AdResult = () => {
  // State for Marks, Students, and Subjects
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [newMark, setNewMark] = useState({
    student: "",
    subject: "",
    marks: ""
  });
  const [editingMark, setEditingMark] = useState(null);

  // Fetch Students, Subjects, and Marks when the component mounts
  useEffect(() => {
    fetchMarks();
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchMarks = async () => {
    try {
      const response = await axios.get("https://school-management-five-iota.vercel.app/classes/marks/");
      setMarks(response.data);
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://school-management-five-iota.vercel.app/academics/students-list/");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("https://school-management-five-iota.vercel.app/academics/subjects/");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Find the student roll number by matching the student ID in marks with the student list
  const getStudentRollNo = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student ? student.roll_no : "Unknown";
  };

  // Handle form input change for new mark
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMark({
      ...newMark,
      [name]: value,
    });
  };

  // Add new mark
  const addMark = async () => {
    try {
      const dataToSend = {
        student: parseInt(newMark.student, 10),
        subject: parseInt(newMark.subject, 10),
        marks: parseInt(newMark.marks, 10),
      };
      await axios.post("https://school-management-five-iota.vercel.app/classes/marks/", dataToSend);
      fetchMarks(); // Refresh the mark list after adding
      setNewMark({ student: "", subject: "", marks: "" }); // Reset form
    } catch (error) {
      console.error("Error adding mark:", error.response ? error.response.data : error.message);
    }
  };

  // Update an existing mark
  const updateMark = async () => {
    try {
      await axios.put(`https://school-management-five-iota.vercel.app/classes/marks/${editingMark.id}/`, editingMark);
      fetchMarks();
      setEditingMark(null);
    } catch (error) {
      console.error("Error updating mark:", error);
    }
  };

  // Delete a mark
  const deleteMark = async (id) => {
    try {
      await axios.delete(`https://school-management-five-iota.vercel.app/classes/marks/${id}/`);
      fetchMarks();
    } catch (error) {
      console.error("Error deleting mark:", error);
    }
  };

  // Set the mark being edited
  const editMark = (mark) => {
    setEditingMark(mark);
  };

  return (
    <Admin>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Manage Marks</h2>

        {/* Form for Adding or Editing Marks */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {editingMark ? "Edit Mark" : "Add New Mark"}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <select
              name="student"
              value={editingMark ? editingMark.student : newMark.student}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.roll_no} 
                </option>
              ))}
            </select>

            <select
              name="subject"
              value={editingMark ? editingMark.subject : newMark.subject}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="marks"
              value={editingMark ? editingMark.marks : newMark.marks}
              onChange={handleInputChange}
              className="p-2 border rounded"
              placeholder="Marks"
              required
            />
          </div>

          <div className="mt-4">
            {editingMark ? (
              <button
                onClick={updateMark}
                className="bg-yellow-500 text-white py-2 px-4 rounded"
              >
                Update Mark
              </button>
            ) : (
              <button
                onClick={addMark}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Add Mark
              </button>
            )}
          </div>
        </div>

        {/* Table of Marks */}
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Student Roll</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Marks</th>
              <th className="px-4 py-2 border">Grade</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id}>
                <td className="px-4 py-2 border">{mark.id}</td>
                <td className="px-4 py-2 border">{getStudentRollNo(mark.student)}</td>
                <td className="px-4 py-2 border">{mark.subject_name}</td>
                <td className="px-4 py-2 border">{mark.marks}</td>
                <td className="px-4 py-2 border">{mark.grade}</td>
                <td className="px-4 py-2 border">
                  <Link to={`/admin/result/edit/${mark.id}`}
                    onClick={() => editMark(mark)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMark(mark.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
};

export default AdResult;
