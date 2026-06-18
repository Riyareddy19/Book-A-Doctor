import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import Dashboard from "./pages/Dashboard";
import UploadReport from "./pages/UploadReport";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorRegister from "./pages/DoctorRegister";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadReport />} />
        <Route
  path="/doctor-dashboard"
  element={<DoctorDashboard />}
/>
<Route
  path="/doctor-register"
  element={<DoctorRegister />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
