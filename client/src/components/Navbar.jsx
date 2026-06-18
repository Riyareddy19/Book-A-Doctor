import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-100 px-8 py-4 flex justify-between items-center shadow-lg">

      {/* Logo */}
      <h1 className="font-bold text-2xl tracking-wide flex items-center gap-2">
        🏥
        <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Book A Doctor
        </span>
      </h1>

      {/* Patient Navbar */}
      {role === "patient" && (
        <div className="flex space-x-6 text-lg font-medium">
          <Link
            to="/doctors"
            className="hover:text-amber-400 transition-colors"
          >
            Doctors
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-amber-400 transition-colors"
          >
            Appointments
          </Link>

          <Link
            to="/upload"
            className="hover:text-amber-400 transition-colors"
          >
            Upload Report
          </Link>
        </div>
      )}

      {/* Doctor Navbar */}
      {role === "doctor" && (
        <div className="flex space-x-6 text-lg font-medium">
          <Link
            to="/doctor-register"
            className="hover:text-amber-400 transition-colors"
          >
            Doctor Register
          </Link>

          <Link
            to="/doctor-dashboard"
            className="hover:text-amber-400 transition-colors"
          >
            Doctor Dashboard
          </Link>
        </div>
      )}

      <button
        onClick={logout}
        className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white px-4 py-2 rounded-md shadow-md"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;