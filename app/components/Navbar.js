"use client"; // Ensure this is a client component since we use hooks
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBlogger, FaSearch, FaCalendarAlt, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import { getCookie } from 'cookies-next';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Access cookies directly
    const token = getCookie("token");
    const type = getCookie("userType");

    if (token) {
      setIsLoggedIn(true);
      if (type) {
        setUserType(type);
      }
    }
  }, []);

  const handleLogout = () => {
    // Remove cookies manually
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "userType=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    
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
          {userType === "doctor" ? (
            <Link href="/my-appointments">
              <button className="text-text font-medium flex items-center hover:text-primary transition-colors duration-300">
                <FaCalendarAlt className="h-5 w-5 mr-2" /> My Appointments
              </button>
            </Link>
          ) : (
            <Link href="/book-appointment">
              <button className="text-text font-medium flex items-center hover:text-primary transition-colors duration-300">
                <FaCalendarAlt className="h-5 w-5 mr-2" /> Book Appointment
              </button>
            </Link>
          )}
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
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <button className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-accent transition-all duration-300 shadow-lg">
                My Account
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-0.5 w-48 bg-white text-black shadow-lg rounded-lg">
                  <Link className="block px-4 py-2 hover:bg-gray-200" href={userType === 'doctor' ? "/doctorProfile" : "/patientProfile"}>
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
