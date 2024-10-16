"use client";
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB'; // Or another locale if needed

// Register locale
registerLocale('en-GB', enGB);

export default function AppointmentBooking() {
  const [formData, setFormData] = useState({
    doctor: '',
    date: null, // Use null instead of an empty string for react-datepicker
    time: '',
    appointmentType: 'Doctor\'s Chamber',
    additionalDetails: ''
  });

  const [doctors, setDoctors] = useState([]);  // To store the doctors fetched from the API
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch doctor names from the API when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api2/doctors/finddoctor"); // Fetch all doctors from your API
        const data = await response.json();
        setDoctors(data.doctors);  // Set the fetched doctors to the state
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();  // Trigger the API call
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccessMessage('');
  
    // Format the data to send to the API
    const formattedData = {
      doctorId: formData.doctor,  // Rename 'doctor' to 'doctorId'
      appointmentDate: formData.date,
      appointmentTime: formData.time,
      appointmentType: formData.appointmentType,
      additionalDetails: formData.additionalDetails
    };
  
    try {
      const response = await fetch("/api2/appointments/books", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),  // Send the formatted data to the backend
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setSuccessMessage('Appointment booked successfully');
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError('An error occurred while booking the appointment.');
    }
  };

  return (
    <div className="flex flex-row items-center justify-evenly min-h-screen bg-white">
      {/* Left side form */}
      <div className="w-2/6 p-8 bg-white shadow-2xl rounded-lg ml-16">
        <h2 className="text-3xl font-bold mb-8 text-primary">Book an Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Selection */}
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Select Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="" disabled>Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Type */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Appointment Type</h3>
            <div className='flex'>
              <div className="flex items-center mb-2">
                <input
                  id="doctorsChamber"
                  name="appointmentType"
                  type="radio"
                  value="Doctor's Chamber"
                  checked={formData.appointmentType === "Doctor's Chamber"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <label htmlFor="doctorsChamber" className="ml-3 block text-sm font-medium text-gray-700">
                  Doctor&apos;s Chamber
                </label>
              </div>
              <div className="flex items-center mb-2 ml-4">
                <input
                  id="onlineMeeting"
                  name="appointmentType"
                  type="radio"
                  value="Online Meeting"
                  checked={formData.appointmentType === "Online Meeting"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <label htmlFor="onlineMeeting" className="ml-3 block text-sm font-medium text-gray-700">
                  Online Meeting
                </label>
              </div>
            </div>
          </div>

          {/* Appointment Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Appointment Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Appointment Date</label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
                minDate={new Date()}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholderText="Select a date"
              />
            </div>

            {/* Appointment Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Appointment Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">Additional Details</label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows="3"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Provide any additional information (optional)"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-secondary focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Book Appointment
            </button>
          </div>
        </form>

        {/* Display success or error messages */}
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>

      {/* Right side video */}
      <div className=" w-1/2 h-screen relative ml-0 mt-20">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-3/4  object-cover"
        >
          <source src="/assets/booking.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}