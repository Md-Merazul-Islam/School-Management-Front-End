import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaSignOutAlt, FaCaretDown } from "react-icons/fa"; // Import FaCaretDown for dropdown icon
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For the dropdown

  const navbarRef = useRef(null);
  const profileMenuRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleProfileMenu = (event) => {
    event.stopPropagation(); // Prevents closing the dropdown when clicked inside
    setIsProfileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setIsProfileMenuOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("isStaff");
      localStorage.clear();
      setIsLoggedIn(false);
      setIsProfileMenuOpen(false);
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const isStaff = localStorage.getItem("isStaff");

  return (
    <nav className="navbar bg-gray-100 text-black shadow-lg w-full z-1000 relative">
      <div className="flex items-center justify-between p-4 w-full">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="images/logo.png"
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-2xl font-bold">CST</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
        {isLoggedIn && isStaff=='true' && (
          <Link to="/admin" className="nav-box bg-gray-200 hover:bg-gray-200 p-2 rounded">
            Admin Dashboard
          </Link>
        )}

          <Link to="/" className="nav-box hover:bg-gray-200 p-2 rounded">
            Home
          </Link>

          {isLoggedIn && (
            <div className="relative">
              <div
                className="nav-box hover:bg-gray-200 p-2 rounded cursor-pointer flex items-center"
                onClick={toggleDropdown} // Toggle on click
              >
                Academics <FaCaretDown className="ml-2" />
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 bg-white border rounded shadow-lg mt-2 z-50"
                >
                  <Link
                    to="/teachers"
                    className="block px-7 py-2 hover:bg-gray-200"
                  >
                    Teachers
                  </Link>
                  <Link
                    to="/students"
                    className="block px-7 py-2 hover:bg-gray-200"
                  >
                    Students
                  </Link>
                </div>
              )}
            </div>
          )}

          <Link to="/courses" className="nav-box hover:bg-gray-200 p-2 rounded">
            Courses
          </Link>
          <Link to="/notice" className="nav-box hover:bg-gray-200 p-2 rounded">
            Notice
          </Link>
          <Link to="/about" className="nav-box hover:bg-gray-200 p-2 rounded">
            About Us
          </Link>
          <Link to="/contact" className="nav-box hover:bg-gray-200 p-2 rounded">
            Contact
          </Link>
        </div>

        {/* Profile Icon or Login/Signup Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative" ref={profileMenuRef}>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center p-2"
                >
                  <img
                    src="images/profile.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <FaCaretDown className="ml-2" />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-gray-800 hover:bg-gray-700 text-white text-center px-2 py-2 rounded"
                >
                  <FaSignOutAlt className="mr-2" />
                </button>
              </div>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/activities"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Activities
                  </Link>
                  <Link
                    to="/result"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Result
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center p-2 text-black"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 5h12a1 1 0 010 2H4a1 1 0 010-2zm0 4h12a1 1 0 010 2H4a1 1 0 010-2zm0 4h12a1 1 0 010 2H4a1 1 0 010-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={navbarRef}
        className={`md:hidden fixed inset-0 bg-white text-black transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex flex-col space-y-4 p-4 w-full text-center">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-gray-600"
            aria-label="Close Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Regular Links */}
          {isLoggedIn && isStaff=='true' && (
          <Link to="/admin" className="nav-box bg-gray-200 hover:bg-gray-200 p-2 rounded">
            Admin Dashboard
          </Link>
        )}
          <Link
            to="/"
            className="nav-box hover:bg-gray-200 p-2 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="nav-box hover:bg-gray-200 p-2 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/courses"
            className="nav-box hover:bg-gray-200 p-2 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/notice"
            className="nav-box hover:bg-gray-200 p-2 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Notice
          </Link>
          <Link
            to="/contact"
            className="nav-box hover:bg-gray-200 p-2 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/profile"
                className="nav-box hover:bg-gray-200 p-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/activities"
                className="nav-box hover:bg-gray-200 p-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Activities
              </Link>
              <Link
                to="/result"
                className="nav-box hover:bg-gray-200 p-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Result
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-center"
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-6">
              <Link
                to="/login"
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md w-full sm:w-auto max-w-xs sm:max-w-none text-center transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md w-full sm:w-auto max-w-xs sm:max-w-none text-center transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
