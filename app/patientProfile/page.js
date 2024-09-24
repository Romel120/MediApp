"use client";
import { useEffect, useState } from "react";

const PatientProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api2/patients/profile"); // Adjusted for patient profile
                if (!response.ok) throw new Error('Failed to fetch profile data');
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    if (error) return <div className="mt-28 text-2xl">{error}</div>;
    if (!userData) return <div  className="mt-28 text-2xl">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-28">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">{userData.fullName}&apos;s Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Personal Information</h2>
                <p><span className="font-semibold">Full Name:</span> {userData.fullName}</p>
                <p><span className="font-semibold">Username:</span> {userData.username}</p>
                <p><span className="font-semibold">Email:</span> {userData.email}</p>
                <p><span className="font-semibold">Date of Birth:</span> {new Date(userData.dob).toLocaleDateString()}</p>
                <p><span className="font-semibold">Phone:</span> {userData.phone}</p>
                <p><span className="font-semibold">Gender:</span> {userData.gender}</p>
                <p><span className="font-semibold">Age:</span> {userData.age}</p>
                <p><span className="font-semibold">Nationality:</span> {userData.nationality}</p>
            </div>

            {/* Verification Status */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Account Status</h2>
                <p>
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${userData.isVerified ? 'bg-green-500' : 'bg-red-500'}`}>
                        {userData.isVerified ? 'Verified' : 'Not Verified'}
                    </span>
                </p>
            </div>
        </div>
    </div>
    );
};

export default PatientProfilePage;
