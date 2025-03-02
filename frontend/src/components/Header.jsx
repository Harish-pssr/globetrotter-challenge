import { useUser } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { userDetails } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  // Hide header on the Invite page
  if (location.pathname.startsWith("/invite")||location.pathname.startsWith("/login")) {
    return null;
  }
  const handleLogout = () => {
    localStorage.removeItem("token"); //  Clear token from storage
    navigate("/"); //  Redirect to login page
  };

  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center w-full">
      {userDetails ? (
        <>
          <span className="text-lg font-bold">{userDetails.user_name}</span>
          <div className="flex gap-4">
            <span>✅ {userDetails.correct_attempts}</span>
            <span>❌ {userDetails.incorrect_attempts}</span>
          </div>
          {/* Logout Button */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : location.pathname === "/" ? (
        <span>Not Logged In</span>
      ) : (
        <span>Loading user...</span>
      )}
    </div>
  );
};

export default Header;
