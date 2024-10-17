// app/components/AppointmentCard.js
"use client";
import { useState } from 'react';

const AppointmentCard = ({ appointment, onUpdateStatus }) => {
  const [status, setStatus] = useState(appointment.status);
  const [confirming, setConfirming] = useState(false); // State to manage confirmation

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setConfirming(true); // Set confirming to true when a new status is selected
  };

  const handleConfirm = () => {
    onUpdateStatus(appointment._id, status); // Call the function to update the status in the database
    setConfirming(false); // Reset confirming state
  };

  const handleCancel = () => {
    setConfirming(false); // Reset confirming state without updating
    setStatus(appointment.status); // Revert to the original status
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Appointment Details</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Patient Name</p>
          <p className="text-lg font-semibold text-gray-800">{appointment.patient.fullName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="text-lg font-semibold text-gray-800">{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Time</p>
          <p className="text-lg font-semibold text-gray-800">{appointment.appointmentTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-lg font-semibold text-gray-800">{appointment.appointmentType}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Status</p>
        <p className={`text-lg font-semibold ${status === 'completed' ? 'text-green-600' : status === 'canceled' ? 'text-red-600' : status === 'confirmed' ? 'text-blue-600' : 'text-yellow-600'}`}>
          {status}
        </p>
      </div>

      <div className="mt-4">
        <label htmlFor="status" className="block text-gray-600 text-sm mb-1">Change Status:</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {confirming && (
        <div className="mt-6 flex justify-between">
          <button 
            onClick={handleConfirm}
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Confirm
          </button>
          <button 
            onClick={handleCancel}
            className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
