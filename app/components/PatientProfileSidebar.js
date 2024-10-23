import { FaBars, FaTimes } from 'react-icons/fa'; // Importing the icons
import { useState } from 'react';
import { FaUser, FaFileMedical, FaKey, FaVideo } from 'react-icons/fa';
import { AiOutlineClockCircle, AiOutlineQuestionCircle, AiOutlineHeart } from 'react-icons/ai';
import { MdBookmark, MdLocalPharmacy } from 'react-icons/md';

const PatientSidebar = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar visibility
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <FaUser /> },
    { id: 'phr', label: 'My PHR', icon: <FaFileMedical /> },
    { id: 'password', label: 'Set Password', icon: <FaKey /> },
    { id: 'appointments', label: 'Appointment History', icon: <AiOutlineClockCircle /> },
    { id: 'videoCall', label: 'Video Call To A Doctor', icon: <FaVideo /> },
    { id: 'followUp', label: 'Doctor Follow Up', icon: <AiOutlineClockCircle /> },
    { id: 'discounts', label: 'Discount History', icon: <AiOutlineHeart /> },
    { id: 'questions', label: 'My Questions', icon: <AiOutlineQuestionCircle /> },
    { id: 'elderlyCare', label: 'Elderly Care', icon: <AiOutlineHeart /> },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: <MdBookmark /> },
    { id: 'prescriptions', label: 'My Prescriptions', icon: <MdLocalPharmacy /> },
  ];

  return (
    <div>
      {/* Mobile menu toggle button with Hamburger and Close icons */}
      <button
        className="block md:hidden bg-teal-500 text-white p-2 rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Overlay that appears when the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar} // Close sidebar when clicking outside of it
        ></div>
      )}

      {/* Sidebar for smaller screens */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 w-64 bg-teal-500 text-white shadow-lg p-4 z-50 transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:w-64`}
      >
        <h2 className="text-xl font-bold mb-6">Patient Menu</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className="flex items-center p-3 rounded-lg hover:bg-teal-600 transition-all duration-200 ease-in-out w-full"
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false); // Close sidebar on mobile after clicking
                }}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default PatientSidebar;
