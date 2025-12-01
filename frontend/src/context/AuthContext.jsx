import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 🔥 LOGIN FUNCTION WITH ROLE-BASED REDIRECT
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const loggedUser = res.data.user;
    const tok = res.data.token;

    setUser(loggedUser);
    setToken(tok);

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", tok);

    // 🔥 ROLE-BASED NAVIGATION
    if (loggedUser.role == "admin") {
      navigate("/dashboard", { replace: true });
    } else if (loggedUser.role == "manager") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/bookings", { replace: true }); // CUSTOMER
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
