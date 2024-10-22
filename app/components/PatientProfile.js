import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const PatientProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');

  const fetchPatientProfile = async () => {
    const token = getCookie('token');

    if (!token) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api2/patients/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch profile');
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api2/patients/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to upload image');

      setUserData((prev) => ({ ...prev, profilePicture: data.fileName }));
      alert(data.message);
      setPreview('');
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchPatientProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">{userData.fullName}&apos;s Profile</h1>

        {userData && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              {/* Profile Image Section */}
              <div className="md:w-1/3">
                <div className="space-y-4">
                  <div className="relative group mx-auto w-40">
                    <Image
                      src={userData.profilePicture || '/assets/userProfile.jpg'}
                      alt="Profile"
                      width={160}
                      height={160}
                      className="rounded-full ring-4 ring-blue-100 shadow-md transition duration-300 group-hover:ring-blue-200 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  {preview && (
                    <div className="text-center space-y-4">
                      <div className="relative w-32 h-32 mx-auto">
                        <Image
                          src={preview}
                          alt="Preview"
                          width={128}
                          height={128}
                          className="rounded-full border-4 border-blue-100"
                        />
                      </div>
                      <button
                        onClick={uploadImage}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                      >
                        Upload New Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Information Section */}
              <div className="md:w-2/3">
                <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-gray-900 mt-1">{userData.fullName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Username</label>
                        <p className="text-gray-900 mt-1">{userData.username}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900 mt-1">{userData.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-gray-900 mt-1">{userData.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                        <p className="text-gray-900 mt-1">{new Date(userData.dob).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Nationality</label>
                        <p className="text-gray-900 mt-1">{userData.nationality}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Gender</label>
                        <p className="text-gray-900 mt-1">{userData.gender}</p>
                      </div>
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div className="mt-6">
                    <label className="text-sm font-medium text-gray-500">Account Status</label>
                    <p className={`mt-2 ${userData.isVerified ? 'text-green-600' : 'text-red-600'} font-bold`}>
                      {userData.isVerified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
