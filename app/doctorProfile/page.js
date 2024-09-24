"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api2/doctors/profile"); // Adjust based on the user type
                if (!response.ok) throw new Error('Failed to fetch profile data');
                const data = await response.json();
                setDoctorData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    if (error) return <div className="mt-24">{error}</div>;
    if (!doctorData) return <div className="mt-24">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-28">
            {/* Header Section */}
            <div className="flex items-center space-x-6 mb-8">
                <Image 
                    src=""
                    alt="Doctor's Avatar"
                    className="w-32 h-32 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">{doctorData.fullName}</h1>
                    <p className="text-xl text-gray-500">{doctorData.specialty}</p>
                    <p className="text-gray-400">{doctorData.location || "Location not available"}</p>
                </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
                <p className="text-gray-600">
                    {doctorData.bio || "This doctor hasn't provided a bio yet."}
                </p>
            </div>

             {/* Specialization Section */}
             <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Specialization</h2>
                <p className="text-gray-600">
                    {doctorData.specialization || "No specialization provided."}
                </p>
            </div>

            {/* Specialties Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Specialties</h2>
                <ul className="list-disc list-inside">
                    {doctorData.specialties && doctorData.specialties.length > 0 ? (
                        doctorData.specialties.map((specialty, index) => (
                            <li key={index} className="text-gray-600">{specialty}</li>
                        ))
                    ) : (
                        <li className="text-gray-600">No specialties provided.</li>
                    )}
                </ul>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Experience</h2>
                <p className="text-gray-600">{doctorData.experience || "No experience provided."}</p>
            </div>

            {/* Contact Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-600">
                    <strong>Email:</strong> {doctorData.email}
                </p>
                <p className="text-gray-600">
                    <strong>Phone:</strong> {doctorData.phone || "Phone number not available"}
                </p>
            </div>

            {/* Consultation Hours Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consultation Hours</h2>
                <p className="text-gray-600">{doctorData.hours || "Consultation hours not provided."}</p>
            </div>

            {/* Ratings/Reviews Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ratings & Reviews</h2>
                {/* Placeholder for future rating system */}
                <p className="text-gray-600">No ratings or reviews available yet.</p>
            </div>
        </div>
    );
};

export default ProfilePage;
