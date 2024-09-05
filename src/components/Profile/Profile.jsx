import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://amader-school.up.railway.app/accounts/';

// Update profile information
export const updateProfile = async (userId, token, profileData) => {
    try {
        const response = await axios.put(`${API_URL}user-profile-update/${userId}/`, profileData, {
            headers: {
                'Content-Type': 'application/json',
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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch the token and user ID from localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    setUserId(userId);

    if (token && userId) {
      fetch(`${API_URL}user-profile-update/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Attach the token here
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
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError('No authentication token or user ID found.');
    }
  }, []);

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (userId && token) {
      try {
        const updatedProfile = await updateProfile(userId, token, profile);
        setProfile(updatedProfile);
        setEditMode(false);
        setSuccessMessage('Profile updated successfully.');
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('No authentication token or user ID found.');
    }
  };

  if (error) {
    return <div className="text-red-600 text-center mt-5">Error: {error}</div>;
  }

  if (!profile) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      {editMode ? (
        <div className="space-y-4">
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
          <div>
            <label className="block text-sm font-medium">Account No:</label>
            <input
              type="text"
              name="account_no"
              value={profile.account_no || ''}
              readOnly
              className="mt-1 block w-full border px-3 py-2 rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="flex space-x-4">
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
          <p><strong>Phone Number:</strong> {profile.phone_number || 'Not provided'}</p>
          <p><strong>Address:</strong> {profile.address || 'Not provided'}</p>
          <p><strong>Date of Birth:</strong> {profile.date_of_birth || 'Not provided'}</p>
          <p><strong>Department:</strong> {profile.department || 'Not provided'}</p>
          <p><strong>Account No:</strong> {profile.account_no || 'Not provided'}</p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
