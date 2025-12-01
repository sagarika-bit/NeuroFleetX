import { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/mapview.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet Icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapView() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get("/vehicles").then((res) => setVehicles(res.data));
  }, []);

  return (
    <div className="mapview-page">
      <h1 className="mapview-title">🗺️ Live Map View</h1>

      {/* LEGEND */}
      <div className="mapview-legend">
        <h4>Status Legend</h4>

        <div className="legend-row">
          <div className="legend-dot dot-idle"></div>
          <span>Idle</span>
        </div>

        <div className="legend-row">
          <div className="legend-dot dot-moving"></div>
          <span>Moving</span>
        </div>

        <div className="legend-row">
          <div className="legend-dot dot-maintenance"></div>
          <span>Maintenance</span>
        </div>
      </div>

      {/* MAP */}
      <div className="mapview-mapbox">
        <MapContainer
          center={[20.5937, 78.9629]} // India center
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {vehicles.map((v) => (
            <Marker
              key={v._id}
              position={[
                v.telemetry?.location?.lat || 20.5,
                v.telemetry?.location?.lng || 78.9,
              ]}
            >
              <Popup>
                <b>{v.plateNumber}</b>
                <br />
                Status: {v.status} <br />
                Speed: {v.telemetry?.speed} km/h <br />
                Battery: {v.telemetry?.battery}% <br />
                Fuel: {v.telemetry?.fuel}% <br />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
