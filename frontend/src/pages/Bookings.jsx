import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/booking.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="bookings-page">
      <h1 className="bookings-title">Booking Dashboard</h1>

      <div className="bookings-container">
        {bookings.length === 0 ? (
          <div className="empty-msg">No bookings available yet.</div>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Vehicle</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  {/* USER NAME */}
                  <td>{b.customer?.name || "Unknown"}</td>

                  {/* VEHICLE */}
                  <td>{b.vehicle?.plateNumber}</td>

                  {/* DATE */}
                  <td>
                    {b.startTime
                      ? new Date(b.startTime).toLocaleString()
                      : "—"}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`status-badge ${
                        b.status === "ONGOING"
                          ? "status-pending"
                          : b.status === "COMPLETED"
                          ? "status-approved"
                          : "status-rejected"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td>
                    <button className="booking-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
