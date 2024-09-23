import { NextResponse } from 'next/server'; // Import NextResponse
import dbConnect from '@/lib/db'; // Assuming you have dbConnect in lib/db.js for MongoDB connection
import Doctor from '@/lib/models/doctor'; // Adjust paths according to your project structure
import Patient from '@/lib/models/patient'; // Adjust paths according to your project structure
import jwt from 'jsonwebtoken';

// GET /api2/verify-email
export async function GET(req) {
    try {
        // Parse query parameters
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || !type) {
            return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
        }

        // Verify the JWT token
        const secretKey = process.env.TOKEN_SECRET;
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.id;

        await dbConnect();

        // Find and verify the correct user type (Doctor or Patient)
        let user;
        if (type === 'doctor') {
            user = await Doctor.findById(userId);
        } else if (type === 'patient') {
            user = await Patient.findById(userId);
        }

        if (!user) {
            return NextResponse.json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` }, { status: 404 });
        }

        // Check if already verified
        if (user.isVerified) {
            return NextResponse.json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} already verified` }, { status: 200 });
        }

        // Update verification status
        user.isVerified = true;
        await user.save();

        return NextResponse.json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} verified successfully` }, { status: 200 });
    } catch (error) {
        console.error('Error during email verification:', error);
        return NextResponse.json({ error: 'An error occurred during verification' }, { status: 500 });
    }
}
