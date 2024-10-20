import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';
import dbConnect from '@/lib/db';
import Doctor from '@/lib/models/doctor';

// Cloudinary configuration from your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const JWT_SECRET = process.env.TOKEN_SECRET;

dbConnect();

// POST method: Upload image and update doctor profile
export async function POST(req) {
  try {
    // Ensure request is form-data (multipart)
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    // Extract form data (file and userType)
    const formData = await req.formData();
    const file = formData.get('file');
    const userType = formData.get('userType');  // E.g., 'doctor' or 'patient'

    if (!file || !userType) {
      return NextResponse.json({ error: 'Missing file or userType' }, { status: 400 });
    }

    // Convert file to buffer to upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `uploads/${userType}` },  // Save under 'uploads/doctor' or 'uploads/patient'
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });

    const imageUrl = uploadResult.secure_url;  // Get URL from Cloudinary

    // Get the token from cookies to authenticate user
    const token = getCookie('token', { req });
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Verify token and get doctor ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const doctorId = decoded.id;

    // Update doctor's profile with the image URL
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { profilePicture: imageUrl },
      { new: true }  // Return the updated doctor
    );

    if (!updatedDoctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json({
      fileName: imageUrl,
      message: 'File uploaded and profile updated successfully!',
    }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

// GET method: Fetch doctor's profile picture
export async function GET(req) {
  try {
    const token = getCookie('token', { req });
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const doctorId = decoded.id;

    const doctor = await Doctor.findById(doctorId).select('-password');  // Exclude password from result
    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json({
      profilePicture: doctor.profilePicture,
      message: 'Profile fetched successfully!',
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
