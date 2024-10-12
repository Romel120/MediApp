import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300 ease-in-out">
      {/* Header section with Doctor Name and Image */}
      <div className="flex items-center p-4 bg-primary text-white">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4 overflow-hidden">
          <Image
            src={doctor.profileImage || "/assets/docProfile.png"} // Provide a default image if none exists
            alt="Doctor"width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{doctor.fullName}</h2>
          <p className="text-sm italic">{doctor.specialities.join(", ")}</p>
        </div>
      </div>

      {/* Body section with more details */}
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">Specialities: </span>
            {doctor.specialities.join(", ")}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">Location: </span>
            {doctor.location || "Not specified"}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">Experience: </span>
            {doctor.experience || "N/A"}
          </p>
        </div>

        {/* View Profile Button */}
        <div className="text-center">
        <Link href={`/doctors/${doctor._id}`} passHref>
          <button className="w-full px-4 py-2 bg-secondary text-white font-semibold rounded-md hover:bg-secondary-dark shadow-md transition duration-300">
            View Profile
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
