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
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Security Deposit Protection
            </span>
            <Badge variant="primary" size="sm">
              Ledger Accounting
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Deposit Accounting</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Documented deductions, repair links, and recorded balances
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tenancy Selector if multiple */}
          {depositsList.length > 1 && (
            <select
              value={currentDeposit?._id}
              onChange={(e) => {
                const dep = depositsList.find((d) => d._id === e.target.value);
                if (dep) setCurrentDeposit(dep);
              }}
              className="text-xs rounded-xl border border-slate-300 px-3 py-2 bg-white text-slate-800 font-semibold focus:outline-none"
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
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
        <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Recorded Calculation Disclaimer:</span>
          All figures displayed below represent a digital calculation of recorded expenditures and condition claims. This ledger does not constitute a binding legal adjudication of tenant liability or guarantee deposit entitlement.
        </div>
      </div>

      {/* Ledger Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Original Security Deposit
          </span>
          <div className="text-3xl font-black text-slate-900">
            ₹{originalDeposit.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-400 mt-1">Paid upon lease signing</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Recorded Deductions
          </span>
          <div className="text-3xl font-black text-rose-600">
            - ₹{totalDeductions.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-rose-500 mt-1 font-medium">
            {currentDeposit?.deductions?.length || 0} documented entries
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Remaining Recorded Balance
          </span>
          <div className="text-3xl font-black text-emerald-600">
            ₹{recordedBalance.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-600 mt-1 font-medium">Calculated refund position</p>
        </div>
      </div>

      {/* Property & Tenant Meta Banner */}
      {currentDeposit && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase text-brand-600">Property Ledger</span>
            <h3 className="text-base font-bold text-slate-900">{currentDeposit.property?.title}</h3>
            <p className="text-xs text-slate-500">{currentDeposit.property?.address}, {currentDeposit.property?.city}</p>
          </div>

          <div className="text-xs text-slate-600">
            <span className="text-slate-400 block text-[11px]">Primary Tenant</span>
            <span className="font-bold text-slate-900">{currentDeposit.tenant?.name}</span> ({currentDeposit.tenant?.email})
          </div>
        </div>
      )}

      {/* Deductions Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Documented Deduction Entries</h3>
          <span className="text-xs text-slate-500">{currentDeposit?.deductions?.length || 0} items</span>
        </div>

        {currentDeposit?.deductions?.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-400">
            No deductions recorded. Deposit balance is fully intact.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Reason / Description</th>
                  <th className="px-6 py-4">Recorded Amount</th>
                  <th className="px-6 py-4">Date Logged</th>
                  <th className="px-6 py-4">Linked Evidence</th>
                  <th className="px-6 py-4">Recorded Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentDeposit?.deductions?.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">{d.reason}</td>
                    <td className="px-6 py-4 font-extrabold text-rose-600">
                      ₹{d.amount?.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(d.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {d.relatedMaintenanceId ? (
                        <span className="inline-flex items-center gap-1 text-brand-600 font-semibold bg-brand-50 px-2 py-0.5 rounded-lg text-[11px]">
                          <Wrench className="w-3 h-3" /> Ticket: {d.relatedMaintenanceId?.title || 'Repair'}
                        </span>
                      ) : d.relatedInspectionId ? (
                        <span className="inline-flex items-center gap-1 text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-lg text-[11px]">
                          <ClipboardCheck className="w-3 h-3" /> Move-Out Walkthrough
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 italic max-w-xs">{d.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Deduction Modal */}
      <Modal
        isOpen={deductionModalOpen}
        onClose={() => setDeductionModalOpen(false)}
        title="Record Security Deposit Deduction"
        subtitle="Transparently logs a deduction with justification"
      >
        <form onSubmit={handleRecordDeduction} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Deduction Reason</label>
            <input
              type="text"
              required
              placeholder="e.g. Master bathroom tap cartridge replacement"
              value={deductionForm.reason}
              onChange={(e) => setDeductionForm({ ...deductionForm, reason: e.target.value })}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Deduction Amount (₹)</label>
            <input
              type="number"
              required
              placeholder="1200"
              value={deductionForm.amount}
              onChange={(e) => setDeductionForm({ ...deductionForm, amount: e.target.value })}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Justification Remarks / Notes</label>
            <textarea
              rows={2}
              placeholder="Mutual agreement details, receipt numbers, or repair invoice notes..."
              value={deductionForm.notes}
              onChange={(e) => setDeductionForm({ ...deductionForm, notes: e.target.value })}
              className="w-full rounded-xl border border-slate-300 p-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setDeductionModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" size="sm" loading={submittingDeduction}>
              Confirm Deduction Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DepositsPage;
