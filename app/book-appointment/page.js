"use client"
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

  // Fetch doctor names from the API when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api2/doctors/finddoctor"); // Fetch all doctors from your API
      const data = await response.json();
      setDoctors(data.doctors);        // Set the fetched doctors to the state
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 mt-10">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Book an Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
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
              {/* Map over the fetched doctors and display their names */}
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor.fullName}>
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
              <div className="relative mt-2">
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  locale="en-GB"
                  minDate={new Date()}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholderText="Select a date"
                  showPopperArrow={false}
                  calendarClassName="bg-white border-2 border-gray-300 shadow-lg rounded-md"
                />
                {/* Date Icon */}
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-6 8h6M5 3h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Appointment Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Appointment Time</label>
              <div className="relative mt-2">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
                {/* Time Icon */}
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                  </svg>
                </div>
              </div>
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
      </div>
    </div>
  );
}
