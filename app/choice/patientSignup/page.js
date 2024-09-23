"use client";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Patient Signup Form Component
const PatientSignupForm = () => {
    const [signupData, setSignupData] = useState({
        fullName: "",
        username: "",
        email: "",
        dob: "",
        phone: "",
        nationality: "",
        gender: "",
        age: "",
        password: "",
        confirmPassword: "",
    });

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (signupData.password !== signupData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api2/patients/signup", { // Updated the endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData), // Send the signup data directly
            });

            if (response.ok) {
                toast.success("Patient account created successfully");
                setSignupData({
                    fullName: "",
                    username: "",
                    email: "",
                    dob: "",
                    phone: "",
                    nationality: "",
                    gender: "",
                    age: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                const errorData = await response.text();
                toast.error(errorData || "An error occurred");
            }
        } catch (error) {
            toast.error("An error occurred while creating the account");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:shadow-xl mt-24">
                <h1 className="text-3xl font-bold text-primary mb-6">Sign up</h1>
                <p className="text-gray-600 mb-4">Enter your details to create your account.</p>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                value={signupData.username} // Fixed typo
                                onChange={handleSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                value={signupData.email}
                                onChange={handleSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                value={signupData.dob}
                                onChange={handleSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button type="reset" className="px-6 py-3 bg-gray-300 text-text rounded-md transition-colors duration-200 hover:bg-gray-400">
                            Reset
                        </button>
                        <button type="submit" className="px-6 py-3 bg-primary text-white rounded-md transition-colors duration-200 hover:bg-secondary">
                            Confirm
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link href="/choice/patientLogin" className="text-primary hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default PatientSignupForm;