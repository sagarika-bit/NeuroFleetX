import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/vehicles.css";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get("/vehicles").then((res) => setVehicles(res.data));
  }, []);

  return (
    <div className="vehicles-wrapper">

      {/* HEADER */}
      <h1 className="vehicles-heading">
         Vehicles Dashboard
      </h1>

      {/* TABLE */}
      <div className="table-container">
        <table className="vehicle-table">
          <thead>
            <tr>
              <th>PLATE</th>
              <th>STATUS</th>
              <th>SPEED</th>
              <th>BATTERY</th>
              <th>FUEL</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">
                  No vehicles found.
                </td>
              </tr>
            )}

            {vehicles.map((v) => (
              <tr className="vehicle-row" key={v._id}>
                <td className="plate">{v.plateNumber}</td>

                <td>
                  <span
                    className={
                      v.status === "ONLINE"
                        ? "badge-online"
                        : "badge-offline"
                    }
                  >
                    {v.status}
                  </span>
                </td>

                <td>{v.telemetry?.speed || 0} km/h</td>

                <td>
                  <div className="bar-container">
                    <div
                      className="battery-bar"
                      style={{ width: `${v.telemetry?.battery || 0}%` }}
                    ></div>
                  </div>
                  <span className="percent-text">
                    {v.telemetry?.battery || 0}%
                  </span>
                </td>

                <td>
                  <div className="bar-container">
                    <div
                      className="fuel-bar"
                      style={{ width: `${v.telemetry?.fuel || 0}%` }}
                    ></div>
                  </div>
                  <span className="percent-text">
                    {v.telemetry?.fuel || 0}%
                  </span>
                </td>

                <td>
                  <Link to={`/vehicles/${v._id}`}>
                    <button className="btn-view">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
