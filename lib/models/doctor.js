import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  // Basic information
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },

  // Professional and title information
  dr_title: { type: String, required: true },  // Doctor's title (e.g., Dr., Prof.)

  // Verification and authentication
  isVerified: { type: Boolean, default: false },
  verifyToken: String,
  verifyTokenExpiry: Date,

  // Fees and consultation details
  onlineFee: { type: Number, default: 0 },    // Online consultation fee
  followupFee: { type: Number, default: 0 },  // Follow-up consultation fee
  chamberFee: { type: Number, default: 0 },   // In-person chamber fee
  consultationStart: { type: String },        // Consultation start time
  consultationEnd: { type: String },          // Consultation end time

  // Additional details
  bio: { type: String },                      // Doctor's biography or summary
  joinDate: { type: Date },                   // Date of joining the platform

  // Specialities (Array of specialities)
  specialities: 
    {type: [String], required: true  // Removed unnecessary fields
    }
  ,

  // Qualifications (Array of academic qualifications)
  qualifications: [
    {
      degree: { type: String },         // Academic degree (e.g., MBBS, MD)
      institution: { type: String},    // Name of institution
      yearOfCompletion: { type: Number },// Year of degree completion
      certification: { type: String },                  // Additional certification (if any)
      specialization: { type: String }                  // Academic specialization (optional)
    }
  ],

  // Professional details (Array of work experiences)
  details: [
    {
      institute: { type: String},   // Name of the institute
      position: { type: String},    // Doctor's position (e.g., Consultant)
      start_date: { type: Date},    // Start date of the position
      end_date: { type: Date }                       // End date (optional, current role if null)
    }
  ],

  // Chamber details (Array of chambers)
  chamberDetails: [
    {
      chamberName: { type: String},   // Name of the chamber/clinic
      address: { type: String},       // Chamber address
      city: { type: String},          // City of the chamber
      chamberFee: { type: Number, default: 0 },        // Fee for chamber consultations
      contact: { type: String },                       // Contact number for the chamber
      startTime: { type: String },                     // Start time for consultations
      endTime: { type: String }                        // End time for consultations
    }
  ],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
}, { timestamps: true });

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
