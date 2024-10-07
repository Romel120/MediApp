
import { FaUser, FaFileMedical, FaKey, FaHistory, FaVideo } from 'react-icons/fa';
import { AiOutlineFileProtect, AiOutlineClockCircle, AiOutlineQuestionCircle, AiOutlineHeart } from 'react-icons/ai';
import { MdBookmark, MdSubscriptions, MdLocalPharmacy } from 'react-icons/md';

const PatientSidebar = ({ setActiveSection }) => {
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
    <aside className="w-64 bg-teal-500 text-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">Patient Menu</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className="flex items-center p-3 rounded-lg hover:bg-teal-600 transition-all duration-200 ease-in-out"
              onClick={() => setActiveSection(item.id)}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PatientSidebar;
