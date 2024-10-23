import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out p-4 sm:p-6">
      {/* Header section with Doctor Name and Image */}
      <div className="flex flex-col sm:flex-row items-center p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mr-0 sm:mr-4 mb-4 sm:mb-0 overflow-hidden shadow-md">
          <Image
            src={doctor.profilePicture || "/assets/docProfile.png"} // Provide a default image if none exists
            alt="Doctor"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">{doctor.dr_title} {doctor.fullName}</h2>
          <p className="text-sm italic">{doctor.specialities.join(", ")}</p>
        </div>
      </div>

      {/* Body section with more details */}
      <div className="mt-4">
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Age: </span>
          {doctor.age} years
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Bio: </span>
          {doctor.bio}
        </p>

        {/* Show only the first Chamber Detail */}
        <h3 className="font-semibold mt-4">Chamber Details:</h3>
        {doctor.chamberDetails.length > 0 ? (
          <div className="text-gray-700 mb-2">
            <p>
              <span className="font-semibold">{doctor.chamberDetails[0].chamberName}</span>
              <span> - {doctor.chamberDetails[0].address}, {doctor.chamberDetails[0].city}</span>
              <span> (Fee: ${doctor.chamberDetails[0].chamberFee})</span>
            </p>
          </div>
        ) : (
          <p className="text-gray-700">No chamber details available.</p>
        )}

        {/* View Profile Button */}
        <div className="text-center mt-4">
          <Link href={`/doctors/${doctor._id}`} passHref>
            <button className="w-full px-4 py-2 bg-secondary text-white font-semibold rounded-md hover:bg-secondary-dark shadow-md transition duration-300 transform hover:scale-105">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
