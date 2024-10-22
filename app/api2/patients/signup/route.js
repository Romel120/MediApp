import connect from "@/lib/db";
import Patient from "@/lib/models/patient";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request) {
    try {
        const { fullName, username, email, dob, phone, nationality, gender, password } = await request.json();

        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return NextResponse.json({ error: "Patient already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newPatient = new Patient({
            fullName,
            username,
            email,
            dob,
            phone,
            nationality,
            gender,
            password: hashedPassword,
        });

        await newPatient.save();

        // Generate a token for email verification
        // const verificationToken = newPatient._id.toString();
        const verificationToken = jwt.sign({ id: newPatient._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });


        // Send verification email
        await sendEmail({
            email,
            emailType: "VERIFY Patient",
            userId: newPatient._id,
            token: verificationToken,
        });

        return NextResponse.json({ message: "Signup successful. Verification email sent." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
