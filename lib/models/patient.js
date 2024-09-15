// app/lib/models/patients.js
import { Schema, model, models } from "mongoose";

const patientSchema = new Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  nationality: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Patient = models.Patient || model("Patient", patientSchema);

export default Patient;
