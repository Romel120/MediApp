import dbConnect from "@/lib/db";
import Doctor from "@/lib/models/doctor";
import { NextResponse } from "next/server";

dbConnect();
// Fetch doctor details by ID for public view (patients)
export const GET = async (request) => {
  await dbConnect();
  const id = request.nextUrl.searchParams.get('id');

  try {
      const doctor = await Doctor.findById(id).select('-password');
      if (!doctor) {
          return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
      }

      return NextResponse.json(doctor);
  } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
