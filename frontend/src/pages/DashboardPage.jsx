import React, { useState, useCallback, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { userService } from "../services/userService";
import {
  UploadCloud,
  AlertCircle,
  FileText,
  BarChart2,
  Calendar,
  Clock,
  X,
  CheckCircle,
  Target,
  BookOpen,
  ExternalLink,
  Plus,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import PageLoader from "../components/common/PageLoader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  SERVICES,
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../utils/constants";
import { formatDate } from "../utils/validators";

const getScoreColor = (s) =>
  s >= 75 ? "var(--success)" : s >= 50 ? "var(--warning)" : "var(--error)";
const getScoreLabel = (s) =>
  s >= 75 ? "Excellent" : s >= 50 ? "Good" : "Needs Work";

const StatusBadge = ({ status }) => {
  const cls = {
    Pending: "badge-pending",
    Confirmed: "badge-confirmed",
    Cancelled: "badge-cancelled",
    Completed: "badge-completed",
  };
  return (
    <span className={`badge ${cls[status] || "badge-pending"}`}>{status}</span>
  );
};

const ScoreRing = ({ score }) => {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = getScoreColor(score);
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="10"
      />
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeDashoffset={circ / 4}
        style={{
          transition: "stroke-dasharray 1.2s ease",
          filter: `drop-shadow(0 0 8px ${color})`,
        }}
      />
      <text
        x="70"
        y="65"
        textAnchor="middle"
        fill="white"
        fontSize="26"
        fontWeight="700"
        fontFamily="var(--font-display)"
      >
        {score}
      </text>
      <text
        x="70"
        y="84"
        textAnchor="middle"
        fill={color}
        fontSize="11"
        fontFamily="var(--font-display)"
        fontWeight="600"
      >
        {getScoreLabel(score)}
      </text>
    </svg>
  );
};

const DashboardPage = () => {
  const { user, loadUser } = useAuth();
  const {
    bookings,
    loading: bookingsLoading,
    fetchBookings,
    createBooking,
    cancelBooking,
  } = useBookings();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cancelling, setCancelling] = useState(null);
  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (user) fetchBookings();
  }, [user, fetchBookings]);

  const onDrop = useCallback((accepted) => {
    if (accepted.length > 0) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (rej) => {
      const code = rej[0]?.errors[0]?.code;
      if (code === "file-too-large") toast.error("Max file size is 5MB");
      else toast.error("Only PDF files are allowed");
    },
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Select a PDF first");
      return;
    }
    const fd = new FormData();
    fd.append("resume", file);
    setUploading(true);
    try {
      await userService.uploadResume(fd);
      toast.success("Resume analyzed!");
      await loadUser();
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Analysis failed");
    } finally {
      setUploading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await createBooking(bookingData);
      setShowModal(false);
      setBookingData({ service: "", date: "", time: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  const handleCancel = async (id) => {
    setCancelling(id);
    try {
      await cancelBooking(id);
    } finally {
      setCancelling(null);
    }
  };

  if (!user) return <PageLoader />;

  return (
    <div
      style={{
        background: "var(--navy)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
      className="py-10"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p
            style={{
              color: "var(--muted)",
              fontSize: "13px",
              fontFamily: "var(--font-display)",
            }}
            className="uppercase tracking-widest mb-1"
          >
            Dashboard
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-bold text-white"
          >
            Hey, {user.name?.split(" ")[0]}! 👋
          </h1>
          <p style={{ color: "var(--muted)" }} className="mt-1 text-sm">
            {user.resumePath
              ? "Your AI analysis is ready. Here are your insights."
              : "Upload your resume to unlock AI-powered career insights."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-base font-semibold text-white mb-4 flex items-center gap-2"
              >
                <UploadCloud
                  className="w-4 h-4"
                  style={{ color: "var(--blue-light)" }}
                />
                {user.resumePath ? "Update Resume" : "Resume Analyzer"}
              </h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? "border-[var(--blue)] bg-[rgba(43,94,232,0.08)]"
                      : "border-[var(--border)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[var(--glass-hover)]"
                  }`}
                >
                  <input {...getInputProps()} />
                  <FileText
                    className="w-8 h-8 mx-auto mb-3"
                    style={{
                      color: isDragActive
                        ? "var(--blue-light)"
                        : "var(--muted)",
                    }}
                  />
                  {file ? (
                    <div>
                      <p
                        style={{ color: "var(--blue-light)" }}
                        className="font-semibold text-sm"
                      >
                        {file.name}
                      </p>
                      <p
                        style={{ color: "var(--muted)" }}
                        className="text-xs mt-1"
                      >
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-white text-sm font-medium">
                        Drop your PDF resume here
                      </p>
                      <p
                        style={{ color: "var(--muted)" }}
                        className="text-xs mt-1"
                      >
                        or click to browse · PDF only · Max 5MB
                      </p>
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={uploading || !file}
                  className="btn-primary w-full justify-center py-3"
                >
                  {uploading ? (
                    <>
                      <LoadingSpinner size="sm" className="text-white" />{" "}
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" /> Analyze Resume
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-5">
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-base font-semibold text-white flex items-center gap-2"
                >
                  <Calendar
                    className="w-4 h-4"
                    style={{ color: "var(--blue-light)" }}
                  />{" "}
                  My Sessions
                </h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-ghost py-1.5 px-3 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Book
                </button>
              </div>

              {bookingsLoading ? (
                <div className="flex justify-center py-10">
                  <LoadingSpinner size="lg" />
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b._id}
                      className="flex justify-between items-center p-4 rounded-xl transition-all"
                      style={{
                        background: "var(--glass)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {b.service}
                        </p>
                        <p
                          className="text-xs mt-0.5 flex items-center gap-1"
                          style={{ color: "var(--muted)" }}
                        >
                          <Clock className="w-3 h-3" /> {formatDate(b.date)} at{" "}
                          {b.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={b.status} />
                        {(b.status === "Pending" ||
                          b.status === "Confirmed") && (
                          <button
                            onClick={() => handleCancel(b._id)}
                            disabled={cancelling === b._id}
                            className="text-xs disabled:opacity-40 transition-colors"
                            style={{ color: "var(--error)" }}
                          >
                            {cancelling === b._id ? "..." : "Cancel"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-10 rounded-xl"
                  style={{ border: "1px dashed var(--border)" }}
                >
                  <Calendar
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "var(--muted)" }}
                  />
                  <p style={{ color: "var(--muted)" }} className="text-sm">
                    No sessions yet
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-3 text-xs font-semibold"
                    style={{ color: "var(--blue-light)" }}
                  >
                    Book your first session →
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── RIGHT ── */}
          <div className="space-y-5">
            {user.resumePath ? (
              <>
                {/* Score */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-sm font-semibold text-white mb-4"
                  >
                    ATS Score
                  </h3>
                  <div className="flex justify-center">
                    <ScoreRing score={user.atsScore || 0} />
                  </div>
                  <p style={{ color: "var(--muted)" }} className="text-xs mt-3">
                    Higher score = more recruiter visibility
                  </p>
                </motion.div>

                {/* Feedback */}
                {user.resumeFeedback?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(255,77,106,0.06)",
                      border: "1px solid rgba(255,77,106,0.2)",
                    }}
                  >
                    <h3
                      className="text-sm font-semibold mb-3 flex items-center gap-2"
                      style={{
                        color: "#FF8FA3",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      <AlertCircle className="w-4 h-4" /> Areas to Improve
                    </h3>
                    <ul className="space-y-2">
                      {user.resumeFeedback.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs leading-relaxed flex gap-2"
                          style={{ color: "rgba(255,143,163,0.8)" }}
                        >
                          <span className="mt-0.5 flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Matched Roles */}
                {user.matchedRoles?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="glass rounded-2xl p-5"
                  >
                    <h3
                      className="text-sm font-semibold mb-3 flex items-center gap-2 text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <Target
                        className="w-4 h-4"
                        style={{ color: "var(--blue-light)" }}
                      />{" "}
                      Career Matches
                    </h3>
                    <div className="space-y-3">
                      {user.matchedRoles.map((r, i) => (
                        <div
                          key={i}
                          className="rounded-xl p-3"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-xs font-semibold text-white">
                              {r.role}
                            </p>
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(43,94,232,0.2)",
                                color: "var(--blue-light)",
                                border: "1px solid rgba(43,94,232,0.3)",
                              }}
                            >
                              {r.matchPercentage}%
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {r.roadmap.slice(0, 2).map((step, j) => (
                              <li
                                key={j}
                                className="text-xs flex gap-1.5"
                                style={{ color: "var(--muted)" }}
                              >
                                <span style={{ color: "var(--blue-light)" }}>
                                  →
                                </span>{" "}
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Skill Gap */}
                {user.skillGap?.missingSkills?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-2xl p-5"
                  >
                    <h3
                      className="text-sm font-semibold mb-3 flex items-center gap-2 text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <BookOpen
                        className="w-4 h-4"
                        style={{ color: "var(--cyan)" }}
                      />{" "}
                      Skill Gap · {user.skillGap.role}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {user.skillGap.missingSkills.slice(0, 5).map((s, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(0,198,255,0.1)",
                            color: "var(--cyan)",
                            border: "1px solid rgba(0,198,255,0.2)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {user.skillGap.courses?.map((item, i) => (
                        <div key={i}>
                          {item.courses.map((c, j) => (
                            <a
                              key={j}
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs py-1 transition-colors"
                              style={{ color: "var(--blue-light)" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--cyan)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.color =
                                  "var(--blue-light)")
                              }
                            >
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />{" "}
                              {c.title}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Recommended Sessions */}
                {user.recommendedCounseling?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="rounded-2xl p-5"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--navy-3), rgba(43,94,232,0.2))",
                      border: "1px solid rgba(43,94,232,0.3)",
                    }}
                  >
                    <h3
                      className="text-sm font-semibold mb-3 flex items-center gap-2 text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <TrendingUp
                        className="w-4 h-4"
                        style={{ color: "var(--blue-light)" }}
                      />{" "}
                      Recommended Sessions
                    </h3>
                    <div className="space-y-2">
                      {user.recommendedCounseling.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl p-3"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <p className="text-xs font-medium text-white mb-2">
                            {item}
                          </p>
                          <button
                            onClick={() => {
                              setBookingData((d) => ({ ...d, service: item }));
                              setShowModal(true);
                            }}
                            className="w-full text-xs py-1.5 rounded-lg font-semibold transition-all"
                            style={{
                              background: "var(--blue)",
                              color: "white",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "var(--blue-light)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "var(--blue)")
                            }
                          >
                            Book Session
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="glass rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[280px]"
              >
                <BarChart2
                  className="w-10 h-10 mb-3"
                  style={{ color: "rgba(255,255,255,0.1)" }}
                />
                <p className="text-sm font-semibold text-white mb-1">
                  No Analysis Yet
                </p>
                <p style={{ color: "var(--muted)" }} className="text-xs">
                  Upload your resume to see your ATS score and personalized
                  roadmap.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(6,9,26,0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass rounded-2xl p-8 relative shadow-2xl"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-[var(--muted)] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-lg font-bold text-white mb-1"
            >
              Book a Session
            </h3>
            <p style={{ color: "var(--muted)" }} className="text-sm mb-6">
              Choose your service, date and time
            </p>

            <form onSubmit={handleBooking} className="space-y-4">
              {[
                {
                  label: "Service",
                  el: (
                    <select
                      value={bookingData.service}
                      required
                      onChange={(e) =>
                        setBookingData((d) => ({
                          ...d,
                          service: e.target.value,
                        }))
                      }
                      className="input-dark"
                      /* ✅ FIX: Removed inline appearance style, handling via CSS */
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ),
                },
                {
                  label: "Date",
                  el: (
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData((d) => ({ ...d, date: e.target.value }))
                      }
                      className="input-dark"
                    />
                  ),
                },
                {
                  label: "Time",
                  el: (
                    <input
                      type="time"
                      required
                      value={bookingData.time}
                      onChange={(e) =>
                        setBookingData((d) => ({ ...d, time: e.target.value }))
                      }
                      className="input-dark"
                    />
                  ),
                },
              ].map(({ label, el }) => (
                <div key={label}>
                  <label
                    style={{
                      color: "rgba(248,250,255,0.7)",
                      fontFamily: "var(--font-display)",
                    }}
                    className="block text-sm font-medium mb-1.5"
                  >
                    {label}
                  </label>
                  {el}
                </div>
              ))}
              <button
                type="submit"
                className="btn-primary w-full justify-center py-3 mt-2"
              >
                <CheckCircle className="w-4 h-4" /> Confirm Booking
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
