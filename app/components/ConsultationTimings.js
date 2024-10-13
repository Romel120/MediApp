import React, { useState } from 'react';

// Reusable TimePicker component
const TimePicker = ({ label, time, setTime, isEditing }) => (
    <div className="flex flex-col">
      <label className="text-gray-800 mb-1">{label}</label>
      {isEditing ? (
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
      ) : (
        <div className="text-lg font-semibold bg-gray-200 rounded-md p-2">
          {time}
        </div>
      )}
    </div>
  );
  
  const ConsultationTimings = ({
    consultationStart,
    setConsultationStart,
    consultationEnd,
    setConsultationEnd,
    isEditing  // Receive isEditing from the parent component
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Consultation Timings
      </h2>
      <div className="flex space-x-6">
        <TimePicker
          label="Start Time"
          time={consultationStart}
          setTime={setConsultationStart}
          isEditing={isEditing}  // Pass isEditing to each time picker
        />
        <TimePicker
          label="End Time"
          time={consultationEnd}
          setTime={setConsultationEnd}
          isEditing={isEditing}  // Pass isEditing to each time picker
        />
      </div>
    </div>
  );
  
  export default ConsultationTimings;
  