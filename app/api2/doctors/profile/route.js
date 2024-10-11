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
            bio, experience, consultation, consultationStart, consultationEnd,
            drTitle, BMDCNumber, expYear, onlineFees, followupFees, clinicFees,
            onlineHealthxFees, onlineVat, onlineTotalFees, followupHealthxFees,
            followupVat, followupTotalFees, isVerify, isShownPartner, onlineFee,followupFee, chamberFee
        } = await request.json();

        const doctorId = getDataFromToken(request);

        if (!doctorId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                bio, experience, consultation, consultationStart, consultationEnd,
                drTitle, BMDCNumber, expYear, onlineFees, followupFees, clinicFees,
                onlineHealthxFees, onlineVat, onlineTotalFees, followupHealthxFees,
                followupVat, followupTotalFees, isVerify, isShownPartner,onlineFee,followupFee, chamberFee,
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
