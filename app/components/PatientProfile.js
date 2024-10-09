
"use client"
import { useState , useEffect} from "react";
import Image from "next/image";

const PatientProfile = () => {
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
    if (!userData) return <div className="mt-28 text-2xl">Loading...</div>;
    return (
        <div className="w-3/4 p-10 bg-gray-100 rounded-r-lg">
        {/* Header with Profile Image */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">{userData.fullName || "Name not provided"}</h1>
                <p className="text-lg text-gray-600">Patient Profile</p>
            </div>
            <div className="relative">
                <div className="w-28 h-28 rounded-full bg-teal-200 flex items-center justify-center shadow-md">
                    <Image
                        src={userData.gender === 'male'
                            ? "/assets/userProfile.jpg"
                            : "/assets/userProfileGirl.jpg" }
                        alt="Profile"
                        className="w-24 h-24 rounded-full"
                        width={100}
                        height={100}
                    />
                </div>
                <button className="absolute bottom-0 right-0 bg-gray-300 p-2 rounded-full shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>

        {/* Personal Information */}
        <div className="mt-10">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <p className="mb-4"><span className="font-semibold">Gender:</span> {userData.gender || "(not provided)"}</p>
                    <p className="mb-4"><span className="font-semibold">Age:</span> {userData.age || "(not provided)"}</p>
                    <p className="mb-4"><span className="font-semibold">Date of Birth:</span> {new Date(userData.dob).toLocaleDateString() || "(not provided)"}</p>
                    <p className="mb-4"><span className="font-semibold">City:</span> {userData.city || "(not provided)"}</p>
                    <p className="mb-4"><span className="font-semibold">Mobile Number:</span> {userData.phone || "(not provided)"} <span className="text-green-500">Verified</span></p>
                    <p className="mb-4"><span className="font-semibold">Email:</span> {userData.email || "(not provided)"}</p>
                    <p className="mb-4"><span className="font-semibold">Blood Type:</span> (not provided)</p>
                    <p className="mb-4"><span className="font-semibold">National ID:</span> (not provided)</p>
                </div>
            </div>
        </div>
    </div>
    );
  };
  
  export default PatientProfile;
  

