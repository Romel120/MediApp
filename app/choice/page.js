"use client";
import { useState } from "react";
import { FaUserMd, FaUser } from "react-icons/fa";
import Link from "next/link";

export default function ChoicePage() {
  const [selected, setSelected] = useState("");

  const handleSelection = (option) => {
    setSelected(option);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-12 text-center">
        Choose Account Type
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12 mb-16">
        {/* Doctor Card */}
        <div
          onClick={() => handleSelection("doctor")}
          className={`border-4 rounded-xl p-10 sm:p-12 flex flex-col items-center cursor-pointer transition-all duration-300 w-full max-w-sm lg:w-80 h-auto lg:h-96 shadow-lg hover:shadow-2xl transform hover:scale-105 ${
            selected === "doctor"
              ? "border-primary bg-white"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <FaUserMd
            style={{ fontSize: "60px", sm: "70px", md: "80px" }}
            className="text-primary mb-6"
          />
          <h2 className="text-2xl font-semibold text-text mb-4">Doctor</h2>
          {selected === "doctor" && (
            <div className="mt-2 text-blue-500">
              <span className="text-3xl">✔️</span>
            </div>
          )}
          <div className="mt-6">
            <Link href="/choice/doctorLogin">
              <button className="bg-primary text-white py-3 px-6 rounded-full mb-3 w-full sm:w-52 hover:bg-blue-600 transition-colors">
                Login as Doctor
              </button>
            </Link>
            <Link href="/choice/doctorSignup">
              <button className="bg-secondary text-white py-3 px-6 rounded-full w-full sm:w-52 hover:bg-green-600 transition-colors">
                Signup as Doctor
              </button>
            </Link>
          </div>
        </div>

        {/* Patient Card */}
        <div
          onClick={() => handleSelection("patient")}
          className={`border-4 rounded-xl p-10 sm:p-12 flex flex-col items-center cursor-pointer transition-all duration-300 w-full max-w-sm lg:w-80 h-auto lg:h-96 shadow-lg hover:shadow-2xl transform hover:scale-105 ${
            selected === "patient"
              ? "border-primary bg-white"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <FaUser
            style={{ fontSize: "60px", sm: "70px", md: "80px" }}
            className="text-primary mb-6"
          />
          <h2 className="text-2xl font-semibold text-text mb-4">Patient</h2>
          {selected === "patient" && (
            <div className="mt-2 text-blue-500">
              <span className="text-3xl">✔️</span>
            </div>
          )}
          <div className="mt-6">
            <Link href="/choice/patientLogin">
              <button className="bg-primary text-white py-3 px-6 rounded-full mb-3 w-full sm:w-52 hover:bg-blue-600 transition-colors">
                Login as Patient
              </button>
            </Link>
            <Link href="/choice/patientSignup">
              <button className="bg-secondary text-white py-3 px-6 rounded-full w-full sm:w-52 hover:bg-green-600 transition-colors">
                Signup as Patient
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xl sm:text-2xl font-medium text-text mb-2">
          {selected === "doctor"
            ? "Hello doctor!"
            : selected === "patient"
            ? "Hello patient!"
            : "Hello user!"}
        </p>
        <p className="text-gray-500">Please choose an option to get started.</p>
      </div>
    </div>
  );
}
