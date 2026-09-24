import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Building2, Calendar, CreditCard, PiggyBank, ArrowLeft, ClipboardCheck, Wrench, FileText } from 'lucide-react';
import api from '../api/client';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { CardSkeleton } from '../components/common/Skeleton';

const TenancyDetailPage = () => {
  const { id } = useParams();
  const [tenancy, setTenancy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenancy = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/tenancies/${id}`);
        if (res.data.success) {
          setTenancy(res.data.tenancy);
        }
      } catch (error) {
        console.error('Failed to load tenancy details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenancy();
  }, [id]);

  if (loading || !tenancy) {
    return <CardSkeleton />;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link to="/tenancies" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Tenancies
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase text-brand-600">Tenancy Record</span>
              <Badge variant={tenancy.status}>{tenancy.status}</Badge>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{tenancy.property?.title}</h1>
            <p className="text-xs text-slate-500">{tenancy.property?.address}, {tenancy.property?.city}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/deposits?tenancyId=${tenancy._id}`}>
              <Button variant="outline" size="sm" icon={PiggyBank}>
                Deposit Ledger
              </Button>
            </Link>
            <Link to={`/inspections?tenancyId=${tenancy._id}`}>
              <Button variant="primary" size="sm" icon={ClipboardCheck}>
                Inspections
              </Button>
            </Link>
          </div>
        </div>

        {/* Landlord & Tenant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Landlord Details
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                {tenancy.landlord?.name?.charAt(0) || 'L'}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">{tenancy.landlord?.name}</span>
                <span className="text-xs text-slate-500 block">{tenancy.landlord?.email}</span>
                <span className="text-xs text-slate-500 block">{tenancy.landlord?.phone}</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Tenant Details
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold">
                {tenancy.tenant?.name?.charAt(0) || 'T'}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">{tenancy.tenant?.name}</span>
                <span className="text-xs text-slate-500 block">{tenancy.tenant?.email}</span>
                <span className="text-xs text-slate-500 block">{tenancy.tenant?.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Terms */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 block mb-1">Monthly Rent</span>
            <span className="text-base font-extrabold text-slate-900">₹{tenancy.monthlyRent?.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-1">Security Deposit</span>
            <span className="text-base font-extrabold text-slate-900">₹{tenancy.securityDeposit?.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-1">Start Date</span>
            <span className="text-sm font-bold text-slate-800">{new Date(tenancy.startDate).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-1">Expected End Date</span>
            <span className="text-sm font-bold text-slate-800">{new Date(tenancy.expectedEndDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Agreement Notes */}
        {tenancy.notes && (
          <div className="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 text-xs text-slate-700">
            <span className="font-bold block mb-1 text-brand-900">Special Terms / Agreement Notes:</span>
            {tenancy.notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default TenancyDetailPage;
