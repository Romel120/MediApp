import connect from "@/lib/db";
import Doctor from "@/lib/models/doctor";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const doctors = await Doctor.find();  // Fetch all doctors
    return NextResponse.json({ doctors });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
