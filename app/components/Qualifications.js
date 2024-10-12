import React from 'react';
import { FaSchool, FaCertificate, FaUserGraduate } from 'react-icons/fa'; // Importing icons

const Qualifications = ({ qualifications, addQualification }) => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">Qualifications</h3>
      {qualifications.length > 0 ? (
        qualifications.map((qualification, index) => (
          <div key={index} className="flex flex-col mb-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-2">
              <FaUserGraduate className="text-blue-500 mr-2" size={24} />
              <h4 className="font-semibold text-lg text-gray-800">{qualification.degree}</h4>
            </div>
            <p className="text-gray-600"><strong>Institution:</strong> {qualification.institution}</p>
            <p className="text-gray-600"><strong>Year of Completion:</strong> {qualification.yearOfCompletion}</p>
            <p className="text-gray-600"><strong>Certification:</strong> {qualification.certification}</p>
            <p className="text-gray-600"><strong>Specialization:</strong> {qualification.specialization}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No qualifications added yet.</p>
      )}
      <button
        type="button"
        onClick={addQualification}
        className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
      >
        <FaCertificate className="inline-block mr-2" />
        Add Qualification
      </button>
    </div>
  );
};

export default Qualifications;
