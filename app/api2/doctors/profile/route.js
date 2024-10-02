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

// PUT method to update doctor's profile
export const PUT = async (request) => {
    await dbConnect();

    try {
        const { bio, experience, consultation } = await request.json();

        // Get the doctor ID from the token
        const doctorId = getDataFromToken(request); // Use updated function
        console.log("Doctor ID:", doctorId);

        if (!doctorId) {
            console.log("No doctor ID found");
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        // Update the doctor's profile
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            { bio, experience, consultation },
            { new: true } // Return the updated document
        );

        if (!updatedDoctor) {
            console.log("Doctor not found with ID:", doctorId);
            return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
        }

        return NextResponse.json(updatedDoctor, { status: 200 });

    } catch (error) {
        console.error("PUT error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};