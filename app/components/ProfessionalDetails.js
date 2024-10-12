// ProfessionalDetails.js
import React from 'react';
import { FaBuilding, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const ProfessionalDetails = ({ details, handleDetailChange, addDetail }) => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">Professional Details</h3>
      {details.length > 0 ? (
        details.map((detail, index) => (
          <div key={index} className="flex flex-col mb-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-2">
              <FaBuilding className="text-blue-500 mr-2" size={24} />
              <h4 className="font-semibold text-lg text-gray-800">{detail.institute}</h4>
            </div>
            <p className="text-gray-600"><strong>Position:</strong> {detail.position}</p>
            <p className="text-gray-600"><strong>Start Date:</strong> {new Date(detail.start_date).toLocaleDateString()}</p>
            <p className="text-gray-600"><strong>End Date:</strong> {new Date(detail.end_date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No professional details added yet.</p>
      )}
      <button
        type="button"
        onClick={addDetail}
        className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
      >
        <FaBriefcase className="inline-block mr-2" />
        Add Professional Detail
      </button>
    </div>
  );
};

export default ProfessionalDetails;
