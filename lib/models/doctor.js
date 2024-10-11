import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true },
    medicalLicense: { type: String, required: true },
    specialization: { type: [String], required: true },
    idType: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    bio: { type: String },
    experience: { type: String },
    consultation: { type: String },
    consultationStart: { type: String },
    consultationEnd: { type: String },
    verifyToken: String,
    verifyTokenExpiry: Date,
    BMDCNumber: { type: String }, // BMDC Number field
    joinDate: { type: Date }, // Join Date field
    onlineFee: { type: Number },  // Join Date field
    followupFee: { type: Number },// Online Fee
    chamberFee: { type: Number }, // Chamber Fee
}, { timestamps: true });

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;

