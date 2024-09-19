import Doctor from "@/lib/models/doctor"; // Ensure the correct import path
import dbConnect from "@/lib/db"; // Ensure the correct import path

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params; // Extract ID from URL parameters

  try {
    const doctor = await Doctor.findById(id); // Find doctor by ID
    if (!doctor) {
      return new Response("Doctor not found", { status: 404 });
    }

    return new Response(JSON.stringify(doctor), { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor", error);
    return new Response("Error fetching doctor", { status: 500 });
  }
}
