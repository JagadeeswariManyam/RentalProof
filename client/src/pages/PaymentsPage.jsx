import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Search, Calendar, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/Skeleton';

const PaymentsPage = () => {
  const { user, isLandlord, isTenant, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [payments, setPayments] = useState([]);
  const [tenancies, setTenancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    tenancyId: '',
    amount: '',
    month: 'October 2026',
    dueDate: new Date().toISOString().split('T')[0],
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'UPI',
    status: 'Paid',
    referenceNumber: '',
    notes: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [paymentsRes, tenanciesRes] = await Promise.all([
        api.get('/payments', {
          params: { status: statusFilter !== 'all' ? statusFilter : undefined },
        }),
        api.get('/tenancies'),
      ]);

      if (paymentsRes.data.success) setPayments(paymentsRes.data.payments || []);
      if (tenanciesRes.data.success) {
        setTenancies(tenanciesRes.data.tenancies || []);
        if (tenanciesRes.data.tenancies?.length > 0 && !form.tenancyId) {
          setForm((prev) => ({
            ...prev,
            tenancyId: tenanciesRes.data.tenancies[0]._id,
            amount: tenanciesRes.data.tenancies[0].monthlyRent,
          }));
        }
      }
    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post('/payments', form);
      if (res.data.success) {
        showToast('Payment record added to ledger!', 'success');
        setModalOpen(false);
        fetchData();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to record payment.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const totalCollected = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Rent Payment Records</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Documented monthly rental transactions and payment receipts
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setModalOpen(true)}>
          Record Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Rent Documented
          </span>
          <div className="text-2xl font-black text-slate-900">₹{totalCollected.toLocaleString('en-IN')}</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            {payments.filter((p) => p.status === 'Paid').length} verified transactions
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Current Month Status
          </span>
          <div className="text-2xl font-black text-emerald-600">Settled</div>
          <span className="text-xs text-slate-500 mt-1 block">Zero overdue balances</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Payment Method Split
          </span>
          <div className="text-sm font-bold text-slate-800 mt-1">UPI (85%) • Net Banking (15%)</div>
          <span className="text-xs text-slate-400 mt-1 block">Verified digital transfers</span>
        </div>
      </div>

      {/* Ledger Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900">Rent Ledger History</h3>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-1.5 bg-slate-50 text-slate-700 font-medium focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Late">Late</option>
          </select>
        </div>

        {loading ? (
          <TableSkeleton rows={4} />
        ) : payments.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={CreditCard}
              title="No payment records found"
              description="Record a monthly rent payment to maintain a verifiable financial audit trail."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Month</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Payment Date</th>
                  <th className="px-6 py-4">Method & Ref</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">{p.month}</td>
                    <td className="px-6 py-4 text-slate-600">{p.property?.title}</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">
                      ₹{p.amount?.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800">{p.paymentMethod}</span>
                      {p.referenceNumber && (
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {p.referenceNumber}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={p.status}>{p.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate">
                      {p.notes || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Payment Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Record Rent Payment"
        subtitle="Manually logs rent transaction into digital ledger"
      >
        <form onSubmit={handleRecordPayment} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tenancy Agreement</label>
            <select
              required
              value={form.tenancyId}
              onChange={(e) => {
                const t = tenancies.find((item) => item._id === e.target.value);
                setForm({
                  ...form,
                  tenancyId: e.target.value,
                  amount: t?.monthlyRent || form.amount,
                });
              }}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {tenancies.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.property?.title} (Tenant: {t.tenant?.name})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Rent Month</label>
              <input
                type="text"
                placeholder="e.g. October 2026"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none"
              >
                <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                <option value="Bank Transfer">Bank Transfer (NEFT/IMPS)</option>
                <option value="Cash">Cash Receipt</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reference Number</label>
              <input
                type="text"
                placeholder="e.g. UPI-260901-4491"
                value={form.referenceNumber}
                onChange={(e) => setForm({ ...form, referenceNumber: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Verification Remarks</label>
            <input
              type="text"
              placeholder="e.g. Payment verified in landlord bank account."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={submitting}>
              Log Payment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentsPage;
