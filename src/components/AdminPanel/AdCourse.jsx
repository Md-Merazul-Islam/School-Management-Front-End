import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../Admin/Admin";

const AdCourse = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    description: "",
    photo: "",
  });
  const [editSubject, setEditSubject] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const imgBBAPIKey = 'ea67728858ffc5a28d530570bfc45b40';

  // Fetch all subjects
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("https://school-management-five-iota.vercel.app/academics/subjects/");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
    if (isEditMode) {
      setEditSubject({ ...editSubject, [name]: value });
    }
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToImgBB = async () => {
    const formDataImage = new FormData();
    formDataImage.append("image", imageFile);

    try {
      const imgBBResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgBBAPIKey}`,
        formDataImage
      );
      return imgBBResponse.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const addSubject = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImageToImgBB();

    if (imageUrl) {
      try {
        const newSubjectData = { ...newSubject, photo: imageUrl };
        const response = await axios.post(
          "https://school-management-five-iota.vercel.app/academics/subjects/",
          newSubjectData
        );
        setSubjects([...subjects, response.data]);
        setNewSubject({ name: "", code: "", description: "", photo: "" });
        setImageFile(null);
      } catch (error) {
        console.error("Error adding subject:", error);
      }
    }
  };

  const editExistingSubject = async (e) => {
    e.preventDefault();

    let imageUrl = editSubject.photo;
    if (imageFile) {
      imageUrl = await uploadImageToImgBB();
    }

    if (imageUrl) {
      try {
        const updatedSubjectData = { ...editSubject, photo: imageUrl };
        const response = await axios.put(
          `https://school-management-five-iota.vercel.app/academics/subjects/${editSubject.id}/`,
          updatedSubjectData
        );
        const updatedSubjects = subjects.map((subject) =>
          subject.id === editSubject.id ? response.data : subject
        );
        setSubjects(updatedSubjects);
        setIsEditMode(false);
        setEditSubject(null);
        setImageFile(null);
      } catch (error) {
        console.error("Error editing subject:", error);
      }
    }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`https://school-management-five-iota.vercel.app/academics/subjects/${id}/`);
      setSubjects(subjects.filter((subject) => subject.id !== id));
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const openEditMode = (subject) => {
    setIsEditMode(true);
    setEditSubject(subject);
    setNewSubject({ name: "", code: "", description: "", photo: "" });
  };

  return (
    <div>
      <Admin>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Subjects</h1>

          {/* Subject List Table */}
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Code</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Photo</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td className="border px-4 py-2">{subject.name}</td>
                  <td className="border px-4 py-2">{subject.code}</td>
                  <td className="border px-4 py-2">{subject.description}</td>
                  <td className="border px-4 py-2">
                    <img src={subject.photo} alt={subject.name} className="h-20 w-20 object-cover" />
                  </td>
                  <td className="border px-4 py-2">
                  <div className="flex space-x-2"> 
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() => openEditMode(subject)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => deleteSubject(subject.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* Add/Edit Form */}
          <form
            onSubmit={isEditMode ? editExistingSubject : addSubject}
            className="border p-4 rounded shadow mt-4"
          >
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Subject" : "Add Subject"}
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={isEditMode ? editSubject.name : newSubject.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Code</label>
              <input
                type="text"
                name="code"
                value={isEditMode ? editSubject.code : newSubject.code}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={isEditMode ? editSubject.description : newSubject.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required={!isEditMode}
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              {isEditMode ? "Save Changes" : "Add Subject"}
            </button>
          </form>
        </div>
      </Admin>
    </div>
  );
};

export default AdCourse;
