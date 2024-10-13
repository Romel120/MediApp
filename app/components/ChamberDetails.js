import React from 'react';
import { FaClinicMedical, FaHome, FaPhoneAlt, FaClock } from 'react-icons/fa';

const ChamberDetails = ({ chamberDetails, handleChamberDetailChange, addChamberDetail, isEditing }) => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">Chamber Details</h3>
      {chamberDetails.length > 0 ? (
        chamberDetails.map((chamber, index) => (
          <div key={index} className="flex flex-col mb-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center mb-2">
              <FaClinicMedical className="text-blue-500 mr-2" size={24} />
              {isEditing ? (
                <input
                  type="text"
                  value={chamber.chamberName}
                  onChange={(e) => handleChamberDetailChange(index, 'chamberName', e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                  placeholder="Chamber Name"
                />
              ) : (
                <h4 className="font-semibold text-lg text-gray-800">{chamber.chamberName}</h4>
              )}
            </div>

            <p className="text-gray-600">
              <strong>Address:</strong>
              {isEditing ? (
                <input
                  type="text"
                  value={chamber.address}
                  onChange={(e) => handleChamberDetailChange(index, 'address', e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                  placeholder="Address"
                />
              ) : (
                chamber.address
              )}
            </p>

            <p className="text-gray-600">
              <strong>City:</strong>
              {isEditing ? (
                <input
                  type="text"
                  value={chamber.city}
                  onChange={(e) => handleChamberDetailChange(index, 'city', e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                  placeholder="City"
                />
              ) : (
                chamber.city
              )}
            </p>

            <p className="text-gray-600">
              <strong>Chamber Fee:</strong>
              {isEditing ? (
                <input
                  type="number"
                  value={chamber.chamberFee}
                  onChange={(e) => handleChamberDetailChange(index, 'chamberFee', e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                  placeholder="Chamber Fee"
                />
              ) : (
                `$${chamber.chamberFee}`
              )}
            </p>

            <p className="text-gray-600">
              <strong>Contact:</strong>
              {isEditing ? (
                <input
                  type="text"
                  value={chamber.contact}
                  onChange={(e) => handleChamberDetailChange(index, 'contact', e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                  placeholder="Contact"
                />
              ) : (
                chamber.contact
              )}
            </p>

            <p className="text-gray-600">
              <strong>Hours:</strong>
              {isEditing ? (
                <>
                  <input
                    type="time"
                    value={chamber.startTime}
                    onChange={(e) => handleChamberDetailChange(index, 'startTime', e.target.value)}
                    className="border border-gray-300 rounded-md p-1 mr-2"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={chamber.endTime}
                    onChange={(e) => handleChamberDetailChange(index, 'endTime', e.target.value)}
                    className="border border-gray-300 rounded-md p-1 ml-2"
                  />
                </>
              ) : (
                `${chamber.startTime} - ${chamber.endTime}`
              )}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No chamber details added yet.</p>
      )}

      {/* Show Add Chamber button only when in edit mode */}
      {isEditing && (
        <button
          type="button"
          onClick={addChamberDetail}
          className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
        >
          <FaHome className="inline-block mr-2" />
          Add Chamber Detail
        </button>
      )}
    </div>
  );
};

export default ChamberDetails;
