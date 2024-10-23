'use client';

import { useState } from 'react';

const DoctorProfileSidebar = ({ setSection }) => {
  const [selectedSection, setSelectedSection] = useState('profile');

  const sections = [
    { name: 'profile', label: 'My Profile' },
    { name: 'qualifications', label: 'Qualifications' },
    { name: 'appointments', label: 'Manage Appointments' },
    { name: 'consultations', label: 'Consultations' },
    { name: 'details', label: 'Professional Details' },
    { name: 'chamberdetails', label: 'Chamber Details' },
    { name: 'settings', label: 'Account Settings' },
    { name: 'logout', label: 'Logout', isLogout: true },
  ];

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Doctor Dashboard</h2>
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.name}>
            <button
              onClick={() => {
                setSelectedSection(section.name);
                setSection(section.name); // Notify the parent to update the selected section
              }}
              className={`block w-full text-left p-3 rounded-md ${
                selectedSection === section.name
                  ? section.isLogout
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-600 text-white'
                  : 'text-gray-800 hover:bg-blue-600 hover:text-white'
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorProfileSidebar;
