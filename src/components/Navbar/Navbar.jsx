import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this file includes your custom styles

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar bg-white text-black shadow-md w-full">
      <div className="flex items-center justify-between p-4 w-full">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="images/logo.png" // Replace with your logo URL
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-2xl font-bold">CST</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="nav-box hover:bg-gray-200 p-2 rounded">Home</Link>
          <Link to="/courses" className="nav-box hover:bg-gray-200 p-2 rounded">Academics</Link>
          <Link to="/courses" className="nav-box hover:bg-gray-200 p-2 rounded">Courses</Link>
          <Link to="/courses" className="nav-box hover:bg-gray-200 p-2 rounded">Notice</Link>
          <Link to="/about" className="nav-box hover:bg-gray-200 p-2 rounded">About Us</Link>
          <Link to="/contact" className="nav-box hover:bg-gray-200 p-2 rounded">Contact</Link>
        </div>
        {/* Login/Signup Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded">Login</Link>
          <Link to="/signup" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded">Sign Up</Link>
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
        className={`md:hidden fixed inset-0 bg-white text-black transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="relative flex flex-col space-y-4 p-4 w-full">
          {/* Close Button */}
          <button
            onClick={closeMobileMenu}
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
          <Link to="/" className="nav-box hover:bg-gray-200 p-2 rounded" onClick={closeMobileMenu}>Home</Link>
          <Link to="/about" className="nav-box hover:bg-gray-200 p-2 rounded" onClick={closeMobileMenu}>About</Link>
          <Link to="/courses" className="nav-box hover:bg-gray-200 p-2 rounded" onClick={closeMobileMenu}>Courses</Link>
          <Link to="/contact" className="nav-box hover:bg-gray-200 p-2 rounded" onClick={closeMobileMenu}>Contact</Link>
          <Link to="/login" className="bg-gray-800 hover:bg-gray-700 text-white text-center px-4 py-2 rounded" onClick={closeMobileMenu}>Login</Link>
          <Link to="/signup" className="bg-gray-800 hover:bg-gray-700 text-white text-center px-4 py-2 rounded" onClick={closeMobileMenu}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
