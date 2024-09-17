import React from 'react';

export default function FindDoctor() {
    return (
        <div className="min-h-screen bg-background flex mt-20">
            {/* Sidebar */}
            <div className="w-64 bg-primary text-white p-4">
                <div className="mb-4">
                    <label htmlFor="doctor" className="block mb-2">Select</label>
                    <select id="doctor" className="w-full p-2 rounded bg-white text-black">
                        <option value="doctor">Doctor</option>
                        {/* Add other options as needed */}
                    </select>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search doctors..."
                        className="w-full p-2 rounded bg-white text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="gender" className="block mb-2">Gender</label>
                    <select id="gender" className="w-full p-2 rounded bg-white text-black">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        {/* Add other options as needed */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="specialties" className="block mb-2">Specialties</label>
                    <select id="specialties" className="w-full p-2 rounded bg-white text-black">
                        <option value="">Select Specialties</option>
                        {/* Add other specialties */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="countries" className="block mb-2">Countries</label>
                    <select id="countries" className="w-full p-2 rounded bg-white text-black">
                        <option value="">Select Country</option>
                        {/* Add country options */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="cities" className="block mb-2">Cities</label>
                    <select id="cities" className="w-full p-2 rounded bg-white text-black">
                        <option value="">Select City</option>
                        {/* Add city options */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="distance" className="block mb-2">Distance</label>
                    <select id="distance" className="w-full p-2 rounded bg-white text-black">
                        <option value="">Select Distance</option>
                        {/* Add distance options */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="consultation-type" className="block mb-2">Consultation Type</label>
                    <select id="consultation-type" className="w-full p-2 rounded bg-white text-black">
                        <option value="">Select Type</option>
                        {/* Add consultation types */}
                    </select>
                </div>
                <button className="w-full bg-accent p-2 rounded">Search</button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
                <h1 className="text-4xl font-bold text-primary">Find Doctor</h1>
                <p className="mt-4 text-text">Search and explore specialists based on your needs.</p>

                {/* Add doctor contents here */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-primary">Doctors List</h2>
                    {/* Placeholder content */}
                    <div className="mt-4">
                        {/* Add doctor cards or list items here */}
                        <p className="text-text">No doctors found. Please refine your search.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
