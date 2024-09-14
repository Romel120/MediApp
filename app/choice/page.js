// app/ChoicePage.jsx

import React from 'react';

const ChoicePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800">
      <div className="flex space-x-10">
        {/* Doctor Option */}
        <div className="flex-1 bg-primary p-12 rounded-lg shadow-xl text-center transform transition-transform ">
          <h1 className="text-4xl font-bold text-white mb-6">Doctors</h1>
          <p className="text-white text-lg mb-6">Find experienced doctors for your medical needs.</p>
          <button className="bg-secondary text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-80  hover:bg-accent transition">Select Doctors</button>
        </div>

        {/* Patient Option */}
        <div className="flex-1 bg-secondary p-12 rounded-lg shadow-xl text-center transform transition-transform">
          <h1 className="text-4xl font-bold text-white mb-6">Patients</h1>
          <p className="text-white text-lg mb-6">Access resources and manage your appointments.</p>
          <button className="bg-primary text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-80 hover:bg-accent transition">Select Patients</button>
        </div>
      </div>
    </div>
  );
};

export default ChoicePage;
