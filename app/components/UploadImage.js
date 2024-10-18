"use client";
import { useState } from "react";

const UploadImage = ({ userType, onUploadSuccess, isEditing }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userType", userType);

    try {
      const response = await fetch("/api2/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        onUploadSuccess(data.fileName);
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during file upload.");
    }
  };

  return (
    isEditing && (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark transition duration-200 ease-in-out"
        />
        <button
          type="submit"
          className="bg-primary text-white py-2 px-6 rounded-full shadow-md hover:bg-primary-dark transition duration-200 ease-in-out"
        >
          Upload
        </button>
      </form>
    )
  );
};

export default UploadImage;
