"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UploadImage from "@/app/components/UploadImage";

const DoctorInfo = ({ doctorData, isEditing }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch("/api2/uploads");
        if (!response.ok) throw new Error("Failed to fetch profile image");
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfilePicture(imageUrl);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleImageUploadSuccess = (newImage) => {
    setProfilePicture(`/uploads/doctor/${newImage}`);
  };

  return (
    <div className="flex flex-col items-center space-y-8 mb-4 md:flex-row md:space-x-8 md:space-y-0 p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Image Section */}
      <div className="flex-shrink-0 relative w-40 h-40">
        <Image
          src={doctorData.profilePicture || "/assets/docProfile.png"}
          alt="Profile"
          width={160}
          height={160}
          className="w-full h-full rounded-full object-cover border-4 border-primary shadow-md"
        />
      </div>

      {/* Doctor Info Section */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {doctorData.dr_title} {doctorData.fullName}
        </h1>
        <p className="text-xl font-medium text-gray-600 mb-1">{doctorData.specialty}</p>
        <p className="text-lg text-gray-500">{doctorData.location || "Location not available"}</p>
      </div>

      {/* Upload Image Button (Shown when editing) */}
      {isEditing && (
        <div className="mt-4 md:mt-0">
          <UploadImage userType="doctor" onUploadSuccess={handleImageUploadSuccess} isEditing={isEditing} />
        </div>
      )}
    </div>
  );
};

export default DoctorInfo;
