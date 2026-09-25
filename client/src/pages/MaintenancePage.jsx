import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Plus, Search, Filter, AlertCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/Skeleton';

const MaintenancePage = () => {
  const { user, isTenant, isLandlord, isServiceProvider, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    propertyId: '',
    title: '',
    description: '',
    category: 'Plumbing',
    priority: 'Medium',
    room: 'General',
    photos: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80'],
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [maintRes, propsRes] = await Promise.all([
        api.get('/maintenance', {
          params: {
            search: search || undefined,
            status: statusFilter,
            priority: priorityFilter,
          },
        }),
        api.get('/properties'),
      ]);

      if (maintRes.data.success) setRequests(maintRes.data.requests || []);
      if (propsRes.data.success) {
        setProperties(propsRes.data.properties || []);
        if (propsRes.data.properties?.length > 0 && !form.propertyId) {
          setForm((prev) => ({ ...prev, propertyId: propsRes.data.properties[0]._id }));
        }
      }
    } catch (error) {
      console.error('Failed to load maintenance requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, priorityFilter]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post('/maintenance', form);
      if (res.data.success) {
        showToast('Maintenance request reported successfully!', 'success');
        setCreateModalOpen(false);
        setForm({
          propertyId: properties[0]?._id || '',
          title: '',
          description: '',
          category: 'Plumbing',
          priority: 'Medium',
          room: 'General',
          photos: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80'],
        });
        fetchData();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to submit request.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Maintenance Tickets</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Issue reporting, service provider dispatch, and resolution evidence
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setCreateModalOpen(true)}>
          Report Maintenance
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-900/70 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-wrap items-center justify-between gap-3 backdrop-blur-xl">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, description, or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Reported">Reported</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      {loading ? (
        <TableSkeleton rows={4} />
      ) : requests.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="No maintenance requests"
          description="Everything looks good! No active maintenance tickets reported."
          actionLabel="Report New Issue"
          onAction={() => setCreateModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white dark:bg-slate-900/70 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-brand-600 dark:text-brand-400">{req.category}</span>
                  <div className="flex items-center gap-1.5">
                    <Badge variant={req.priority} size="sm">
                      {req.priority}
                    </Badge>
                    <Badge variant={req.status} size="sm">
                      {req.status}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{req.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {req.property?.title} • Room: <span className="font-semibold text-slate-700 dark:text-slate-300">{req.room}</span>
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {req.description}
                </p>

                {/* Assigned To Badge */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Assigned:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {req.assignedTo?.name || 'Unassigned'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {new Date(req.createdAt).toLocaleDateString()}
                </span>
                <Link to={`/maintenance/${req._id}`}>
                  <Button variant="outline" size="sm" icon={ArrowRight}>
                    View Timeline
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Ticket Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Report Maintenance Issue"
        subtitle="Creates a timestamped service ticket with photo evidence"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Property</label>
            <select
              required
              value={form.propertyId}
              onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {properties.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Issue Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Master Bathroom Mixer Tap Dripping"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Appliance">Appliance</option>
                <option value="Furniture">Furniture</option>
                <option value="Structural">Structural</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Room / Area</label>
              <input
                type="text"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
            <textarea
              rows={3}
              required
              placeholder="Describe what is broken, when it started, and symptoms..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={submitting}>
              Submit Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MaintenancePage;
