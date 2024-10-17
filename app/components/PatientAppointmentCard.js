// app/components/PatientAppointmentCard.js
"use client"
import { useEffect, useState } from "react";

const PatientAppointmentCard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api2/appointments/patients");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAppointments();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (appointments.length === 0) {
    return <div className="text-gray-500">No appointments found.</div>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const doctor = appointment.doctor;
        const chamber = doctor.chamberDetails?.[0]; // Get the first chamber details

        return (
          <div key={appointment._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-blue-600 mb-2">{doctor.fullName}</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600"><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</span>
              <span className={`text-sm font-semibold ${appointment.status === 'completed' ? 'text-green-600' : appointment.status === 'canceled' ? 'text-red-600' : appointment.status === 'confirmed' ? 'text-blue-600' : 'text-yellow-600'}`}>
                {appointment.status}
              </span>
            </div>
            <p className="text-gray-800"><strong>Time:</strong> {appointment.appointmentTime}</p>
            {chamber && (
              <div className="mt-3">
                <p className="text-gray-800"><strong>Chamber Name:</strong> {chamber.chamberName}</p>
                <p className="text-gray-800"><strong>Address:</strong> {chamber.address}, {chamber.city}</p>
                <p className="text-gray-800"><strong>Fee:</strong> ${chamber.chamberFee}</p>
              </div>
            )}
            {appointment.appointmentType && (
              <p className="text-gray-800 mt-3"><strong>Appointment Type:</strong> {appointment.appointmentType}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PatientAppointmentCard;
