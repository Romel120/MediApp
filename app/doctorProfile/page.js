"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import DoctorProfileSidebar from "@/app/components/DoctorProfileSidebar";


// Example Loader component (You can style this as per your design)
const Loader = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      <style jsx>{`
        .loader {
          border-top-color: #3498db; /* Customize loader color */
          animation: spin 1s linear infinite;
        }
  
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );

  // Time Picker Component
const TimePicker = ({ label, time, setTime }) => (
    <div className="flex flex-col">
      <label className="text-gray-800">{label}</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mt-1"
      />
    </div>
  );


  const ProfilePage = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [error, setError] = useState(null);
  
    // States for editable fields
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("");
    const [experience, setExperience] = useState("");
    const [BMDCNumber, setBMDCNumber] = useState("");
    const [onlineFee, setOnlineFee] = useState("");
    const [followupFee, setFollowupFee] = useState("");
    const [chamberFee, setChamberFee] = useState("");
    const [consultationStart, setConsultationStart] = useState("");
    const [consultationEnd, setConsultationEnd] = useState("");
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch("/api2/doctors/profile"); 
          if (!response.ok) throw new Error("Failed to fetch profile data");
          const data = await response.json();
          setDoctorData(data);
          setBio(data.bio || "");
          setExperience(data.experience || "");
          setBMDCNumber(data.BMDCNumber || "");
          setOnlineFee(data.onlineFee || "");
          setFollowupFee(data.followupFee || "");
          setChamberFee(data.chamberFee || "");
          setConsultationStart(data.consultationStart || "");
          setConsultationEnd(data.consultationEnd || "");
          setIsLoading(false);
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
        BMDCNumber,
        onlineFee,
        followupFee,
        chamberFee,
        consultationStart,
        consultationEnd,
      };
  
      try {
        const response = await fetch("/api2/doctors/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
  
        const data = await response.json();
        console.log("Profile updated successfully:", data);
  
        // Optionally, update doctorData with the new values
        setDoctorData((prevState) => ({
          ...prevState,
          bio,
          experience,
          BMDCNumber,
          onlineFee,
          followupFee,
          chamberFee,
          consultationStart,
          consultationEnd,
        }));
  
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    };
  
    if (error) return <div className="mt-24">{error}</div>;
    if (!doctorData) return <div className="mt-24"><Loader/></div>;


    return (
        <div className="flex max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-28">
            {/* Sidebar */}
            <DoctorProfileSidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
            {/* Header Section */}
            <div className="flex items-center space-x-6 mb-8">
                <Image 
                    src="/assets/docProfile.png"
                    width={500}m height={500}
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

                    {/* BMDC Number */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">BMDC Number</h2>
          {isEditing ? (
            <input
              className="w-1/2 p-2 border border-gray-300 rounded-md"
              value={BMDCNumber}
              onChange={(e) => setBMDCNumber(e.target.value)}
            />
          ) : (
            <p className="text-gray-600">{BMDCNumber || "No BMDC number provided."}</p>
          )}
        </div>


        {/* Online Fee */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Online Consultation Fee</h2>
          {isEditing ? (
            <input
              type="number"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
              value={onlineFee}
              onChange={(e) => setOnlineFee(e.target.value)}
            />
          ) : (
            <p className="text-gray-600">{onlineFee || "No online consultation fee provided."}</p>
          )}
        </div>

        {/* Followup Fee */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow-up Consultation Fee</h2>
          {isEditing ? (
            <input
              type="number"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
              value={followupFee}
              onChange={(e) => setFollowupFee(e.target.value)}
            />
          ) : (
            <p className="text-gray-600">{followupFee || "No follow-up consultation fee provided."}</p>
          )}
        </div>

        {/* Chamber Fee */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chamber Consultation Fee</h2>
          {isEditing ? (
            <input
              type="number"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
              value={chamberFee}
              onChange={(e) => setChamberFee(e.target.value)}
            />
          ) : (
            <p className="text-gray-600">{chamberFee || "No chamber consultation fee provided."}</p>
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
            <div className="flex space-x-4">
              <TimePicker label="From" time={consultationStart} setTime={setConsultationStart} />
              <TimePicker label="To" time={consultationEnd} setTime={setConsultationEnd} />
            </div>
          ) : (
            <p className="text-gray-600">
              {consultationStart && consultationEnd
                ? `From ${consultationStart} to ${consultationEnd}`
                : "No consultation hours provided."}
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
        </div>
    );
};

export default ProfilePage;
