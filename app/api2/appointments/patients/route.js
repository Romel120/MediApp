import dbConnect from "@/lib/db";
import Appointment from "@/lib/models/appointment";
import { NextResponse } from "next/server";
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken'; // Import jwt for token decoding

dbConnect();

export const GET = async (request) => {
  try {
    // Extract patient token from cookies
    const token = getCookie('token', { req: request });

    if (!token) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    // Decode the token to get the patient's ID
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const patientId = decoded.id; // Assuming 'id' holds the patient's ID in your JWT payload

    // Fetch all appointments related to the patient
    const appointments = await Appointment.find({ patient: patientId }).populate('doctor', '-password'); // Optionally populate doctor info and exclude sensitive data

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ message: 'No appointments found for this patient' }, { status: 404 });
    }

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ message: 'Failed to retrieve appointments', error: error.message }, { status: 500 });
  }
};
