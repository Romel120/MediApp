import Image from 'next/image';
import React from 'react'

const DoctorInfo = ({ doctorData }) => (
    <div className="flex items-center space-x-6 mb-8">
      <Image
        src="/assets/docProfile.png"
        width={500} height={500}
        alt="Doctor's Avatar"
        className="w-32 h-32 rounded-full object-cover"
      />
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">{doctorData.dr_title}{doctorData.fullName}</h1>
        <p className="text-xl text-gray-500">{doctorData.specialty}</p>
        <p className="text-gray-400">{doctorData.location || "Location not available"}</p>
      </div>
    </div>
  );
  export default DoctorInfo;
