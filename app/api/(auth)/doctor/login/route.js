import Doctor from "@/lib/models/doctor";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import connect from "@/lib/db";

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    await connect();

    // Find doctor by email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return new Response(JSON.stringify('Invalid Email Address!'), { status: 404 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return new Response(JSON.stringify("Invalid Password"), { status: 401 });
    }

    // Generate JWT token
    const token = generateToken(doctor);

    return new Response(JSON.stringify({ token, doctor }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), { status: 500 });
  }
};
