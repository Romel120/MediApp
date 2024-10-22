import connect from '@/lib/db';
import Doctor from '@/lib/models/doctor';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request) {
    try {
        const {
            fullName,
            username,
            email,
            password,
            dob,
            phone,
            gender,
            dr_title, // Added doctor's title
            onlineFee,
            followupFee,
            chamberFee,
            ...otherDetails // For any additional fields
        } = await request.json();

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        // Validate required fields
        if (!fullName || !username || !email || !password || !dob || !phone || !gender || !dr_title) {
            return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newDoctor = new Doctor({
            fullName,
            username,
            email,
            password: hashedPassword,
            dob,
            phone,
            gender,
            dr_title, // Adding doctor's title
            onlineFee, // Fees
            followupFee,
            chamberFee,
            specialities: otherDetails.specialities || [], // Adjust based on your frontend input
    qualifications: otherDetails.qualifications || [],
    details: otherDetails.details || [],
    chamberDetails: otherDetails.chamberDetails || [], // For any additional fields
        });

        await newDoctor.save();

        const verificationToken = jwt.sign({ id: newDoctor._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

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
