import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next'; // We'll use this to get cookies
import dbConnect from '@/lib/db';
import Doctor from '@/lib/models/doctor';
import { getDataFromToken } from '@/helpers/getDataFromToken';

const JWT_SECRET = process.env.TOKEN_SECRET; // Secret key to verify JWT

// Handle POST requests (File Upload)
dbConnect();

export async function POST(req) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const userType = formData.get('userType');

    if (!file || !userType) {
      return NextResponse.json({ error: 'Missing file or userType' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save the file to the correct folder
    const folderPath = path.join(process.cwd(), 'public', 'uploads', userType);
    fs.mkdirSync(folderPath, { recursive: true });

    const filePath = path.join(folderPath, file.name);
    fs.writeFileSync(filePath, buffer);

    // Now let's update the doctor profile with the image path
    const token = getCookie('token', { req });
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Decode token to get doctor ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const doctorId = decoded.id;

    // Update doctor profile with the uploaded image path
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, {
      profilePicture: `/uploads/${userType}/${file.name}`
    }, { new: true });

    if (!updatedDoctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json({ fileName: file.name, message: 'File uploaded and profile updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

// Handle GET requests (Fetch profile image)
export const GET = async (request) => {
    try {
        const doctorId = getDataFromToken(request); // Get the doctor ID from the token

        const doctor = await Doctor.findById(doctorId).select('-password');
        if (!doctor) {
            return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
        }

        return NextResponse.json(doctor);
    } catch (error) {
        console.error('Error fetching doctor:', error.message);
        return NextResponse.json({ error: error.message }, { status: 401 }); // Return 401 for authentication issues
    }
};