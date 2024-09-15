"use client";
import { useState } from "react";
import Link from "next/link";

// Doctor Signup Form Component
const DoctorSignupForm = () => {
  const [doctorSignupData, setDoctorSignupData] = useState({
    fullName: "",
    username: "" ,
    email: "",
    dob: "",
    phone: "",
    medicalLicense: "",
    specialization: "",
    idType: "",
    gender: "" ,
    age: "" ,
    password: "",
    confirmPassword: "",
  });

  const handleDoctorSignupChange = (e) => {
    const { name, value } = e.target;
    setDoctorSignupData({ ...doctorSignupData, [name]: value });
  };

  const handleDoctorSignupSubmit = (e) => {
    e.preventDefault();
    if (doctorSignupData.password !== doctorSignupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Doctor Signup Data:", doctorSignupData);
  };

  return (
    <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-primary mb-6">Sign up as Doctor</h1>
      <p className="text-gray-600 mb-4">Enter your details to create your account.</p>
      <form onSubmit={handleDoctorSignupSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-text font-medium">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={doctorSignupData.fullName}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-text font-medium">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={doctorSignupData.username}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your username"
              required
            />
          </div>


          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-text font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={doctorSignupData.email}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-text font-medium">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={doctorSignupData.dob}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-text font-medium">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={doctorSignupData.phone}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+123 456 789"
              required
            />
          </div>

          {/* Medical License Number */}
          <div>
            <label htmlFor="medicalLicense" className="block text-text font-medium">Medical License No.</label>
            <input
              type="text"
              id="medicalLicense"
              name="medicalLicense"
              value={doctorSignupData.medicalLicense}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your license number"
              required
            />
          </div>

          {/* Specialization */}
          <div>
            <label htmlFor="specialization" className="block text-text font-medium">Specialization</label>
            <select
              id="specialization"
              name="specialization"
              value={doctorSignupData.specialization}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Specialization</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="General Surgeon">General Surgeon</option>
            </select>
          </div>

          {/* ID Type */}
          <div>
            <label htmlFor="idType" className="block text-text font-medium">ID Type</label>
            <select
              id="idType"
              name="idType"
              value={doctorSignupData.idType}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select ID Type</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
              <option value="National ID">National ID</option>
            </select>
          </div>
          <div>
            <label htmlFor="gender" className="block text-text font-medium">Gender</label>
            <select
              id="gender"
              name="gender"
              value={doctorSignupData.gender}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="block text-text font-medium">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={doctorSignupData.age}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your age"
              required
            />
          </div>
        </div>

        {/* Password and Confirm Password */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="password" className="block text-text font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={doctorSignupData.password}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-text font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={doctorSignupData.confirmPassword}
              onChange={handleDoctorSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button type="reset" className="px-6 py-3 bg-gray-300 text-text rounded-md">
            Cancel
          </button>
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-md">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

// Doctor Login Form Component
const DoctorLoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    const res = await fetch("/api/doctor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
  
    const data = await res.json();
    if (res.status === 200) {
      console.log("Login successful", data);
    } else {
      console.error("Login failed", data);
    }
  };
  

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-primary mb-6">Welcome back</h1>
      <p className="text-gray-600 mb-4">Log in as a Doctor below.</p>
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-text font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-text font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-md">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Page Component for Doctor Auth
export default function DoctorAuthPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <DoctorSignupForm />
        <DoctorLoginForm />
      </div>
    </div>
  );
}
