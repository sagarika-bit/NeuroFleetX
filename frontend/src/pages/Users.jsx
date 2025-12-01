import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log("Error loading users:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", form);
      setShowAdd(false);
      setForm({ name: "", email: "", password: "", role: "CUSTOMER" });
      loadUsers();
    } catch (err) {
      console.log("Error creating user:", err);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await api.put(`/users/${id}/role`, { role });
      loadUsers();
    } catch (err) {
      console.log("Error updating role:", err);
    }
  };

  const deleteUser = async (id) => {
    if (confirm("Delete this user?")) {
      await api.delete(`/users/${id}`);
      loadUsers();
    }
  };

  return (
    <div className="users-container">
      <h1 className="users-title">Users Management</h1>

      <button className="add-btn" onClick={() => setShowAdd(true)}>
        + Add User
      </button>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th width="150">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u._id, e.target.value)}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </td>
              <td>
                <button className="delete-btn" onClick={() => deleteUser(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && (
        <div className="users-modal">
          <div className="modal-box">
            <h2>Add New User</h2>
            <form onSubmit={createUser}>
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="CUSTOMER">CUSTOMER</option>
              </select>

              <div className="modal-buttons">
                <button className="create-btn" type="submit">
                  Create
                </button>

                <button className="cancel-btn" type="button" onClick={() => setShowAdd(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
