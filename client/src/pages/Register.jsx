import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
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
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">

      {/* Left Side */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-12">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Book A Doctor 
        </h1>
        <p className="text-lg text-center max-w-md leading-relaxed text-gray-300">
          Create your account and start booking appointments, managing medical reports, and connecting with doctors.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-violet-500/30">

          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Create Account ✨
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200">
              <FaUser className="text-cyan-400 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200">
              <FaEnvelope className="text-cyan-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200">
              <FaLock className="text-cyan-400 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Role */}
            <select
              name="role"
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-cyan-400/40"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?
          </p>

          <Link to="/">
            <button className="w-full mt-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 py-3 rounded-lg font-semibold transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

