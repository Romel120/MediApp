"use client";
import Image from 'next/image';
import { useState } from 'react';

const UploadImage = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(''); // Clear any previous errors
    }
  };

  // Upload image to backend (Cloudinary)
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userType', 'doctor');  // Set userType, e.g., doctor

      const res = await fetch('/api2/uploads', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onUploadSuccess(data.fileName);  // Call success callback with the file URL
        setError('');
        setFile(null); // Reset file after upload success
      } else {
        setError(data.error || 'File upload failed');
      }
    } catch (error) {
      setError('An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  // Handle canceling the file selection
  const handleCancel = () => {
    setFile(null); // Reset the selected file
    setError(''); // Clear any errors
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Profile Picture</h2>
      
      {/* Preview the selected image */}
      {file && (
        <div className="mb-4">
          <Image
            src={URL.createObjectURL(file)}
            alt="Selected Preview" width={200} height={200}
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex space-x-4">
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-4 py-2 font-semibold text-white rounded-lg transition duration-200 ${
            uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
      
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default UploadImage;
