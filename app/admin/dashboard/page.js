"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary chart.js components
ChartJS.register(
  CategoryScale,  // For category axis (x-axis)
  LinearScale,    // For numeric axis (y-axis)
  BarElement,     // For bar charts
  Title,          // For chart title
  Tooltip,        // For tooltips
  Legend          // For chart legends
);

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await fetch("/api2/admin/analytics");
      const data = await res.json();
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div className="mt-20 text-2xl">Loading...</div>;
  }

  // Data for the chart
  const dataForChart = {
    labels: ["Doctors", "Patients", "Appointments"],
    datasets: [
      {
        label: "Total Count",
        data: [analytics.totalDoctors, analytics.totalPatients, analytics.totalAppointments],
        backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 mt-20">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-semibold">Total Doctors</h2>
          <p className="text-2xl font-bold">{analytics.totalDoctors}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-semibold">Total Patients</h2>
          <p className="text-2xl font-bold">{analytics.totalPatients}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-semibold">Total Appointments</h2>
          <p className="text-2xl font-bold">{analytics.totalAppointments}</p>
        </div>
      </div>

      {/* Recent Appointments Section */}
      <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>
      <ul className="mb-6">
        {analytics.recentAppointments.map((appointment) => (
          <li key={appointment._id} className="p-4 bg-white shadow-md rounded mb-2">
            <p><strong>Doctor:</strong> {appointment.doctor.fullName}</p>
            <p><strong>Patient:</strong> {appointment.patient.fullName}</p>
            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      {/* Analytics Chart */}
      <h2 className="text-xl font-bold mb-4">Analytics Chart</h2>
      <Bar data={dataForChart} />
    </div>
  );
};

export default AdminDashboard;
