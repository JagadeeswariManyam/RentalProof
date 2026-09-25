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
  ShieldCheck,
  Crosshair,
  Tag,
  AlertTriangle,
  Info,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ImageModal from '../components/common/ImageModal';
import DamageAnnotationModal from '../components/inspection/DamageAnnotationModal';
import EvidenceProvenanceModal from '../components/inspection/EvidenceProvenanceModal';
import { CardSkeleton } from '../components/common/Skeleton';

const InspectionDetailPage = () => {
  const { id } = useParams();
  const { user, isTenant, isLandlord } = useAuth();
  const { showToast } = useToast();
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals & Active Selectors
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [annotationModalItem, setAnnotationModalItem] = useState(null);
  const [annotationModalPhoto, setAnnotationModalPhoto] = useState(null);
  const [provenanceModalItem, setProvenanceModalItem] = useState(null);
  const [provenanceModalPhoto, setProvenanceModalPhoto] = useState(null);

  // Digital Sign-off state
  const [showSignModal, setShowSignModal] = useState(false);
  const [signedName, setSignedName] = useState(user?.name || '');
  const [signStatus, setSignStatus] = useState('Approved');
  const [signComments, setSignComments] = useState('');
  const [submittingSign, setSubmittingSign] = useState(false);

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

  const handleDigitalConfirm = async (e) => {
    e.preventDefault();
    if (!signedName.trim()) {
      showToast('Please type your legal full name for digital sign-off.', 'error');
      return;
    }

    try {
      setSubmittingSign(true);
      const res = await api.put(`/inspections/${id}/confirm`, {
        signedName: signedName.trim(),
        comments: signComments.trim(),
        status: signStatus,
      });

      if (res.data.success) {
        showToast('Inspection baseline digitally signed & ledger updated!', 'success');
        setShowSignModal(false);
        setSignComments('');
        fetchInspection();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to submit confirmation.', 'error');
    } finally {
      setSubmittingSign(false);
    }
  };

  if (loading || !inspection) {
    return <CardSkeleton />;
  }

  const landlordConfirmation = inspection.confirmations?.find((c) => c.role === 'landlord');
  const tenantConfirmation = inspection.confirmations?.find((c) => c.role === 'tenant') || (
    inspection.tenantAcknowledged ? {
      signedName: 'Tenant Verified',
      role: 'tenant',
      confirmedAt: inspection.tenantSignedAt,
      comments: inspection.tenantNotes,
      status: 'Approved'
    } : null
  );

  const totalAnnotations = (inspection.items || []).reduce(
    (acc, item) => acc + (item.annotations?.length || 0),
    0
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/inspections"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inspections
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {inspection.type === 'Move-Out' && (
            <Link to={`/inspections/compare?moveOutId=${inspection._id}`}>
              <Button variant="secondary" size="sm" icon={SplitSquareVertical}>
                Before vs After Compare
              </Button>
            </Link>
          )}
          <Link to={`/reports?inspectionId=${inspection._id}`}>
            <Button variant="outline" size="sm" icon={Printer}>
              Generate Certified Report
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            icon={ShieldCheck}
            onClick={() => {
              setSignedName(user?.name || '');
              setShowSignModal(true);
            }}
          >
            Digital Sign-Off
          </Button>
        </div>
      </div>

      {/* Main Inspection Overview Card */}
      <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6 backdrop-blur-xl">
        
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {inspection.type} Condition Baseline
              </span>
              <Badge variant={inspection.status}>{inspection.status}</Badge>
              {totalAnnotations > 0 && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {totalAnnotations} Damage Tag{totalAnnotations > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">{inspection.property?.title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {inspection.property?.address}, {inspection.property?.city}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block">Inspection Date</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {new Date(inspection.inspectionDate).toLocaleDateString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 dark:text-slate-500 block">Inspector</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {inspection.inspector?.name || 'Authorized Agent'}
              </span>
            </div>
          </div>
        </div>

        {/* Dual Digital Sign-Off Status Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Landlord Sign-Off Box */}
          <div className={`p-5 rounded-2xl border transition-all ${
            landlordConfirmation
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-brand-500" /> Landlord Confirmation
              </span>
              {landlordConfirmation ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {landlordConfirmation.status || 'Approved'}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Pending Signature
                </span>
              )}
            </div>

            {landlordConfirmation ? (
              <div className="text-xs space-y-1">
                <p className="font-extrabold text-slate-900 dark:text-white">
                  Signed by: {landlordConfirmation.signedName}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Timestamp: {new Date(landlordConfirmation.confirmedAt).toLocaleString()}
                </p>
                {landlordConfirmation.comments && (
                  <p className="text-slate-700 dark:text-slate-300 text-xs italic mt-1.5 pt-1.5 border-t border-emerald-200/50 dark:border-emerald-800/40">
                    "{landlordConfirmation.comments}"
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Awaiting landlord formal verification of physical condition record.
              </p>
            )}
          </div>

          {/* Tenant Sign-Off Box */}
          <div className={`p-5 rounded-2xl border transition-all ${
            tenantConfirmation
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-500" /> Tenant Confirmation
              </span>
              {tenantConfirmation ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {tenantConfirmation.status || 'Approved'}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Awaiting Review
                </span>
              )}
            </div>

            {tenantConfirmation ? (
              <div className="text-xs space-y-1">
                <p className="font-extrabold text-slate-900 dark:text-white">
                  Signed by: {tenantConfirmation.signedName}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Timestamp: {new Date(tenantConfirmation.confirmedAt).toLocaleString()}
                </p>
                {tenantConfirmation.comments && (
                  <p className="text-slate-700 dark:text-slate-300 text-xs italic mt-1.5 pt-1.5 border-t border-emerald-200/50 dark:border-emerald-800/40">
                    "{tenantConfirmation.comments}"
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Awaiting tenant acknowledgment of property fixtures and cleanliness.
              </p>
            )}
          </div>

        </div>

        {/* Overall Notes */}
        {inspection.overallNotes && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold block mb-1">Inspector Master Notes:</span>
            {inspection.overallNotes}
          </div>
        )}

        {/* Room & Item Photographic Evidence Ledger */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Photographic Room & Fixture Evidence ({inspection.items?.length || 0} Items)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click "Annotate Damage" to draw boxes around scratches or wear. Click "Provenance" for SHA-256 metadata.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {inspection.items?.map((item, idx) => (
              <div
                key={item._id || idx}
                className="p-5 sm:p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 hover:border-brand-500/40 transition-all space-y-4 shadow-sm"
              >
                {/* Item Top Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black uppercase px-2.5 py-1 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                      {item.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.item}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.annotations && item.annotations.length > 0 && (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> {item.annotations.length} Tag{item.annotations.length > 1 ? 's' : ''}
                      </span>
                    )}
                    <Badge variant={item.condition}>{item.condition}</Badge>
                  </div>
                </div>

                {/* Item Notes */}
                {item.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                    "{item.notes}"
                  </p>
                )}

                {/* Evidence Photos with Interactive Overlays */}
                {item.photos && item.photos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-1">
                    {item.photos.map((photo, pIdx) => {
                      const photoAnnotations = (item.annotations || []).filter(
                        (a) => a.photoUrl === photo || a.photoIndex === pIdx
                      );

                      return (
                        <div
                          key={pIdx}
                          className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 aspect-[4/3] flex flex-col justify-end shadow-sm hover:shadow-md transition"
                        >
                          <img
                            src={photo}
                            alt={`${item.item} Evidence ${pIdx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />

                          {/* Render Mini Box Indicators */}
                          {photoAnnotations.map((anno, aIdx) => (
                            <div
                              key={aIdx}
                              style={{
                                left: `${anno.coordinates?.x}%`,
                                top: `${anno.coordinates?.y}%`,
                                width: `${anno.coordinates?.width}%`,
                                height: `${anno.coordinates?.height}%`,
                              }}
                              className="absolute border-2 border-rose-500 bg-rose-500/20 rounded pointer-events-none z-10"
                            />
                          ))}

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition" />

                          {/* Overlay Controls */}
                          <div className="relative z-20 p-3 space-y-2">
                            <div className="flex items-center justify-between text-white text-[11px]">
                              <span className="font-bold flex items-center gap-1">
                                Photo #{pIdx + 1}
                              </span>
                              {photoAnnotations.length > 0 && (
                                <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white font-extrabold text-[10px]">
                                  {photoAnnotations.length} Tagged
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-3 gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedPhoto(photo)}
                                className="px-2 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold backdrop-blur-md transition flex items-center justify-center gap-1"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setAnnotationModalItem(item);
                                  setAnnotationModalPhoto(photo);
                                }}
                                className="px-2 py-1.5 rounded-lg bg-brand-500/80 hover:bg-brand-500 text-white text-[10px] font-bold backdrop-blur-md transition flex items-center justify-center gap-1"
                              >
                                <Crosshair className="w-3 h-3" /> Tag Box
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setProvenanceModalItem(item);
                                  setProvenanceModalPhoto(photo);
                                }}
                                className="px-2 py-1.5 rounded-lg bg-emerald-500/80 hover:bg-emerald-500 text-white text-[10px] font-bold backdrop-blur-md transition flex items-center justify-center gap-1"
                              >
                                <ShieldCheck className="w-3 h-3" /> Hash
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No photographic evidence recorded for this item.</p>
                )}

                {/* Annotation Badges List if present */}
                {item.annotations && item.annotations.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {item.annotations.map((anno, aIdx) => (
                      <div
                        key={anno._id || aIdx}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs shadow-sm"
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{anno.title}</span>
                        <Badge variant={anno.severity}>{anno.severity}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Digital Sign-Off Confirmation Modal */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Digital Sign-Off Confirmation</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Role: <span className="font-bold uppercase text-brand-600 dark:text-brand-400">{user?.role}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleDigitalConfirm} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Legal Full Name for Digital Signature
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={signedName}
                  onChange={(e) => setSignedName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Confirmation Decision</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSignStatus('Approved')}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                      signStatus === 'Approved'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Condition
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignStatus('Contested')}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                      signStatus === 'Contested'
                        ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" /> Contest / Dispute
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sign-Off Notes / Clarifications</label>
                <textarea
                  rows={3}
                  placeholder="Add any final sign-off notes or agreed rectification timelines..."
                  value={signComments}
                  onChange={(e) => setSignComments(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button variant="ghost" size="sm" type="button" onClick={() => setShowSignModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" loading={submittingSign} icon={ShieldCheck}>
                  Affix Digital Signature
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Photo View */}
      <ImageModal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        src={selectedPhoto}
        title="Evidence Fullscreen View"
      />

      {/* Damage Annotation Modal */}
      <DamageAnnotationModal
        isOpen={!!annotationModalItem}
        onClose={() => {
          setAnnotationModalItem(null);
          setAnnotationModalPhoto(null);
        }}
        inspectionId={inspection._id}
        item={annotationModalItem}
        photoUrl={annotationModalPhoto}
        onAnnotationUpdated={() => {
          fetchInspection();
        }}
      />

      {/* Evidence Provenance Modal */}
      <EvidenceProvenanceModal
        isOpen={!!provenanceModalItem}
        onClose={() => {
          setProvenanceModalItem(null);
          setProvenanceModalPhoto(null);
        }}
        item={provenanceModalItem}
        photoUrl={provenanceModalPhoto}
      />
    </div>
  );
};

export default InspectionDetailPage;

