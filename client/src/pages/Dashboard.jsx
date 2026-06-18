import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const approvedAppointments = appointments.filter(
    (appointment) => appointment.status === "Approved"
  ).length;

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  ).length;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/appointments/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Appointment cancelled");
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-gray-100">
        <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
           My Appointments
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
            <h2 className="text-3xl font-bold">{totalAppointments}</h2>
            <p>Total</p>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
            <h2 className="text-3xl font-bold">{pendingAppointments}</h2>
            <p>Pending</p>
          </div>

          <div className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
            <h2 className="text-3xl font-bold">{approvedAppointments}</h2>
            <p>Approved</p>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-pink-500 text-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
            <h2 className="text-3xl font-bold">{cancelledAppointments}</h2>
            <p>Cancelled</p>
          </div>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="bg-gray-800 p-8 rounded-xl shadow text-center text-gray-300">
            <p>No appointments booked yet.</p>
          </div>
        )}

        {/* Appointment List */}
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-gray-800 shadow-lg hover:shadow-xl transition rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold text-cyan-400">
                {appointment.doctorId.name}
              </h2>
              <p className="text-gray-300">{appointment.doctorId.specialization}</p>
              <p className="mt-2 text-gray-400">Slot: {appointment.slot}</p>

              <p
                className={`font-semibold mt-2 ${
                  appointment.status === "Pending"
                    ? "text-amber-400"
                    : appointment.status === "Approved"
                    ? "text-violet-400"
                    : "text-red-400"
                }`}
              >
                Status: {appointment.status}
              </p>

              <button
                onClick={() => cancelAppointment(appointment._id)}
                className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
