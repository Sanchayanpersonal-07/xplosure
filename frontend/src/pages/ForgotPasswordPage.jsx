import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/authService';
import { validateEmail, validatePassword } from '../utils/validators';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Eye, EyeOff, Mail, Lock, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthLayout } from './LoginPage';

/* ─── Forgot Password ─── */
export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) { setError('Enter a valid email address'); return; }
    setLoading(true);
    try { await authService.forgotPassword(email); setSent(true); }
    catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <AuthLayout title={sent ? 'Check your inbox' : 'Forgot password?'} subtitle={sent ? '' : 'Enter your email and we\'ll send a reset link'}>
      {sent ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(16,208,140,0.15)', border: '1px solid rgba(16,208,140,0.3)' }}>
            <CheckCircle className="w-7 h-7" style={{ color: 'var(--success)' }} />
          </div>
          <p style={{ color: 'var(--muted)' }} className="text-sm mb-1">Reset link sent to</p>
          <p className="text-white font-semibold text-sm mb-1">{email}</p>
          <p style={{ color: 'var(--muted)' }} className="text-xs mb-6">Link expires in 15 minutes. Check your spam folder too.</p>
          <Link to="/login" style={{ color: 'var(--blue-light)' }} className="text-sm font-semibold hover:text-[var(--cyan)] transition-colors">
            ← Back to login
          </Link>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={{ color: 'rgba(248,250,255,0.7)', fontFamily: 'var(--font-display)' }} className="block text-sm font-medium mb-1.5">Email address</label>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com" className={`input-dark ${error ? 'error' : ''}`} />
              {error && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{error}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? <><LoadingSpinner size="sm" className="text-white" /> Sending…</> : <><Mail className="w-4 h-4" /> Send Reset Link</>}
            </button>
          </form>
          <p className="mt-5 text-center">
            <Link to="/login" style={{ color: 'var(--muted)' }} className="text-sm flex items-center justify-center gap-1 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to login
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
};

/* ─── Reset Password ─── */
export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({ new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) return (
    <AuthLayout title="Invalid Link" subtitle="This reset link is missing a token.">
      <div className="text-center py-4">
        <XCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--error)' }} />
        <Link to="/forgot-password" className="btn-primary inline-flex text-sm">Request New Link</Link>
      </div>
    </AuthLayout>
  );

  const validate = () => {
    const e = {};
    const r = validatePassword(form.newPassword);
    if (!form.newPassword) e.newPassword = 'Password required';
    else if (!r.isValid) e.newPassword = r.message;
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm';
    else if (form.newPassword !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e); return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await authService.resetPassword(token, form.newPassword);
      setSuccess(true);
      toast.success('Password reset!');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed. Link may have expired.');
    } finally { setLoading(false); }
  };

  if (success) return (
    <AuthLayout title="Password Reset!" subtitle="Redirecting you to login…">
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
          style={{ background: 'rgba(16,208,140,0.15)', border: '1px solid rgba(16,208,140,0.3)' }}>
          <CheckCircle className="w-7 h-7" style={{ color: 'var(--success)' }} />
        </div>
      </div>
    </AuthLayout>
  );

  return (
    <AuthLayout title="Set new password" subtitle="Must include uppercase, lowercase, and a number">
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { key: 'newPassword', label: 'New Password', showKey: 'new' },
          { key: 'confirmPassword', label: 'Confirm Password', showKey: 'confirm' },
        ].map(({ key, label, showKey }) => (
          <div key={key}>
            <label style={{ color: 'rgba(248,250,255,0.7)', fontFamily: 'var(--font-display)' }} className="block text-sm font-medium mb-1.5">{label}</label>
            <div className="relative">
              <input type={show[showKey] ? 'text' : 'password'} value={form[key]}
                onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: '' })); }}
                placeholder="••••••••" className={`input-dark pr-10 ${errors[key] ? 'error' : ''}`} />
              <button type="button" onClick={() => setShow(s => ({ ...s, [showKey]: !s[showKey] }))}
                style={{ color: 'var(--muted)' }} className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-white transition-colors">
                {show[showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors[key] && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{errors[key]}</p>}
          </div>
        ))}
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-1">
          {loading ? <><LoadingSpinner size="sm" className="text-white" /> Resetting…</> : <><Lock className="w-4 h-4" /> Reset Password</>}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
