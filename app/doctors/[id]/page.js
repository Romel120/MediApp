"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaBriefcase, FaUserMd, FaClinicMedical, FaGraduationCap } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCookie } from 'cookies-next'; // To manage cookies

export default function DoctorPublicProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  
  useEffect(() => {
    if (id) {
      const fetchDoctorProfile = async () => {
        try {
          const response = await fetch(`/api2/doctors/view?id=${id}`);
          const data = await response.json();

          if (response.ok) {
            setDoctor(data);
          } else {
            console.error("Failed to fetch doctor profile");
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching doctor profile:", error);
          setIsLoading(false);
        }
      };

      fetchDoctorProfile();
    }
  }, [id]);

  const handleBookAppointment = async () => {
    const patientId = getCookie('patientId'); // Retrieve the patient ID from cookies

    // If patient is not logged in, redirect to patientLogin page
    if (!patientId) {
      router.push('/choice/patientLogin');
      return;
    }

    if (!appointmentDate || !appointmentTime) {
      setBookingStatus('Please select a valid date and time.');
      return;
    }

    try {
      const response = await fetch('/api2/appointments/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: id,
          patientId,
          appointmentDate,
          appointmentTime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingStatus('Appointment booked successfully.');
      } else {
        setBookingStatus(data.message || 'Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setBookingStatus('Error occurred while booking appointment.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">No doctor found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden mt-24">
        {/* Header with doctor name and image */}
        <div className="flex items-center p-6 bg-blue-500 text-white">
          <Image
            src="/assets/docProfile.png" // Placeholder image path
            alt={`${doctor.fullName}'s Avatar`}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover border-2 border-white"
          />
          <div className="ml-4">
            <h2 className="text-3xl font-bold">{doctor.fullName}</h2>
            <p className="text-lg">
              {doctor.specialities && doctor.specialities.length > 0
                ? `Specialities: ${doctor.specialities.join(', ')}`
                : 'Specialities not available'}
            </p>
            <p className="text-md">{doctor.location || 'Location not specified'}</p>
          </div>
        </div>

        {/* Doctor's Details */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Details</h3>
            <p className="text-md text-gray-700">
              <strong>Experience:</strong> {doctor.experience || 'Experience not available'}
            </p>
            <p className="text-md text-gray-700">
              <strong>Bio:</strong> {doctor.bio || 'No bio available'}
            </p>
            <p className="text-md text-gray-700">
              <strong>Consultation Hours:</strong> {doctor.consultationStart && doctor.consultationEnd
                ? `From ${doctor.consultationStart} to ${doctor.consultationEnd}`
                : 'Consultation hours not available'}
            </p>
          </div>

          {/* Fees */}
          <div className="flex justify-between">
            <div>
              <p className="text-md text-gray-700"><strong>Online Fee:</strong> ৳ {doctor.onlineFee || '--'}</p>
            </div>
            <div>
              <p className="text-md text-gray-700"><strong>Chamber Fee:</strong> ৳ {doctor.chamberFee || '--'}</p>
            </div>
            <div>
              <p className="text-md text-gray-700"><strong>Follow up Fee:</strong> ৳ {doctor.followupFee || '--'}</p>
            </div>
          </div>

          {/* BMDC and Qualifications */}
          <div>
            <p className="text-md text-gray-700">
              <strong>BMDC Number:</strong> {doctor.BMDCNumber || '--'}
            </p>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4"><FaGraduationCap className="inline-block mr-2" /> Qualifications</h3>
              {doctor.qualifications && doctor.qualifications.length > 0 ? (
                <ul className="space-y-2">
                  {doctor.qualifications.map((qualification, index) => (
                    <li key={index} className="text-gray-700">
                      <strong>{qualification.degree}</strong> from {qualification.institution} ({qualification.yearOfCompletion})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No qualifications available.</p>
              )}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4"><FaBriefcase className="inline-block mr-2" /> Professional Experience</h3>
            {doctor.details && doctor.details.length > 0 ? (
              <ul className="space-y-2">
                {doctor.details.map((detail, index) => (
                  <li key={index} className="text-gray-700">
                    <strong>{detail.position}</strong> at {detail.institute} ({detail.start_date} - {detail.end_date || 'Present'})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No professional experience available.</p>
            )}
          </div>

          {/* Chamber Details */}
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4"><FaClinicMedical className="inline-block mr-2" /> Chamber Details</h3>
            {doctor.chamberDetails && doctor.chamberDetails.length > 0 ? (
              <ul className="space-y-2">
                {doctor.chamberDetails.map((chamber, index) => (
                  <li key={index} className="text-gray-700">
                    <strong>{chamber.chamberName}</strong>, {chamber.address}, {chamber.city}, {chamber.contact}, {chamber.startTime} - {chamber.endTime}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No chamber details available.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex justify-between p-6 bg-gray-100 border-t">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            Book Appointment
          </button>
          <button className="border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200">
            View Reviews
          </button>
        </div> */}
        {/* Book Appointment Section */}
       {/* Book Appointment Section */}
       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg mt-8 p-6">
          <h3 className="text-2xl font-semibold mb-4">Book an Appointment</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Date:</label>
            <DatePicker
              selected={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              className="p-2 border border-gray-300 rounded"
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Time:</label>
            <input
              type="time"
              className="p-2 border border-gray-300 rounded"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
          {bookingStatus && <p className="mt-4 text-md text-red-600">{bookingStatus}</p>}
        </div>
      </div>
    </div>
  );
}
