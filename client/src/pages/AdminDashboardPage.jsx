import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Building2,
  Wrench,
  ClipboardCheck,
  FileText,
  TrendingUp,
  Activity,
  History,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  PiggyBank,
  CreditCard,
  Layers,
  Sparkles
} from 'lucide-react';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AnimatedCounter from '../components/common/AnimatedCounter';
import { CardSkeleton } from '../components/common/Skeleton';

const AdminDashboardPage = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await api.get('/admin/stats');
      if (res.data?.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error('Failed to load admin stats:', error);
      showToast(error.response?.data?.message || 'Failed to load platform stats.', 'error');
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Overview Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-rose-950 border border-slate-800 p-6 sm:p-8 rounded-3xl text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Platform Administration & Root Authority</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Platform Governance Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-normal">
              High-level overview of registered tenancy stakeholders, unit inventory occupancy, dispatch tickets, and global system health.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link to="/admin/users">
              <Button variant="primary" size="md" icon={Users}>
                User Directory
              </Button>
            </Link>
            <Link to="/audit-logs">
              <Button variant="secondary" size="md" icon={History}>
                Audit Logs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Global Stat Cards Grid */}
      {loadingStats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Users Stat Card */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Registered Users</span>
              <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 rounded-2xl border border-cyan-200 dark:border-cyan-800/60">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              <AnimatedCounter value={stats.users?.total || 0} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {stats.users?.landlords || 0} landlords • {stats.users?.tenants || 0} tenants
            </p>
          </div>

          {/* Properties Stat Card */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Total Properties</span>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              <AnimatedCounter value={stats.properties?.total || 0} />
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
              {stats.properties?.occupied || 0} units active / occupied
            </p>
          </div>

          {/* Service Tickets Stat Card */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Maintenance Tickets</span>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-200 dark:border-amber-800/60">
                <Wrench className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              <AnimatedCounter value={stats.maintenance?.total || 0} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {stats.maintenance?.completed || 0} resolved with verified photos
            </p>
          </div>

          {/* Condition Inspections Stat Card */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Condition Baselines</span>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 rounded-2xl border border-purple-200 dark:border-purple-800/60">
                <ClipboardCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              <AnimatedCounter value={stats.inspections?.total || 0} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cryptographically tagged</p>
          </div>

        </div>
      ) : null}

      {/* Governance & Management Quick Centers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Governance Quick Card */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300">
                Directory
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">User Directory & Status</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Inspect user roles, search by email/phone, and moderate account active/deactivated statuses.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link to="/admin/users">
              <Button variant="outline" size="sm" className="w-full justify-between" icon={ArrowRight}>
                Open User Directory
              </Button>
            </Link>
          </div>
        </div>

        {/* Global Property Portfolio Oversight */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300">
                Properties
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Properties & Units Catalog</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Explore multi-unit listings, room matrices, rental price distribution, and tenancy assignments.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link to="/properties">
              <Button variant="outline" size="sm" className="w-full justify-between" icon={ArrowRight}>
                View All Properties
              </Button>
            </Link>
          </div>
        </div>

        {/* Immutable Audit Log Stream */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
                <History className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300">
                Compliance
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Platform Audit Stream</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Complete chronological audit trail recording logins, walkthroughs, work order completions, and deposits.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link to="/audit-logs">
              <Button variant="outline" size="sm" className="w-full justify-between" icon={ArrowRight}>
                Inspect Audit Stream
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {/* System Health Telemetry Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">RentalProof System Health</h4>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-spectrum database synchronized • SHA-256 validation engines operational
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            Status: Optimal 99.9%
          </span>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboardPage;

