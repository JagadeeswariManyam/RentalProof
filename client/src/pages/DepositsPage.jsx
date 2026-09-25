import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PiggyBank, Plus, HelpCircle, ShieldCheck, ArrowRight, Wrench, ClipboardCheck, Calendar } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { CardSkeleton } from '../components/common/Skeleton';

const DepositsPage = () => {
  const [searchParams] = useSearchParams();
  const tenancyIdParam = searchParams.get('tenancyId');
  const { isLandlord, isAdmin, isTenant } = useAuth();
  const { showToast } = useToast();

  const [depositsList, setDepositsList] = useState([]);
  const [currentDeposit, setCurrentDeposit] = useState(null);
  const [loading, setLoading] = useState(true);

  // Deduction modal
  const [deductionModalOpen, setDeductionModalOpen] = useState(false);
  const [submittingDeduction, setSubmittingDeduction] = useState(false);
  const [deductionForm, setDeductionForm] = useState({
    reason: '',
    amount: '',
    notes: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/deposits');
      if (res.data.success) {
        const deposits = res.data.deposits || [];
        setDepositsList(deposits);

        if (tenancyIdParam) {
          const found = deposits.find((d) => d.tenancy?._id === tenancyIdParam);
          if (found) setCurrentDeposit(found);
          else if (deposits.length > 0) setCurrentDeposit(deposits[0]);
        } else if (deposits.length > 0) {
          setCurrentDeposit(deposits[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load deposit ledgers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tenancyIdParam]);

  const handleRecordDeduction = async (e) => {
    e.preventDefault();
    if (!currentDeposit?.tenancy?._id) return;

    try {
      setSubmittingDeduction(true);
      const res = await api.post(`/deposits/tenancy/${currentDeposit.tenancy._id}/deductions`, deductionForm);
      if (res.data.success) {
        showToast('Deduction logged into deposit ledger!', 'success');
        setDeductionModalOpen(false);
        setDeductionForm({ reason: '', amount: '', notes: '' });
        fetchData();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to add deduction.', 'error');
    } finally {
      setSubmittingDeduction(false);
    }
  };

  if (loading) {
    return <CardSkeleton />;
  }

  const originalDeposit = currentDeposit?.originalDeposit || 0;
  const recordedBalance = currentDeposit?.recordedBalance || 0;
  const totalDeductions = originalDeposit - recordedBalance;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Security Deposit Protection
            </span>
            <Badge variant="primary" size="sm">
              Ledger Accounting
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Deposit Accounting</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Documented deductions, repair links, and recorded balances
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Tenancy Selector if multiple */}
          {depositsList.length > 1 && (
            <select
              value={currentDeposit?._id}
              onChange={(e) => {
                const dep = depositsList.find((d) => d._id === e.target.value);
                if (dep) setCurrentDeposit(dep);
              }}
              className="text-xs rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none"
            >
              {depositsList.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.property?.title} (Tenant: {d.tenant?.name})
                </option>
              ))}
            </select>
          )}

          {(isLandlord || isAdmin) && (
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setDeductionModalOpen(true)}
            >
              Record Deduction
            </Button>
          )}
        </div>
      </div>

      {/* Ethical Legal Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
        <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Recorded Calculation Disclaimer:</span>
          All figures displayed below represent a digital calculation of recorded expenditures and condition claims. This ledger does not constitute a binding legal adjudication of tenant liability or guarantee deposit entitlement.
        </div>
      </div>

      {/* Ledger Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            Original Security Deposit
          </span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            ₹{originalDeposit.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Paid upon lease signing</p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            Recorded Deductions
          </span>
          <div className="text-3xl font-black text-rose-600 dark:text-rose-400">
            - ₹{totalDeductions.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 font-medium">
            {currentDeposit?.deductions?.length || 0} documented entries
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            Remaining Recorded Balance
          </span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            ₹{recordedBalance.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">Calculated refund position</p>
        </div>
      </div>

      {/* Property & Tenant Meta Banner */}
      {currentDeposit && (
        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl">
          <div>
            <span className="text-xs font-bold uppercase text-brand-600 dark:text-brand-400">Property Ledger</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{currentDeposit.property?.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{currentDeposit.property?.address}, {currentDeposit.property?.city}</p>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300">
            <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Primary Tenant</span>
            <span className="font-bold text-slate-900 dark:text-white">{currentDeposit.tenant?.name}</span> ({currentDeposit.tenant?.email})
          </div>
        </div>
      )}

      {/* Deductions Breakdown Table */}
      <div className="bg-white dark:bg-slate-900/70 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Documented Deduction Entries</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">{currentDeposit?.deductions?.length || 0} items</span>
        </div>

        {currentDeposit?.deductions?.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-400 dark:text-slate-500">
            No deductions recorded. Deposit balance is fully intact.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Reason / Description</th>
                  <th className="px-6 py-4">Recorded Amount</th>
                  <th className="px-6 py-4">Date Logged</th>
                  <th className="px-6 py-4">Linked Evidence</th>
                  <th className="px-6 py-4">Recorded Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {currentDeposit?.deductions?.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{d.reason}</td>
                    <td className="px-6 py-4 font-extrabold text-rose-600 dark:text-rose-400">
                      ₹{d.amount?.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {new Date(d.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {d.relatedMaintenanceId ? (
                        <span className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/60 px-2 py-0.5 rounded-lg text-[11px]">
                          <Wrench className="w-3 h-3" /> Ticket: {d.relatedMaintenanceId?.title || 'Repair'}
                        </span>
                      ) : d.relatedInspectionId ? (
                        <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 px-2 py-0.5 rounded-lg text-[11px]">
                          <ClipboardCheck className="w-3 h-3" /> Move-Out Walkthrough
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 italic max-w-xs">{d.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Deduction Modal */}
      <Modal
        isOpen={deductionModalOpen}
        onClose={() => setDeductionModalOpen(false)}
        title="Record Deposit Deduction"
        subtitle="Itemizes a cost against the tenant's security deposit with explanation"
      >
        <form onSubmit={handleRecordDeduction} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Reason / Item</label>
            <input
              type="text"
              required
              placeholder="e.g. Master Bedroom Wall Patch & Repaint (Post-Inspection #410)"
              value={deductionForm.reason}
              onChange={(e) => setDeductionForm({ ...deductionForm, reason: e.target.value })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Deduction Amount (₹)</label>
            <input
              type="number"
              required
              placeholder="2500"
              value={deductionForm.amount}
              onChange={(e) => setDeductionForm({ ...deductionForm, amount: e.target.value })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Detailed Explanation & Itemization</label>
            <textarea
              rows={3}
              placeholder="Provide context, contractor quotation or materials breakdown..."
              value={deductionForm.notes}
              onChange={(e) => setDeductionForm({ ...deductionForm, notes: e.target.value })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setDeductionModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" size="sm" loading={submittingDeduction}>
              Log Deduction Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DepositsPage;
