import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function UploadReport() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("report", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Report uploaded successfully!");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setMessage("❌ Upload failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex justify-center items-center text-gray-100">
        <div className="bg-gray-800 shadow-2xl rounded-xl p-10 w-full max-w-lg">
          <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Upload Medical Report
          </h1>

          {/* File Upload Box */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors duration-300">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-gray-300 cursor-pointer"
            />
            <p className="mt-2 text-sm text-gray-400">
              Supported formats: PDF, JPG, PNG
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={uploadFile}
            className="mt-6 w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold"
          >
            Upload Report
          </button>

          {/* Status Message */}
          {message && (
            <div className="mt-4 p-4 rounded-lg text-center font-medium 
              bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 shadow">
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UploadReport;
