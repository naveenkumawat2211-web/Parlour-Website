import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Scissors,
  Settings,
  Users,
} from "lucide-react";
import {
  getAdmin,
  getAppointments,
  getPayments,
  getSalon,
  getServices,
  isAdminLoggedIn,
  saveAdmin,
  saveAppointments,
  savePayments,
  saveSalon,
  saveServices,
  setAdminSession,
  clearAdminSession,
  makeId,
} from "../utils/storage";
import { PageHero } from "../components/UI";

export function AdminLogin() {
  const [email, setEmail] = useState("admin@khushibeauty.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const admin = getAdmin();
    if (email === admin.email && password === admin.password) {
      setAdminSession(true);
      navigate("/admin");
    } else {
      setError("Email or password is incorrect.");
    }
  }

  return (
    <section className="admin-login-wrap">
      <form className="admin-login" onSubmit={submit}>
        <span className="eyebrow">KHUSHI BEAUTY PARLOUR</span>
        <h1>Admin Login</h1>
        <p>Sign in to manage your salon website demo.</p>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="button button-dark w-full">
          Login to Dashboard
        </button>
        <small>Demo: admin@khushibeauty.com / 123456</small>
        <Link to="/">← Back to website</Link>
      </form>
    </section>
  );
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Overview");
  const [services, setServices] = useState(getServices());
  const [appointments, setAppointments] = useState(getAppointments());
  const [payments, setPayments] = useState(getPayments());
  const [salon, setSalonState] = useState(getSalon());
  const [notice, setNotice] = useState("");
  const [serviceForm, setServiceForm] = useState({
    name: "",
    category: "Facial",
    description: "",
    price: "",
    duration: "30 min",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    saveServices(services);
  }, [services]);

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  const paid = payments
    .filter((p) => p.status === "Success")
    .reduce((n, p) => n + Number(p.amount || 0), 0);

  if (!isAdminLoggedIn()) return <Navigate to="/admin/login" replace />;

  function logout() {
    clearAdminSession();
    navigate("/admin/login");
  }

  function saveService(e) {
    e.preventDefault();
    if (!serviceForm.name.trim()) return;
    if (editingId) {
      setServices(
        services.map((s) =>
          s.id === editingId ? { ...s, ...serviceForm } : s,
        ),
      );
    } else {
      setServices([
        { id: makeId(), ...serviceForm, active: true },
        ...services,
      ]);
    }
    setServiceForm({
      name: "",
      category: "Facial",
      description: "",
      price: "",
      duration: "30 min",
    });
    setEditingId(null);
    setNotice("Service saved.");
  }

  function editService(s) {
    setEditingId(s.id);
    setServiceForm({
      name: s.name,
      category: s.category,
      description: s.description,
      price: s.price || "",
      duration: s.duration || "",
    });
  }

  function deleteService(id) {
    if (confirm("Delete this service?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  }

  function updateStatus(id, status) {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status } : a)),
    );
  }

  function mockPayment() {
    const amount = prompt(
      "Enter test payment amount in rupees (demo only):",
      "500",
    );
    if (!amount || !Number.isFinite(Number(amount)) || Number(amount) <= 0)
      return;
    const next = [
      {
        id: makeId(),
        amount: Number(amount),
        status: "Success",
        createdAt: new Date().toISOString(),
        method: "Mock payment",
      },
      ...payments,
    ];
    setPayments(next);
    savePayments(next);
    setNotice("Mock payment record added. No real money was collected.");
  }

  function saveBusiness(e) {
    e.preventDefault();
    saveSalon(salon);
    setNotice("Salon details saved in this browser.");
  }

  const tabs = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Services", icon: Scissors },
    { name: "Bookings", icon: CalendarDays },
    { name: "Payments", icon: IndianRupee },
    { name: "Settings", icon: Settings },
  ];

  return (
    <>
      <PageHero
        eyebrow="MANAGEMENT AREA"
        title="Admin Dashboard"
        text="Manage website content and locally stored appointment requests."
      />
      <section className="section container admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-welcome">
            <b>Welcome, Admin</b>
            <small>Khushi Beauty Parlour</small>
          </div>
          {tabs.map((t) => (
            <button
              key={t.name}
              className={tab === t.name ? "admin-tab selected" : "admin-tab"}
              onClick={() => {
                setTab(t.name);
                setNotice("");
              }}
            >
              <t.icon size={17} />
              {t.name}
            </button>
          ))}
          <button className="admin-tab logout" onClick={logout}>
            <LogOut size={17} /> Logout
          </button>
        </aside>
        <div className="admin-content">
          {notice && <div className="notice">{notice}</div>}
          {tab === "Overview" && (
            <>
              <div className="admin-title">
                <div>
                  <span className="eyebrow">OVERVIEW</span>
                  <h2>Dashboard summary</h2>
                </div>
              </div>
              <div className="stats-grid">
                <Stat
                  icon={Scissors}
                  label="Active services"
                  value={services.filter((s) => s.active).length}
                />
                <Stat
                  icon={CalendarDays}
                  label="Total bookings"
                  value={appointments.length}
                />
                <Stat
                  icon={Users}
                  label="Pending bookings"
                  value={
                    appointments.filter((a) => a.status === "Pending").length
                  }
                />
                <Stat
                  icon={IndianRupee}
                  label="Recorded revenue"
                  value={`₹${paid}`}
                />
              </div>
              <div className="admin-panel">
                <h3>Recent appointment requests</h3>
                <BookingTable
                  appointments={appointments.slice(0, 5)}
                  onStatus={updateStatus}
                />
              </div>
            </>
          )}
          {tab === "Services" && (
            <>
              <div className="admin-title">
                <div>
                  <span className="eyebrow">CATALOGUE</span>
                  <h2>Service Management</h2>
                </div>
              </div>
              <form className="admin-form-grid" onSubmit={saveService}>
                <label>
                  Service name
                  <input
                    value={serviceForm.name}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, name: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Category
                  <select
                    value={serviceForm.category}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        category: e.target.value,
                      })
                    }
                  >
                    {[
                      "Facial",
                      "Skin Care",
                      "Threading",
                      "Hair",
                      "Nail Care",
                      "Waxing",
                      "Other",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Price (₹)
                  <input
                    type="number"
                    min="0"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, price: e.target.value })
                    }
                    placeholder="Leave blank for enquiry"
                  />
                </label>
                <label>
                  Duration
                  <input
                    value={serviceForm.duration}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        duration: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="wide">
                  Description
                  <input
                    value={serviceForm.description}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        description: e.target.value,
                      })
                    }
                  />
                </label>
                <div className="wide form-buttons">
                  <button className="button button-dark">
                    {editingId ? "Update Service" : "Add Service"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      className="button button-outline"
                      onClick={() => {
                        setEditingId(null);
                        setServiceForm({
                          name: "",
                          category: "Facial",
                          description: "",
                          price: "",
                          duration: "30 min",
                        });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
              <div className="admin-panel">
                <h3>All services</h3>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((s) => (
                        <tr key={s.id}>
                          <td>{s.name}</td>
                          <td>{s.category}</td>
                          <td>{s.price ? `₹${s.price}` : "On request"}</td>
                          <td>
                            <button
                              className="mini-action"
                              onClick={() => editService(s)}
                            >
                              Edit
                            </button>
                            <button
                              className="mini-action danger"
                              onClick={() => deleteService(s.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {tab === "Bookings" && (
            <div className="admin-panel">
              <div className="admin-title">
                <div>
                  <span className="eyebrow">CUSTOMER REQUESTS</span>
                  <h2>Booking Management</h2>
                </div>
              </div>
              <BookingTable
                appointments={appointments}
                onStatus={updateStatus}
              />
            </div>
          )}
          {tab === "Payments" && (
            <div className="admin-panel">
              <div className="admin-title">
                <div>
                  <span className="eyebrow">DEMO ONLY</span>
                  <h2>Payment Management</h2>
                </div>
                <button className="button button-dark" onClick={mockPayment}>
                  Add Mock Payment
                </button>
              </div>
              <p className="muted">
                This records a test payment only. It does not charge a customer.
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id}>
                        <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                        <td>₹{p.amount}</td>
                        <td>{p.method}</td>
                        <td>
                          <span className="status-pill confirmed">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!payments.length && (
                  <p className="empty-state">No payment records yet.</p>
                )}
              </div>
            </div>
          )}
          {tab === "Settings" && (
            <form className="admin-panel settings-form" onSubmit={saveBusiness}>
              <span className="eyebrow">BUSINESS PROFILE</span>
              <h2>Salon Settings</h2>
              <label>
                Salon name
                <input
                  value={salon.name}
                  onChange={(e) =>
                    setSalonState({ ...salon, name: e.target.value })
                  }
                />
              </label>
              <label>
                Location
                <input
                  value={salon.city}
                  onChange={(e) =>
                    setSalonState({ ...salon, city: e.target.value })
                  }
                />
              </label>
              <label>
                Contact person
                <input
                  value={salon.contactPerson}
                  onChange={(e) =>
                    setSalonState({ ...salon, contactPerson: e.target.value })
                  }
                />
              </label>
              <label>
                Phone number
                <input
                  value={salon.phone}
                  onChange={(e) =>
                    setSalonState({ ...salon, phone: e.target.value })
                  }
                />
              </label>
              <label>
                WhatsApp number with country code
                <input
                  value={salon.whatsapp}
                  onChange={(e) =>
                    setSalonState({ ...salon, whatsapp: e.target.value })
                  }
                />
              </label>
              <button className="button button-dark">Save Settings</button>
              <p className="muted">Changes are stored only in this browser.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="stat-card">
      <span>
        <Icon />
      </span>
      <small>{label}</small>
      <b>{value}</b>
    </div>
  );
}

function BookingTable({ appointments, onStatus }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date / Time</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.service}</td>
              <td>
                {a.date}
                <small className="cell-sub">{a.time}</small>
              </td>
              <td>{a.phone}</td>
              <td>
                <select
                  className="status-select"
                  value={a.status}
                  onChange={(e) => onStatus(a.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!appointments.length && (
        <p className="empty-state">No appointment requests yet.</p>
      )}
    </div>
  );
}
