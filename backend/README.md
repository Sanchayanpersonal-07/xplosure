# Xplosure Backend API

Career counselling system backend built with Node.js, Express, and MongoDB.

## Project Structure

```
xplosure-backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── bookingController.js
│   ├── coverLetterController.js
│   └── userController.js
├── middleware/
│   ├── admin.js               # Admin role check
│   ├── auth.js                # JWT verification
│   ├── errorHandler.js        # Global error handler
│   ├── upload.js              # Multer file upload config
│   └── validation.js          # Request validation rules
├── models/
│   ├── Booking.js
│   ├── EmailLog.js
│   ├── Pricing.js
│   └── User.js
├── routes/
│   ├── admin.js
│   ├── auth.js
│   ├── bookings.js
│   ├── coverLetter.js
│   └── users.js
├── services/
│   └── emailService.js        # Nodemailer + cron reminders
├── utils/
│   ├── coverLetterGenerator.js
│   ├── emailTemplates.js
│   ├── logger.js              # Winston logger
│   └── resumeAnalyzer.js      # PDF parsing + ATS scoring
├── uploads/                   # Resume files (gitignored)
├── logs/                      # Winston log files (gitignored)
├── .env.example
├── package.json
└── server.js
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Fill in your values in .env

# 3. Start development server
npm run dev

# 4. Start production server
npm start
```

## API Endpoints

### Auth — `/api/auth`
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/signup` | Public | Register new user |
| POST | `/login` | Public | Login and get token |
| GET | `/user` | Private | Get current user |
| POST | `/forgot-password` | Public | Send reset email |
| POST | `/reset-password` | Public | Reset with token |

### Users — `/api/users`
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/profile` | Private | Get profile |
| PUT | `/profile` | Private | Update name |
| PUT | `/change-password` | Private | Change password |
| POST | `/upload-resume` | Private | Upload & analyze resume (PDF, max 5MB) |

### Bookings — `/api/bookings`
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/` | Private | Create booking |
| GET | `/my-bookings` | Private | Get my bookings |
| GET | `/:id` | Private | Get single booking |
| PATCH | `/:id/cancel` | Private | Cancel booking |

### Admin — `/api/admin`
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/stats` | Admin | Dashboard stats |
| GET | `/users` | Admin | All users (paginated) |
| GET | `/users/:id` | Admin | Single user |
| PUT | `/users/:id` | Admin | Update user |
| GET | `/bookings` | Admin | All bookings (paginated) |
| PATCH | `/bookings/:id` | Admin | Update booking status |

### Cover Letter — `/api/cover-letter`
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/generate` | Private | Generate cover letter |

## Authentication

Send token in one of two ways:
```
x-auth-token: <your_token>
Authorization: Bearer <your_token>
```

## Environment Variables

See `.env.example` for all required variables.
