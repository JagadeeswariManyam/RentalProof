import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Mail, Calendar, CreditCard, Building2, CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/Skeleton';

const TenanciesPage = () => {
  const { isLandlord, isTenant, isAdmin, user } = useAuth();
  const { showToast } = useToast();
  const [tenancies, setTenancies] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviting, setInviting] = useState(false);

  const [inviteForm, setInviteForm] = useState({
    propertyId: '',
    tenantEmail: '',
    tenantName: '',
    tenantPhone: '',
    monthlyRent: '',
    securityDeposit: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tenanciesRes, invitesRes, propsRes] = await Promise.all([
        api.get('/tenancies'),
        api.get('/invitations'),
        isLandlord || isAdmin ? api.get('/properties') : Promise.resolve({ data: { properties: [] } }),
      ]);

      if (tenanciesRes.data.success) setTenancies(tenanciesRes.data.tenancies || []);
      if (invitesRes.data.success) setInvitations(invitesRes.data.invitations || []);
      if (propsRes.data.success) {
        setProperties(propsRes.data.properties || []);
        if (propsRes.data.properties?.length > 0) {
          setInviteForm((prev) => ({
            ...prev,
            propertyId: propsRes.data.properties[0]._id,
            monthlyRent: propsRes.data.properties[0].rentAmount,
            securityDeposit: propsRes.data.properties[0].depositAmount,
          }));
        }
      }
    } catch (error) {
      console.error('Failed to load tenancies data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendInvite = async (e) => {
    e.preventDefault();
    try {
      setInviting(true);
      const res = await api.post('/invitations', inviteForm);
      if (res.data.success) {
        showToast('Tenancy invitation sent successfully!', 'success');
        setInviteModalOpen(false);
        fetchData();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to send invitation', 'error');
    } finally {
      setInviting(false);
    }
  };

  const handleAcceptInvite = async (inviteId) => {
    try {
      const res = await api.put(`/invitations/${inviteId}/accept`);
      if (res.data.success) {
        showToast('Invitation accepted! Tenancy created.', 'success');
        fetchData();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to accept invitation', 'error');
    }
  };

  const handleRejectInvite = async (inviteId) => {
    try {
      const res = await api.put(`/invitations/${inviteId}/reject`);
      if (res.data.success) {
        showToast('Invitation declined.', 'info');
        fetchData();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to decline invitation', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tenancy Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Agreements, tenant invitations, and active lease records
          </p>
        </div>

        {(isLandlord || isAdmin) && (
          <Button variant="primary" size="md" icon={Plus} onClick={() => setInviteModalOpen(true)}>
            Invite Tenant
          </Button>
        )}
      </div>

      {/* Invitations Section (If any pending) */}
      {invitations.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-600" />
            Tenancy Invitations ({invitations.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invitations.map((inv) => (
              <div
                key={inv._id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{inv.property?.title}</span>
                    <Badge variant={inv.status}>{inv.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    {isLandlord ? `Invited: ${inv.tenantEmail}` : `From: ${inv.landlord?.name} (${inv.landlord?.email})`}
                  </p>
                  <div className="text-xs text-slate-700 space-y-1">
                    <div>Rent: ₹{inv.monthlyRent?.toLocaleString('en-IN')} / mo</div>
                    <div>Deposit: ₹{inv.securityDeposit?.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                {/* Actions for tenant */}
                {isTenant && inv.status === 'Pending' && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-200">
                    <Button variant="primary" size="sm" onClick={() => handleAcceptInvite(inv._id)}>
                      Accept & Connect
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleRejectInvite(inv._id)}>
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tenancies Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Active & Historical Tenancies</h3>
          <span className="text-xs text-slate-500">{tenancies.length} records</span>
        </div>

        {loading ? (
          <TableSkeleton rows={4} />
        ) : tenancies.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Users}
              title="No tenancies found"
              description="Invite a tenant to a property to start documenting agreements."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">{isTenant ? 'Landlord' : 'Tenant'}</th>
                  <th className="px-6 py-4">Term Dates</th>
                  <th className="px-6 py-4">Monthly Rent</th>
                  <th className="px-6 py-4">Security Deposit</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tenancies.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{t.property?.title}</div>
                      <div className="text-[11px] text-slate-400">{t.property?.city}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">
                        {isTenant ? t.landlord?.name : t.tenant?.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {isTenant ? t.landlord?.email : t.tenant?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div>{new Date(t.startDate).toLocaleDateString()}</div>
                      <div className="text-[11px] text-slate-400">to {new Date(t.expectedEndDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₹{t.monthlyRent?.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      ₹{t.securityDeposit?.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={t.status}>{t.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/tenancies/${t._id}`}>
                        <Button variant="outline" size="sm" icon={ArrowRight}>
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Tenant Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite Tenant to Property"
        subtitle="Generates an official digital tenancy invitation"
      >
        <form onSubmit={handleSendInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Property</label>
            <select
              required
              value={inviteForm.propertyId}
              onChange={(e) => {
                const prop = properties.find((p) => p._id === e.target.value);
                setInviteForm({
                  ...inviteForm,
                  propertyId: e.target.value,
                  monthlyRent: prop?.rentAmount || inviteForm.monthlyRent,
                  securityDeposit: prop?.depositAmount || inviteForm.securityDeposit,
                });
              }}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {properties.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} ({p.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tenant Email</label>
            <input
              type="email"
              required
              placeholder="tenant@example.com"
              value={inviteForm.tenantEmail}
              onChange={(e) => setInviteForm({ ...inviteForm, tenantEmail: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Rent (₹)</label>
              <input
                type="number"
                required
                value={inviteForm.monthlyRent}
                onChange={(e) => setInviteForm({ ...inviteForm, monthlyRent: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Security Deposit (₹)</label>
              <input
                type="number"
                required
                value={inviteForm.securityDeposit}
                onChange={(e) => setInviteForm({ ...inviteForm, securityDeposit: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tenancy Start Date</label>
            <input
              type="date"
              required
              value={inviteForm.startDate}
              onChange={(e) => setInviteForm({ ...inviteForm, startDate: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={inviting} icon={ArrowRight}>
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TenanciesPage;
