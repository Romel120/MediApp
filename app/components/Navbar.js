// app/Navbar.jsx

import Link from "next/link";
import { FaSearch, FaCalendarAlt, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";

export default function Navbar() {
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
          <Link href="/choice">
            <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-accent transition-all duration-300 shadow-lg">
              Login / Signup
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
