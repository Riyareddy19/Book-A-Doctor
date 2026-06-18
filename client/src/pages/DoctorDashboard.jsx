import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/appointments/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/appointments/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-gray-100">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          👨‍⚕️ Doctor Dashboard
        </h1>

        {appointments.length === 0 && (
          <div className="bg-gray-800 p-8 rounded-xl shadow text-center text-gray-300">
            <p>No appointments yet.</p>
          </div>
        )}

        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-gray-800 shadow-lg hover:shadow-violet-500/30 transition rounded-xl p-6 border border-gray-700 transform hover:scale-105 duration-300"
            >
              <h2 className="text-xl font-bold text-cyan-400">
                Patient: {appointment.patientId?.name}
              </h2>
              <p className="text-gray-300">Email: {appointment.patientId?.email}</p>
              <p className="text-gray-300">Doctor: {appointment.doctorId?.name}</p>
              <p className="text-gray-400 mt-2">Slot: {appointment.slot}</p>

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

              {appointment.status === "Pending" && (
                <button
                  onClick={() => approveAppointment(appointment._id)}
                  className="mt-4 w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                >
                  Approve Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DoctorDashboard;
