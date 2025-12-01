// src/pages/Logout.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // clear token, role, auth state
    navigate("/login"); // redirect to login page
  }, []);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
    </div>
  );
}
