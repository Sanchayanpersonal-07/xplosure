import React, { useEffect, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import api from "../services/api";
import {
  Users,
  Calendar,
  Clock,
  FileText,
  Mail,
  CheckCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";
import PageLoader from "../components/common/PageLoader";
import { formatDate } from "../utils/validators";

// ✅ NEW: Import PricingManagement Component
import PricingManagement from "../components/admin/PricingManagement";

// ✅ FIX: Defined STAT_CONFIG with named Icon references
// instead of destructuring rename which ESLint flags as unused
const STAT_CONFIG = [
  { key: "totalUsers", label: "Total Users", Icon: Users, color: "#4B7BFF" },
  {
    key: "totalBookings",
    label: "Total Bookings",
    Icon: Calendar,
    color: "#10D08C",
  },
  { key: "pendingBookings", label: "Pending", Icon: Clock, color: "#F5A623" },
  {
    key: "confirmedBookings",
    label: "Confirmed",
    Icon: CheckCircle,
    color: "#10D08C",
  },
  {
    key: "usersWithResume",
    label: "With Resume",
    Icon: FileText,
    color: "#A78BFA",
  },
  { key: "emailsSent", label: "Emails Sent", Icon: Mail, color: "#F472B6" },
];

const StatusBadge = ({ status }) => {
  const map = {
    Pending: "badge-pending",
    Confirmed: "badge-confirmed",
    Cancelled: "badge-cancelled",
    Completed: "badge-completed",
  };
  return (
    <span className={`badge ${map[status] || "badge-pending"}`}>{status}</span>
  );
};

const AdminDashboard = () => {
  // ✅ FIX: Removed unused 'user' from useAuth — admin check is handled by PrivateRoute
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [tab, setTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userPagination, setUserPagination] = useState({});
  const [bookingsPagination, setBookingsPagination] = useState({});

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data.stats);
      setRecentUsers(res.data.recentUsers);
      setRecentBookings(res.data.recentBookings);
    } catch {
      toast.error("Failed to load stats");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get("/admin/users", {
        params: { page: userPage, limit: 10, search },
      });
      setUsers(res.data.users);
      setUserPagination(res.data.pagination);
    } catch {
      toast.error("Failed to load users");
    }
  }, [userPage, search]);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await api.get("/admin/bookings", {
        params: { page: 1, limit: 50 },
      });
      setBookings(res.data.bookings);
      setBookingsPagination(res.data.pagination);
    } catch {
      toast.error("Failed to load bookings");
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (tab === "users") fetchUsers();
    if (tab === "bookings") fetchBookings();
  }, [tab, fetchUsers, fetchBookings]);

  const updateBooking = async (id, status) => {
    try {
      await api.patch(`/admin/bookings/${id}`, { status });
      toast.success(`Marked as ${status}`);
      fetchBookings();
      fetchStats();
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div
      style={{
        background: "var(--navy)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
      className="py-10"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-7">
          <p
            style={{
              color: "var(--muted)",
              fontSize: "12px",
              fontFamily: "var(--font-display)",
            }}
            className="uppercase tracking-widest mb-1"
          >
            Admin Panel
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-bold text-white"
          >
            Dashboard
          </h1>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 mb-7 p-1 rounded-xl w-fit"
          style={{
            background: "var(--navy-2)",
            border: "1px solid var(--border)",
          }}
        >
          {/* ✅ UPDATED: Added "pricing" to the tabs array */}
          {["overview", "users", "bookings", "pricing"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all"
              style={
                tab === t
                  ? {
                      background: "var(--blue)",
                      color: "white",
                      fontFamily: "var(--font-display)",
                      boxShadow: "0 4px 12px var(--blue-glow)",
                    }
                  : { color: "var(--muted)", fontFamily: "var(--font-display)" }
              }
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-7">
              {/* ✅ FIX: Using item.Icon directly instead of destructuring rename */}
              {STAT_CONFIG.map((item) => (
                <div
                  key={item.key}
                  className="glass glass-hover rounded-xl p-4"
                >
                  <item.Icon
                    className="w-4 h-4 mb-2"
                    style={{ color: item.color }}
                  />
                  <p
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stats?.[item.key] ?? 0}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            {stats?.bookingsByMonth?.length > 0 && (
              <div className="glass rounded-2xl p-6 mb-7">
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-sm font-semibold text-white mb-5 flex items-center gap-2"
                >
                  <BarChart3
                    className="w-4 h-4"
                    style={{ color: "var(--blue-light)" }}
                  />
                  Bookings Trend (Last 6 Months)
                </h2>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={stats.bookingsByMonth}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.04)"
                    />
                    <XAxis
                      dataKey="_id"
                      tick={{ fill: "var(--muted)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "var(--muted)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--navy-2)",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        color: "white",
                        fontSize: 12,
                      }}
                      cursor={{ fill: "rgba(43,94,232,0.08)" }}
                    />
                    <Bar
                      dataKey="count"
                      fill="var(--blue)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent panels */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="glass rounded-2xl p-6">
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-sm font-semibold text-white mb-4"
                >
                  Recent Users
                </h2>
                <div className="space-y-2">
                  {recentUsers.length === 0 && (
                    <p
                      className="text-sm text-center py-4"
                      style={{ color: "var(--muted)" }}
                    >
                      No users yet
                    </p>
                  )}
                  {recentUsers.map((u) => (
                    <div
                      key={u._id}
                      className="flex justify-between items-center p-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div>
                        <p className="text-sm font-medium text-white">
                          {u.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--muted)" }}
                        >
                          {u.email}
                        </p>
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{
                          color:
                            u.atsScore >= 75
                              ? "var(--success)"
                              : u.atsScore >= 50
                                ? "var(--warning)"
                                : "var(--muted)",
                        }}
                      >
                        {u.resumePath ? `${u.atsScore}%` : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="glass rounded-2xl p-6">
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-sm font-semibold text-white mb-4"
                >
                  Recent Bookings
                </h2>
                <div className="space-y-2">
                  {recentBookings.length === 0 && (
                    <p
                      className="text-sm text-center py-4"
                      style={{ color: "var(--muted)" }}
                    >
                      No bookings yet
                    </p>
                  )}
                  {recentBookings.map((b) => (
                    <div
                      key={b._id}
                      className="p-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-white">
                          {b.service}
                        </p>
                        <StatusBadge status={b.status} />
                      </div>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--muted)" }}
                      >
                        {b.user?.name} · {formatDate(b.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {tab === "users" && (
          <div className="glass rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-base font-semibold text-white"
              >
                All Users
              </h2>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border)",
                }}
              >
                <Search className="w-4 h-4" style={{ color: "var(--muted)" }} />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setUserPage(1);
                  }}
                  placeholder="Search users…"
                  className="bg-transparent outline-none text-sm text-white placeholder-[var(--muted)] w-44"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full dark-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>ATS</th>
                    <th>Resume</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-10"
                        style={{ color: "var(--muted)" }}
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u._id}>
                        <td className="font-medium text-white">{u.name}</td>
                        <td style={{ color: "var(--muted)" }}>{u.email}</td>
                        <td>
                          {u.resumePath ? (
                            <span
                              className="font-bold"
                              style={{
                                color:
                                  u.atsScore >= 75
                                    ? "var(--success)"
                                    : u.atsScore >= 50
                                      ? "var(--warning)"
                                      : "var(--error)",
                              }}
                            >
                              {u.atsScore}%
                            </span>
                          ) : (
                            <span style={{ color: "var(--muted)" }}>—</span>
                          )}
                        </td>
                        <td>
                          {u.resumePath ? (
                            <span style={{ color: "var(--success)" }}>✓</span>
                          ) : (
                            <span style={{ color: "var(--muted)" }}>—</span>
                          )}
                        </td>
                        <td>
                          <span
                            className="badge"
                            style={
                              u.role === "admin"
                                ? {
                                    background: "rgba(167,139,250,0.15)",
                                    color: "#A78BFA",
                                    border: "1px solid rgba(167,139,250,0.3)",
                                  }
                                : {
                                    background: "rgba(75,123,255,0.15)",
                                    color: "var(--blue-light)",
                                    border: "1px solid rgba(75,123,255,0.3)",
                                  }
                            }
                          >
                            {u.role}
                          </span>
                        </td>
                        <td style={{ color: "var(--muted)" }}>
                          {formatDate(u.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {userPagination?.pages > 1 && (
              <div
                className="flex justify-between items-center mt-5 pt-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Page {userPagination.page} of {userPagination.pages} ·{" "}
                  {userPagination.total} users
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                    disabled={userPage === 1}
                    className="p-2 rounded-lg transition-all disabled:opacity-30"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setUserPage((p) => p + 1)}
                    disabled={userPage >= userPagination.pages}
                    className="p-2 rounded-lg transition-all disabled:opacity-30"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── BOOKINGS ── */}
        {tab === "bookings" && (
          <div className="glass rounded-2xl p-6">
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-base font-semibold text-white mb-5"
            >
              All Bookings{" "}
              {bookingsPagination?.total > 0 && (
                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: "13px",
                    fontWeight: 400,
                  }}
                >
                  ({bookingsPagination.total})
                </span>
              )}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full dark-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-10"
                        style={{ color: "var(--muted)" }}
                      >
                        No bookings
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b._id}>
                        <td className="font-medium text-white">
                          {b.user?.name}
                        </td>
                        <td style={{ color: "rgba(248,250,255,0.75)" }}>
                          {b.service}
                        </td>
                        <td style={{ color: "var(--muted)" }}>
                          {formatDate(b.date)}
                        </td>
                        <td style={{ color: "var(--muted)" }}>{b.time}</td>
                        <td>
                          <StatusBadge status={b.status} />
                        </td>
                        <td>
                          <div className="flex gap-2">
                            {b.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateBooking(b._id, "Confirmed")
                                  }
                                  className="text-xs px-2 py-1 rounded-lg font-medium"
                                  style={{
                                    background: "rgba(16,208,140,0.1)",
                                    color: "var(--success)",
                                    border: "1px solid rgba(16,208,140,0.2)",
                                  }}
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() =>
                                    updateBooking(b._id, "Cancelled")
                                  }
                                  className="text-xs px-2 py-1 rounded-lg font-medium"
                                  style={{
                                    background: "rgba(255,77,106,0.1)",
                                    color: "var(--error)",
                                    border: "1px solid rgba(255,77,106,0.2)",
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {b.status === "Confirmed" && (
                              <button
                                onClick={() =>
                                  updateBooking(b._id, "Completed")
                                }
                                className="text-xs px-2 py-1 rounded-lg font-medium"
                                style={{
                                  background: "rgba(75,123,255,0.1)",
                                  color: "var(--blue-light)",
                                  border: "1px solid rgba(75,123,255,0.2)",
                                }}
                              >
                                Done
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PRICING ── */}
        {/* ✅ NEW: Render PricingManagement when the pricing tab is active */}
        {tab === "pricing" && <PricingManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
