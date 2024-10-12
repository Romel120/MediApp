import { NextResponse } from 'next/server';
import Doctor from '@/lib/models/doctor';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/db';

export const GET = async (request) => {
    await dbConnect();
    try {
        const doctorId = getDataFromToken(request);
        const doctor = await Doctor.findById(doctorId).select('-password');

        if (!doctor) {
            return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
        }

        return NextResponse.json(doctor);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const PUT = async (request) => {
    await dbConnect();

    try {
        const {
            bio,
            // experience,
            // consultation,
            consultationStart,
            consultationEnd,
            dr_title,  // Adjusted to match the model
            onlineFee,
            followupFee,
            chamberFee,
            specialities, // New field
            qualifications, // New field
            details, // New field
            chamberDetails // New field
        } = await request.json();

        const doctorId = getDataFromToken(request);

        if (!doctorId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                ...(bio && { bio }), // Only update if bio is provided
                ...(consultationStart && { consultationStart }), // Only update if consultationStart is provided
                ...(consultationEnd && { consultationEnd }), // Only update if consultationEnd is provided
                ...(dr_title && { dr_title }), // Only update if dr_title is provided
                ...(onlineFee !== undefined && { onlineFee }), // Only update if onlineFee is provided
                ...(followupFee !== undefined && { followupFee }), // Only update if followupFee is provided
                ...(chamberFee !== undefined && { chamberFee }), // Only update if chamberFee is provided
                ...(specialities && { specialities }), // Only update if specialities is provided
                ...(qualifications && { qualifications }), // Only update if qualifications is provided
                ...(details && { details }), // Only update if details is provided
                ...(chamberDetails && { chamberDetails }), // Only update if chamberDetails is provided
             },
            { new: true }
        );

        if (!updatedDoctor) {
            return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
        }

        return NextResponse.json(updatedDoctor, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
