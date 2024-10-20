"use client";
import { useState, useEffect } from 'react';
import UploadImage from './UploadImage';
import Image from 'next/image';

const DoctorInfo = ({ doctorData, isEditing }) => {
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctor's profile picture on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api2/uploads', {
          method: 'GET',
        });

        const data = await res.json();
        if (res.ok) {
          setProfilePicture(data.profilePicture);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle successful image upload (Update profile picture)
  const handleImageUploadSuccess = (imageUrl) => {
    setProfilePicture(imageUrl); // Update profile picture with new uploaded image
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white shadow-lg rounded-lg mb-4">
      {/* Profile Image Section */}
      <div className="flex-shrink-0 relative w-40 h-40">
        {profilePicture ? (
          <Image
            src={profilePicture}
            alt="Profile Picture"
            width={200}
            height={200}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
            <p>No profile picture available.</p>
          </div>
        )}
      </div>

      {/* Doctor Info Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {doctorData.dr_title} {doctorData.fullName}
        </h1>
        <p className="text-xl font-medium text-gray-600">{doctorData.specialty}</p>
        <p className="text-lg text-gray-500">
          {doctorData.location || "Location not available"}
        </p>
      </div>

      {/* Upload Image Button (Controlled by isEditing from parent) */}
      {isEditing && (
        <div className="mt-4">
          <UploadImage onUploadSuccess={handleImageUploadSuccess} userType="doctor" />
        </div>
      )}
    </div>
  );
};

export default DoctorInfo;
