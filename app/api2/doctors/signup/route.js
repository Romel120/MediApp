import connect from '@/lib/db';
import Doctor from '@/lib/models/doctor';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request) {
    try {
        const { fullName, email, password, ...otherDetails } = await request.json();

        // Check if the email is already registered
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create new doctor
        const newDoctor = new Doctor({
            fullName,
            email,
            password: hashedPassword,
            ...otherDetails,
        });

        await newDoctor.save();

        // Generate a token for email verification
        // const verificationToken = newDoctor._id.toString();
        const verificationToken = jwt.sign({ id: newDoctor._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        // Send verification email
        await sendEmail({
            email,
            emailType: 'VERIFY Doctor',
            userId: newDoctor._id,
            token: verificationToken,
        });

        return NextResponse.json({ message: 'Signup successful. Verification email sent.' }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
