import connect  from "@/lib/db";
import Patient from "@/lib/models/patient";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Check if patient exists
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        // Compare password
        const isMatch = await bcryptjs.compare(password, patient.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        // Generate JWT token
        const token = jwt.sign({ id: patient._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

        return NextResponse.json({
            message: "Login successful",
            token,
            patient: {
                id: patient._id,
                email: patient.email,
                fullName: patient.fullName,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
