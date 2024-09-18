import connect from "@/lib/db";
import Patient from "@/lib/models/patient";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Combined Patient Signup and Login
export const POST = async (request) => {
  try {
    const { action, email, password, fullName, username, dob, phone, nationality, gender, age } = await request.json();
    await connect();

    if (action === "signup") {
      // Signup logic
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPatient = new Patient({
        fullName,
        username,
        email,
        dob,
        phone,
        nationality,
        gender,
        age,
        password: hashedPassword,
      });

      await newPatient.save();
      return new NextResponse("Patient account created successfully", { status: 201 });
    } else if (action === "login") {
      // Login logic
      const patient = await Patient.findOne({ email });
      if (!patient) {
        return new NextResponse("Patient not found", { status: 404 });
      }

      const isPasswordCorrect = await bcrypt.compare(password, patient.password);
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
