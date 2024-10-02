"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [error, setError] = useState(null);

    // States for editable fields
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("");
    const [experience, setExperience] = useState("");
    const [consultation, setConsultation] = useState(""); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api2/doctors/profile"); // Adjust based on the user type
                if (!response.ok) throw new Error('Failed to fetch profile data');
                const data = await response.json();
                setDoctorData(data);
                setBio(data.bio || ""); 
                setExperience(data.experience || ""); 
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        const updatedProfile = {
            bio,
            experience,
            consultation,
        };
    
        try {
            const response = await fetch('/api2/doctors/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            const data = await response.json();
            console.log("Profile updated successfully:", data);
    
            // Optionally, update doctorData with the new values
            setDoctorData(prevState => ({
                ...prevState,
                bio,
                experience,
                consultation,
            }));
    
            setIsEditing(false);  // Turn off editing mode after successful save
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    if (error) return <div className="mt-24">{error}</div>;
    if (!doctorData) return <div className="mt-24">Loading...</div>;


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-28">
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

             {/* Editable Button */}
             <div className="mb-8 flex justify-end">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md "
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            {/* About Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
                {isEditing ? (
                    <textarea
                        className="w-1/2 p-2 border border-gray-300 rounded-md"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                ) : (
                    <p className="text-gray-600">
                        {bio || "This doctor hasn't provided a bio yet."}
                    </p>
                )}
            </div>

             {/* Specialization Section */}
             <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                    {doctorData.specialization && doctorData.specialization.length > 0 ? (
                        doctorData.specialization.map((specialty, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                            >
                                {specialty}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-600">No specialization provided.</span>
                    )}
                </div>
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
                {isEditing ? (
                    <textarea
                        className="w-1/2 p-2 border border-gray-300 rounded-md"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                ) : (
                    <p className="text-gray-600">
                        {experience || "No experience provided."}
                    </p>
                )}
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
                {isEditing ? (
                    <textarea
                        className="w-1/2 p-2 border border-gray-300 rounded-md"
                        value={consultation}
                        onChange={(e) => setConsultation(e.target.value)}
                    />
                ) : (
                    <p className="text-gray-600">
                        {consultation || "No experience provided."}
                    </p>
                )}
            </div>

            {/* Ratings/Reviews Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ratings & Reviews</h2>
                {/* Placeholder for future rating system */}
                <p className="text-gray-600">No ratings or reviews available yet.</p>
            </div>
             {/* Save Changes Button */}
             {isEditing && (
                <div className="mt-4">
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
