import Link from "next/link";
import { FaPhone, FaBell } from "react-icons/fa"; // Use FaPhone for the call icon, FaBell for notifications

export default function NavbarTwo() {
  return (
    <div className="bg-background">
      <nav className="bg-background shadow-lg py-4 px-6 flex justify-between items-center fixed w-full top-0 z-20">
        
        {/* Left: Brand */}
        <Link href="/">
          <div className="text-2xl font-semibold text-text">
            medp<span className="text-primary">o</span>lis
          </div>
        </Link>

        {/* Center: Navigation links */}
        <div className="flex space-x-4">
          <Link href="/my-plan">
            <button className="text-text hover:bg-gray-100 px-4 py-2 rounded-md transition-all duration-300">
              My plan
            </button>
          </Link>
          <Link href="/">
            <button className="text-white bg-primary px-4 py-2 rounded-md transition-all duration-300">
              Home
            </button>
          </Link>
          <Link href="/labs">
            <button className="text-text hover:bg-gray-100 px-4 py-2 rounded-md transition-all duration-300">
              Labs
            </button>
          </Link>
          <Link href="/medications">
            <button className="text-text hover:bg-gray-100 px-4 py-2 rounded-md transition-all duration-300">
              Medications
            </button>
          </Link>
          <Link href="/about-us">
            <button className="text-text hover:bg-gray-100 px-4 py-2 rounded-md transition-all duration-300">
              About us
            </button>
          </Link>
        </div>

        {/* Right: Icons and Profile */}
        <div className="flex items-center space-x-4">
          {/* Phone icon */}
          <div className="bg-secondary p-3 rounded-full text-white">
            <FaPhone />
          </div>

          {/* Notification bell icon */}
          <div className="bg-gray-100 p-3 rounded-full relative">
            <FaBell className="text-secondary" />
            {/* Notification dot */}
            <span className="absolute top-0 right-0 bg-primary h-2 w-2 rounded-full"></span>
          </div>

        </div>
      </nav>
    </div>
  );
}
