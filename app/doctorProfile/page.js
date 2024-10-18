"use client";
import { useEffect, useState } from "react";
import DoctorProfileSidebar from "@/app/components/DoctorProfileSidebar";
import Qualifications from "../components/Qualifications";
import ProfessionalDetails from "../components/ProfessionalDetails";
import ChamberDetails from "../components/ChamberDetails";
import ConsultationFees from "../components/ConsultationFees";
import ConsultationTimings from "../components/ConsultationTimings";
import DoctorInfo from "../components/DoctorInfo";
import AppointmentCard from "../components/AppointmentCard";

// Example Loader component
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

const ProfilePage = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [error, setError] = useState(null);

  // States for editable fields
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [onlineFee, setOnlineFee] = useState("");
  const [drTitle, setDrTitle] = useState("");
  const [followupFee, setFollowupFee] = useState("");
  const [chamberFee, setChamberFee] = useState("");
  const [consultationStart, setConsultationStart] = useState("");
  const [consultationEnd, setConsultationEnd] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [qualifications, setQualifications] = useState([{ degree: "", institution: "", yearOfCompletion: "", certification: "", specialization: "" }]);
  const [details, setDetails] = useState([{ institute: "", position: "", start_date: "", end_date: "" }]);
  const [chamberDetails, setChamberDetails] = useState([{ chamberName: "", address: "", city: "", chamberFee: "", contact: "", startTime: "", endTime: "" }]);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedSection, setSelectedSection] = useState('profile'); // Default to 'profile' section
  const [status, setStatus] = useState(appointments.status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // Here you can also make an API call to update the status in the database
    // Example: await updateAppointmentStatus(appointment._id, newStatus);
  };
  

  // Render different content based on the selected section
  const renderSection = () => {
    switch (selectedSection) {
      case 'profile':
        return (
          <div>
            <DoctorInfo doctorData={doctorData} 
              isEditing={isEditing}  />
            {/* Specialties */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Specialties</h2>
              {isEditing ? (
                <input
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  value={specialities.join(", ")}
                  onChange={(e) => setSpecialities(e.target.value.split(", "))}
                />
              ) : (
                <p className="text-gray-600">{specialities.length ? specialities.join(", ") : "No specialties listed."}</p>
              )}
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
              {isEditing ? (
                <textarea
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              ) : (
                <p className="text-gray-600">
                  {bio || "This doctor hasn't provided a bio yet."}
                </p>
              )}
            </div>
            <ConsultationTimings
              consultationStart={consultationStart}
              setConsultationStart={setConsultationStart}
              consultationEnd={consultationEnd}
              setConsultationEnd={setConsultationEnd}
              isEditing={isEditing} 
            />
          </div>
        );
      case 'qualifications':
        return (
          <div className="mb-8">
            <div className="p-4">
              <Qualifications
                qualifications={qualifications}
                handleQualificationChange={handleQualificationChange}
                addQualification={addQualification}
                isEditing={isEditing}
              />
            </div>
          </div>
        );
      case 'details':
        return (
          <div>
            {/* Professional Details Section */}
            <div className="mb-8">
              <ProfessionalDetails
                details={details}
                handleDetailChange={handleDetailChange}
                addDetail={addDetail}
                isEditing={isEditing}
              />
            </div>
          </div>
        );
      case 'chamberdetails':
        return (
          <div>
            {/* Chamber Details Section */}
            <div className="mb-8">
              <ChamberDetails
                chamberDetails={chamberDetails}
                handleChamberDetailChange={handleChamberDetailChange}
                addChamberDetail={addChamberDetail}
                isEditing={isEditing}
              />
            </div>
          </div>
        );
        case 'appointments':
          return (
            <div>
              <h2 className="text-2xl font-bold mb-4">Appointments</h2>
              {appointments.length === 0 ? (
                <p>You have no upcoming appointments.</p>
              ) : (
                <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <AppointmentCard 
                appointment={appointment} 
                onUpdateStatus={updateAppointmentStatus} 
              />
            </li>
          ))}
        </ul>

              )}
            </div>
          );
        
      case 'consultations':
        return (
          <div>
            <ConsultationFees
              isEditing={isEditing}
              onlineFee={onlineFee}
              setOnlineFee={setOnlineFee}
              followupFee={followupFee}
              setFollowupFee={setFollowupFee}
              chamberFee={chamberFee}
              setChamberFee={setChamberFee}
            />

            {/* Consultation Timings */}
            <ConsultationTimings
              consultationStart={consultationStart}
              setConsultationStart={setConsultationStart}
              consultationEnd={consultationEnd}
              setConsultationEnd={setConsultationEnd}
            />
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            {/* Add account settings functionality here */}
            <p>Update your account settings.</p>
          </div>
        );
      case 'logout':
        // Handle logout logic here
        return <div>Logging out...</div>;
      default:
        return <div>Unknown section</div>;
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
        try {
            const response = await fetch("/api2/appointments/doctors"); // Ensure this is correct
            if (!response.ok) throw new Error("Failed to fetch appointments");
            const data = await response.json();
            console.log("Fetched appointments:", data); // Log the fetched data
            setAppointments(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    if (selectedSection === 'appointments') {
        fetchAppointments();
    }
}, [selectedSection]);

async function updateAppointmentStatus(appointmentId, newStatus) {
  const response = await fetch(`/api2/appointments/doctors/${appointmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }), // Send the new status in the request body
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error updating appointment:', errorData);
    return;
  }

  const updatedAppointment = await response.json();
  console.log('Updated appointment:', updatedAppointment);
}

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api2/doctors/profile");
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();
        setDoctorData(data);
        setBio(data.bio || "");
        // setExperience(data.experience || "");
        setDrTitle(data.dr_title || "");
        setOnlineFee(data.onlineFee || "");
        setFollowupFee(data.followupFee || "");
        setChamberFee(data.chamberFee || "");
        setConsultationStart(data.consultationStart || "");
        setConsultationEnd(data.consultationEnd || "");
        setSpecialities(data.specialities || []);
        setQualifications(data.qualifications || "");
        setDetails(data.details || "");
        setChamberDetails(data.chamberDetails || "");
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  // Function to handle adding new qualification
  const addQualification = () => {
    setQualifications([...qualifications, { degree: "", institution: "", yearOfCompletion: "", certification: "", specialization: "" }]);
  };

  // Function to handle qualification change
  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...qualifications];
    if (typeof updatedQualifications[index] === "object") {
      updatedQualifications[index][field] = value;
      setQualifications(updatedQualifications);
    }
  };

  // Function to handle adding new professional detail
  const addDetail = () => {
    setDetails([...details, { institute: "", position: "", start_date: "", end_date: "" }]);
  };

  // Function to handle professional detail change
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    if (typeof updatedDetails[index] === "object") {
      updatedDetails[index][field] = value;
      setDetails(updatedDetails);
    }
  };

  // Function to handle adding new chamber detail
  const addChamberDetail = () => {
    setChamberDetails([...chamberDetails, { chamberName: "", address: "", city: "", chamberFee: "", contact: "", startTime: "", endTime: "" }]);
  };

  // Function to handle chamber detail change
  const handleChamberDetailChange = (index, field, value) => {
    const updatedChamberDetails = [...chamberDetails];
    if (typeof updatedChamberDetails[index] === "object") {
      updatedChamberDetails[index][field] = value;
      setChamberDetails(updatedChamberDetails);
    }
  };

  // Function to handle save
  const handleSave = async () => {
    const updatedProfile = {
      bio,
      drTitle,
      onlineFee,
      followupFee,
      chamberFee,
      consultationStart,
      consultationEnd,
      specialities,
      qualifications,
      details,
      chamberDetails,
    };

    try {
      const response = await fetch("/api2/doctors/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        console.log("Profile updated successfully!");
      } else {
        console.error("Error updating profile:", await response.text());
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setIsEditing(false);
  };

  if (error) return <div className="mt-24">{error}</div>;
  if (!doctorData) return <div className="mt-24"><Loader /></div>;

  return (
    <div className="flex max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-28">
      {/* Sidebar */}
      <DoctorProfileSidebar setSection={setSelectedSection} />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Editable Button */}
        <div className="mb-8 flex justify-end">
          <button
          onClick={() => setIsEditing(!isEditing)}
          className={`${
            isEditing ? 'bg-red-500' : 'bg-blue-500'
          } text-white px-4 py-2 rounded-md`}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
        </div>
        {renderSection()}

        {isEditing && (
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
