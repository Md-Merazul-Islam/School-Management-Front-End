import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../Admin/Admin";

const AdTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject_id: "",
    photo: "",
  });
  const [editTeacher, setEditTeacher] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch all teachers
  useEffect(() => {
    axios
      .get("https://amader-school.up.railway.app/academics/teachers/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => console.error("Error fetching teacher data:", error));
  }, []);

  // Fetch all subjects
  useEffect(() => {
    axios
      .get("https://amader-school.up.railway.app/academics/subjects/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  // Add new teacher
  const addTeacher = () => {
    const formData = new FormData();
    formData.append('first_name', newTeacher.first_name);
    formData.append('last_name', newTeacher.last_name);
    formData.append('email', newTeacher.email);
    formData.append('subject', newTeacher.subject_id);
    formData.append('photo', newTeacher.photo);

    axios.post(
        "https://amader-school.up.railway.app/academics/teachers/",
        formData,
        {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    )
    .then((response) => {
        setTeachers([...teachers, response.data]);
        setNewTeacher({
            first_name: "",
            last_name: "",
            email: "",
            subject_id: "",
            photo: "",
        });
        setShowAddModal(false); // Close modal after adding
    })
    .catch((error) => console.error("Error adding new teacher:", error.response.data));
  };

  // Edit a teacher
  const updateTeacher = async () => {
    try {
      const payload = {
        first_name: editTeacher.first_name,
        last_name: editTeacher.last_name,
        email: editTeacher.email,
        subject_id: editTeacher.subject_id,
      };

      await axios.put(`https://amader-school.up.railway.app/academics/teachers/${editTeacher.id}/`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setShowEditModal(false); // Close modal after editing
    } catch (error) {
      console.error('Error editing teacher:', error.response ? error.response.data : error);
    }
  };

  // Delete a teacher
  const deleteTeacher = (id) => {
    axios
      .delete(
        `https://amader-school.up.railway.app/academics/teachers/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        setTeachers(teachers.filter((t) => t.id !== id));
      })
      .catch((error) => console.error("Error deleting teacher:", error));
  };

  return (
    <Admin>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Teacher Management</h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-6"
        >
          Add New Teacher
        </button>

        {/* List of Teachers */}
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-2xl font-semibold mb-4">Teachers List</h2>
          {teachers.map((teacher) => (
            <div key={teacher.id} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-xl">{`${teacher.first_name} ${teacher.last_name}`}</h3>
                <p>{teacher.email}</p>
                <p>{teacher.subject_name}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditTeacher(teacher);
                    setShowEditModal(true);
                  }}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTeacher(teacher.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Teacher Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Add New Teacher</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newTeacher.first_name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, first_name: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newTeacher.last_name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, last_name: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <select
                  value={newTeacher.subject_id}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subject_id: e.target.value })}
                  className="p-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  onChange={(e) => setNewTeacher({ ...newTeacher, photo: e.target.files[0] })}
                  className="p-2 border rounded-lg"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={addTeacher}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Add Teacher
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Teacher Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Edit Teacher</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={editTeacher.first_name}
                  onChange={(e) => setEditTeacher({ ...editTeacher, first_name: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={editTeacher.last_name}
                  onChange={(e) => setEditTeacher({ ...editTeacher, last_name: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editTeacher.email}
                  onChange={(e) => setEditTeacher({ ...editTeacher, email: e.target.value })}
                  className="p-2 border rounded-lg"
                />
                <select
                  value={editTeacher.subject_id}
                  onChange={(e) => setEditTeacher({ ...editTeacher, subject_id: e.target.value })}
                  className="p-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <button
                  onClick={updateTeacher}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Admin>
  );
};

export default AdTeacher;
