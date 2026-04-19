export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ATS_SCORE_COLORS = {
  high: 'border-green-500 text-green-700',
  medium: 'border-yellow-400 text-yellow-700',
  low: 'border-red-500 text-red-700',
};

export const BOOKING_STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Confirmed: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
  Completed: 'bg-blue-100 text-blue-800 border-blue-200',
};

// ✅ NEW: Services list used in booking modal & backend
export const SERVICES = [
  'Career Counselling',
  'Skill Development Coaching',
  'Resume & Interview Prep',
  'Programming Skills Coaching',
  'Final Year Project Guidance',
  'Placement Drive Arrangements',
  'Expert Talk Sessions',
  'Cultural Tuition',
];

// ✅ NEW: Resume upload constraints (matches backend)
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = { 'application/pdf': ['.pdf'] };

// ✅ NEW: Token storage key
export const TOKEN_KEY = 'xplosure_token';
