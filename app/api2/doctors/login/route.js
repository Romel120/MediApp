import connect from "@/lib/db";
import Doctor from "@/lib/models/doctor";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Check if doctor exists
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
        }
        console.log("Hashed password:", doctor.password);
        console.log("Provided password:", password);
        // Compare password
        const isMatch = await bcryptjs.compare(password, doctor.password);
        // Log the result of the comparison
        console.log("Password match:", isMatch);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }

        // Generate JWT token
        const token = jwt.sign({ id: doctor._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

        const response = NextResponse.json({
            message: "Login successful",
            token,
            doctor: {
                id: doctor._id,
                email: doctor.email,
                fullName: doctor.fullName,
            },
            userType: "doctor",
        });

        // Set the cookie with the token
        response.cookies.set('token', token, { httpOnly: true, maxAge: 3600 });
        response.cookies.set('userType', 'doctor', { httpOnly: true, maxAge: 3600 }); // Setting userType cookie

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
