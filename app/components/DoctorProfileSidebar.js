// components/DoctorProfileSidebar.js

"use client";

import React from 'react';
import Link from 'next/link';

const DoctorProfileSidebar = () => {
    return (
        <div className="w-64 bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2">
                <li>
                    <Link href="/doctor/dashboard" className="block p-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/doctor/appointments" className="block p-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded">
                        Appointments
                    </Link>
                </li>
                <li>
                    <Link href="/doctor/profile" className="block p-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded">
                        Profile Settings
                    </Link>
                </li>
                <li>
                    <Link href="/doctor/consultations" className="block p-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded">
                       Consultations
                    </Link>
                </li>
                <li>
                    <Link href="/logout" className="block p-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded">
                        logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default DoctorProfileSidebar;
