"use client";

import { useEffect, useState } from 'react';
import AppointmentCard from '../components/AppointmentCard'; // Adjust the import path as necessary

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  const Loader = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      <style jsx>{`
        .loader {
          border-top-color: #3498db; /* Customize loader color */
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api2/appointments/doctors'); // Replace {doctorId} with actual doctor ID
        const data = await response.json();
        setAppointments(data); // Adjust according to your API response structure
      setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api2/appointments/doctors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === id ? { ...appointment, status: newStatus } : appointment
          )
        );
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };


  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 mx-20 mt-24">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
      {appointments.length === 0 ? (
        <p>You have no upcoming appointments.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard 
              key={appointment._id} 
              appointment={appointment} 
              onUpdateStatus={handleUpdateStatus} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
