import React, { useState } from "react";

export default function LoginRegister() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "register" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (tab === "login") {
      alert(`Logging in as ${email} with role ${role}`);
    } else {
      alert(`Registering ${name} (${email}) as ${role}`);
    }
  };

  return (
    <div style={styles.box}>
      <div style={styles.tabs}>
        <button
          onClick={() => setTab("login")}
          style={{
            ...styles.tabBtn,
            background: tab === "login" ? "#fff" : "#e3e9f7",
            color: tab === "login" ? "#1a2737" : "#678"
          }}
        >
          Login
        </button>
        <button
          onClick={() => setTab("register")}
          style={{
            ...styles.tabBtn,
            background: tab === "register" ? "#fff" : "#e3e9f7",
            color: tab === "register" ? "#1a2737" : "#678"
          }}
        >
          Register
        </button>
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        {tab === "register" && (
          <label style={styles.lbl}>
            Name
            <input
              style={styles.input}
              type="text"
              required
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}
        <label style={styles.lbl}>
          Role
          <select
            style={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="fleet">Fleet Manager</option>
            <option value="driver">Driver</option>
          </select>
        </label>
        <label style={styles.lbl}>
          Email
          <input
            style={styles.input}
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label style={styles.lbl}>
          Password
          <input
            style={styles.input}
            type="password"
            required
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {tab === "register" && (
          <label style={styles.lbl}>
            Confirm Password
            <input
              style={styles.input}
              type="password"
              required
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        )}
        <button style={styles.loginBtn} type="submit">
          {tab === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  box: {
    background: "#381a50ff",
    borderRadius: 18,
    minWidth: 280,       // made wider (you can use 420 or 450 if you want even wider)
    width: 320,          // add fixed width for consistency
    boxShadow: "0 4px 24px #0102136f",
    padding: "36px 38px 28px 38px",  // a bit more side padding for nice look
    color: "#fff"
  },
  tabs: {
    display: "flex",
    marginBottom: 28
  },
  tabBtn: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 17,
    fontWeight: 600,
    borderRadius: 8,
    marginRight: 10,
    padding: "4px 0",
    cursor: "pointer",
    transition: "background .2s"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18
  },
  lbl: {
    fontSize: 15,
    fontWeight: 500
  },
  input: {
    marginTop: 4,
    padding: "11px 14px",
    borderRadius: 7,
    border: "none",
    outline: "none",
    fontSize: 16,
    width: "100%"
  },
  loginBtn: {
  background: "linear-gradient(90deg, #C86CA4 0%, #6653A4 100%)",
  color: "#fff",
  fontWeight: 600,
  fontSize: 18,
  border: "none",
  borderRadius: 8,
  padding: "13px 0",
  marginTop: 9,
  cursor: "pointer"
}

};
