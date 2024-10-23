'use client'; // Required for using useState in Next.js

import { useState } from 'react';
import PatientSidebar from '@/app/components/PatientProfileSidebar';
import PHRReports from '@/app/components/PHRReports';
import PatientProfileDetails from '@/app/components/PatientProfile';
import PatientAppointmentCard from '@/app/components/PatientAppointmentCard';

const PatientProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');

  // Renders the correct section based on the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'phr':
        return <PHRReports />;
      case 'profile':
        return <PatientProfileDetails />;
      case 'appointments':
        return <PatientAppointmentCard />;
      default:
        return (
          <div className="text-center p-4">
            <h2 className="text-2xl">You selected {activeSection}</h2>
            <p>This section will display the content for {activeSection}.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row mt-20">
      {/* Sidebar */}
      <PatientSidebar setActiveSection={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        {renderSection()}
      </main>
    </div>
  );
};

export default PatientProfile;
