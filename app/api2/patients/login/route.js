import { NextResponse } from 'next/server';
import Patient from '@/lib/models/patient';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';

dbConnect(); // Ensure the database connection is established

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Check if patient exists
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
        }

        // Compare password
        const isMatch = await bcryptjs.compare(password, patient.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }

        // Generate JWT token
        const token = jwt.sign({ id: patient._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

        const response = NextResponse.json({
            message: "Login successful",
            patient: {
                id: patient._id,
                email: patient.email,
                fullName: patient.fullName,
            },
            userType: "patient",
        });

        // Set the token cookie (without httpOnly and secure for local development)
        response.cookies.set('token', token, { maxAge: 3600, path: '/' });
        response.cookies.set('userType', 'patient', { maxAge: 3600, path: '/' });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
