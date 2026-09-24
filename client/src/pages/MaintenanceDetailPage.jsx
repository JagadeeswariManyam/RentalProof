import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Wrench,
  ArrowLeft,
  Calendar,
  Building2,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Upload,
} from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import MaintenanceTimeline from '../components/maintenance/MaintenanceTimeline';
import { CardSkeleton } from '../components/common/Skeleton';

const MaintenanceDetailPage = () => {
  const { id } = useParams();
  const { user, isLandlord, isServiceProvider, isAdmin } = useAuth();
  const { showToast } = useToast();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serviceProviders, setServiceProviders] = useState([]);

  // Assign modal
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Status update modal
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('In Progress');
  const [statusNote, setStatusNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Complete modal
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [completionNotes, setCompletionNotes] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [completing, setCompleting] = useState(false);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/maintenance/${id}`);
      if (res.data.success) {
        setTicket(res.data.maintenance);
      }
    } catch (error) {
      console.error('Failed to load maintenance ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();

    // Fetch technicians if landlord
    if (isLandlord || isAdmin) {
      api.get('/admin/users', { params: { role: 'service_provider' } })
        .then((res) => {
          if (res.data.success) {
            setServiceProviders(res.data.users || []);
            if (res.data.users?.length > 0) setSelectedProvider(res.data.users[0]._id);
          }
        })
        .catch(() => {});
    }
  }, [id, isLandlord, isAdmin]);

  const handleAssignProvider = async (e) => {
    e.preventDefault();
    try {
      setAssigning(true);
      const res = await api.put(`/maintenance/${id}/assign`, {
        serviceProviderId: selectedProvider,
        note: 'Assigned certified service provider to handle repair.',
      });
      if (res.data.success) {
        showToast('Service technician assigned successfully!', 'success');
        setAssignModalOpen(false);
        fetchTicket();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to assign.', 'error');
    } finally {
      setAssigning(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      setUpdatingStatus(true);
      const res = await api.put(`/maintenance/${id}/status`, {
        status: newStatus,
        note: statusNote || `Status updated to ${newStatus}`,
      });
      if (res.data.success) {
        showToast(`Status updated to ${newStatus}!`, 'success');
        setStatusModalOpen(false);
        setStatusNote('');
        fetchTicket();
      }
    } catch (error) {
      showToast('Failed to update status.', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleCompleteRepair = async (e) => {
    e.preventDefault();
    try {
      setCompleting(true);
      const res = await api.put(`/maintenance/${id}/complete`, {
        completionNotes,
        actualCost: actualCost ? Number(actualCost) : ticket.costEstimate,
        completionPhotos: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'],
      });
      if (res.data.success) {
        showToast('Ticket marked as completed with photographic proof!', 'success');
        setCompleteModalOpen(false);
        fetchTicket();
      }
    } catch (error) {
      showToast('Failed to finalize repair.', 'error');
    } finally {
      setCompleting(false);
    }
  };

  if (loading || !ticket) {
    return <CardSkeleton />;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link to="/maintenance" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Maintenance List
      </Link>

      {/* Ticket Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase text-brand-600">{ticket.category}</span>
              <Badge variant={ticket.priority}>{ticket.priority} Priority</Badge>
              <Badge variant={ticket.status}>{ticket.status}</Badge>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{ticket.title}</h1>
            <p className="text-xs text-slate-500">
              {ticket.property?.title} • Room: <span className="font-semibold text-slate-700">{ticket.room}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(isLandlord || isAdmin) && ticket.status === 'Reported' && (
              <Button variant="primary" size="sm" icon={UserCheck} onClick={() => setAssignModalOpen(true)}>
                Assign Technician
              </Button>
            )}

            {(isServiceProvider || isLandlord || isAdmin) && ticket.status !== 'Completed' && (
              <>
                <Button variant="outline" size="sm" icon={Clock} onClick={() => setStatusModalOpen(true)}>
                  Update Status
                </Button>
                <Button variant="success" size="sm" icon={CheckCircle2} onClick={() => setCompleteModalOpen(true)}>
                  Mark Completed & Upload Proof
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Issue Details & Initial Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Reported Description
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {ticket.description}
              </p>
            </div>

            {/* Financial Ledger Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Reported By</span>
                <span className="font-bold text-slate-800">{ticket.reportedBy?.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Assigned Technician</span>
                <span className="font-bold text-slate-800">{ticket.assignedTo?.name || 'Pending'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Cost Estimate</span>
                <span className="font-bold text-slate-800">₹{ticket.costEstimate || 0}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Actual Cost</span>
                <span className="font-bold text-emerald-600">₹{ticket.actualCost || 0}</span>
              </div>
            </div>
          </div>

          {/* Photo Evidence */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Reported Photographic Proof
            </h3>
            {ticket.photos && ticket.photos.length > 0 ? (
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-44 shadow-sm">
                <img src={ticket.photos[0]} alt="Issue Evidence" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                No initial photo attached
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Resolution Timeline */}
      <MaintenanceTimeline
        timeline={ticket.timeline}
        completionPhotos={ticket.completionPhotos}
        completionNotes={ticket.completionNotes}
      />

      {/* Assign Provider Modal */}
      <Modal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        title="Assign Service Provider"
        subtitle="Dispatches work order to certified technician"
      >
        <form onSubmit={handleAssignProvider} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Technician</label>
            <select
              required
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {serviceProviders.map((sp) => (
                <option key={sp._id} value={sp._id}>
                  {sp.name} ({sp.email})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={assigning}>
              Confirm Dispatch
            </Button>
          </div>
        </form>
      </Modal>

      {/* Update Status Modal */}
      <Modal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        title="Update Resolution Status"
      >
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none"
            >
              <option value="Reviewed">Reviewed</option>
              <option value="In Progress">In Progress (Parts Procured / On-Site)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Timeline Note</label>
            <textarea
              rows={2}
              placeholder="e.g. Technician arrived on site; replacement gasket sourced..."
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setStatusModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={updatingStatus}>
              Save Note
            </Button>
          </div>
        </form>
      </Modal>

      {/* Mark Completed Modal */}
      <Modal
        isOpen={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        title="Complete Repair & Record Proof"
        subtitle="Upload completion evidence and record invoice cost"
      >
        <form onSubmit={handleCompleteRepair} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Actual Repair Cost (₹)</label>
            <input
              type="number"
              required
              placeholder="1200"
              value={actualCost}
              onChange={(e) => setActualCost(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Technician Resolution Summary</label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Replaced 35mm ceramic disc cartridge and renewed Teflon seals. Tested under full pressure with zero leakage."
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setCompleteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success" size="sm" loading={completing} icon={CheckCircle2}>
              Confirm Completion
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MaintenanceDetailPage;
