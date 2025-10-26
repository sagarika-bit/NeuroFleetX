import React from "react";
import LoginRegister from "./LoginRegister";
import logo from "./assets/1.png";

function Feature({ icon, title, subtitle }) {
  return (
    <div style={styles.featureBox}>
      <span style={styles.featureIcon}>{icon}</span>
      <div>
        <div style={styles.featureTitle}>{title}</div>
        <div style={styles.featureSubtitle}>{subtitle}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={styles.page}>
      <div style={styles.centerSection}>
        <div style={styles.header}>
          <span style={styles.logoIcon}>
            <img
              src={logo}
              alt="APP LOGO"
              style={{
                height: 50,
                width: 50,
                background: "transparent",
                borderRadius: "50%",
              }}
            />
          </span>
          <span style={styles.logoText}>
            <h1>NeuroFleetX</h1>
          </span>
        </div>
        <p style={styles.desc}>
          Intelligent traffic management powered by AI. <br />
          Reduce congestion, optimize routes, and manage fleets efficiently.
        </p>
        <LoginRegister />
      </div>
      <div style={styles.features}>
        <Feature
          icon="📍"
          title="Real-time Tracking"
          subtitle="Live traffic monitoring"
        />
        <Feature
          icon="⚡"
          title="AI Optimization"
          subtitle="Smart route planning"
        />
        <Feature
          icon="🚚"
          title="Fleet Management"
          subtitle="Track all vehicles"
        />
        <Feature
          icon="👥"
          title="Multi-role Support"
          subtitle="Admin, fleet, drivers"
        />
      </div>
      <div style={styles.credit}>Travel safe and fast with Sagarika.</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #110a48ff 0%, #552585ff 55%, #2e205eff 100%)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
  },
  centerSection: {
    width: "100%",
    maxWidth: 470,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 56,
    marginBottom: 24,
  },
  header: {
    display: "flex",
    alignItems: "center",
    fontSize: 34,
    marginBottom: 16,
  },
  logoIcon: {
    color: "#340b24ff",
    fontSize: 38,
    marginRight: 12,
  },
  logoText: {
    fontWeight: "500",
    letterSpacing: 1.5,
  },
  desc: {
    width: "100%",
    fontSize: 18,
    marginBottom: 24,
    color: "#d4e1f5ff",
    textAlign: "center",
  },
  features: {
    width: "100%",
    maxWidth: 800,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 28,
    margin: "38px 0 85px 0",
    padding: "0 24px",
  },
  featureBox: {
    background: "#271d48ff",
    borderRadius: 18,
    padding: "24px 18px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 16px #2d3658bb",
  },

  featureIcon: {
    color: "#36162aff",
    fontSize: 32,
    marginRight: 22,
  },
  featureTitle: {
    fontWeight: 600,
    fontSize: 17,
  },
  featureSubtitle: {
    fontSize: 14,
    color: "#a6b4c9",
    marginTop: 2,
  },
  credit: {
    position: "fixed",
    bottom: 24,
    right: 38,
    background: "#fff2",
    color: "#f2f2f2",
    padding: "4px 16px",
    borderRadius: 8,
    fontSize: 14,
  },
};
