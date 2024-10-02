import React, { useState, useEffect } from "react";
import Admin from "../Admin/Admin";

const AdUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the user data from the API
    fetch("https://school-management-five-iota.vercel.app/accounts/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Admin>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left text-sm uppercase">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Is Staff</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Date of Birth</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Account No</th>
                <th className="px-4 py-2">Profile Image</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.is_staff ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    {user.profile ? user.profile.phone_number || "N/A" : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {user.profile ? user.profile.address || "N/A" : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {user.profile ? user.profile.date_of_birth || "N/A" : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {user.profile ? user.profile.department || "N/A" : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {user.profile ? user.profile.account_no || "N/A" : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {user.profile && user.profile.profile_image ? (
                      <img
                        src={user.profile.profile_image}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      "N/A"
                    )}
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

export default AdUser;
