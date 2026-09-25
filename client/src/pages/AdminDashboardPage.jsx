import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Users,
  Building2,
  Wrench,
  ClipboardCheck,
  FileText,
  Search,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { CardSkeleton, TableSkeleton } from '../components/common/Skeleton';

const AdminDashboardPage = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await api.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error('Failed to load admin stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await api.get('/admin/users', {
        params: {
          role: roleFilter !== 'all' ? roleFilter : undefined,
          search: search || undefined,
        },
      });
      if (res.data.success) {
        setUsers(res.data.users || []);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleToggleUser = async (userId) => {
    try {
      const res = await api.put(`/admin/users/${userId}/toggle-status`);
      if (res.data.success) {
        showToast(res.data.message, 'success');
        fetchUsers();
        fetchStats();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to toggle status.', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Administrative Control Center
          </span>
          <Badge variant="danger" size="sm">
            Root Authority
          </Badge>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Platform Governance</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Global statistics, user moderation, and platform infrastructure health
        </p>
      </div>

      {/* Global Stat Cards */}
      {loadingStats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900/70 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Registered Users
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.users?.total || 0}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {stats.users?.landlords} landlords • {stats.users?.tenants} tenants
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/70 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Total Properties
            </span>
            <div className="text-2xl font-black text-brand-600 dark:text-brand-400">{stats.properties?.total || 0}</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              {stats.properties?.occupied} units occupied
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/70 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Service Tickets
            </span>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{stats.maintenance?.total || 0}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {stats.maintenance?.completed} completed
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/70 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Inspection Records
            </span>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{stats.inspections?.total || 0}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Verified condition baselines</div>
          </div>
        </div>
      ) : null}

      {/* User Management Section */}
      <div className="bg-white dark:bg-slate-900/70 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden space-y-4 backdrop-blur-xl">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">User Moderation & Account States</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage permissions and activate/deactivate accounts</p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="landlord">Landlords</option>
              <option value="tenant">Tenants</option>
              <option value="service_provider">Service Providers</option>
              <option value="admin">Administrators</option>
            </select>
          </div>
        </div>

        {loadingUsers ? (
          <TableSkeleton rows={4} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="primary" size="sm" className="capitalize">
                        {u.role.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{u.phone}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {u.isActive ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Deactivated
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant={u.isActive ? 'outline' : 'success'}
                        size="sm"
                        onClick={() => handleToggleUser(u._id)}
                      >
                        {u.isActive ? 'Deactivate' : 'Reactivate'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
