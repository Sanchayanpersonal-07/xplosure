const nodemailer = require('nodemailer');
const {
  welcomeEmail,
  resumeAnalyzedEmail,
  sessionReminderEmail,
  sessionFollowUpEmail,
  passwordResetEmail,
} = require('../utils/emailTemplates');
const EmailLog = require('../models/EmailLog');
const logger = require('../utils/logger');

// Configure transporter
let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((error) => {
    if (error) logger.error('Email service error:', error);
    else logger.info('Email service ready');
  });
} else {
  logger.warn('Email credentials missing. Email features disabled.');
}

const sendEmail = async (to, subject, html, userId = null, type = 'general') => {
  if (!transporter) {
    logger.info(`Email to ${to} skipped (no email credentials configured)`);
    return null;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Xplosure" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    await EmailLog.create({
      recipient: to,
      subject,
      type,
      userId,
      status: 'sent',
      messageId: info.messageId,
    });

    logger.info(`Email sent to ${to}: ${subject}`);
    return info;
  } catch (error) {
    logger.error(`Email failed to ${to}: ${error.message}`);
    await EmailLog.create({
      recipient: to,
      subject,
      type,
      userId,
      status: 'failed',
      error: error.message,
    });
    return null;
  }
};

exports.sendWelcomeEmail = async (user) => {
  const { subject, html } = welcomeEmail(user.name);
  await sendEmail(user.email, subject, html, user._id, 'welcome');
};

exports.sendResumeAnalyzedEmail = async (user, analysis) => {
  const { subject, html } = resumeAnalyzedEmail(user.name, analysis);
  await sendEmail(user.email, subject, html, user._id, 'resume_analyzed');
};

exports.sendSessionReminder = async (user, booking) => {
  const { subject, html } = sessionReminderEmail(user.name, booking);
  await sendEmail(user.email, subject, html, user._id, 'session_reminder');
};

exports.sendSessionFollowUp = async (user, booking) => {
  const { subject, html } = sessionFollowUpEmail(user.name, booking);
  await sendEmail(user.email, subject, html, user._id, 'session_followup');
};

// ✅ NEW: Password reset email
exports.sendPasswordResetEmail = async (user, resetToken) => {
  const { subject, html } = passwordResetEmail(user.name, resetToken);
  await sendEmail(user.email, subject, html, user._id, 'password_reset');
};

// ✅ FIX: Check if reminder already sent within last 20 hours to prevent duplicates
const hasReminderBeenSent = async (userId, type, hoursWindow = 20) => {
  const cutoff = new Date(Date.now() - hoursWindow * 60 * 60 * 1000);
  const existing = await EmailLog.findOne({
    userId,
    type,
    status: 'sent',
    createdAt: { $gte: cutoff },
  });
  return !!existing;
};

// Cron job — run every hour to check for reminders
exports.checkAndSendReminders = async () => {
  const Booking = require('../models/Booking');

  // Session reminder — bookings confirmed for tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(23, 59, 59, 999);

  const upcomingBookings = await Booking.find({
    date: { $gte: tomorrow, $lte: tomorrowEnd },
    status: 'Confirmed',
  }).populate('user');

  for (const booking of upcomingBookings) {
    if (!booking.user) continue;

    // ✅ FIX: Skip if reminder already sent for this user in last 20 hours
    const alreadySent = await hasReminderBeenSent(booking.user._id, 'session_reminder');
    if (!alreadySent) {
      await exports.sendSessionReminder(booking.user, booking);
    }
  }

  // Follow-up — bookings that were confirmed yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  const yesterdayEnd = new Date(yesterday);
  yesterdayEnd.setHours(23, 59, 59, 999);

  const pastBookings = await Booking.find({
    date: { $gte: yesterday, $lte: yesterdayEnd },
    status: 'Confirmed',
  }).populate('user');

  for (const booking of pastBookings) {
    if (!booking.user) continue;

    const alreadySent = await hasReminderBeenSent(booking.user._id, 'session_followup');
    if (!alreadySent) {
      await exports.sendSessionFollowUp(booking.user, booking);
    }
  }

  logger.info(`Reminder cron completed. Processed ${upcomingBookings.length} upcoming + ${pastBookings.length} past bookings.`);
};
