import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../Admin/Admin";
import { Link } from "react-router-dom";

const AdTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    photo: null,
  });
  const [editTeacher, setEditTeacher] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL =
    "https://school-management-five-iota.vercel.app/academics/teachers/";
  const API_URL_subject =
    "https://school-management-five-iota.vercel.app/academics/subjects/";

  const imgBBAPIKey = "ea67728858ffc5a28d530570bfc45b40";
  const token = localStorage.getItem("token");
  // Upload Image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formDataImage = new FormData();
    formDataImage.append("image", imageFile);

    try {
      const imgBBResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgBBAPIKey}`,
        formDataImage
      );
      return imgBBResponse.data.data.url;
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      return null;
    }
  };

  // Fetch all subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL_subject);
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subject:", error);
        setError("Error fetching subject:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Fetch Teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  // Add Teacher
  const addTeacher = async () => {
    const photoUrl = newTeacher.photo
      ? await uploadImageToImgBB(newTeacher.photo)
      : null;

    const formData = new FormData();
    formData.append("first_name", newTeacher.first_name);
    formData.append("last_name", newTeacher.last_name);
    formData.append("email", newTeacher.email);
    formData.append("subject", newTeacher.subject);

    if (photoUrl) {
      formData.append("photo", photoUrl);
    }

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowAddModal(false);
      setSuccessMessage("Teacher added successfully!");
      fetchTeachers();

      // Reset the form after adding
      setNewTeacher({
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        photo: null,
      });
    } catch (error) {
      console.log("error data : ", error);

      setShowAddModal(false);
      setSuccessMessage("Error adding teacher, Please try again!");
      fetchTeachers();
    }
  };

  // Edit Teacher
  const editTeacherDetails = async () => {
    const photoUrl = editTeacher.photo
      ? await uploadImageToImgBB(editTeacher.photo)
      : null;

    const formData = new FormData();
    formData.append("first_name", editTeacher.first_name);
    formData.append("last_name", editTeacher.last_name);
    formData.append("email", editTeacher.email);
    formData.append("subject", editTeacher.subject);

    if (photoUrl) {
      formData.append("photo", photoUrl);
    }

    try {
      await axios.put(`${API_URL}${editTeacher.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowEditModal(false);
      setSuccessMessage("Teacher updated successfully!");
      fetchTeachers();
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error updating teacher:", error.response.data);
      } else {
        console.error("Error updating teacher:", error.message);
      }
    }
  };

  // Delete Teacher
  const deleteTeacher = async () => {
    try {
      await axios.delete(`${API_URL}${selectedTeacher.id}/`);
      setSuccessMessage("Teacher deleted successfully!");
      setShowConfirmModal(false);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // Modal to display success or error messages
  const MessageModal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          {message}
        </h2>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Admin>
      {/* Render the message modals */}
      {successMessage && (
        <MessageModal
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      {errorMessage && (
        <MessageModal
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      {/* Main page content */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Teachers List</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-6"
        >
          Add New Teacher
        </button>

        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Employee ID</th>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Photo</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="border px-4 py-2">{teacher.id}</td>
                <td className="border px-4 py-2">{teacher.employee_id}</td>
                <td className="border px-4 py-2">{teacher.first_name}</td>
                <td className="border px-4 py-2">{teacher.last_name}</td>
                <td className="border px-4 py-2">{teacher.email}</td>
                <td className="border px-4 py-2">{teacher.subject_name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={teacher.photo}
                    alt="Teacher"
                    className="w-16 h-16 rounded-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <Link to={`/admin/teachers/edit/${teacher.id}`}
                    onClick={() => {
                      setEditTeacher(teacher);
                      setShowEditModal(true);
                    }}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setShowConfirmModal(true);
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
                Add Teacher
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newTeacher.first_name}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, first_name: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newTeacher.last_name}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, last_name: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <select
                  value={newTeacher.subject}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, subject: e.target.value })
                  }
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
                  accept="image/*"
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, photo: e.target.files[0] })
                  }
                  className="p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={addTeacher}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
                Edit Teacher
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={editTeacher.first_name}
                  onChange={(e) =>
                    setEditTeacher({
                      ...editTeacher,
                      first_name: e.target.value,
                    })
                  }
                  className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={editTeacher.last_name}
                  onChange={(e) =>
                    setEditTeacher({
                      ...editTeacher,
                      last_name: e.target.value,
                    })
                  }
                  className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editTeacher.email}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, email: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <select
                  value={editTeacher.subject} // Use editTeacher instead of newTeacher
                  onChange={
                    (e) =>
                      setEditTeacher({
                        ...editTeacher,
                        subject: e.target.value,
                      }) // Update editTeacher state
                  }
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
                  accept="image/*"
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, photo: e.target.files[0] })
                  }
                  className="p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={editTeacherDetails}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
                Confirm Deletion
              </h2>
              <p className="text-center">
                Are you sure you want to delete {selectedTeacher?.first_name}?
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={deleteTeacher}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
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
