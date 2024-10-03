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
        medicalLicense: "",
        specialization: [],
        idType: "",
        gender: "",
        age: "",
        password: "",
        confirmPassword: "",
    });

    const specializationsOptions = [
        "Cardiologist",
        "Dermatologist",
        "Neurologist",
        "Pediatrician",
        "General Surgeon", "Orthopedics", "Allergy & Immunology", "Nephrology", "General Practitioner",
        "Pediatric Surgery", "Psychiatry", "Anesthesiology", "Physical Medicine",
        "Gastroenterology", "Diabetology & Endocrinology", "Rheumatology", "Physiotherapy",
        "Dentistry", "Hepatology", "Medicine", "Ophthalmology (Eye)", "Oncology",
        "Neuro Medicine", "Food & Nutrition", "ENT", "Pediatrics", "Skin & VD",
        "Burn & Plastic Surgery", "Hematology", "Neuro Surgery", "Chest Disease",
        "Gynae & Obs", "Surgery", "Breast Diseases", "Cardiology", "Urology"
    ];

    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const handleDoctorSignupChange = (e) => {
        const { name, value } = e.target;
        setDoctorSignupData({ ...doctorSignupData, [name]: value });
    };

    // Add a specialization
    const addSpecialization = (spec) => {
        if (!doctorSignupData.specialization.includes(spec)) {
            setDoctorSignupData({
                ...doctorSignupData,
                specialization: [...doctorSignupData.specialization, spec],
            });
        }
    };

    // Remove a specialization
    const removeSpecialization = (spec) => {
        setDoctorSignupData({
            ...doctorSignupData,
            specialization: doctorSignupData.specialization.filter((s) => s !== spec),
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
            const response = await fetch("/api2/doctors/signup", { // Updated the endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(doctorSignupData), // Send the signup data directly
            });

            if (response.ok) {
                toast.success("Doctor account created successfully");
                setDoctorSignupData({
                    fullName: "",
                    username: "",
                    email: "",
                    dob: "",
                    phone: "",
                    medicalLicense: "",
                    specialization: [],
                    idType: "",
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
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg mt-24 transition-transform duration-300 hover:shadow-xl">
                <h1 className="text-3xl font-bold text-primary mb-6">Sign up as Doctor</h1>
                <p className="text-gray-600 mb-4">Enter your details to create your account.</p>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

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
                                value={doctorSignupData.phone}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="+123 456 789"
                                required
                            />
                        </div>

                        {/* Medical License */}
                        <div>
                            <label htmlFor="medicalLicense" className="block text-text font-medium">Medical License No.</label>
                            <input
                                type="text"
                                id="medicalLicense"
                                name="medicalLicense"
                                value={doctorSignupData.medicalLicense}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                placeholder="Enter your license number"
                                required
                            />
                        </div>

                        {/* Specialization Button */}
                        <div>
                            <label className="block text-text font-medium mb-2">Specialization</label>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 bg-primary text-white rounded-md transition-colors duration-200 hover:bg-secondary"
                            >
                                Choose Specialization
                            </button>

                            {/* Display Selected Specializations */}
                            <div className="flex flex-wrap items-center mt-4">
                                {doctorSignupData.specialization.map((spec, index) => (
                                    <div key={index} className="flex items-center bg-gray-200 rounded-full px-4 py-2 m-1">
                                        <span>{spec}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSpecialization(spec)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* ID Type */}
                        <div>
                            <label htmlFor="idType" className="block text-text font-medium">ID Type</label>
                            <select
                                id="idType"
                                name="idType"
                                value={doctorSignupData.idType}
                                onChange={handleDoctorSignupChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 hover:bg-gray-50"
                                required
                            >
                                <option value="">Select ID Type</option>
                                <option value="Passport">Passport</option>
                                <option value="Driver's License">Driver&apos;s License</option>
                                <option value="National ID">National ID</option>
                            </select>
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
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Age */}
                        <div>
                            <label htmlFor="age" className="block text-text font-medium">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={doctorSignupData.age}
                                onChange={handleDoctorSignupChange}
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
                                value={doctorSignupData.password}
                                onChange={handleDoctorSignupChange}
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
                                value={doctorSignupData.confirmPassword}
                                onChange={handleDoctorSignupChange}
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
                    <Link href="/choice/doctorLogin" className="text-primary hover:underline">Login here</Link>
                </p>
            </div>
            {/* Specialization Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 mr-2 px-4 py-2 bg-red-600 text-white rounded-md transition-colors duration-200 hover:bg-red-950"
                        >
                            ✗
                        </button>
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full h-96 overflow-y-scroll">
                    
                        <h2 className="text-2xl font-bold mb-4">Select Specializations</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {specializationsOptions.map((spec, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`specialization-${index}`}
                                        checked={doctorSignupData.specialization.includes(spec)}
                                        onChange={() =>
                                            doctorSignupData.specialization.includes(spec)
                                                ? removeSpecialization(spec)
                                                : addSpecialization(spec)
                                        }
                                    />
                                    <label
                                        htmlFor={`specialization-${index}`}
                                        className="ml-2 text-text font-medium"
                                    >
                                        {spec}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded-md transition-colors duration-200 hover:bg-secondary"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default DoctorSignupForm;
