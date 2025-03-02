import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/apiClient";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      console.log("Calling /user/details API...");
      const response = await apiClient.get(`/user/details?token=${token}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  return (
    <UserContext.Provider value={{ userDetails, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
