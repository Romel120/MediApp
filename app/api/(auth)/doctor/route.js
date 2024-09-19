import connect from "@/lib/db";
import Doctor from "@/lib/models/doctor";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Combined Doctor Signup and Login
export const POST = async (request) => {
  try {
    // Parse the incoming JSON data
    const { action, email, password, fullName, username, dob, phone, medicalLicense, specialization, idType, gender, age } = await request.json();
    
    // Connect to the database
    await connect();

    if (action === "signup") {
      // Signup logic
      const hashedPassword = await bcrypt.hash(password, 10);
      const newDoctor = new Doctor({
        fullName,
        username,
        email,
        dob,
        phone,
        medicalLicense,
        specialization,
        idType,
        gender,
        age,
        password: hashedPassword,
      });

      await newDoctor.save();
      return new NextResponse("Doctor account created successfully", { status: 201 });
    } else if (action === "login") {
      // Login logic
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return new NextResponse("Doctor not found", { status: 404 });
      }

      const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
      if (!isPasswordCorrect) {
        return new NextResponse("Invalid credentials", { status: 401 });
      }

      return new NextResponse("Login successful", { status: 200 });
    } else {
      return new NextResponse("Invalid action", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("An error occurred", { status: 500 });
  }
};


export async function GET(req) {
  await connect();

  try {
    // Fetch all doctors from the database
    const doctors = await Doctor.find({});

    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response("Error fetching doctors", { status: 500 });
  }
}