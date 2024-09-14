"use client";
import { useState } from "react";

export default function Mainsection() {
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
    <div className="bg-background min-h-screen">
      <section className="flex justify-center items-center h-screen pt-16 bg-cover bg-center mb-2" style={{ 
        backgroundImage: `url('https://cdn.create.vista.com/api/media/medium/182386902/stock-photo-stethoscope-in-the-office-of-doctors-top-view-of-doctors-desk-table-blank-paper-on?token=')`
        , opacity: 0.8,}}>
        <div className="flex w-full max-w-2xl">
          <div>
            <button
              className="bg-primary text-text text-lg font-semibold mr-2 px-8 py-3 rounded-md hover:bg-accent hover:text-white transition-all duration-300 shadow-lg"
              onClick={() => setSpecialtyOpen(!isSpecialtyOpen)}
            >
              Specialty
            </button>

            {isSpecialtyOpen && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 w-80 z-10">
                <ul className="p-4 grid grid-cols-1 gap-2 max-h-60 overflow-y-scroll">
                  {specialties.map((specialty, index) => (
                    <li key={index} className="text-text">
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
            className="px-4 py-3 border border-gray-300 rounded-l-md w-full text-text focus:outline-none focus:border-primary"
          />
          <button className="bg-primary text-text text-lg font-semibold px-6 rounded-r-md hover:bg-accent  hover:text-white transition-all duration-300 shadow-lg">
            Search
          </button>
        </div>
      </section>
    </div>
  );
}
