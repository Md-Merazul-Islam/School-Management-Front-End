import React, { useState, useEffect } from "react";
import axios from "axios";

const AdTeacher = () => {
  const [teachers, setTeachers] = useState([]); // Store the list of teachers
  const [newTeacher, setNewTeacher] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject_name: "",
    photo: "",
  }); // New teacher form
  const [editTeacher, setEditTeacher] = useState(null); // To edit a teacher
const token = localStorage.getItem("token");
  // Fetch all teachers (GET request)
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

  // Add a new teacher (POST request)
  const addTeacher = () => {
    const formData = new FormData();
    formData.append('first_name', newTeacher.first_name);
    formData.append('last_name', newTeacher.last_name);
    formData.append('email', newTeacher.email);
    formData.append('subject_name', newTeacher.subject_name);
    formData.append('photo', newTeacher.photo); // Add the photo file
  console.log(formData);
  
    axios.post(
        "https://amader-school.up.railway.app/academics/teachers/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data', // Set the content type
          },
        }
      )
      .then((response) => {
        setTeachers([...teachers, response.data]); // Update the list with the new teacher
        setNewTeacher({
          first_name: "",
          last_name: "",
          email: "",
          subject_name: "",
          photo: "",
        }); // Reset form
      })
      .catch((error) => console.error("Error adding new teacher:", error));
  };
  

  // Edit a teacher (PUT request)
  const updateTeacher = () => {
    axios
      .put(
        `https://amader-school.up.railway.app/academics/teachers/${editTeacher.id}/`,
        editTeacher, // This should be the data parameter
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json', // Assuming JSON data
          },
        }
      )
      .then((response) => {
        setTeachers(
          teachers.map((teacher) =>
            teacher.id === editTeacher.id ? response.data : teacher
          )
        );
        setEditTeacher(null); // Clear the edit form
      })
      .catch((error) => console.error("Error editing teacher:", error));
  };

  // Delete a teacher (DELETE request)
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
        setTeachers(teachers.filter((t) => t.id !== id)); // Remove the deleted teacher from the list
      })
      .catch((error) => console.error("Error deleting teacher:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Teacher Management</h1>

      {/* Add New Teacher Form */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Teacher</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={newTeacher.first_name}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, first_name: e.target.value })
            }
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newTeacher.last_name}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, last_name: e.target.value })
            }
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newTeacher.email}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, email: e.target.value })
            }
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Subject Name"
            value={newTeacher.subject_name}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, subject_name: e.target.value })
            }
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <input
            type="file"
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, photo: e.target.files[0] })
            }
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>
        <button
          onClick={addTeacher}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Teacher
        </button>
      </div>

      {/* Edit Teacher Form */}
      {editTeacher && (
        <div className="mb-6 p-4 bg-yellow-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Teacher</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={editTeacher.first_name}
              onChange={(e) =>
                setEditTeacher({ ...editTeacher, first_name: e.target.value })
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editTeacher.last_name}
              onChange={(e) =>
                setEditTeacher({ ...editTeacher, last_name: e.target.value })
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={editTeacher.email}
              onChange={(e) =>
                setEditTeacher({ ...editTeacher, email: e.target.value })
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              placeholder="Subject Name"
              value={editTeacher.subject_name}
              onChange={(e) =>
                setEditTeacher({ ...editTeacher, subject_name: e.target.value })
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            onClick={updateTeacher}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* List of Teachers */}
      <div className="grid grid-cols-1 gap-4">
        <h2 className="text-2xl font-semibold mb-4">Teachers List</h2>
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">
                {teacher.first_name} {teacher.last_name}
              </h3>
              <p>Email: {teacher.email}</p>
              <p>Subject: {teacher.subject_name}</p>
            </div>
            <img
              src={teacher.photo}
              alt={teacher.first_name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => setEditTeacher(teacher)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTeacher(teacher.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdTeacher;
