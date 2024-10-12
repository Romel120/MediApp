// ChamberDetails.js
import React from 'react';
import { FaClinicMedical, FaHome, FaPhoneAlt, FaClock } from 'react-icons/fa';

const ChamberDetails = ({ chamberDetails, handleChamberDetailChange, addChamberDetail }) => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">Chamber Details</h3>
      {chamberDetails.length > 0 ? (
        chamberDetails.map((chamber, index) => (
          <div key={index} className="flex flex-col mb-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-2">
              <FaClinicMedical className="text-blue-500 mr-2" size={24} />
              <h4 className="font-semibold text-lg text-gray-800">{chamber.chamberName}</h4>
            </div>
            <p className="text-gray-600"><strong>Address:</strong> {chamber.address}</p>
            <p className="text-gray-600"><strong>City:</strong> {chamber.city}</p>
            <p className="text-gray-600"><strong>Chamber Fee:</strong> ${chamber.chamberFee}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {chamber.contact}</p>
            <p className="text-gray-600"><strong>Hours:</strong> {chamber.startTime} - {chamber.endTime}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No chamber details added yet.</p>
      )}
      <button
        type="button"
        onClick={addChamberDetail}
        className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
      >
        <FaHome className="inline-block mr-2" />
        Add Chamber Detail
      </button>
    </div>
  );
};

export default ChamberDetails;
