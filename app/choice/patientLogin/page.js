"use client";
import { useState } from "react";
import Link from "next/link";

// Signup Form Component
const SignupForm = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    email: "",
    dob: "",
    phone: "",
    nationality: "",
    gender: "",
    age: "" ,
    password: "",
    confirmPassword: "",
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Signup Data:", signupData);
  };

  return (
    <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-primary mb-6">Sign up</h1>
      <p className="text-gray-600 mb-4">Enter your details to create your account.</p>
      <form onSubmit={handleSignupSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-text font-medium">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={signupData.fullName}
              onChange={handleSignupChange}
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
              value={signupData.userName}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name"
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
              value={signupData.email}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-text font-medium">Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={signupData.dob}
              onChange={handleSignupChange}
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
              value={signupData.phone}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+123 456 789"
              required
            />
          </div>

          {/* Nationality */}
          <div>
            <label htmlFor="nationality" className="block text-text font-medium">Nationality</label>
            <select
              id="nationality"
              name="nationality"
              value={signupData.nationality}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Nationality</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Brazil">Brazil</option>
            </select>
          </div>

          {/* Gender Type */}
          <div>
            <label htmlFor="gender" className="block text-text font-medium">Gender</label>
            <select
              id="gender"
              name="gender"
              value={signupData.gender}
              onChange={handleSignupChange}
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
              value={signupData.age}
              onChange={handleSignupChange}
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
              value={signupData.password}
              onChange={handleSignupChange}
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
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
         
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// Login Form Component
const LoginForm = () => {
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
  
    const res = await fetch("/api/patient/login", {
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
      <p className="text-gray-600 mb-4">Glad to see you again! Log in below.</p>
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

// Main Page Component
export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <SignupForm />
        <LoginForm />
      </div>
    </div>
  );
}
