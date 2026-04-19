import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { validateEmail, validatePassword } from '../utils/validators';
import { AuthLayout, AuthInput } from './LoginPage';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const pwChecks = [
    { label: 'At least 8 characters', test: pw => pw.length >= 8 },
    { label: 'Uppercase letter', test: pw => /[A-Z]/.test(pw) },
    { label: 'Lowercase letter', test: pw => /[a-z]/.test(pw) },
    { label: 'Number', test: pw => /\d/.test(pw) },
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email) e.email = 'Email is required';
    else if (!validateEmail(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else { const r = validatePassword(form.password); if (!r.isValid) e.password = r.message; }
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
      const data = await authService.signup(form);
      login(data.token, data.user);
      toast.success('Welcome to Xplosure! 🎉');
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.data?.message?.includes('already exists'))
        setErrors({ email: 'This email is already registered' });
      else toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join hundreds of students building their careers">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label style={{ color: 'rgba(248,250,255,0.7)', fontFamily: 'var(--font-display)' }} className="block text-sm font-medium mb-1.5">Full Name</label>
          <input name="name" type="text" autoComplete="name" value={form.name} onChange={onChange}
            placeholder="e.g. Rahul Sharma"
            className={`input-dark ${errors.name ? 'error' : ''}`} />
          {errors.name && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{errors.name}</p>}
        </div>

        <div>
          <label style={{ color: 'rgba(248,250,255,0.7)', fontFamily: 'var(--font-display)' }} className="block text-sm font-medium mb-1.5">Email address</label>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange}
            placeholder="you@example.com"
            className={`input-dark ${errors.email ? 'error' : ''}`} />
          {errors.email && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{errors.email}</p>}
        </div>

        <div>
          <label style={{ color: 'rgba(248,250,255,0.7)', fontFamily: 'var(--font-display)' }} className="block text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <input name="password" type={showPw ? 'text' : 'password'} autoComplete="new-password"
              value={form.password} onChange={onChange} placeholder="Min. 8 characters"
              className={`input-dark pr-10 ${errors.password ? 'error' : ''}`} />
            <button type="button" onClick={() => setShowPw(!showPw)}
              style={{ color: 'var(--muted)' }}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-white transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Password strength checklist */}
          {form.password && (
            <div className="mt-2 grid grid-cols-2 gap-1">
              {pwChecks.map(({ label, test }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${test(form.password) ? 'bg-[var(--success)]' : 'bg-[rgba(255,255,255,0.1)]'}`}>
                    {test(form.password) && <Check className="w-2 h-2 text-white" />}
                  </div>
                  <span style={{ color: test(form.password) ? 'var(--success)' : 'var(--muted)', fontSize: '10px' }}>{label}</span>
                </div>
              ))}
            </div>
          )}
          {errors.password && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{errors.password}</p>}
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-sm mt-2">
          {loading ? 'Creating account…' : <><span>Create Account</span> <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--blue-light)' }} className="font-semibold hover:text-[var(--cyan)] transition-colors">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
