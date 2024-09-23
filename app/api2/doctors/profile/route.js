import { NextResponse } from 'next/server';
import Doctor from '@/lib/models/doctor';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/db'; // Adjust this import according to your db connection file

export const GET = async (request) => {
    await dbConnect(); // Ensure the database connection is established
    try {
        const doctorId = getDataFromToken(request);
        const doctor = await Doctor.findById(doctorId).select('-password'); // Exclude password

        if (!doctor) {
            return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
        }

        return NextResponse.json(doctor);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
