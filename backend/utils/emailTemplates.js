const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

exports.welcomeEmail = (name) => ({
  subject: 'Welcome to Xplosure! 🚀',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: #2563eb; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0;">Welcome to Xplosure!</h1>
      </div>
      <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hi <strong>${name}</strong>,</p>
        <p>We're excited to have you on board. Your journey to a better career starts here.</p>
        <p>Here's what you can do next:</p>
        <ul style="line-height: 2;">
          <li>📄 Upload your resume for AI-powered analysis</li>
          <li>🗺️ Get personalized career roadmaps</li>
          <li>📅 Book 1-on-1 counseling sessions</li>
          <li>✉️ Generate tailored cover letters</li>
        </ul>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${CLIENT_URL}/dashboard"
             style="display: inline-block; padding: 14px 28px; background: #2563eb; color: white;
                    text-decoration: none; border-radius: 8px; font-weight: bold;">
            Go to Dashboard →
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">If you did not create this account, you can safely ignore this email.</p>
        <p>Best regards,<br><strong>The Xplosure Team</strong></p>
      </div>
    </div>
  `,
});

exports.resumeAnalyzedEmail = (name, analysis) => ({
  subject: 'Your Resume Analysis is Ready! 📊',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: #2563eb; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0;">Resume Analysis Complete</h1>
      </div>
      <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hi <strong>${name}</strong>,</p>
        <p>We've analyzed your resume. Here's a quick summary:</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <!-- ✅ FIX: Safe access with fallback values -->
          <p><strong>ATS Score:</strong> ${analysis?.atsScore ?? 'N/A'}%</p>
          <p><strong>Top Matched Role:</strong> ${analysis?.matchedRoles?.[0]?.role ?? 'N/A'}</p>
          <p><strong>Key Feedback:</strong> ${analysis?.feedback?.[0] ?? 'Check your dashboard for full details.'}</p>
        </div>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${CLIENT_URL}/dashboard"
             style="display: inline-block; padding: 14px 28px; background: #2563eb; color: white;
                    text-decoration: none; border-radius: 8px; font-weight: bold;">
            View Full Analysis →
          </a>
        </div>
        <p>Best,<br><strong>Xplosure Team</strong></p>
      </div>
    </div>
  `,
});

exports.sessionReminderEmail = (name, booking) => ({
  subject: 'Reminder: Your Session is Tomorrow! ⏰',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: #2563eb; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0;">Session Reminder</h1>
      </div>
      <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hi <strong>${name}</strong>,</p>
        <p>This is a friendly reminder about your upcoming counseling session:</p>
        <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 4px 0;"><strong>Service:</strong> ${booking?.service ?? 'N/A'}</p>
          <p style="margin: 4px 0;"><strong>Date:</strong> ${booking?.date ? new Date(booking.date).toDateString() : 'N/A'}</p>
          <p style="margin: 4px 0;"><strong>Time:</strong> ${booking?.time ?? 'N/A'}</p>
        </div>
        <p>💡 Please be ready <strong>5 minutes before</strong> the scheduled time.</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${CLIENT_URL}/dashboard"
             style="display: inline-block; padding: 14px 28px; background: #2563eb; color: white;
                    text-decoration: none; border-radius: 8px; font-weight: bold;">
            View Dashboard →
          </a>
        </div>
        <p>See you soon!<br><strong>Xplosure Team</strong></p>
      </div>
    </div>
  `,
});

exports.sessionFollowUpEmail = (name, booking) => ({
  subject: 'How was your session? We\'d love your feedback 💬',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: #2563eb; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0;">Session Follow-Up</h1>
      </div>
      <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hi <strong>${name}</strong>,</p>
        <p>We hope your <strong>${booking?.service ?? 'counseling'}</strong> session went well!</p>
        <p>Your feedback helps us improve our services for everyone. It only takes 1 minute!</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${CLIENT_URL}/feedback"
             style="display: inline-block; padding: 14px 28px; background: #2563eb; color: white;
                    text-decoration: none; border-radius: 8px; font-weight: bold;">
            Leave Feedback →
          </a>
        </div>
        <p>Thank you for choosing Xplosure!<br><strong>The Xplosure Team</strong></p>
      </div>
    </div>
  `,
});

// ✅ NEW: Password reset email
exports.passwordResetEmail = (name, resetToken) => ({
  subject: 'Reset Your Xplosure Password 🔐',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: #2563eb; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0;">Password Reset</h1>
      </div>
      <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hi <strong>${name}</strong>,</p>
        <p>We received a request to reset your password. Click the button below to set a new one:</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${CLIENT_URL}/reset-password?token=${resetToken}"
             style="display: inline-block; padding: 14px 28px; background: #dc2626; color: white;
                    text-decoration: none; border-radius: 8px; font-weight: bold;">
            Reset My Password →
          </a>
        </div>
        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px;">
            ⚠️ This link expires in <strong>15 minutes</strong>. If you did not request a password reset,
            please ignore this email — your account is safe.
          </p>
        </div>
        <p style="margin-top: 24px;">Best regards,<br><strong>Xplosure Team</strong></p>
      </div>
    </div>
  `,
});
