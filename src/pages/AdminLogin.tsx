import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, KeyRound, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from '../context/AuthContext';

type Mode = 'login' | 'forgot-email' | 'forgot-otp' | 'forgot-reset' | 'forgot-done';

function AdminLogin() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Invalid email or password');
      const data = await response.json();
      login(data.accessToken, data.admin);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Something went wrong');
      setMode('forgot-otp');
    } catch {
      setError('Something went wrong sending the reset code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
      });
      if (!response.ok) throw new Error('Invalid or expired code');
      setMode('forgot-reset');
    } catch {
      setError('Invalid or expired code. Please check and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp, newPassword }),
      });
      if (!response.ok) throw new Error('Failed to reset password');
      setMode('forgot-done');
    } catch {
      setError('Failed to reset password. The code may have expired — try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

 const resetToLogin = () => {
  setMode('login');
  setOtp('');
  setNewPassword('');
  setConfirmPassword('');
  setPassword('');
  setError('');
  setShowPassword(false);
  setShowNewPassword(false);
  setShowConfirmPassword(false);
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 mx-auto mb-4">
            {mode === 'login' ? <Lock className="w-5 h-5 text-[#0D9488]" /> : <KeyRound className="w-5 h-5 text-[#0D9488]" />}
          </div>
          <h1 className="text-xl font-semibold text-[#0B1220]">
            {mode === 'login' && 'Admin Login'}
            {mode === 'forgot-email' && 'Reset Password'}
            {mode === 'forgot-otp' && 'Enter Reset Code'}
            {mode === 'forgot-reset' && 'Set New Password'}
            {mode === 'forgot-done' && 'Password Reset'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Kampala EEG Labs &amp; Sleep Center</p>
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@kampalaeeg.com" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]" />
              </div>
            </div>
            
              <div>
  <div className="flex items-center justify-between mb-1.5">
    <label className="block text-xs font-medium text-gray-600">Password</label>
    <button type="button" onClick={() => { setError(''); setMode('forgot-email'); }} className="text-xs text-[#0D9488] font-medium hover:underline">
      Forgot password?
    </button>
  </div>
  <div className="relative">
    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      placeholder="••••••••"
      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      tabIndex={-1}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  </div>
</div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="bg-[#0D9488] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        {mode === 'forgot-email' && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 -mt-2 mb-1">Enter your admin email and we'll send you a reset code.</p>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@kampalaeeg.com" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]" />
              </div>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="bg-[#0D9488] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {isSubmitting ? 'Sending...' : 'Send Reset Code'}
            </button>
            <button type="button" onClick={resetToLogin} className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-[#0B1220] transition-colors mt-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
            </button>
          </form>
        )}

        {mode === 'forgot-otp' && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 -mt-2 mb-1">Enter the 6-digit code sent to {email}.</p>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Reset Code</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} required placeholder="123456" maxLength={6} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-center tracking-[0.3em] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D9488]" />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button type="submit" disabled={isSubmitting || otp.length !== 6} className="bg-[#0D9488] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </button>
            <button type="button" onClick={resetToLogin} className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-[#0B1220] transition-colors mt-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
            </button>
          </form>
        )}

        {mode === 'forgot-reset' && (
  <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">New Password</label>
      <div className="relative">
        <input
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          placeholder="At least 8 characters"
          className="w-full px-4 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
        />
        <button
          type="button"
          onClick={() => setShowNewPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          tabIndex={-1}
        >
          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm New Password</label>
      <div className="relative">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Re-enter password"
          className="w-full px-4 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          tabIndex={-1}
        >
          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
    <button type="submit" disabled={isSubmitting} className="bg-[#0D9488] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2">
      {isSubmitting ? 'Resetting...' : 'Reset Password'}
    </button>
  </form>
)}

        {mode === 'forgot-done' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500 text-center">Your password has been reset successfully. You can now sign in with your new password.</p>
            <button onClick={resetToLogin} className="bg-[#0D9488] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors w-full">
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
