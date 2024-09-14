"use client";
import { useState } from "react";
import Link from "next/link";

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
    <div className="bg-background min-h-screen hover:text-white">
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
      <section className="flex flex-col items-center py-12 px-4 bg-white shadow-md rounded-md mt-6 mx-4">
  <h2 className="text-3xl font-bold text-primary mb-4">Welcome to MediApp</h2>
  <p className="text-lg text-text mb-6">Your go-to platform for finding the best doctors and managing your health appointments. Our mission is to provide you with easy access to quality healthcare services and support your journey towards better health.</p>
  <Link href="/find-doctors">
    <button className="bg-primary text-text text-lg font-semibold px-6 py-3 rounded-md hover:bg-accent hover:text-white transition-all duration-300 shadow-lg">
      Find Doctors
    </button>
  </Link>
</section>
<section className="py-12 px-4 bg-background">
  <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Services</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-primary mb-4">Doctor Consultation</h3>
      <p className="text-text mb-4">Connect with experienced doctors for online or in-person consultations. Get expert advice and treatment tailored to your needs.</p>
      <Link href="/find-doctors">
        <button className="bg-primary text-text px-4 py-2 rounded-md  hover:text-white hover:bg-accent transition-all duration-300">Learn More</button>
      </Link>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-primary mb-4">Appointment Booking</h3>
      <p className="text-text mb-4">Easily schedule and manage your medical appointments. Receive reminders and updates to stay on top of your health.</p>
      <Link href="/book-appointment">
        <button className="bg-primary text-text px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-all duration-300">Learn More</button>
      </Link>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-primary mb-4">Health Resources</h3>
      <p className="text-text mb-4">Access valuable health resources, tips, and information to help you stay informed and make better health decisions.</p>
      <Link href="/faq">
        <button className="bg-primary text-text px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-all duration-300">Learn More</button>
      </Link>
    </div>
  </div>
</section>
<section className="py-12 px-4 bg-white">
  <h2 className="text-3xl font-bold text-primary mb-6 text-center">What Our Users Say</h2>
  <div className="max-w-4xl mx-auto">
    <div className="flex flex-col space-y-8">
      <blockquote className="bg-gray-100 p-6 rounded-lg shadow-md">
        <p className="text-lg text-text mb-4">"MediApp has made finding the right doctor so easy. The appointment booking system is seamless, and I love the reminders!"</p>
        <cite className="text-primary font-semibold">- Jane Doe</cite>
      </blockquote>
      <blockquote className="bg-gray-100 p-6 rounded-lg shadow-md">
        <p className="text-lg text-text mb-4">"I appreciate the range of specialties available and the user-friendly interface. Highly recommend for managing your health."</p>
        <cite className="text-primary font-semibold">- John Smith</cite>
      </blockquote>
    </div>
  </div>
</section>
<section className="py-12 px-4 bg-primary text-white text-center">
  <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
  <p className="text-lg mb-6">Join us today and start managing your health more effectively with MediApp. Sign up now to get started.</p>
  <Link href="/choice">
    <button className="bg-accent text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-green-900 transition-all duration-300">Sign Up</button>
  </Link>
</section>


    </div>
  );
}
