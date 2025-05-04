import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';
import logo from '../assets/crims_logo.png';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    station: "",
    role: "policeman",
    status: "Active",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openDialog = (user = null) => {
    setEditingUser(user);
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        station: user.station || "",
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
        station: "",
        role: "policeman",
        status: "Active",
        password: "",
      });
    }
    setShowDialog(true);
  };

  const handleSave = async () => {
    const { firstName, lastName, email, phoneNumber, station } = formData;
    if (firstName && lastName && email && phoneNumber && station) {
      try {
        if (editingUser) {
          await axios.put(`http://localhost:8080/api/v1/users/${editingUser._id}`, formData);
        } else {
          await axios.post("http://localhost:8080/api/v1/users/register", formData);
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Failed to delete user", err);
      }
    }
  };

  const handleSendNotification = async () => {
    const message = prompt('Enter message to send to all users:');
    if (!message) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/admin/notify', { message }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Notification sent successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to send notification.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      {/* Top Navigation Bar */}
      <header className={styles.topNav}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} />
          <span>CRIMS</span>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <button className={styles.sideButton} onClick={() => navigate('/dashboard')}>📊 Dashboard</button>
          <button className={styles.sideButton} onClick={() => navigate('/crime-map')}>🗺️ Crime Map</button>
          <button className={styles.sideButton} onClick={() => navigate('/statistics')}>📈 Statistics</button>
          <button className={`${styles.sideButton} ${styles.active}`} onClick={() => navigate('/admin/manage-users')}>⚙️ Manage Users</button>
          <button className={styles.sideButton} onClick={handleSendNotification}>📢 Brodcast Message</button>
          <button className={styles.logoutButton} onClick={handleLogout}>⭕ Logout</button>
        </aside>

        {/* Main Panel */}
        <main className={styles.mainContent}>
          <div className={styles.titleBar}>⚙️ MANAGE USERS</div>
          <button className={styles.submitBtn} onClick={() => openDialog()}>Add New User</button>
          <div className={styles.subTitleBar}>User Lists</div>

          <table className={styles.table}>
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
                    <button className={styles.actEditBtn} onClick={() => openDialog(user)}>Edit</button>
                    <button className={styles.actDelBtn} onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* User Dialog */}
          {showDialog && (
            <div>
              <div className={styles.subEditBar}>
                {editingUser ? "Edit User" : "Add User"}
              </div>
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
                  placeholder="Station"
                  value={formData.station}
                  onChange={(e) => setFormData({ ...formData, station: e.target.value })}
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
                <button className={styles.submitBtn} onClick={() => setShowDialog(false)}>Cancel</button>
                <button className={styles.submitBtn2} onClick={handleSave}>{editingUser ? "Update" : "Save"}</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ManageUsers;
