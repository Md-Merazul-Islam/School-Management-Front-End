import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../Admin/Admin";
import { Link } from "react-router-dom";

// Set up base URL for axios
const API_BASE_URL = "https://school-management-dusky.vercel.app/academics";

const AdNotices = () => {
  const [notices, setNotices] = useState([]);
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    description: "",
    file: null,
    image: "",  // For storing the image URL
  });
  const [editingNotice, setEditingNotice] = useState(null);
  const [imageFile, setImageFile] = useState(null);  // To store the selected image file

  const imgBBAPIKey = "ea67728858ffc5a28d530570bfc45b40";  // ImgBB API key

  // Fetch notices
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notices/`);
      setNotices(response.data);
    } catch (error) {
      console.error(
        "Error fetching notices:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoticeForm({
      ...noticeForm,
      [name]: value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async () => {
    if (!imageFile) return "";  // If no image file is selected, return empty string

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
      return "";  // Return empty string in case of error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If image is selected, upload it to ImgBB and get the URL
    let imageURL = noticeForm.image;
    if (imageFile) {
      imageURL = await uploadImageToImgBB();
    }

    const formData = new FormData();
    Object.keys(noticeForm).forEach((key) => {
      if (key === "image") {
        formData.append(key, imageURL);  // Add image URL to form data
      } else {
        formData.append(key, noticeForm[key]);
      }
    });

    try {
      if (editingNotice) {
        // Update notice
        await axios.put(
          `${API_BASE_URL}/notices/${editingNotice.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setEditingNotice(null);
      } else {
        // Create notice
        await axios.post(`${API_BASE_URL}/notices/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchNotices();
      setNoticeForm({
        title: "",
        description: "",
        file: null,
        image: "",  // Reset the image URL after submission
      });
      setImageFile(null);  // Reset the image file input as well
    } catch (error) {
      console.error(
        "Error saving notice:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setNoticeForm({
      title: notice.title,
      description: notice.description,
      image: notice.image || "", // Set image URL if exists
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/notices/${id}/`);
      fetchNotices();
    } catch (error) {
      console.error(
        "Error deleting notice:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Admin>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Notices</h1>

        {/* Notice Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-4 rounded shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingNotice ? "Edit Notice" : "Add New Notice"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={noticeForm.title}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={noticeForm.description}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="file"
              name="file"
              onChange={(e) => handleImageChange(e)}
              className="p-2 border rounded"
            />
            {/* Image URL field (only for editing) */}
            {editingNotice && noticeForm.image && (
              <div className="col-span-2">
                <img src={noticeForm.image} alt="Notice Image" className="w-32 h-32 object-cover" />
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingNotice ? "Update Notice" : "Add Notice"}
            </button>
          </div>
        </form>

        {/* Notices List */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notices List</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">File</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id} className="text-center">
                  <td className="border p-2">{notice.title}</td>
                  <td className="border p-2">{notice.description}</td>
                  <td className="border p-2">
                    <a
                      href={notice.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  </td>
                  <td className="border p-2">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center space-x-2">
                      <Link
                        to={`/admin/notices/edit/${notice.id}`}
                        onClick={() => handleEdit(notice)}
                        className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
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




export default AdNotices;
