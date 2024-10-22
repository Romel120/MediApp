"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
      url: "/assets/2.jpg", // Put your image URL here
      text: "Find the best doctors for your medical needs."
    },
    {
      url: "/assets/3.jpg", // Put your image URL here
      text: "Book appointments quickly and easily."
    },
    {
      url: "/assets/4.jpg", // Put your image URL here
      text: "Get access to a wide range of healthcare specialists."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-background min-h-screen hover:text-white">
      <section
  className="flex justify-center items-center h-[60vh] sm:h-[80vh] md:h-screen pt-16 bg-center bg-no-repeat mb-2 bg-cover md:bg-[100%] sm:bg-contain"
  style={{
    backgroundImage: `url('/assets/msbg4.jpg')`,
    backgroundSize: '100%', // Default for larger screens
    backgroundPosition: 'center',
    opacity: 0.8,
  }}
>

        <div className="flex w-full max-w-2xl flex-col items-center px-4 sm:px-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-text mb-4 sm:mb-6 text-center">
            Find the Right Specialist for Your Needs
          </h1>
          <p className="text-base sm:text-lg text-text mb-6 sm:mb-8 text-center">
            Explore our wide range of medical specialties and easily book an appointment with
            the best doctors available.
          </p>
          <div className="flex flex-col sm:flex-row w-full">
            <div className="mb-4 sm:mb-0">
              <button
                className="bg-indigo-600 text-white text-sm sm:text-lg font-semibold px-4 sm:px-8 py-3 rounded-md hover:bg-accent hover:text-white transition-all duration-300 shadow-lg"
                onClick={() => setSpecialtyOpen(!isSpecialtyOpen)}
              >
                Specialty
              </button>

              {isSpecialtyOpen && (
                <div className="absolute bg-white shadow-lg rounded-md mt-2 w-72 sm:w-80 z-10">
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
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search for doctors"
                className="px-4 py-3 border border-gray-300 rounded-l-md w-full text-text focus:outline-none focus:border-primary"
              />
              <Link href="/find-doctors">
                <button className="bg-primary text-text text-sm sm:text-lg font-semibold px-4 sm:px-6 py-3 rounded-r-md hover:bg-accent hover:text-white transition-all duration-300 shadow-lg">
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-blue-50 py-6 sm:py-10">
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
          Consult Best Doctors for <span className="text-blue-600">any health issues</span>
        </h2>
        <div className="flex flex-wrap justify-evenly gap-10 sm:gap-20 mt-6 sm:mt-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center w-40 sm:w-48">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="/assets/general-health-icon.jpg"
                alt="General Health"
                width={160}
                height={160}
                className="h-32 w-32 sm:h-40 sm:w-40"
              />
            </div>
            <p className="mt-2 sm:mt-4 text-gray-700">Need advice on general health?</p>
            <Link href="#" className="mt-2 text-blue-600 font-semibold hover:underline">
              Consult Now!
            </Link>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center w-40 sm:w-48">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="/assets/nutrition-icon.webp"
                alt="Nutrition Advice"
                width={160}
                height={160}
                className="h-32 w-32 sm:h-40 sm:w-40"
              />
            </div>
            <p className="mt-2 sm:mt-4 text-gray-700">Looking for nutrition advice?</p>
            <Link href="#" className="mt-2 text-blue-600 font-semibold hover:underline">
              Consult Now!
            </Link>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center w-40 sm:w-48">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="/assets/fever-cough-icon.jpg"
                alt="Fever, Cold or Cough"
                width={160}
                height={160}
                className="h-32 w-32 sm:h-40 sm:w-40"
              />
            </div>
            <p className="mt-2 sm:mt-4 text-gray-700">Seasonal fever, cold or cough problem?</p>
            <Link href="#" className="mt-2 text-blue-600 font-semibold hover:underline">
              Consult Now!
            </Link>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center text-center w-40 sm:w-48">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="/assets/child-health-icon.jpg"
                alt="Child Health Problem"
                width={160}
                height={160}
                className="h-32 w-32 sm:h-40 sm:w-40"
              />
            </div>
            <p className="mt-2 sm:mt-4 text-gray-700">Child health problem?</p>
            <Link href="#" className="mt-2 text-blue-600 font-semibold hover:underline">
              Consult Now!
            </Link>
          </div>
        </div>
      </div>

      <section className="relative flex justify-center items-center h-[40vh] sm:h-[60vh] lg:h-screen bg-center bg-no-repeat mx-4 lg:mx-28 my-4" style={{
        backgroundImage: `url(${slides[currentSlide].url})`,
        backgroundSize: '65%', opacity: 0.9,
      }}>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            {slides[currentSlide].text}
          </h2>
          <p className="text-base sm:text-lg text-white">
            Seamless healthcare at your fingertips. Access specialists, book appointments, and more.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
  <h2 className="text-3xl font-bold text-primary mb-6 text-center">What Our Users Say</h2>
  <div className="max-w-4xl mx-auto">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <blockquote className="bg-gray-100 p-6 rounded-lg shadow-md">
        <p className="text-lg text-text mb-4">&quot;MediApp has made finding the right doctor so easy. The appointment booking system is seamless, and I love the reminders!&quot;</p>
        <cite className="text-primary font-semibold">- Jane Doe</cite>
      </blockquote>
      <blockquote className="bg-gray-100 p-6 rounded-lg shadow-md">
        <p className="text-lg text-text mb-4">&quot;I appreciate the range of specialties available and the user-friendly interface. Highly recommend for managing your health.&quot;</p>
        <cite className="text-primary font-semibold">- John Smith</cite>
      </blockquote>
    </div>
  </div>
</section>


      <section className="bg-blue-600 text-white py-10 sm:py-16 text-center">
        <h2 className="text-xl sm:text-3xl font-bold">Ready to take control of your health?</h2>
        <p className="mt-4 text-base sm:text-lg">Join MediApp today and start your health journey!</p>
        <Link href="/signup">
          <button className="bg-white text-blue-600 text-sm sm:text-lg font-semibold px-4 sm:px-8 py-3 rounded-md mt-6 hover:bg-gray-200 transition-all duration-300 shadow-lg">
            Sign Up Now
          </button>
        </Link>
      </section>
    </div>
  );
}
