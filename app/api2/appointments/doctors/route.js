import dbConnect from "@/lib/db";
import Appointment from "@/lib/models/appointment";
import Doctor from "@/lib/models/doctor";  // Import Doctor model
import Patient from "@/lib/models/patient";  // Import Patient model
import { NextResponse } from "next/server";
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

dbConnect();

export const GET = async (request) => {
  // Extract the token from cookies
  const token = getCookie('token', { req: request });

  if (!token) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  try {
    // Decode the JWT token to get the doctor's ID
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const doctorId = decoded.id; // Assuming 'id' holds the doctor's ID in the JWT

    // Fetch all appointments related to the doctor, populate patient details
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', '-password');  // Exclude sensitive fields like password

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ message: 'No appointments found for this doctor' }, { status: 404 });
    }

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve appointments', error: error.message }, { status: 500 });
  }
};
