"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Replace with actual logic to get doctor ID
        const doctorId = "USER_DOCTOR_ID"; // Example placeholder

        const res = await fetch(`/api/doctor/${doctorId}`);
        if (res.ok) {
          const data = await res.json();
          setDoctor(data);
        } else {
          console.error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Doctor Profile</h1>
      <div className="mb-4"><strong>Full Name:</strong> {doctor.fullName}</div>
      <div className="mb-4"><strong>Username:</strong> {doctor.username}</div>
      <div className="mb-4"><strong>Email:</strong> {doctor.email}</div>
      <div className="mb-4"><strong>Date of Birth:</strong> {new Date(doctor.dob).toLocaleDateString()}</div>
      <div className="mb-4"><strong>Phone:</strong> {doctor.phone}</div>
      <div className="mb-4"><strong>Medical License:</strong> {doctor.medicalLicense}</div>
      <div className="mb-4"><strong>Specialization:</strong> {doctor.specialization}</div>
      <div className="mb-4"><strong>ID Type:</strong> {doctor.idType}</div>
      <div className="mb-4"><strong>Gender:</strong> {doctor.gender}</div>
      <div className="mb-4"><strong>Age:</strong> {doctor.age}</div>
    </div>
  );
}
