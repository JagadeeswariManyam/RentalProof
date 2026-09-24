import React, { useState, useEffect } from 'react';
import { History, Search, Filter, ShieldCheck, Clock, User, ArrowRight } from 'lucide-react';
import api from '../api/client';
import { TableSkeleton } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entityFilter, setEntityFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/audit-logs', {
        params: {
          entity: entityFilter !== 'all' ? entityFilter : undefined,
          search: search || undefined,
        },
      });
      if (res.data.success) {
        setLogs(res.data.logs || []);
      }
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [entityFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Tamper-Evident Ledger
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">Immutable Audit Trail</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Activity & Evidence Trail</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Verifiable record of every property listing, inspection upload, and maintenance status shift
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit trail by action or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchLogs()}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
          />
        </div>

        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 text-slate-700 font-medium focus:outline-none"
        >
          <option value="all">All Evidence Entities</option>
          <option value="Property">Property</option>
          <option value="Tenancy">Tenancy</option>
          <option value="Inspection">Inspection</option>
          <option value="Evidence">Evidence Pair</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Payment">Payment</option>
          <option value="Deposit">Deposit</option>
          <option value="Document">Document</option>
          <option value="User">User</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Recorded Audit Events ({logs.length})</h3>
        </div>

        {loading ? (
          <TableSkeleton rows={6} />
        ) : logs.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={History}
              title="No audit entries found"
              description="Actions taken across properties and inspections will automatically appear here."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Entity</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Actor</th>
                  <th className="px-6 py-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {log.entity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-md leading-relaxed">{log.description}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {log.user?.name || 'System / Guest'}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
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

export default AuditLogsPage;
