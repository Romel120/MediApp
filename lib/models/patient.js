import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true },
    nationality: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
}, { timestamps: true });

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
