import { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/dashboard.css";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get("/vehicles").then((res) => setVehicles(res.data));
  }, []);

  // ----------- KPI VALUES -----------
  const totalVehicles = vehicles.length;
  const idleCount = vehicles.filter((v) => v.status === "IDLE").length;
  const activeCount = vehicles.filter((v) => v.status === "IN_USE").length;
  const maintenanceCount = vehicles.filter((v) => v.status === "MAINTENANCE").length;

  // ----------- PIE CHART DATA -----------
  const pieData = [
    { name: "Idle", value: idleCount },
    { name: "Active", value: activeCount },
    { name: "Maintenance", value: maintenanceCount },
  ];

  const COLORS = ["#4cd964", "#ffd600", "#ff4d4d"];

  // ----------- LINE CHART (Mock Speed Trend) -----------
  const lineData = vehicles.slice(0, 5).map((v, i) => ({
    name: v.plateNumber,
    speed: v.telemetry?.speed || 0,
  }));

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Fleet Dashboard</h1>

      {/* KPI GRID */}
      <div className="kpi-grid">

        <div className="kpi-card">
          <h3>Total Vehicles</h3>
          <div className="kpi-number">{totalVehicles}</div>
        </div>

        <div className="kpi-card">
          <h3>Active Vehicles</h3>
          <div className="kpi-number">{activeCount}</div>
        </div>

        <div className="kpi-card">
          <h3>Idle Vehicles</h3>
          <div className="kpi-number">{idleCount}</div>
        </div>

        <div className="kpi-card">
          <h3>Maintenance</h3>
          <div className="kpi-number">{maintenanceCount}</div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        {/* PIE CHART */}
        <div className="chart-box">
          <h3>Vehicle Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART */}
        <div className="chart-box">
          <h3>Speed Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="speed"
                stroke="#E5E5E5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
