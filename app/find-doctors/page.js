"use client";

import { useState, useEffect } from "react";
import DoctorCard from "@/app/components/DoctorCard";
import DoctorFilterSidebar from "@/app/components/DoctorFilterSidebar";

export default function FindDoctors() {
  const [doctors, setDoctors] = useState([]); // All doctors from the API
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Doctors after filtering
  const [specialities, setSpecialities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // New state for sorting order
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

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

  useEffect(() => {
    // Fetch doctors from the API
    const fetchDoctors = async () => {
      const response = await fetch("/api2/doctors/finddoctor"); // Fetch all doctors from your API
      const data = await response.json();
      setDoctors(data.doctors); // Set all doctors
      setFilteredDoctors(data.doctors); // Initially show all doctors

      // Extract unique Specialities and locations
      const uniqueSpecialities = [
        ...new Set(data.doctors.map((doc) => doc.specialities)),
      ];
      const uniqueLocations = [
        ...new Set(data.doctors.map((doc) => doc.location)),
      ];
      setSpecialities(uniqueSpecialities);
      setLocations(uniqueLocations);
      setIsLoading(false);
    };

    fetchDoctors();
  }, []);

  // Handle filtering logic
  const handleFilterChange = ({ specialities, location, doctorName, sortOrder }) => {
    const filtered = doctors.filter((doc) => {
      const matchesSpecialities =
        !specialities ||
        (Array.isArray(doc.specialities)
          ? doc.specialities.includes(specialities)
          : doc.specialities === specialities);

      const matchesLocation = !location || doc.location === location;

      const matchesDoctorName =
        !doctorName || doc.fullName.toLowerCase().includes(doctorName.toLowerCase());

      return matchesSpecialities && matchesLocation && matchesDoctorName;
    });

    // Sort the filtered results based on updatedAt
    if (sortOrder) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA; // Ascending or descending
      });
    }

    setFilteredDoctors(filtered); // Update the displayed doctors based on the filter
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background flex mt-20">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <DoctorFilterSidebar
          specialities={specialities}
          locations={locations}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Doctor Cards */}
      <div className="w-full md:w-3/4 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="text-center col-span-3">No doctors found.</p>
        )}
      </div>
    </div>
  );
}
