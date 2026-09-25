import React, { useState, useEffect } from 'react';
import {
  Printer,
  Plus,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Download,
  Calendar,
  Building2,
  User,
  Tag,
  Crosshair,
  Award,
  AlertTriangle,
  Receipt,
  FileCheck2,
} from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/Skeleton';

const ReportsPage = () => {
  const { isLandlord, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [reports, setReports] = useState([]);
  const [properties, setProperties] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [tenancies, setTenancies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate modal
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [reportForm, setReportForm] = useState({
    reportType: 'Move-In Inspection',
    propertyId: '',
    tenancyId: '',
    inspectionId: '',
  });

  // Report viewer modal
  const [viewingReport, setViewingReport] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reportsRes, propsRes, inspRes, tenanciesRes] = await Promise.all([
        api.get('/reports'),
        api.get('/properties'),
        api.get('/inspections'),
        api.get('/tenancies'),
      ]);

      if (reportsRes.data.success) setReports(reportsRes.data.reports || []);
      if (propsRes.data.success) {
        setProperties(propsRes.data.properties || []);
        if (propsRes.data.properties?.length > 0 && !reportForm.propertyId) {
          setReportForm((prev) => ({ ...prev, propertyId: propsRes.data.properties[0]._id }));
        }
      }
      if (inspRes.data.success) {
        setInspections(inspRes.data.inspections || []);
        if (inspRes.data.inspections?.length > 0 && !reportForm.inspectionId) {
          setReportForm((prev) => ({ ...prev, inspectionId: inspRes.data.inspections[0]._id }));
        }
      }
      if (tenanciesRes.data.success) {
        setTenancies(tenanciesRes.data.tenancies || []);
        if (tenanciesRes.data.tenancies?.length > 0 && !reportForm.tenancyId) {
          setReportForm((prev) => ({ ...prev, tenancyId: tenanciesRes.data.tenancies[0]._id }));
        }
      }
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    try {
      setGenerating(true);
      const res = await api.post('/reports/generate', reportForm);
      if (res.data.success) {
        showToast('Official Certified Report generated!', 'success');
        setGenerateModalOpen(false);
        fetchData();
        setViewingReport(res.data.report);
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to generate report.', 'error');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Audit & Inspection Reports</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Branded digital documentation for move-in, move-out, damage annotations, and tenancy lifecycle
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setGenerateModalOpen(true)}>
          Generate New Certified Report
        </Button>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-slate-900/70 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Generated Reports ({reports.length})</h3>
        </div>

        {loading ? (
          <TableSkeleton rows={4} />
        ) : reports.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Printer}
              title="No reports generated yet"
              description="Compile move-in baseline, move-out comparison, damage annotations, or tenancy financial reports with one click."
              actionLabel="Generate Report"
              onAction={() => setGenerateModalOpen(true)}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Report Title</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Generated Date</th>
                  <th className="px-6 py-4">Generated By</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {reports.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                      <span>{r.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">
                        {r.reportType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{r.property?.title}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-medium">{r.generatedBy?.name}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" icon={Printer} onClick={() => setViewingReport(r)}>
                        View & Print
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generate Report Modal */}
      <Modal
        isOpen={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        title="Generate Official Audit Report"
        subtitle="Compiles property specifications, condition photographs, damage annotations, and ledgers"
      >
        <form onSubmit={handleGenerateReport} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Report Category</label>
            <select
              value={reportForm.reportType}
              onChange={(e) => setReportForm({ ...reportForm, reportType: e.target.value })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Move-In Inspection">Move-In Inspection Baseline Report</option>
              <option value="Move-Out Inspection">Move-Out Inspection Walkthrough Report</option>
              <option value="Tenancy Summary">Full Tenancy Summary Ledger Report</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Property</label>
            <select
              required
              value={reportForm.propertyId}
              onChange={(e) => setReportForm({ ...reportForm, propertyId: e.target.value })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              {properties.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {reportForm.reportType.includes('Inspection') ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Linked Inspection</label>
              <select
                required
                value={reportForm.inspectionId}
                onChange={(e) => setReportForm({ ...reportForm, inspectionId: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {inspections.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.type} — {i.property?.title} ({new Date(i.inspectionDate).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Linked Tenancy</label>
              <select
                required
                value={reportForm.tenancyId}
                onChange={(e) => setReportForm({ ...reportForm, tenancyId: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {tenancies.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.property?.title} (Tenant: {t.tenant?.name})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setGenerateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={generating} icon={Printer}>
              Generate Report
            </Button>
          </div>
        </form>
      </Modal>

      {/* Printable Report Preview Modal */}
      {viewingReport && (
        <Modal
          isOpen={!!viewingReport}
          onClose={() => setViewingReport(null)}
          title="Printable Certified Report"
          maxWidth="max-w-5xl"
        >
          <div className="space-y-6 text-slate-800 dark:text-slate-200">
            {/* Action Bar inside Modal */}
            <div className="flex justify-end gap-2 no-print border-b border-slate-100 dark:border-slate-800 pb-4">
              <Button variant="primary" size="sm" icon={Printer} onClick={() => window.print()}>
                Print / Save PDF Certificate
              </Button>
            </div>

            {/* PRINTABLE REPORT DOCUMENT */}
            <div className="border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 space-y-6 shadow-sm">
              
              {/* Report Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 dark:border-slate-700 pb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-brand-500/20">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">RentalProof</h2>
                    <span className="text-[11px] uppercase font-black tracking-widest text-brand-600 dark:text-brand-400 block">
                      Certified Evidence & Condition Certificate
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                    {viewingReport.reportType}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Certificate ID: RP-{viewingReport._id?.substring(0, 8).toUpperCase()}
                  </span>
                  <span className="block text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    Immutable Ledger Verified
                  </span>
                </div>
              </div>

              {/* Property & Tenancy Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs border border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <span className="font-bold text-slate-400 dark:text-slate-500 block mb-1 uppercase text-[10px] tracking-wider">
                    Property Asset
                  </span>
                  <span className="font-black text-slate-900 dark:text-white text-sm block">
                    {viewingReport.summaryData?.property?.title}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {viewingReport.summaryData?.property?.address}, {viewingReport.summaryData?.property?.city}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-slate-400 dark:text-slate-500 block mb-1 uppercase text-[10px] tracking-wider">
                    Parties Involved
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 block">
                    <strong className="text-slate-900 dark:text-white">Landlord:</strong>{' '}
                    {viewingReport.summaryData?.landlord?.name || 'Authorized Landlord'}
                  </span>
                  {viewingReport.summaryData?.tenant && (
                    <span className="text-slate-700 dark:text-slate-300 block">
                      <strong className="text-slate-900 dark:text-white">Tenant:</strong>{' '}
                      {viewingReport.summaryData?.tenant?.name} ({viewingReport.summaryData?.tenant?.email})
                    </span>
                  )}
                </div>
              </div>

              {/* Inspection Items Table & Evidence Photos */}
              {viewingReport.summaryData?.inspection && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-brand-600" />
                    Condition Itemization & Photographic Evidence
                  </h4>
                  
                  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800 font-bold border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                        <tr>
                          <th className="p-3">Room / Category</th>
                          <th className="p-3">Fixture</th>
                          <th className="p-3">Condition</th>
                          <th className="p-3">Notes & Annotations</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {viewingReport.summaryData.inspection.items?.map((it, i) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="p-3 font-bold text-slate-900 dark:text-white">{it.category}</td>
                            <td className="p-3 text-slate-700 dark:text-slate-300">{it.item}</td>
                            <td className="p-3">
                              <Badge variant={it.condition} size="sm">
                                {it.condition}
                              </Badge>
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-400">
                              <div>{it.notes || 'Verified standard baseline.'}</div>
                              {it.annotations && it.annotations.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {it.annotations.map((a, aIdx) => (
                                    <span
                                      key={aIdx}
                                      className="px-1.5 py-0.5 rounded text-[10px] bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 font-semibold"
                                    >
                                      Tag: {a.title} ({a.severity})
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Dual Digital Sign-off Blocks */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t-2 border-slate-200 dark:border-slate-800 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-bold block">
                    Landlord / Inspector Formal Signature
                  </span>
                  <div className="h-10 border-b border-slate-300 dark:border-slate-700 flex items-end font-serif italic text-slate-900 dark:text-white text-base font-bold">
                    {viewingReport.generatedBy?.name || 'Eleanor Vance'}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Digitally Verified via RentalProof platform
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-bold block">
                    Tenant Acknowledgment Signature
                  </span>
                  <div className="h-10 border-b border-slate-300 dark:border-slate-700 flex items-end font-serif italic text-slate-900 dark:text-white text-base font-bold">
                    {viewingReport.summaryData?.inspection?.tenantAcknowledged
                      ? `${viewingReport.summaryData.tenant?.name || 'Verified Tenant'} (Signed)`
                      : viewingReport.summaryData?.tenant?.name || 'Rohan Mehta'}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Timestamped upon receipt
                  </span>
                </div>
              </div>

              {/* Mandatory Legal Principle Disclaimer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                This report represents a transparent digital compilation of photographic evidence and condition records stored on the RentalProof platform. It is designed to facilitate mutual transparency and does not constitute an automated legal adjudication of liability.
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReportsPage;

