import connect from "@/lib/db";
import Patient from "@/lib/models/patient";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Patient Signup (POST)
export const POST = async (request) => {
  try {
    const { fullName, username, email, dob, phone, nationality, gender, age, password } = await request.json();
    await connect();

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
  } catch (error) {
    return new NextResponse("Error creating patient", { status: 500 });
  }
};
