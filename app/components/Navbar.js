"use client"; // Ensure this is a client component since we use hooks
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBlogger, FaSearch, FaCalendarAlt, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Track dropdown visibility


  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to homepage after logout
  };

  return (
    <div className="bg-background mb-15">
      <nav className="bg-background shadow-lg py-4 px-6 flex justify-between items-center fixed w-full top-0 z-20">
        <Link href="/">
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary hover:text-green-700 transition-colors duration-300">
            MediApp
          </div>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/find-doctors">
            <button className="text-text font-medium flex items-center hover:text-primary transition-colors duration-300">
              <FaSearch className="h-5 w-5 mr-2" /> Find Doctor
            </button>
          </Link>
          <Link href="/book-appointment">
            <button className="text-text font-medium flex items-center hover:text-primary transition-colors duration-300">
              <FaCalendarAlt className="h-5 w-5 mr-2" /> Book Appointment
            </button>
          </Link>
          <Link href="/blog">
            <button className="text-text font-medium flex items-center hover:text-primary transition-colors duration-300">
              <FaBlogger className="h-5 w-5 mr-2" /> Blogs
            </button>
          </Link>
          <Link href="/faq">
            <button className="text-text font-medium flex items-center hover:text-primary transition-colors duration-300">
              <FaQuestionCircle className="h-5 w-5 mr-2" /> FAQ
            </button>
          </Link>
          <Link href="/about-us">
            <button className="text-text font-medium flex items-center hover:text-primary transition-colors duration-300">
              <FaInfoCircle className="h-5 w-5 mr-2" /> About Us
            </button>
          </Link>

          {isLoggedIn ? (
            <div
            className="relative"
            onMouseEnter={() => setDropdownVisible(true)} // Show dropdown on hover
            onMouseLeave={() => setDropdownVisible(false)} // Hide dropdown on mouse leave
          >
            <button className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-accent transition-all duration-300 shadow-lg">
              My Account
            </button>
            {dropdownVisible && ( // Only show dropdown when dropdownVisible is true
              <div className="absolute right-0 mt-0.5 w-48 bg-white text-black shadow-lg rounded-lg">
                <Link className="block px-4 py-2 hover:bg-gray-200" href="/doctorProfile">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          ) : (
            <Link href="/choice">
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-accent transition-all duration-300 shadow-lg">
                Login / Signup
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
