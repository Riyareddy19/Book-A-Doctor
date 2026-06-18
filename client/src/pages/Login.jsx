import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "role",
        res.data.user.role
      );
      alert("Login Successful");

if (res.data.user.role === "doctor") {
  navigate("/doctor-dashboard");
} else {
  navigate("/doctors");
}
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
          Find trusted doctors, schedule appointments, upload reports, and manage your healthcare seamlessly.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-cyan-500/30">

          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome Back 🌟
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-violet-400/40"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Don't have an account?
          </p>

          <Link to="/register">
            <button className="w-full mt-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 py-3 rounded-lg font-semibold transition duration-300">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;



