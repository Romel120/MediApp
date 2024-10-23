"use client"; // Ensure this is a client component since we use hooks
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBlogger, FaSearch, FaCalendarAlt, FaQuestionCircle, FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import { getCookie } from 'cookies-next';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu

  useEffect(() => {
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
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "userType=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to homepage after logout
  };


  const handleLinkClick = () => {
    setMenuOpen(false); // Close the menu after a link is clicked
  };

  return (
    <div className="bg-background mb-15">
      <nav className="bg-background shadow-lg py-4 px-6 fixed w-full top-0 z-20">
        <div className="flex justify-between items-center">
          {/* Hide site name when menu is open */}
          {!menuOpen && (
            <Link href="/">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary hover:text-green-700 transition-colors duration-300">
                MediApp
              </div>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-text focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
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
        </div>

        {/* Mobile Menu (Only visible when toggled) */}
        <div
          className={`lg:hidden transition-all duration-300 ${menuOpen ? 'block' : 'hidden'} mt-4`}
        >
          <Link href="/find-doctors">
            <button className="block text-text font-medium py-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
              <FaSearch className="inline-block h-5 w-5 mr-2" /> Find Doctor
            </button>
          </Link>
          {userType === "doctor" ? (
            <Link href="/my-appointments">
              <button className="block text-text font-medium py-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
                <FaCalendarAlt className="inline-block h-5 w-5 mr-2" /> My Appointments
              </button>
            </Link>
          ) : (
            <Link href="/book-appointment">
              <button className="block text-text font-medium py-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
                <FaCalendarAlt className="inline-block h-5 w-5 mr-2" /> Book Appointment
              </button>
            </Link>
          )}
          <Link href="/blog">
            <button className="block text-text font-medium py-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
              <FaBlogger className="inline-block h-5 w-5 mr-2" /> Blogs
            </button>
          </Link>
          <Link href="/faq">
            <button className="block text-text font-medium py-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
              <FaQuestionCircle className="inline-block h-5 w-5 mr-2" /> FAQ
            </button>
          </Link>
          <Link href="/about-us">
            <button className="block text-text font-medium py-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
              <FaInfoCircle className="inline-block h-5 w-5 mr-2" /> About Us
            </button>
          </Link>

          {isLoggedIn ? (
            <div className="mt-4">
              <Link href={userType === 'doctor' ? "/doctorProfile" : "/patientProfile"}>
                <button className="block text-text font-medium py-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
                  Profile
                </button>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  handleLinkClick();
                }}
                className="block w-full text-left text-text font-medium py-2 hover:text-primary transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/choice">
              <button className="block w-full text-center bg-primary text-white px-6 py-2 mt-4 rounded-md hover:bg-accent transition-all duration-300 shadow-lg" onClick={handleLinkClick}>
                Login / Signup
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}