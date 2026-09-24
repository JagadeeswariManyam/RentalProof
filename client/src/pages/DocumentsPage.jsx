import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Download, Trash2, Calendar, Building2, Upload } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/Skeleton';

const DocumentsPage = () => {
  const { user, isLandlord, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [documents, setDocuments] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    propertyId: '',
    name: '',
    category: 'Rental Agreement',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileSize: 1024 * 250,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [docsRes, propsRes] = await Promise.all([
        api.get('/documents', {
          params: {
            category: categoryFilter !== 'all' ? categoryFilter : undefined,
            search: search || undefined,
          },
        }),
        api.get('/properties'),
      ]);

      if (docsRes.data.success) setDocuments(docsRes.data.documents || []);
      if (propsRes.data.success) {
        setProperties(propsRes.data.properties || []);
        if (propsRes.data.properties?.length > 0 && !form.propertyId) {
          setForm((prev) => ({ ...prev, propertyId: propsRes.data.properties[0]._id }));
        }
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryFilter]);

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post('/documents', form);
      if (res.data.success) {
        showToast('Document uploaded to vault!', 'success');
        setUploadModalOpen(false);
        setForm({
          propertyId: properties[0]?._id || '',
          name: '',
          category: 'Rental Agreement',
          fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          fileType: 'application/pdf',
          fileSize: 1024 * 250,
        });
        fetchData();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to register document.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    try {
      await api.delete(`/documents/${docId}`);
      showToast('Document removed.', 'info');
      fetchData();
    } catch (error) {
      showToast('Failed to delete document.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Document Vault</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Agreements, repair invoices, receipts, and property records
          </p>
        </div>

        <Button variant="primary" size="md" icon={Upload} onClick={() => setUploadModalOpen(true)}>
          Upload Document
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 text-slate-700 font-medium focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="Rental Agreement">Rental Agreement</option>
          <option value="Inspection Report">Inspection Report</option>
          <option value="Maintenance Receipt">Maintenance Receipt</option>
          <option value="Payment Proof">Payment Proof</option>
          <option value="Property Document">Property Document</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Document Grid / Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Stored Files ({documents.length})</h3>
        </div>

        {loading ? (
          <TableSkeleton rows={4} />
        ) : documents.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={FileText}
              title="No documents uploaded"
              description="Upload lease agreements, receipts, and condition reports to keep everything in one place."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Document Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Upload Date</th>
                  <th className="px-6 py-4">Uploaded By</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>{doc.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{doc.property?.title}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {doc.uploadedBy?.name || 'Staff'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition"
                          title="View / Download File"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        {(isLandlord || isAdmin) && (
                          <button
                            onClick={() => handleDeleteDocument(doc._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Delete Document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Document Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Document"
        subtitle="Store official tenancy agreements or maintenance receipts"
      >
        <form onSubmit={handleUploadDocument} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Property</label>
            <select
              required
              value={form.propertyId}
              onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none"
            >
              {properties.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Registered Tenancy Agreement 2026.pdf"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:outline-none"
            >
              <option value="Rental Agreement">Rental Agreement</option>
              <option value="Inspection Report">Inspection Report</option>
              <option value="Maintenance Receipt">Maintenance Receipt</option>
              <option value="Payment Proof">Payment Proof</option>
              <option value="Property Document">Property Document</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={submitting}>
              Upload Document
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DocumentsPage;
