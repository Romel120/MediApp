// app/lib/models/doctor.js
import { Schema, model, models } from "mongoose";

const doctorSchema = new Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  medicalLicense: { type: String, required: true },
  specialization: { type: String, required: true },
  idType: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Doctor = models.Doctor || model("Doctor", doctorSchema);

export default Doctor;
