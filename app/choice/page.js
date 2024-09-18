"use client"
import { useState } from "react";
import { FaUserMd, FaUser } from "react-icons/fa";
import Link from "next/link"; 
export default function ChoicePage() {
  const [selected, setSelected] = useState(""); 

  const handleSelection = (option) => {
    setSelected(option);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Choose Account Type</h1>
      
      <div className="flex space-x-6 mb-8">
       
        <Link href="choice/doctorLogin">
        <div
          onClick={() => handleSelection("doctor")}
          className={`border-2 rounded-lg p-16 flex flex-col items-center cursor-pointer transition-all duration-300 ${
            selected === "doctor" ? "border-primary" : "border-gray-300"
          }`}
        >
          <FaUserMd className="text-6xl text-primary mb-4" />
          <h2 className="text-xl font-semibold text-text">Doctor</h2>
          {selected === "doctor" && (
            <div className="mt-2 text-blue-500">
              <span className="text-2xl">✔️</span>
            </div>
          )}
        </div>
        </Link>
        <Link href="choice/patientLogin">
        <div
          onClick={() => handleSelection("patient")}
          className={`border-2 rounded-lg p-16 flex flex-col items-center cursor-pointer transition-all duration-300 ${
            selected === "patient" ? "border-primary" : "border-gray-300"
          }`}
        >
          <FaUser className="text-6xl text-primary mb-4" />
          <h2 className="text-xl font-semibold text-text">Patient</h2>
          {selected === "patient" && (
            <div className="mt-2 text-blue-500">
              <span className="text-2xl">✔️</span>
            </div>
          )}
        </div>
        </Link>
      </div>

      <div className="text-center">
        <p className="text-xl font-medium text-text">
        {selected === "doctor" ? "Hello doctor!" : 
     selected === "patient" ? "Hello patient!" : 
     "Hello user!"}
        </p>
        <p className="text-gray-500">Please fill out the form below to get started</p>
      </div>
    </div>
  );
}
