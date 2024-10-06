import dbConnect from "@/lib/db";
import Doctor from "@/lib/models/doctor";
import { NextResponse } from "next/server";

dbConnect();
// Fetch doctor details by ID for public view (patients)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get('id'); // Get doctor ID from query parameters

 // Connect to the database

  try {
    // Find doctor by ID, exclude sensitive fields (e.g., password)
    const doctor = await Doctor.findById(doctorId).select('-password -email -phone'); // Exclude sensitive fields

    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }

    // Return public doctor profile details
    return NextResponse.json({ doctor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
