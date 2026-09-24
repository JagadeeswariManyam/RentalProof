import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, Wrench, Shield, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    const result = await demoLogin(role);
    setLoading(false);
    if (result.success) {
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="text-left">
            <span className="text-2xl font-black tracking-tight text-slate-900 block">RentalProof</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-600 block -mt-1">
              Evidence Platform
            </span>
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Sign in to your account</h2>
        <p className="mt-2 text-sm text-slate-600">
          Or{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        {/* Quick 1-Click Demo Logins for Mentor Demonstration */}
        <div className="bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl mb-6 border border-brand-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-300">
              ⚡ 1-Click Mentor Demo Switcher
            </span>
            <span className="text-[10px] bg-brand-500/30 px-2 py-0.5 rounded-full text-brand-200">
              Evaluation Mode
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Instant evaluation login for any role without manual credentials typing:
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleDemoLogin('landlord')}
              disabled={loading}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-left text-xs font-semibold border border-white/10"
            >
              <Home className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="block text-white">Landlord</span>
                <span className="text-[10px] text-slate-400 block font-normal">Full Portfolio</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('tenant')}
              disabled={loading}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-left text-xs font-semibold border border-white/10"
            >
              <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="block text-white">Tenant</span>
                <span className="text-[10px] text-slate-400 block font-normal">Renter View</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('service_provider')}
              disabled={loading}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-left text-xs font-semibold border border-white/10"
            >
              <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="block text-white">Service Provider</span>
                <span className="text-[10px] text-slate-400 block font-normal">Technician Jobs</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-left text-xs font-semibold border border-white/10"
            >
              <Shield className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <span className="block text-white">Admin</span>
                <span className="text-[10px] text-slate-400 block font-normal">Platform Control</span>
              </div>
            </button>
          </div>
        </div>

        {/* Standard Credentials Card */}
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-3xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full rounded-xl border border-slate-300 pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-slate-300 pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
              icon={ArrowRight}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
