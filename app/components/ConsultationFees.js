import React from 'react'

const ConsultationFees = ({ isEditing, onlineFee, setOnlineFee, followupFee, setFollowupFee, chamberFee, setChamberFee }) => (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Online Consultation Fee</h2>
        {isEditing ? (
          <input
            type="number"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            value={onlineFee}
            onChange={(e) => setOnlineFee(e.target.value)}
          />
        ) : (
          <p className="text-gray-600">{onlineFee || "No online consultation fee provided."}</p>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow-up Consultation Fee</h2>
        {isEditing ? (
          <input
            type="number"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            value={followupFee}
            onChange={(e) => setFollowupFee(e.target.value)}
          />
        ) : (
          <p className="text-gray-600">{followupFee || "No follow-up consultation fee provided."}</p>
        )}
      </div>
  
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chamber Consultation Fee</h2>
        {isEditing ? (
          <input
            type="number"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            value={chamberFee}
            onChange={(e) => setChamberFee(e.target.value)}
          />
        ) : (
          <p className="text-gray-600">{chamberFee || "No chamber consultation fee provided."}</p>
        )}
      </div>
    </div>
  );
  export default ConsultationFees;
  