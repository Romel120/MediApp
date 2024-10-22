"use client";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Doctor Signup Form Component
const DoctorSignupForm = () => {
    const [doctorSignupData, setDoctorSignupData] = useState({
        fullName: "",
        username: "",
        email: "",
        dob: "",
        phone: "",
        gender: "",
        dr_title: "",  // Added for doctor's title
        onlineFee: "", // Fees fields (if applicable)
        followupFee: "",
        chamberFee: "",
        specialities: [], // For specializations
        password: "",
        confirmPassword: "",
    });

    const specializationsOptions = [
        "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "General Surgeon",
        "Orthopedics", "Allergy & Immunology", "Nephrology", "General Practitioner",
        "Pediatric Surgery", "Psychiatry", "Anesthesiology", "Physical Medicine", "Gastroenterology",
        "Diabetology & Endocrinology", "Rheumatology", "Physiotherapy", "Dentistry", "Hepatology",
        "Medicine", "Ophthalmology (Eye)", "Oncology", "Neuro Medicine", "Food & Nutrition", 
        "ENT", "Pediatrics", "Skin & VD", "Burn & Plastic Surgery", "Hematology", 
        "Neuro Surgery", "Chest Disease", "Gynae & Obs", "Surgery", "Breast Diseases", 
        "Cardiology", "Urology"
    ];

    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [selectedSpecialization, setSelectedSpecialization] = useState(""); // State for selected specialization

    const handleDoctorSignupChange = (e) => {
        const { name, value } = e.target;
        setDoctorSignupData({ ...doctorSignupData, [name]: value });
    };

    // Add a specialization
    const addSpecialization = () => {
        if (selectedSpecialization && !doctorSignupData.specialities.includes(selectedSpecialization)) {
            setDoctorSignupData({
                ...doctorSignupData,
                specialities: [...doctorSignupData.specialities, selectedSpecialization],
            });
            setSelectedSpecialization(""); // Reset selected specialization after adding
        }
    };

    // Remove a specialization
    const removeSpecialization = (spec) => {
        setDoctorSignupData({
            ...doctorSignupData,
            specialities: doctorSignupData.specialities.filter((s) => s !== spec),
        });
    };

    const handleDoctorSignupSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (doctorSignupData.password !== doctorSignupData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api2/doctors/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(doctorSignupData),
            });

            if (response.ok) {
                toast.success("Doctor account created successfully");
                setDoctorSignupData({
                    fullName: "",
                    username: "",
                    email: "",
                    dob: "",
                    phone: "",
                    gender: "",
                    dr_title: "", 
                    onlineFee: "",
                    followupFee: "",
                    chamberFee: "",
                    specialities: [],
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
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg mt-24 mb-10 transition-transform duration-300 hover:shadow-xl">
                <h1 className="text-3xl font-bold text-primary mb-6">Sign up as Doctor</h1>
                <p className="text-gray-600 mb-4">Enter your details to create your account.</p>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

                <form onSubmit={handleDoctorSignupSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Doctor's Title */}
                        <div>
                            <label htmlFor="dr_title" className="block text-text font-medium">Doctor&apos;s Title</label>
                            <input
                                type="text"
                                id="dr_title"
                                name="dr_title"
                                value={doctorSignupData.dr_title}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Enter your title (e.g., Dr., Prof.)"
                                required
                            />
                        </div>
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-text font-medium">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={doctorSignupData.fullName}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-text font-medium">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={doctorSignupData.username}
                                onChange={handleDoctorSignupChange}
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
                                value={doctorSignupData.email}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Enter your email"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-text font-medium">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={doctorSignupData.phone}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-text font-medium">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={doctorSignupData.gender}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        

                        {/* Online Fee */}
                        <div>
                            <label htmlFor="onlineFee" className="block text-text font-medium">Online Fee</label>
                            <input
                                type="number"
                                id="onlineFee"
                                name="onlineFee"
                                value={doctorSignupData.onlineFee}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Enter your online consultation fee"
                                required
                            />
                        </div>

                        {/* Follow-Up Fee */}
                        <div>
                            <label htmlFor="followupFee" className="block text-text font-medium">Follow-Up Fee</label>
                            <input
                                type="number"
                                id="followupFee"
                                name="followupFee"
                                value={doctorSignupData.followupFee}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Enter your follow-up consultation fee"
                                required
                            />
                        </div>

                        {/* Chamber Fee */}
                        <div>
                            <label htmlFor="chamberFee" className="block text-text font-medium">Chamber Fee</label>
                            <input
                                type="number"
                                id="chamberFee"
                                name="chamberFee"
                                value={doctorSignupData.chamberFee}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Enter your chamber consultation fee"
                                required
                            />
                        </div>


                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-text font-medium">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={doctorSignupData.password}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-text font-medium">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={doctorSignupData.confirmPassword}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Re-enter your password"
                                required
                            />
                        </div>

                        {/* Specializations */}
                        <div className="col-span-2">
                            <label className="block text-text font-medium">Specializations</label>
                            <div className="flex flex-wrap gap-2">
                                {doctorSignupData.specialities.map((spec, index) => (
                                    <span key={index} className="bg-primary text-white py-1 px-2 rounded">
                                        {spec} 
                                        <button
                                            type="button"
                                            onClick={() => removeSpecialization(spec)}
                                            className="ml-2 text-xs text-gray-300 hover:text-white"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2 mt-2">
                                <select
                                    value={selectedSpecialization}
                                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                >
                                    <option value="">Select Specialization</option>
                                    {specializationsOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={addSpecialization}
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition duration-200"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <Link href="/choice/doctorLogin" className="text-primary hover:underline">Login here</Link>.
                </p>
            </div>
        </div>
    );
};

export default DoctorSignupForm;
