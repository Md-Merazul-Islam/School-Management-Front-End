import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://school-management-five-iota.vercel.app/accounts/";

export const updateProfile = async (token, profileData) => {
  try {
    const response = await axios.put(
      `${API_URL}user-profile-update/`,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data : "Error updating profile"
    );
  }
};

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    department: "",
    profile_image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}user-profile-update/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch profile data.");
          }
          return response.json();
        })
        .then((data) => {
          setProfile(data);
          setImagePreview(
            data.profile_image || "https://via.placeholder.com/150"
          );
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("No authentication token found.");
    }
  }, []);

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const imgBBAPIKey = "ea67728858ffc5a28d530570bfc45b40";

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

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const photoUrl = profileImage
      ? await uploadImageToImgBB(profileImage)
      : null;

    const formData = new FormData();
    formData.append("username", profile.username);
    formData.append("phone_number", profile.phone_number || "");
    formData.append("address", profile.address || "");
    formData.append("date_of_birth", profile.date_of_birth || "");
    formData.append("department", profile.department || "");
    if (photoUrl) {
      formData.append("photo", photoUrl);
    }

    if (token) {
      try {
        const updatedProfile = await updateProfile(token, formData);
        setProfile(updatedProfile);
        setEditMode(false);
        setSuccessMessage("Profile updated successfully.");
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("No authentication token found.");
    }
  };

  if (error) {
    return (
      <div className="text-red-600 text-center mt-5 h-screen">
        Error: {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-5 min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-blue-600">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50 flex items-center justify-center py-24">
      <div className="  w-full max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
          User Profile
        </h2>

        {successMessage && (
          <div className="text-green-600 text-center mb-4 font-semibold">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-blue-300 mb-4"
          />
        </div>

        {editMode ? (
          <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-3 ">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Username"
                />
                <input
                  type="text"
                  name="phone_number"
                  value={profile.phone_number}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Address"
                />
                <input
                  type="date"
                  name="date_of_birth"
                  value={profile.date_of_birth}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Department"
                />
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ProfileView profile={profile} setEditMode={setEditMode} />
        )}
      </div>
    </div>
  );
};

const ProfileView = ({ profile, setEditMode }) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="username"
          value={profile.username}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Username"
          disabled
        />
        <input
          type="text"
          name="phone_number"
          value={profile.phone_number}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Phone Number"
          disabled
        />
        <input
          type="text"
          name="address"
          value={profile.address}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Address"
          disabled
        />
        <input
          type="date"
          name="date_of_birth"
          value={profile.date_of_birth}
          className="border border-gray-300 p-2 rounded w-full"
          disabled
        />
        <input
          type="text"
          name="department"
          value={profile.department}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Department"
          disabled
        />
      </div>
      <button
        onClick={() => setEditMode(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
