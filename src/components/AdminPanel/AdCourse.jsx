import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import Admin from "../Admin/Admin";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const AdCourse = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: "", code: "" });
  const [editSubject, setEditSubject] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://school-management-five-iota.vercel.app/academics/subjects/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error.response?.data || error.message);
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode && editSubject) {
      setEditSubject({
        ...editSubject,
        [name]: value,
      });
    } else {
      setNewSubject({
        ...newSubject,
        [name]: value,
      });
    }
  };

  const addSubject = () => {
    axios
      .post("https://school-management-five-iota.vercel.app/academics/subjects/", newSubject, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setSubjects([...subjects, response.data]);
        setNewSubject({ name: "", code: "" });
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding subject:", error.response?.data || error.message);
      });
  };

  const saveEditSubject = () => {
    if (!editSubject || !editSubject.id) {
      console.error("No subject selected for editing");
      return;
    }

    axios
      .put(`https://school-management-five-iota.vercel.app/academics/subjects/${editSubject.id}/`, editSubject, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setSubjects(
          subjects.map((subject) =>
            subject.id === editSubject.id ? response.data : subject
          )
        );
        setEditSubject(null);
        closeModal();
      })
      .catch((error) => {
        console.error("Error editing subject:", error.response?.data || error.message);
      });
  };

  const deleteSubject = (id) => {
    axios
      .delete(`https://school-management-five-iota.vercel.app/academics/subjects/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setSubjects(subjects.filter((subject) => subject.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting subject:", error.response?.data || error.message);
      });
  };

  const openModal = (subject = null) => {
    setEditSubject(subject);
    setIsEditMode(!!subject);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditSubject(null);
    setNewSubject({ name: "", code: "" });
  };

  return (
    <Admin>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Subject List</h1>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ cursor: "pointer", fontSize: "1.5rem", color: "green" }}
              onClick={() => openModal()}
            />
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => openModal(subject)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => deleteSubject(subject.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Add/Edit Subject */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Subject Modal"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                {isEditMode ? "Edit Subject" : "Add New Subject"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  isEditMode ? saveEditSubject() : addSubject();
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={isEditMode && editSubject ? editSubject.name : newSubject.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={isEditMode && editSubject ? editSubject.code : newSubject.code}
                    onChange={handleInputChange}
                    maxLength={6}
                    pattern="\d{1,6}"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                  >
                    {isEditMode ? "Save Changes" : "Add Subject"}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </Admin>
  );
};
