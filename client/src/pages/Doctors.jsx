import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSlots, setSelectedSlots] = useState({});

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bookAppointment = async (doctorId) => {
    const selectedSlot = selectedSlots[doctorId];
    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        { doctorId, slot: selectedSlot },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Appointment booked for ${selectedSlot}`);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-gray-100">
        {/* Dashboard Link */}
        <div className="flex justify-end mb-6">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            View My Appointments
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-10 rounded-xl mb-8 text-center shadow-lg">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Find the Right Doctor
          </h1>
          <p className="mt-3 text-gray-200 text-lg">
            Book appointments with trusted specialists in just a few clicks.
          </p>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search by doctor name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg mb-6 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-gray-800 shadow-xl rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
            >
              <h2 className="text-xl font-bold text-teal-400">{doctor.name}</h2>
              <p className="text-gray-300">{doctor.specialization}</p>
              <p className="mt-2 text-gray-400">
                Experience: {doctor.experience} years
              </p>
              <p className="font-semibold text-amber-400">₹{doctor.fee}</p>

              {/* Slot Selector */}
              <select
                className="border border-gray-600 p-2 rounded w-full mt-3 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={selectedSlots[doctor._id] || ""}
                onChange={(e) =>
                  setSelectedSlots({
                    ...selectedSlots,
                    [doctor._id]: e.target.value,
                  })
                }
              >
                <option value="">Select Slot</option>
                {doctor.availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              {/* Book Button */}
              <button
                onClick={() => bookAppointment(doctor._id)}
                className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Doctors;
