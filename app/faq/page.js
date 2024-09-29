"use client"
import { useEffect, useState } from "react";

// Example Loader component (You can style this as per your design)
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

export default function FAQ() {
  const [isLoading, setIsLoading] = useState(true); // To handle loading state
  const [activeIndex, setActiveIndex] = useState(null); // To handle FAQ toggle

  // Simulate an async data fetch with a useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      // Simulating a 1-second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false); // Turn off loader after the delay
    };
    fetchData();
  }, []);

  // Sample FAQ data
  const faqs = [
    {
      question: "How do I find a doctor on MediApp?",
      answer:
        "To find a doctor, simply use the search bar on the homepage. You can filter doctors by specialty, location, or availability.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "Once you find a doctor, click on the 'Book Appointment' button. You will be guided through the booking process where you can choose a date and time.",
    },
    {
      question: "What should I bring to my appointment?",
      answer:
        "It's recommended to bring any medical records, a list of medications you are currently taking, and a form of identification.",
    },
    {
      question: "How do I cancel or reschedule an appointment?",
      answer:
        "You can cancel or reschedule your appointment by visiting your account page and selecting the appointment you wish to modify.",
    },
    {
      question: "How do doctors view appointments?",
      answer:
        "Doctors can log into their accounts and access their appointment dashboard, where all upcoming appointments are displayed.",
    },
  ];

  // Toggle active question
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Show loader while loading
  if (isLoading) {
    return <Loader />;
  }

  // Render the FAQ content after loading completes
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary">Frequently Asked Questions</h1>
      <p className="mt-4 text-text">Find answers to common questions and concerns.</p>

      <div className="mt-8 w-full max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-md">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 text-left text-lg font-medium text-text flex justify-between items-center focus:outline-none"
            >
              {faq.question}
              <span className="ml-2">
                {activeIndex === index ? (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
              </span>
            </button>

            {activeIndex === index && (
              <div className="px-4 py-3 text-gray-700 bg-gray-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
