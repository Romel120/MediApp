import connect from "@/lib/db"; // assuming you've already set up MongoDB connection
import Doctor from "@/lib/models/doctor";
import Patient from "@/lib/models/patient";
import Appointment from "@/lib/models/appointment"; // Uncomment this when the appointment model is ready
import { NextResponse } from "next/server";

// Ensure MongoDB connection is established
connect();

export async function GET() {
  try {
    // Count the total number of doctors, patients, and appointments
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    // Fetch recent appointments, sorted by date (descending) and populate doctor and patient data
    const recentAppointments = await Appointment.find()
      .sort({ date: -1 }) // Most recent first
      .limit(5) // Limit to 5 recent appointments
      .populate("doctor patient"); // Populate related doctor and patient fields

    return NextResponse.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      recentAppointments,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
