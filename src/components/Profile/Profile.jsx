import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://amader-school.up.railway.app/accounts/';

// Update profile information
export const updateProfile = async (token, profileData) => {
  try {
    const response = await axios.put(`${API_URL}user-profile-update/`, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Handle file uploads
        'Authorization': `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error updating profile');
  }
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_URL}user-profile-update/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch profile data.');
          }
          return response.json();
        })
        .then((data) => {
          setProfile(data);
          setImagePreview(data.profile_image || 'https://via.placeholder.com/150');
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError('No authentication token found.');
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

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    formData.append('username', profile.username);
    formData.append('phone_number', profile.phone_number || '');
    formData.append('address', profile.address || '');
    formData.append('date_of_birth', profile.date_of_birth || '');
    formData.append('department', profile.department || '');
    
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }

    if (token) {
      try {
        const updatedProfile = await updateProfile(token, formData);
        setProfile(updatedProfile);
        setEditMode(false);
        setSuccessMessage('Profile updated successfully.');
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('No authentication token found.');
    }
  };

  if (error) {
    return <div className="text-red-600 text-center mt-5">Error: {error}</div>;
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
    <div className="min-h-screen py-24 bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 mt-10">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-700">User Profile</h2>

        {successMessage && <div className="text-green-600 text-center mb-4 font-semibold">{successMessage}</div>}

        <div className="flex items-center justify-center mb-6">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-blue-300"
          />
        </div>

        {editMode ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Profile Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block w-full text-sm text-gray-500 file:bg-blue-100 file:border-none file:rounded-md file:py-2 file:px-4"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                value={profile.username || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number:</label>
              <input
                type="text"
                name="phone_number"
                value={profile.phone_number || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Address:</label>
              <input
                type="text"
                name="address"
                value={profile.address || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Date of Birth:</label>
              <input
                type="date"
                name="date_of_birth"
                value={profile.date_of_birth || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Department:</label>
              <input
                type="text"
                name="department"
                value={profile.department || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p><strong>Username:</strong> {profile.username || 'Not provided'}</p>
            <p><strong>Phone Number:</strong> {profile.phone_number || 'Not provided'}</p>
            <p><strong>Address:</strong> {profile.address || 'Not provided'}</p>
            <p><strong>Date of Birth:</strong> {profile.date_of_birth || 'Not provided'}</p>
            <p><strong>Department:</strong> {profile.department || 'Not provided'}</p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
