import React, { useState } from "react";
import {
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBookOpen,
  FaClipboardList,
  FaUserFriends,
  FaChartLine,
  FaClipboardCheck,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isStaff");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex ">
      {/* Hamburger Icon for mobile */}
      <div className="lg:hidden p-4">
        <FaBars
          onClick={toggleSidebar}
          className="text-3xl cursor-pointer text-gray-800"
        />
      </div>

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar header */}
        <div className="text-center p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">CST Admin Panel</h1>
        </div>

        {/* Sidebar menu */}
        <nav className="mt-6 space-y-2">
          <Link to="/home" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaHome className="mr-3" />
            Website Home
          </Link>
          <Link to="/admin" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </Link>
          <Link to="/admin/teachers" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaChalkboardTeacher className="mr-3" />
            Teachers
          </Link>
          <Link to="/admin/students" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaUserGraduate className="mr-3" />
            Students
          </Link>
          <Link to="/admin/course" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaBookOpen className="mr-3" />
            Courses
          </Link>
          <Link to="/admin/notices" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaClipboardList className="mr-3" />
            Notices
          </Link>
          <Link to="/admin/result" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaChartLine className="mr-3" />
            Results
          </Link>
          <Link to="/admin/attendance" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaClipboardCheck className="mr-3" />
            Attendance
          </Link>
          <Link to="/admin/users" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
            <FaUserFriends className="mr-3" />
            Users
          </Link>
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
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleSidebar}></div>
      )}

      {/* Main content area */}
      <div className="flex-grow p-4 overflow-y-auto lg:ml-64">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
