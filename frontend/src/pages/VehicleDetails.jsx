import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/vehicleDetails.css";

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  const loadVehicle = async () => {
    try {
      const res = await api.get(`/vehicles/${id}`);
      setVehicle(res.data);
    } catch (err) {
      console.log("Error loading vehicle:", err);
    }
  };

  useEffect(() => {
    loadVehicle();
  }, []);

  if (!vehicle) return <div className="loading">Loading...</div>;

  return (
    <div className="details-container">

      <div className="header-row">
        <h1 className="details-title">🚗 Vehicle Details</h1>
        <Link to="/vehicles" className="back-btn">← Back</Link>
      </div>

      {/* MAIN VEHICLE CARD */}
      <div className="vehicle-card">
        <h2>{vehicle.plateNumber}</h2>
        <p className="model">{vehicle.model}</p>

        <div className="info-grid">
          <div className="info-box">
            <label>Status</label>
            <span>{vehicle.status}</span>
          </div>

          <div className="info-box">
            <label>Speed</label>
            <span>{vehicle.telemetry.speed} km/h</span>
          </div>

          <div className="info-box">
            <label>Battery</label>
            <span>{vehicle.telemetry.battery}%</span>
          </div>

          <div className="info-box">
            <label>Fuel</label>
            <span>{vehicle.telemetry.fuel}%</span>
          </div>

          <div className="info-box">
            <label>Last Update</label>
            <span>{new Date(vehicle.last_telemetry_time).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* TELEMETRY LIVE SECTION */}
      <div className="telemetry-wrapper">
        <h2 className="section-title">📡 Live Telemetry</h2>
        <div className="telemetry-box">
          <p><b>Latitude:</b> {vehicle.telemetry.location.lat.toFixed(5)}</p>
          <p><b>Longitude:</b> {vehicle.telemetry.location.lng.toFixed(5)}</p>
        </div>
      </div>

      {/* ACTION SECTION */}
      <div className="action-area">
        <button className="simulate-btn" onClick={async () => {
          await api.post(`/vehicles/${vehicle._id}/simulate`);
          loadVehicle();
        }}>
          Simulate Telemetry
        </button>

        <button className="delete-btn"
          onClick={async () => {
            if (confirm("Delete this vehicle?")) {
              await api.delete(`/vehicles/${vehicle._id}`);
              window.location.href = "/vehicles";
            }
          }}
        >
          Delete Vehicle
        </button>
      </div>
    </div>
  );
}
