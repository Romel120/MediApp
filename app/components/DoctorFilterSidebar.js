"use client"
import { useState, useEffect } from "react";

const DoctorFilterSidebar = ({ specializations, locations, onFilterChange }) => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [uniqueSpecializations, setUniqueSpecializations] = useState([]);

  useEffect(() => {
    // Ensure we show only unique specializations
    const uniqueSpecs = [...new Set(specializations.flat())];
    setUniqueSpecializations(uniqueSpecs);
  }, [specializations]);

  const handleFilter = () => {
    onFilterChange({ specialization: selectedSpecialization, location: selectedLocation });
  };

  return (
    <div className="w-full md:w-64 bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Filters</h2>

      {/* Specialization Filter */}
      <div className="mb-6">
        <label className="block text-text font-medium">Specialization</label>
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="w-full border-gray-300 p-2 mt-1 rounded-md"
        >
          <option value="">All Specializations</option>
          {uniqueSpecializations.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-text font-medium">Location</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full border-gray-300 p-2 mt-1 rounded-md"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
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
