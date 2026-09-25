import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  UserCheck,
  Wrench,
  Shield,
  Home,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import AuthVisual3D from '../components/auth/AuthVisual3D';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authStage, setAuthStage] = useState(''); // 'Authenticating...' | 'Verifying role...' | 'Entering workspace...'
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthStage('Authenticating credentials...');

    try {
      const result = await login(email, password);
      if (result.success) {
        setAuthStage('Verifying cryptographic token...');
        setTimeout(() => {
          setAuthStage('Entering workspace...');
          if (result.user?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 300);
      }
    } finally {
      setLoading(false);
      setAuthStage('');
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    setAuthStage(`Authenticating as ${role.replace('_', ' ')}...`);

    try {
      const result = await demoLogin(role);
      if (result.success) {
        setAuthStage('Entering verified workspace...');
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 300);
      }
    } finally {
      setLoading(false);
      setAuthStage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Architectural Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[300px] bg-brand-500/10 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side 3D Architectural Scene */}
        <div className="hidden lg:block lg:col-span-5 h-[620px]">
          <AuthVisual3D
            title="Cryptographic Tenancy Ledger"
            subtitle="Securely access verified inspection baselines, maintenance dispatch tickets, and deposit accounting records."
            badgeText="RentalProof Security Engine"
          />
        </div>

        {/* Right Side Form Card */}
        <div className="lg:col-span-7 space-y-5">
          <div className="text-left">
            <Link to="/" className="inline-flex items-center gap-2 mb-3 group focus:outline-none">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Sign in to your account</h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              New to RentalProof?{' '}
              <Link to="/register" className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline transition">
                Create a registered account
              </Link>
            </p>
          </div>

          {/* Quick 1-Click Role Switcher for instant testing */}
          <div className="bg-white/80 dark:bg-slate-900/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-lg dark:shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-Click Role Evaluation</span>
              </span>
              <span className="text-[10px] font-mono bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/80 px-2 py-0.5 rounded-full text-cyan-700 dark:text-cyan-300">
                Instant Demo
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('landlord')}
                disabled={loading}
                className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-center text-xs font-bold border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer group active:scale-95"
              >
                <div className="p-1.5 rounded-xl bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 mb-1 group-hover:scale-105 transition-transform">
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-slate-900 dark:text-white text-xs">Landlord</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">Owner</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('tenant')}
                disabled={loading}
                className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-center text-xs font-bold border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer group active:scale-95"
              >
                <div className="p-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 mb-1 group-hover:scale-105 transition-transform">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="text-slate-900 dark:text-white text-xs">Tenant</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">Resident</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('service_provider')}
                disabled={loading}
                className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-center text-xs font-bold border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer group active:scale-95"
              >
                <div className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400 mb-1 group-hover:scale-105 transition-transform">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="text-slate-900 dark:text-white text-xs">Contractor</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">Service</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-center text-xs font-bold border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer group active:scale-95"
              >
                <div className="p-1.5 rounded-xl bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 mb-1 group-hover:scale-105 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-slate-900 dark:text-white text-xs">Admin</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">Platform</span>
              </button>
            </div>
          </div>

          {/* Standard Form Box */}
          <div className="bg-white/90 dark:bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl dark:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative rounded-xl">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative rounded-xl">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authStage && (
                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-xs font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-2 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                  <span>{authStage}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={ArrowRight}
                className="w-full justify-center"
              >
                Sign In to Platform
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
