const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const dns = require("dns");
const cron = require("node-cron");
const emailService = require("./services/emailService");
const logger = require("./utils/logger");
const authMiddleware = require("./middleware/auth");
require("dotenv").config();

// Force IPv4 for DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Validate required environment variables
const requiredEnv = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", process.env.CLIENT_URL],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

// Request logging
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/signup", authLimiter);

// ✅ FIX: Serve uploaded resumes with auth check (not publicly accessible)
app.get("/uploads/:filename", authMiddleware, (req, res) => {
  const filename = req.params.filename;

  // Security: prevent path traversal
  if (filename.includes("..") || filename.includes("/")) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid filename" });
  }

  // Only allow user to access their own files (filename starts with their userId)
  if (!filename.startsWith(req.user.id)) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  const filePath = path.join(__dirname, "uploads", filename);
  res.sendFile(filePath, (err) => {
    if (err)
      res.status(404).json({ success: false, message: "File not found" });
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Xplosure API Running" });
});

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/cover-letter", require("./routes/coverLetter"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});

// ✅ FIX: Cron job uses logger instead of console.error
cron.schedule("0 * * * *", async () => {
  logger.info("Running email reminder cron job...");
  try {
    await emailService.checkAndSendReminders();
  } catch (err) {
    logger.error("Cron job error:", err);
  }
});

// ✅ FIX: Graceful shutdown closes MongoDB connection
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received: closing HTTP server`);
  server.close(async () => {
    logger.info("HTTP server closed");
    await mongoose.connection.close();
    logger.info("MongoDB connection closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
