import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "", // ✅ Added address field
    role: "policeman",
    status: "Active",
    password: "",
  });

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open dialog for adding/editing
  const openDialog = (user = null) => {
    setEditingUser(user);
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        role: user.role || "policeman",
        status: user.status || "Active",
        password: "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        role: "policeman",
        status: "Active",
        password: "",
      });
    }
    setShowDialog(true);
  };

  // Save (create or update) user
  const handleSave = async () => {
    const { firstName, lastName, email, phoneNumber, address } = formData;
    if (firstName && lastName && email && phoneNumber && address) {
      try {
        if (editingUser) {
          await axios.put(`http://localhost:8080/users/${editingUser._id}`, formData);
        } else {
          await axios.post("http://localhost:8080/users/register", formData);
        }
        setShowDialog(false);
        fetchUsers();
      } catch (err) {
        console.error("Failed to save user", err);
      }
    } else {
      alert("Please fill all required fields.");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Failed to delete user", err);
      }
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <div>
        <button onClick={() => openDialog()}>Add New User</button>
        <button onClick={() => navigate("/admin-dashboard")}>Go to Dashboard</button>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
                <td>{user.status || "Active"}</td>
                <td>
                  <button onClick={() => openDialog(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Dialog */}
      {showDialog && (
        <div>
          <h2>{editingUser ? "Edit User" : "Add User"}</h2>
          <div>
            <input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <input
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            {!editingUser && (
              <input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            )}
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="policeman">Policeman</option>
            </select>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
            <button onClick={handleSave}>{editingUser ? "Update" : "Save"}</button>
            <button onClick={() => setShowDialog(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
