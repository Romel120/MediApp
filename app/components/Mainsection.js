"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function Mainsection() {
  const [isSpecialtyOpen, setSpecialtyOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);


  const specialties = [
    "Orthopedics", "Allergy & Immunology", "Nephrology", "General Practitioner",
    "Pediatric Surgery", "Psychiatry", "Anesthesiology", "Physical Medicine",
    "Gastroenterology", "Diabetology & Endocrinology", "Rheumatology", "Physiotherapy",
    "Dentistry", "Hepatology", "Medicine", "Ophthalmology (Eye)", "Oncology",
    "Neuro Medicine", "Food & Nutrition", "ENT", "Pediatrics", "Skin & VD",
    "Burn & Plastic Surgery", "Hematology", "Neuro Surgery", "Chest Disease",
    "Gynae & Obs", "Surgery", "Breast Diseases", "Cardiology", "Urology"
  ];

  const slides = [
    {
      url: "/assets/_1.png", // Put your image URL here
      text: "Find the best doctors for your medical needs."
    },
    {
      url: "/assets/_2.png", // Put your image URL here
      text: "Book appointments quickly and easily."
    },
    {
      url: "/assets/_4.png", // Put your image URL here
      text: "Get access to a wide range of healthcare specialists."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-background min-h-screen hover:text-white">
      <section
        className="flex justify-center items-center h-screen pt-16 bg-cover bg-center bg-no-repeat mb-2"
        style={{
          backgroundImage: `url('/assets/msbg1.jpg')`,
          backgroundSize: '100%',
          opacity: 0.8,
        }}
      >
        <div className="flex w-full max-w-2xl flex-col items-center">
          <h1 className="text-4xl font-bold text-text mb-6">
            Find the Right Specialist for Your Needs
          </h1>
          <p className="text-lg text-text mb-8 text-center">
            Explore our wide range of medical specialties and easily book an appointment with
            the best doctors available.
          </p>
          <div className="flex w-full">
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
            <button className="bg-primary text-text text-lg font-semibold px-6 rounded-r-md hover:bg-accent hover:text-white transition-all duration-300 shadow-lg">
              Search
            </button>
          </div>
        </div>
      </section>


      <section className="relative flex flex-col items-center py-48 px-4 mb-4 bg-background shadow-md rounded-md mt-6 mx-4 overflow-hidden">
        {/* Background Decorative Image */}
        <img
          src="/assets/welcome.jpg"
          alt="Health Background"
          className="absolute inset-0 w-full h-full bg-cover"
        />

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Welcome to MediApp</h2>
          <p className="text-lg text-text mb-8 max-w-2xl text-center">
            Your go-to platform for finding the best doctors and managing your health appointments. Our mission is to provide you with easy access to quality healthcare services and support your journey towards better health.
          </p>

          <Link href="/find-doctors">
            <button className="flex items-center gap-2 bg-primary text-text text-lg font-semibold px-6 py-3 rounded-md hover:bg-accent hover:text-white transition-all duration-300 shadow-lg">
              {/* Icon for Button */}
              <FaSearch className="h-5 w-5 mr-2" /> Find Doctor
            </button>
          </Link>
        </div>
      </section>

      <section className="relative flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat m-4 " style={{
        backgroundImage: `url(${slides[currentSlide].url})`,
        backgroundSize: '50%', opacity: 0.9,
      }}>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> {/* Overlay */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {slides[currentSlide].text}
          </h2>
          <p className="text-lg text-white">
            Seamless healthcare at your fingertips. Access specialists, book appointments, and more.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-background">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Doctor Consultation */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/assets/medcall.jpg" // Replace with your icon path
                alt="Doctor Consultation"
                className="w-screen"
              />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-4 text-center">Doctor Consultation</h3>
            <p className="text-text mb-6 text-center">Connect with experienced doctors for online or in-person consultations. Get expert advice and treatment tailored to your needs.</p>
            <div className="text-center">
              <Link href="/find-doctors">
                <button className="bg-primary text-text px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Appointment Booking */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/assets/booking.jpg" // Replace with your icon path
                alt="Appointment Booking"
                className="w-3/4"
              />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-4 text-center">Appointment Booking</h3>
            <p className="text-text mb-6 text-center">Easily schedule and manage your medical appointments. Receive reminders and updates to stay on top of your health.</p>
            <div className="text-center">
              <Link href="/book-appointment">
                <button className="bg-primary text-text px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Health Resources */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/assets/resource.jpg" // Replace with your icon path
                alt="Health Resources"
                className="w-screen"
              />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-4 text-center">Health Resources</h3>
            <p className="text-text mb-6 text-center">Access valuable health resources, tips, and information to help you stay informed and make better health decisions.</p>
            <div className="text-center">
              <Link href="/faq">
                <button className="bg-primary text-text px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
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
