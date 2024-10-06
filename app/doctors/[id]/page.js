"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function DoctorPublicProfile() {
    const { id } = useParams(); // Get the doctor ID directly from the URL
    const [doctor, setDoctor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchDoctorProfile = async () => {
                try {
                    console.log("Fetching doctor profile for ID:", id);
                    const response = await fetch(`/api2/doctors/view?id=${id}`);
                    const data = await response.json();
                    console.log("API response:", data);

                    if (response.ok) {
                        setDoctor(data);
                        console.log("Doctor data set:", data); // Add this line
                    } else {
                        console.error("Failed to fetch doctor profile");
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching doctor profile:", error);
                    setIsLoading(false);
                }
            };

            fetchDoctorProfile();
        }
    }, [id]);

    console.log("doctor: ", doctor);


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-700">Loading...</p>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-700">No doctor found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden mt-24">
                <div className="flex items-center p-6 border-b">
                    <Image
                        src="/assets/docProfile.png" // Add a placeholder image path
                        alt={`${doctor.doctor.fullName}'s Avatar`}
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                    <div className="ml-4">
                        <h2 className="text-3xl font-bold text-gray-800">{doctor.doctor.username}</h2>
                        <p className="text-md text-gray-600">
                            {doctor.doctor.specialization && doctor.doctor.specialization.length > 0
                                ? `Specializations: ${doctor.doctor.specialization.join(', ')}`
                                : 'Specialization not available'}
                        </p>
                        <p className="text-md text-gray-600">
                            {doctor.doctor.location || 'Location not specified'}
                        </p>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Details</h3>

                    {/* Experience might be missing, so handle this case */}
                    <p className="text-md text-gray-700">
                        <strong>Experience:</strong> {doctor.doctor.experience || 'Experience not available'} years
                    </p>

                    {/* Handle bio being undefined */}
                    <p className="text-md text-gray-700">
                        <strong>Bio:</strong> {doctor.doctor.bio || 'No bio available'}
                    </p>
                </div>

                <div className="flex justify-between p-6 border-t">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                        Book Appointment
                    </button>
                    <button className="border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200">
                        View Reviews
                    </button>
                </div>
            </div>
        </div>
    );
}
