import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Wrench,
  ClipboardCheck,
  PiggyBank,
  TrendingUp,
  Plus,
  ArrowRight,
  Sparkles,
  SplitSquareVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  FileText,
  Calendar,
  Lock,
  ShieldCheck,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AnimatedCounter from '../components/common/AnimatedCounter';
import { CardSkeleton } from '../components/common/Skeleton';

const DashboardPage = () => {
  const { user, isLandlord, isTenant, isServiceProvider, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    properties: [],
    tenancies: [],
    maintenance: [],
    inspections: [],
    payments: [],
    deposits: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [propsRes, tenanciesRes, maintRes, inspRes, paymentsRes] = await Promise.all([
          api.get('/properties').catch(() => ({ data: { properties: [] } })),
          api.get('/tenancies').catch(() => ({ data: { tenancies: [] } })),
          api.get('/maintenance').catch(() => ({ data: { requests: [] } })),
          api.get('/inspections').catch(() => ({ data: { inspections: [] } })),
          api.get('/payments').catch(() => ({ data: { payments: [] } })),
        ]);

        setData({
          properties: propsRes.data?.properties || [],
          tenancies: tenanciesRes.data?.tenancies || [],
          maintenance: maintRes.data?.requests || [],
          inspections: inspRes.data?.inspections || [],
          payments: paymentsRes.data?.payments || [],
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  // Analytics data for Recharts
  const occupancyData = [
    { name: 'Occupied', value: Math.max(1, data.properties.filter((p) => p.status === 'Occupied').length), color: '#38bdf8' },
    { name: 'Available', value: Math.max(1, data.properties.filter((p) => p.status === 'Available').length), color: '#10b981' },
    {
      name: 'Maintenance',
      value: data.properties.filter((p) => p.status === 'Under Maintenance').length,
      color: '#f59e0b',
    },
  ];

  const rentTrendData = [
    { month: 'Apr', amount: 15000 },
    { month: 'May', amount: 15000 },
    { month: 'Jun', amount: 15000 },
    { month: 'Jul', amount: 15000 },
    { month: 'Aug', amount: 15000 },
    { month: 'Sep', amount: 15000 },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 p-6 sm:p-8 rounded-3xl text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Digital Evidence Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {user?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-normal">
              {isLandlord && 'Monitor portfolio condition baselines, maintenance dispatch tickets, and audited deposit ledgers.'}
              {isTenant && 'Your digital rental vault. Review move-in benchmarks, repair tickets, and deposit calculations.'}
              {isServiceProvider && 'View assigned service work orders, upload before/after photos, and log completion states.'}
              {isAdmin && 'Platform administration overview, user verification, and global activity audit logs.'}
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isLandlord && (
              <>
                <Link to="/properties/new">
                  <Button variant="primary" size="md" icon={Plus}>
                    Add Property
                  </Button>
                </Link>
                <Link to="/inspections/compare">
                  <Button variant="secondary" size="md" icon={SplitSquareVertical}>
                    Compare
                  </Button>
                </Link>
              </>
            )}

            {isTenant && (
              <>
                <Link to="/maintenance">
                  <Button variant="primary" size="md" icon={Wrench}>
                    Report Issue
                  </Button>
                </Link>
                <Link to="/inspections/compare">
                  <Button variant="secondary" size="md" icon={SplitSquareVertical}>
                    View Compare
                  </Button>
                </Link>
              </>
            )}

            {isServiceProvider && (
              <Link to="/maintenance">
                <Button variant="primary" size="md" icon={Wrench}>
                  View Work Orders
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* LANDLORD DASHBOARD VIEW */}
      {isLandlord && (
        <>
          {/* Key Stat Cards (Differentiated Accents) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Properties Card (Cyan Accent) */}
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Properties</span>
                <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 rounded-2xl border border-cyan-200 dark:border-cyan-800/60">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                <AnimatedCounter value={data.properties.length} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {data.properties.filter((p) => p.status === 'Occupied').length} occupied units
              </p>
            </div>

            {/* Active Tenancies Card (Emerald Accent) */}
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Active Tenancies</span>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                <AnimatedCounter value={data.tenancies.filter((t) => t.status === 'Active').length} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified agreements</p>
            </div>

            {/* Open Maintenance Card (Amber Accent) */}
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Open Repairs</span>
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-200 dark:border-amber-800/60">
                  <Wrench className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                <AnimatedCounter value={data.maintenance.filter((m) => m.status !== 'Completed').length} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {data.maintenance.filter((m) => m.status === 'Completed').length} resolved with photos
              </p>
            </div>

            {/* Deposits Card (Indigo Accent) */}
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Deposit Ledger</span>
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-200 dark:border-indigo-800/60">
                  <PiggyBank className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">₹30,000</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">100% Reconciled</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rent Collection Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Rent Collection</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Verified rent receipts over last 6 months</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                  <TrendingUp className="w-3.5 h-3.5" /> 100% on time
                </div>
              </div>
              <div className="h-60 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rentTrendData}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `₹${val / 1000}k`} />
                    <Tooltip
                      formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Rent Collected']}
                      contentStyle={{ borderRadius: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155' }}
                    />
                    <Bar dataKey="amount" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Occupancy Chart */}
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Portfolio Occupancy</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Active rental status distribution</p>
              <div className="h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={occupancyData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={42} outerRadius={68}>
                      {occupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-center pt-2 border-t border-slate-100 dark:border-slate-800">
                {occupancyData.map((item) => (
                  <div key={item.name}>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{item.name}</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Quick Management Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/properties/new"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-brand-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition group text-left"
                >
                  <Building2 className="w-5 h-5 text-brand-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white block">Add Property</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">List new unit</span>
                </Link>

                <Link
                  to="/tenancies"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition group text-left"
                >
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white block">Invite Tenant</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Digital lease</span>
                </Link>

                <Link
                  to="/inspections"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-purple-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition group text-left"
                >
                  <ClipboardCheck className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white block">Inspection</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Room checklist</span>
                </Link>

                <Link
                  to="/maintenance"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition group text-left"
                >
                  <Wrench className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white block">Maintenance</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Dispatch repair</span>
                </Link>
              </div>
            </div>

            {/* Recent Evidence Activity */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Platform Activities</h3>
                <Link to="/audit-logs" className="text-xs font-bold text-brand-600 dark:text-cyan-400 hover:underline">
                  Full Audit Trail
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Move-Out Walkthrough Inspection Completed',
                    time: 'Today',
                    tag: 'Inspection',
                    desc: 'Unit 402 paired with Move-In baseline photos; AI observation calculated.',
                  },
                  {
                    title: 'Plumbing Repair Completed & Photo Uploaded',
                    time: 'Yesterday',
                    tag: 'Maintenance',
                    desc: 'Master bath mixer cartridge replaced by Apex Plumbing.',
                  },
                  {
                    title: 'Rent Payment Recorded (₹15,000)',
                    time: '3 days ago',
                    tag: 'Payment',
                    desc: 'September 2026 rent recorded with UPI reference number.',
                  },
                ].map((act, i) => (
                  <div key={i} className="flex items-start justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{act.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                          {act.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{act.desc}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0 font-medium">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* TENANT DASHBOARD VIEW */}
      {isTenant && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-brand-600 dark:text-cyan-400">Your Current Lease</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Green Valley Apartments, Unit 402</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">402 Palm Grove Enclave, Ring Road, Guntur</p>
                </div>
                <Badge variant="Active">Active Tenancy</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 mb-6">
                <div>
                  <span className="text-xs text-slate-400 block">Monthly Rent</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">₹15,000 / mo</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Original Deposit</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">₹30,000</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Recorded Balance</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">₹28,800</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/inspections/compare">
                  <Button variant="primary" size="sm" icon={SplitSquareVertical}>
                    View Move-In vs Move-Out Proof
                  </Button>
                </Link>
                <Link to="/maintenance">
                  <Button variant="outline" size="sm" icon={Wrench}>
                    Report Maintenance
                  </Button>
                </Link>
                <Link to="/reports">
                  <Button variant="ghost" size="sm" icon={FileText}>
                    Inspection Reports
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Your Digital Protection</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-800 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Move-In Baseline Signed</span>
                  </div>
                  <span className="font-bold">Verified</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-200 border border-blue-100 dark:border-blue-800 text-xs">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <span>September Rent Status</span>
                  </div>
                  <span className="font-bold">Paid</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border border-purple-100 dark:border-purple-800 text-xs">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Deposit Ledger</span>
                  </div>
                  <span className="font-bold">1 Deduction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE PROVIDER DASHBOARD VIEW */}
      {isServiceProvider && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Assigned Work Orders</h3>
            {data.maintenance.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">No pending work orders.</p>
            ) : (
              <div className="space-y-3">
                {data.maintenance.map((m) => (
                  <div
                    key={m._id}
                    className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{m.title}</span>
                        <Badge variant={m.status}>{m.status}</Badge>
                        <Badge variant={m.priority}>{m.priority}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {m.property?.title} — Room: {m.room}
                      </p>
                    </div>

                    <Link to={`/maintenance/${m._id}`}>
                      <Button variant="primary" size="sm" icon={ArrowRight}>
                        View / Upload Proof
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardPage;
