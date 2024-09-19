import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; // Ensure this path is correct
import Doctor from '@/lib/models/doctor'; // Ensure this path is correct

export async function GET(req) {
  await dbConnect();

  try {
    // Extract user email from headers or another authentication method
    const userEmail = req.headers.get('x-user-email');

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const doctor = await Doctor.findOne({ email: userEmail });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
  }
}
