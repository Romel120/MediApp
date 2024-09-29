const DoctorCard = ({ doctor }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-80">
        <h2 className="text-xl font-bold text-primary">{doctor.fullName}</h2>
        <p className="text-gray-600 mt-2">Specialization: {doctor.specialization}</p>
        <p className="text-gray-600 mt-2">Location: {doctor.location || "Not specified"}</p>
        <p className="text-gray-600 mt-2">Experience: {doctor.experience || "N/A"} years</p>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary">
          View Profile
        </button>
      </div>
    );
  };
  
  export default DoctorCard;
  