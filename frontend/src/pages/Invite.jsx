import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../api/apiClient";

const Invite = () => {
  const [searchParams] = useSearchParams();
  const inviter = searchParams.get("user");
  const invitedFriend = searchParams.get("friend"); // Get friend username from URL
  const [username, setUsername] = useState(invitedFriend || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      setError("❌ Username and Password cannot be empty.");
      return;
    }

    try {
      await apiClient.post("/user/register", {
        username,
        password,
      });

      setSuccess("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("❌ Registration failed. Try a different username.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">You're Invited!</h2>
        <p className="text-lg">🌍 {inviter} has invited you to play!</p>

        <h3 className="text-xl font-bold mb-4 mt-4">Create Your Account</h3>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          type="text"
          placeholder="Choose a Username"
          className="w-full p-3 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Set a Password"
          className="w-full p-3 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-500 text-white py-3 rounded mt-2 hover:bg-green-600 transition"
          onClick={handleRegister}
        >
          Register & Play
        </button>
      </div>
    </div>
  );
};

export default Invite;
