"use client";
import { useState, useEffect } from "react";

const DoctorFilterSidebar = ({ specialities, onFilterChange }) => {
  const [selectedSpecialities, setSelectedSpecialities] = useState("");
  const [doctorName, setDoctorName] = useState(""); // State for doctor name search
  const [sortOrder, setSortOrder] = useState(""); // New state for sorting order
  const [uniqueSpecialities, setUniqueSpecialities] = useState([]);

  useEffect(() => {
    // Ensure we show only unique Specialities
    const uniqueSpecs = [...new Set(specialities.flat())];
    setUniqueSpecialities(uniqueSpecs);
  }, [specialities]);

  const handleFilter = () => {
    onFilterChange({
      specialities: selectedSpecialities,
      doctorName, // Pass the doctor name to the filter handler
      sortOrder,  // Pass the sort order to the filter handler
    });
  };

  return (
    <div className="w-full md:w-64 bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Filters</h2>

      {/* Search by Doctor Name */}
      <div className="mb-6">
        <label className="block text-text font-medium">Search Doctor</label>
        <input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          placeholder="Enter doctor's name"
          className="w-full border-gray-300 border-2 p-2 mt-1 rounded-md"
        />
      </div>

      {/* Specialization Filter */}
      <div className="mb-6">
        <label className="block text-text font-medium">Specialization</label>
        <select
          value={selectedSpecialities}
          onChange={(e) => setSelectedSpecialities(e.target.value)}
          className="w-full border-gray-300 p-2 mt-1 rounded-md"
        >
          <option value="">All Specialities</option>
          {uniqueSpecialities.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by Date */}
      <div className="mb-6">
        <label className="block text-text font-medium">Sort by Date</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border-gray-300 p-2 mt-1 rounded-md"
        >
          <option value="">None</option>
          <option value="asc">Ascending (Oldest First)</option>
          <option value="desc">Descending (Newest First)</option>
        </select>
      </div>

      {/* Filter Button */}
      <button
        onClick={handleFilter}
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default DoctorFilterSidebar;
