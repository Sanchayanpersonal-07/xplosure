import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { validateEmail } from '../utils/validators';

export const AuthInput = ({ label, error, rightEl, ...props }) => (
  <div>
    <label style={{ color: 'rgba(248,250,255,0.7)', fontFamily: 'var(--font-display)' }} className="block text-sm font-medium mb-1.5">
      {label}
    </label>
    <div className="relative">
      <input className={`input-dark ${error ? 'error' : ''} ${rightEl ? 'pr-10' : ''}`} {...props} />
      {rightEl && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>}
    </div>
    {error && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{error}</p>}
  </div>
);

export const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!validateEmail(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await authService.login(form);
      login(data.token, data.user);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Xplosure account">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <AuthInput label="Email address" name="email" type="email" autoComplete="email"
          value={form.email} onChange={onChange} placeholder="you@example.com" error={errors.email} />

        <AuthInput label="Password" name="password" type={showPw ? 'text' : 'password'}
          autoComplete="current-password" value={form.password} onChange={onChange}
          placeholder="••••••••" error={errors.password}
          rightEl={
            <button type="button" onClick={() => setShowPw(!showPw)} style={{ color: 'var(--muted)' }} className="hover:text-white transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" style={{ color: 'var(--blue-light)' }} className="text-xs hover:text-[var(--cyan)] transition-colors font-medium">
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-sm">
          {loading ? 'Signing in…' : <><span>Sign In</span> <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--blue-light)' }} className="font-semibold hover:text-[var(--cyan)] transition-colors">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;

/* ─── Shared Auth Layout ─── */
export const AuthLayout = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center px-4 py-16 mesh-bg" style={{ background: 'var(--navy)', paddingTop: '80px' }}>
    <div className="w-full max-w-md animate-scale-in">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 group mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--blue)] to-[var(--cyan)] flex items-center justify-center shadow-[0_0_20px_var(--blue-glow)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-white">Xplosure</span>
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-white mb-1">{title}</h1>
        <p style={{ color: 'var(--muted)' }} className="text-sm">{subtitle}</p>
      </div>

      {/* Card */}
      <div className="glass rounded-2xl p-8" style={{ borderRadius: 'var(--radius-lg)' }}>
        {children}
      </div>
    </div>
  </div>
);
