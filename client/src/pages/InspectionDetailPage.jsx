import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ClipboardCheck,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  ArrowLeft,
  SplitSquareVertical,
  Camera,
  Printer,
  FileCheck2,
} from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ImageModal from '../components/common/ImageModal';
import { CardSkeleton } from '../components/common/Skeleton';

const InspectionDetailPage = () => {
  const { id } = useParams();
  const { user, isTenant } = useAuth();
  const { showToast } = useToast();
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acknowledging, setAcknowledging] = useState(false);
  const [tenantNotes, setTenantNotes] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchInspection = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/inspections/${id}`);
      if (res.data.success) {
        setInspection(res.data.inspection);
      }
    } catch (error) {
      console.error('Failed to load inspection details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspection();
  }, [id]);

  const handleAcknowledge = async () => {
    try {
      setAcknowledging(true);
      const res = await api.put(`/inspections/${id}/acknowledge`, { tenantNotes });
      if (res.data.success) {
        showToast('Inspection baseline digitally acknowledged!', 'success');
        fetchInspection();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to acknowledge.', 'error');
    } finally {
      setAcknowledging(false);
    }
  };

  if (loading || !inspection) {
    return <CardSkeleton />;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to="/inspections" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Inspections
        </Link>

        <div className="flex items-center gap-2">
          {inspection.type === 'Move-Out' && (
            <Link to={`/inspections/compare?moveOutId=${inspection._id}`}>
              <Button variant="secondary" size="sm" icon={SplitSquareVertical}>
                Before vs After Compare
              </Button>
            </Link>
          )}
          <Link to={`/reports?inspectionId=${inspection._id}`}>
            <Button variant="outline" size="sm" icon={Printer}>
              Generate Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Inspection Overview Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase text-brand-600">
                {inspection.type} Condition Baseline
              </span>
              <Badge variant={inspection.status}>{inspection.status}</Badge>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{inspection.property?.title}</h1>
            <p className="text-xs text-slate-500">
              {inspection.property?.address}, {inspection.property?.city}
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400 block">Inspection Date</span>
            <span className="text-sm font-bold text-slate-800">
              {new Date(inspection.inspectionDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Tenant Acknowledgment Banner */}
        {inspection.tenantAcknowledged ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold block">Digitally Verified & Signed by Tenant</span>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                Signed on {new Date(inspection.tenantSignedAt).toLocaleString()}. Note: "
                {inspection.tenantNotes || 'Condition verified in good order.'}"
              </p>
            </div>
          </div>
        ) : isTenant ? (
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Please review and sign off on this condition report</span>
            </div>
            <input
              type="text"
              placeholder="Add your acknowledgment notes or confirmations..."
              value={tenantNotes}
              onChange={(e) => setTenantNotes(e.target.value)}
              className="w-full text-xs rounded-xl border border-amber-300 p-2.5 bg-white text-slate-900 focus:outline-none"
            />
            <Button variant="primary" size="sm" loading={acknowledging} onClick={handleAcknowledge} icon={FileCheck2}>
              Digitally Acknowledge & Sign Report
            </Button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Awaiting tenant review and digital sign-off signature.</span>
          </div>
        )}

        {/* Overall Notes */}
        {inspection.overallNotes && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
            <span className="font-bold block mb-1">Inspector Notes:</span>
            {inspection.overallNotes}
          </div>
        )}

        {/* Room-by-Room Evidence Items */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            Photographic Room & Fixture Evidence ({inspection.items?.length || 0})
          </h3>

          <div className="space-y-4">
            {inspection.items?.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-brand-600">{item.category}</span>
                    <span className="text-slate-300">•</span>
                    <h4 className="text-sm font-bold text-slate-900">{item.item}</h4>
                  </div>
                  <Badge variant={item.condition}>{item.condition}</Badge>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-600 mb-3 italic">"{item.notes}"</p>
                )}

                {/* Evidence Photos */}
                {item.photos && item.photos.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {item.photos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => setSelectedPhoto(photo)}
                        className="relative rounded-xl overflow-hidden border border-slate-200 h-28 w-36 cursor-pointer group shadow-sm hover:shadow"
                      >
                        <img
                          src={photo}
                          alt={`${item.item} Evidence`}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        src={selectedPhoto}
        title="Evidence Fullscreen View"
      />
    </div>
  );
};

export default InspectionDetailPage;
