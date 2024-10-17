// app/api/appointments/[id].js

import dbConnect from '@/lib/db'; // Adjust the import according to your project structure
import Appointment from '@/lib/models/appointment'; // Adjust the path to your Appointment model

export async function PUT(req, { params }) {
    await dbConnect(); // Connect to the database
  
    const { id } = params; // Get the appointment ID from the URL parameters
    const { status } = await req.json(); // Get the new status from the request body
  
    try {
      // Update the appointment's status in the database
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!updatedAppointment) {
        return new Response(JSON.stringify({ message: 'Appointment not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify(updatedAppointment), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error updating appointment', error }), { status: 500 });
    }
  }
