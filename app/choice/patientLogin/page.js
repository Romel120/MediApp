"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

// Patient Login Form Component
const PatientLoginForm = () => {
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

    try {
      const res = await fetch("/api2/patients/login", { // Updated the endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData), // Send the login data directly
      });

      if (res.ok) {
        const data = await res.json();
        const { patientId } = data;  // Extract patientId

        // Save patient ID to localStorage
        localStorage.setItem("patientId", patientId);

        toast.success("Login successful");
        // Redirect to homepage or patient profile page
        window.location.href = "/patientProfile";
      } else {
        const errorData = await res.text();
        toast.error(errorData || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Welcome back</h1>
        <p className="text-gray-600 mb-4">Log in as a Patient below.</p>

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-text font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-md transition-colors duration-200 hover:bg-secondary"
            >
              Login
            </button>
            <Link href="/choice/patientSignup" className="text-primary hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientLoginForm;
