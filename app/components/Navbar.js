"use client";
import { useState } from "react";

export default function Navbar() {
  const [isSpecialtyOpen, setSpecialtyOpen] = useState(false);

  const specialties = [
    "Orthopedics", "Allergy & Immunology", "Nephrology", "General Practitioner",
    "Pediatric Surgery", "Psychiatry", "Anesthesiology", "Physical Medicine",
    "Gastroenterology", "Diabetology & Endocrinology", "Rheumatology", "Physiotherapy",
    "Dentistry", "Hepatology", "Medicine", "Ophthalmology (Eye)", "Oncology",
    "Neuro Medicine", "Food & Nutrition", "ENT", "Pediatrics", "Skin & VD",
    "Burn & Plastic Surgery", "Hematology", "Neuro Surgery", "Chest Disease",
    "Gynae & Obs", "Surgery", "Breast Diseases", "Cardiology", "Urology"
  ];

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute top-20 left-0 w-full h-3/4 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/medical-staff-set-doctor-nurse-surgeon-pharmacist_613284-3317.jpg?t=st=1726084499~exp=1726088099~hmac=70fc6debe92d00570690f08df463458ef39eb77f20dc49b55ec852328aed9b48&w=996')`,
          opacity: 0.8,
        }}
      ></div>

      {/* Navbar */}
      <nav className="relative z-20 bg-white shadow-lg py-4 px-6 flex justify-between items-center w-full top-0">
        <div className="text-3xl font-bold text-green-600 hover:text-green-700 transition-colors duration-300">
          MediApp
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-gray-600 font-medium flex items-center hover:text-green-600 transition-colors duration-300">
            <span className="mr-2">🔍</span> Find Doctor
          </button>
          <button className="text-gray-600 font-medium flex items-center hover:text-green-600 transition-colors duration-300">
            <span className="mr-2">📅</span> Book Appointment
          </button>
          <button className="text-gray-600 font-medium flex items-center hover:text-green-600 transition-colors duration-300">
            <span className="mr-2">❓</span> FAQ
          </button>
          <button className="text-gray-600 font-medium flex items-center hover:text-green-600 transition-colors duration-300">
            <span className="mr-2">ℹ️</span> About Us
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all duration-300 shadow-lg">
            Login / Signup
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <section className="relative z-10 flex justify-center items-center h-screen pt-16">
        <div className="flex w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl bg-opacity-90">
          <div className="flex-grow mr-4">
            <button
              className="bg-green-600 text-white mr-2 px-8 py-3 rounded-md hover:bg-green-700 transition-all duration-300 shadow-lg"
              onClick={() => setSpecialtyOpen(!isSpecialtyOpen)}
            >
              Specialty
            </button>

            {isSpecialtyOpen && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 w-96 z-20 max-h-60 overflow-y-auto">
                <ul className="p-4 grid grid-cols-1 gap-2">
                  {specialties.map((specialty, index) => (
                    <li key={index} className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition">
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Search for doctors"
            className="px-4 py-3 border border-gray-300 rounded-l-md w-full text-gray-700 focus:outline-none focus:border-green-500"
          />
          <button className="bg-green-600 text-white px-6 rounded-r-md hover:bg-green-700 transition-all duration-300 shadow-lg">
            Search
          </button>
        </div>
      </section>
    </div>
  );
}
