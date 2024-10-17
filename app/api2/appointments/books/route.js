import dbConnect from "@/lib/db";
import Appointment from "@/lib/models/appointment";
import Doctor from "@/lib/models/doctor";
import Patient from "@/lib/models/patient";
import { NextResponse } from "next/server";
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken'; // Import jwt for token decoding

dbConnect();

export const POST = async (request) => {
  const { doctorId, appointmentDate, appointmentTime ,appointmentType } = await request.json();

  // Get the token from the cookies
  const token = getCookie('token', { req: request });

  if (!token) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  try {
    // Verify and decode the token to extract the patientId
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // Use your JWT secret from .env
    const patientId = decoded.id; // Assuming 'id' holds the patientId in your JWT payload

    // Check if doctor and patient exist
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor || !patient) {
      return NextResponse.json({ message: 'Doctor or Patient not found' }, { status: 404 });
    }

    // Check if the time slot is available (Optional logic)
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      appointmentType
    });

    if (existingAppointment) {
      return NextResponse.json({ message: 'Time slot already booked' }, { status: 400 });
    }

    // Create a new appointment
    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId, // Retrieved from the token
      appointmentDate,
      appointmentTime,
      appointmentType
    });

    await appointment.save();

    return NextResponse.json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to book appointment', error: error.message }, { status: 500 });
  }
};