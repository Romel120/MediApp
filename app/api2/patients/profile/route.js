import { NextResponse } from 'next/server';
import Patient from '@/lib/models/patient';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/db';

export const GET = async (request) => {
    await dbConnect(); // Ensure the database connection is established
    try {
        const patientId = getDataFromToken(request);
        const patient = await Patient.findById(patientId).select('-password'); // Exclude password

        if (!patient) {
            return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
        }

        return NextResponse.json(patient);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
