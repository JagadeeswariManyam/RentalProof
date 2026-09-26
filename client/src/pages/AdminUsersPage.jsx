import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Filter,
  Shield,
  Home,
  UserCheck,
  Wrench,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { TableSkeleton } from '../components/common/Skeleton';

const AdminUsersPage = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users', {
        params: {
          role: roleFilter !== 'all' ? roleFilter : undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: search || undefined,
        },
      });
      if (res.data?.success) {
        setUsers(res.data.users || []);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
      showToast(error.response?.data?.message || 'Failed to load user directory.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleToggleUser = async (userId) => {
    try {
      const res = await api.put(`/admin/users/${userId}/toggle-status`);
      if (res.data?.success) {
        showToast(res.data.message, 'success');
        fetchUsers();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update user status.', 'error');
    }
  };

  const roleIcons = {
    landlord: Home,
    tenant: UserCheck,
    service_provider: Wrench,
    admin: Shield,
  };

  const roleColors = {
    landlord: 'primary',
    tenant: 'success',
    service_provider: 'warning',
    admin: 'danger',
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Platform Directory
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Badge variant="primary" size="sm">
              Role Governance
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            User Directory & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Search, moderate, filter, and inspect verified user accounts across the platform
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            icon={RefreshCw}
            onClick={fetchUsers}
            loading={loading}
          >
            Refresh Directory
          </Button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="landlord">Landlords</option>
            <option value="tenant">Tenants</option>
            <option value="service_provider">Service Providers</option>
            <option value="admin">Administrators</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Deactivated Only</option>
          </select>
        </div>
      </div>

      {/* User Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600 dark:text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Registered Accounts ({users.length})
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Moderation Active</span>
        </div>

        {loading ? (
          <TableSkeleton rows={5} />
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-2 text-slate-400 opacity-50" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No users match the criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try broadening your search or resetting filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Assigned Role</th>
                  <th className="px-6 py-4">Contact Phone</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {users.map((u) => {
                  const RoleIcon = roleIcons[u.role] || UserCheck;
                  return (
                    <tr key={u._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                            {u.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{u.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <Badge variant={roleColors[u.role] || 'primary'} size="sm" className="capitalize inline-flex items-center gap-1 font-bold">
                          <RoleIcon className="w-3 h-3" />
                          <span>{u.role?.replace('_', ' ')}</span>
                        </Badge>
                      </td>

                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-mono">
                        {u.phone || 'N/A'}
                      </td>

                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {new Date(u.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>

                      <td className="px-6 py-4">
                        {u.isActive ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-[11px] bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/80 w-fit">
                            <CheckCircle className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 text-[11px] bg-rose-50 dark:bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800/80 w-fit">
                            <XCircle className="w-3 h-3" /> Deactivated
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminUsersPage;
