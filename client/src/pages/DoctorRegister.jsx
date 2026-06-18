import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaUser, FaStethoscope, FaBriefcase, FaMoneyBill, FaClock } from "react-icons/fa";

function DoctorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    fee: "",
    availableSlots: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/doctors", {
        ...formData,
        experience: Number(formData.experience),
        fee: Number(formData.fee),
        availableSlots: formData.availableSlots.split(","),
      });

      alert("Doctor Registered Successfully!");

      setFormData({
        name: "",
        specialization: "",
        experience: "",
        fee: "",
        availableSlots: "",
      });
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 justify-center items-center">
        <div className="bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-lg transform transition duration-500 hover:scale-105 hover:shadow-violet-500/30">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            👨‍⚕️ Doctor Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200">
              <FaUser className="text-cyan-400 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Specialization */}
            <div className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200">
              <FaStethoscope className="text-cyan-400 mr-3" />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Experience */}
            <div className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200">
              <FaBriefcase className="text-cyan-400 mr-3" />
              <input
                type="number"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Fee */}
            <div className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200">
              <FaMoneyBill className="text-cyan-400 mr-3" />
              <input
                type="number"
                name="fee"
                placeholder="Consultation Fee"
                value={formData.fee}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Slots */}
            <div className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200">
              <FaClock className="text-cyan-400 mr-3" />
              <input
                type="text"
                name="availableSlots"
                placeholder="09:00 AM,12:00 PM,03:00 PM"
                value={formData.availableSlots}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-cyan-400/40"
            >
              Register Doctor
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DoctorRegister;
