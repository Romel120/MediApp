'use client'; // This is required in Next.js 14 for using useState

import { useState } from 'react';
import PatientSidebar from '@/app/components/PatientProfileSidebar';
import PHRReports from '@/app/components/PHRReports';
import Patienterofile from '@/app/components/PatientProfile';
import PatientAppointmentCard from '@/app/components/PatientAppointmentCard';

const PatientProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    if (activeSection === 'phr') {
      return <PHRReports />;
    }
    else if(activeSection === 'profile'){
        return <Patienterofile />;
    }
    else if(activeSection === 'appointments'){
        return <PatientAppointmentCard />;
    }
     else {
      return (
        <div className="text-center p-4">
          <h2 className="text-2xl">You selected {activeSection}</h2>
          <p>This section will display the content for {activeSection}.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex mt-20">
      <PatientSidebar setActiveSection={setActiveSection} />
      <main className="flex-1 p-6 bg-gray-50 ml-10">
        {renderSection()}
      </main>
    </div>
  );
};

export default PatientProfile;
