import { NavLink } from "react-router-dom";
import "../styles/layout.css";
export default function AppLayout({ children }) {
  return (
    <div>
      {" "}
      {/* SIDEBAR */}{" "}
      <div className="sidebar">
        {" "}
        <div className="sidebar-logo">NeuroFleetX</div>{" "}
        <div className="sidebar-menu">
          {" "}
          <NavLink to="/" className="menu-item">
            {" "}
            <span className="menu-icon"></span> Dashboard{" "}
          </NavLink>{" "}
          <NavLink to="/vehicles" className="menu-item">
            {" "}
            <span className="menu-icon"></span> Vehicles{" "}
          </NavLink>{" "}
          <NavLink to="/bookings" className="menu-item">
            {" "}
            <span className="menu-icon"></span> Bookings{" "}
          </NavLink>{" "}
          <NavLink to="/map" className="menu-item">
            {" "}
            <span className="menu-icon"></span> Map{" "}
          </NavLink>{" "}
          <NavLink to="/users" className="menu-item">
            {" "}
            <span className="menu-icon"></span> Users{" "}
          </NavLink>{" "}
          <NavLink to="/logout" className="menu-item">
            <span className="menu-icon"></span>
            Logout
          </NavLink>
        </div>{" "}
      </div>{" "}
      {/* CONTENT */} <div className="main-content">{children}</div>{" "}
    </div>
  );
}
