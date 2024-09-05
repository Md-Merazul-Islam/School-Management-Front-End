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
    // Fetch the token from localStorage
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
    <div className="min-h-screen py-24">
    <div className=" max-w-lg mx-auto bg-white p-5 rounded-lg shadow-lg mt-10 ">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">User Profile</h2>

      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      <div className="flex items-center justify-center mb-6">
        <img
          src={imagePreview}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover shadow-md border"
        />
      </div>

      {editMode ? (
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium">Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Username:</label>
            <input
              type="text"
              name="username"
              value={profile.username || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={profile.phone_number || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address:</label>
            <input
              type="text"
              name="address"
              value={profile.address || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date of Birth:</label>
            <input
              type="date"
              name="date_of_birth"
              value={profile.date_of_birth || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Department:</label>
            <input
              type="text"
              name="department"
              value={profile.department || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
            />
          </div>
        
          <div className="flex space-x-4 mt-5">
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
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
