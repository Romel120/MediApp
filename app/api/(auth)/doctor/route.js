import connect from "@/lib/db";
import Doctor from "@/lib/models/doctor";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Doctor Signup (POST)
export const POST = async (request) => {
  try {
    const { fullName, username, email, dob, phone, medicalLicense, specialization, idType, gender, age, password } = await request.json();
    await connect();

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
  } catch (error) {
    return new NextResponse("Error creating doctor", { status: 500 });
  }
};
