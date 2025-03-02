import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const Home = () => {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) { // Check if fields are empty
      setError("❌ Username and Password cannot be empty.");
      setSuccess(null);
      return;
    }
  
    try {
      const response = await apiClient.post("/user/register", {
        username,
        password,
      });
  
      setSuccess("✅ Registration successful! Now login.");
      setError(null);
      setUsername("");
      setPassword("");
  
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("❌ Registration failed. Try a different username.");
      setSuccess(null);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to Globetrotter!</h2>

        {!showRegister ? (
          <>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded mt-4 hover:bg-blue-600 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="w-full bg-green-500 text-white py-3 rounded mt-4 hover:bg-green-600 transition"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">Register</h3>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded mb-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-green-500 text-white py-3 rounded mt-2 hover:bg-green-600 transition"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              className="w-full bg-gray-400 text-white py-3 rounded mt-2 hover:bg-gray-500 transition"
              onClick={() => setShowRegister(false)}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
