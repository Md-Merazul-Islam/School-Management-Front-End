import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaTable,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBookOpen,
  FaClipboardList,
  FaUserFriends,
  FaChartLine,
  FaClipboardCheck,
} from "react-icons/fa"; // Import necessary icons
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isStaff");
    localStorage.clear();



    // Redirect to the login page
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isStaff");
    localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <div className="flex">
      {/* Hamburger Icon for mobile */}
      <div className="lg:hidden p-4">
        <FaBars
          onClick={toggleSidebar}
          className="text-3xl cursor-pointer text-gray-800"
        />
      </div>

      {/* Sidebar container */}
      <div
        className={`fixed lg:relative h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:block w-64`}
      >
        {/* Sidebar header */}
        <div className="text-center p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">CST Admin Panel</h1>
        </div>

        {/* Sidebar menu */}
        <nav className="mt-6 space-y-2">
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaHome className="mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaUser className="mr-3" />
            Profile
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaTable className="mr-3" />
            Tables
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaBell className="mr-3" />
            Notifications
          </a>

          {/* New Menu Items */}
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaChalkboardTeacher className="mr-3" />
            Teachers
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaUserGraduate className="mr-3" />
            Students
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaBookOpen className="mr-3" />
            Courses
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaClipboardList className="mr-3" />
            Notices
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaChartLine className="mr-3" />
            Results
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaClipboardCheck className="mr-3" />
            Attendance
          </a>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaUserFriends className="mr-3" />
            Users
          </a>
        </nav>

        {/* Logout button */}
        <div className="mt-auto mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 w-full hover:bg-gray-700 transition-colors mt-4 text-left"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
