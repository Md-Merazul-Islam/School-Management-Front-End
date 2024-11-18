import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const displayError = (message) => {
    setErrorMessage(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      displayError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      displayError("Passwords do not match.");
      return;
    }

    try {
      // Fetch all users to check for existing username or email
      const usersResponse = await fetch(
        "https://school-management-dusky.vercel.app/accounts/users/"
      );
      if (!usersResponse.ok) {
        throw new Error("Failed to fetch existing users");
      }
      const usersData = await usersResponse.json();

      // Check if username or email already exists
      const existingUsername = usersData.some(
        (user) => user.username === formData.username
      );
      const existingEmail = usersData.some(
        (user) => user.email === formData.email
      );

      if (existingUsername) {
        displayError("Username already exists.");
        return;
      }

      if (existingEmail) {
        displayError("Email already exists.");
        return;
      }

      // Proceed with registration if no duplicates are found
      const registrationResponse = await fetch(
        "https://school-management-dusky.vercel.app/accounts/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        throw new Error(
          errorData.detail || "An error occurred during registration"
        );
      }

      alert(
        "Registration Successful! Check your email. Redirecting to login page..."
      );
      window.location.href = "login.html";
    } catch (error) {
      displayError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            required
            maxLength="150"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
