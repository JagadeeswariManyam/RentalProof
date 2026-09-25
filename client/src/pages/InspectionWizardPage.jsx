import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ClipboardCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Camera,
  Image as ImageIcon,
  Plus,
  Save,
  SplitSquareVertical,
  Compass,
  Sparkles,
  Layers,
  Eye,
  Trash2,
} from 'lucide-react';
import api from '../api/client';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const SAMPLE_PHOTO_LIBRARY = [
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
];

const InspectionWizardPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [properties, setProperties] = useState([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Same-Angle Guide Overlay Modal State
  const [activeGuideItem, setActiveGuideItem] = useState(null);
  const [ghostOpacity, setGhostOpacity] = useState(50);
  const [showAlignmentGrid, setShowAlignmentGrid] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyId: '',
    type: 'Move-In',
    inspectionDate: new Date().toISOString().split('T')[0],
    overallNotes: '',
    items: [],
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoadingProps(true);
        const res = await api.get('/properties');
        if (res.data.success && res.data.properties?.length > 0) {
          const props = res.data.properties;
          setProperties(props);
          const firstProp = props[0];

          // Initialize items from property's checklist
          const initialItems = [];
          let imgIdx = 0;
          firstProp.checklist?.forEach((cat) => {
            cat.items.forEach((it) => {
              initialItems.push({
                category: cat.category,
                item: it,
                condition: 'Good',
                notes: '',
                photos: [SAMPLE_PHOTO_LIBRARY[imgIdx % SAMPLE_PHOTO_LIBRARY.length]],
                baselinePhoto: SAMPLE_PHOTO_LIBRARY[imgIdx % SAMPLE_PHOTO_LIBRARY.length],
              });
              imgIdx++;
            });
          });

          setFormData((prev) => ({
            ...prev,
            propertyId: firstProp._id,
            items: initialItems,
          }));
        }
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setLoadingProps(false);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyChange = (propertyId) => {
    const prop = properties.find((p) => p._id === propertyId);
    if (!prop) return;

    const initialItems = [];
    let imgIdx = 0;
    prop.checklist?.forEach((cat) => {
      cat.items.forEach((it) => {
        initialItems.push({
          category: cat.category,
          item: it,
          condition: 'Good',
          notes: '',
          photos: [SAMPLE_PHOTO_LIBRARY[imgIdx % SAMPLE_PHOTO_LIBRARY.length]],
          baselinePhoto: SAMPLE_PHOTO_LIBRARY[imgIdx % SAMPLE_PHOTO_LIBRARY.length],
        });
        imgIdx++;
      });
    });

    setFormData({
      ...formData,
      propertyId,
      items: initialItems,
    });
  };

  const handleItemConditionChange = (index, condition) => {
    const updated = [...formData.items];
    updated[index].condition = condition;
    setFormData({ ...formData, items: updated });
  };

  const handleItemNotesChange = (index, notes) => {
    const updated = [...formData.items];
    updated[index].notes = notes;
    setFormData({ ...formData, items: updated });
  };

  const handleAddPhoto = (index) => {
    const nextPhoto = SAMPLE_PHOTO_LIBRARY[(formData.items[index].photos.length + 1) % SAMPLE_PHOTO_LIBRARY.length];
    const updated = [...formData.items];
    updated[index].photos = [...(updated[index].photos || []), nextPhoto];
    setFormData({ ...formData, items: updated });
    showToast('Evidence photo attached', 'info');
  };

  const handleRemovePhoto = (itemIndex, photoIdx) => {
    const updated = [...formData.items];
    updated[itemIndex].photos = updated[itemIndex].photos.filter((_, i) => i !== photoIdx);
    setFormData({ ...formData, items: updated });
  };

  // Group items by category for multi-step room wizard
  const categories = [...new Set(formData.items.map((i) => i.category))];
  const steps = ['Setup', ...categories, 'Final Review'];

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await api.post('/inspections', {
        propertyId: formData.propertyId,
        type: formData.type,
        inspectionDate: formData.inspectionDate,
        customItems: formData.items,
      });

      if (res.data.success) {
        // Mark as completed
        await api.put(`/inspections/${res.data.inspection._id}/complete`, {
          overallNotes: formData.overallNotes,
        });

        showToast('Inspection completed & baseline recorded!', 'success');
        navigate(`/inspections/${res.data.inspection._id}`);
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to complete inspection.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        to="/inspections"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Cancel & Return
      </Link>

      {/* Progress Steps Header */}
      <div className="bg-white dark:bg-slate-900/80 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-x-auto no-scrollbar backdrop-blur-xl">
        <div className="flex items-center justify-between min-w-[500px] gap-2">
          {steps.map((stepName, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                currentStep === idx
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : currentStep > idx
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-current font-black">
                {idx + 1}
              </span>
              <span>{stepName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Wizard Body */}
      <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6 backdrop-blur-xl">
        
        {/* Step 0: Setup */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Step 1 — Inspection Parameters</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Select target property, baseline mode, and verification date</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Select Property</label>
                <select
                  value={formData.propertyId}
                  onChange={(e) => handlePropertyChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {properties.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title} ({p.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Inspection Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Move-In">Move-In Baseline</option>
                  <option value="Move-Out">Move-Out Walkthrough (Enables Same-Angle Guide)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Inspection Date</label>
                <input
                  type="date"
                  value={formData.inspectionDate}
                  onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Room Steps (1 to categories.length) */}
        {currentStep > 0 && currentStep <= categories.length && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Room Inspection Checklist
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{categories[currentStep - 1]}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Evaluate each fixture and capture matching angles for AI verification.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300">
                <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Use <strong>Same-Angle Guide</strong> to match previous baseline photos</span>
              </div>
            </div>

            <div className="space-y-5">
              {formData.items
                .map((item, idx) => ({ ...item, globalIndex: idx }))
                .filter((item) => item.category === categories[currentStep - 1])
                .map((item) => (
                  <div
                    key={item.globalIndex}
                    className="p-5 sm:p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.item}</h4>
                        <span className="text-xs text-slate-400">Category: {item.category}</span>
                      </div>
                      <Badge variant={item.condition}>{item.condition}</Badge>
                    </div>

                    {/* Condition Assessment Buttons */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                        Condition Assessment
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Excellent', 'Good', 'Fair', 'Needs Attention', 'Damaged'].map((cond) => (
                          <button
                            key={cond}
                            type="button"
                            onClick={() => handleItemConditionChange(item.globalIndex, cond)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                              item.condition === cond
                                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {cond}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes Field */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add observational notes (e.g. minor paint blemish, clean surface)..."
                        value={item.notes}
                        onChange={(e) => handleItemNotesChange(item.globalIndex, e.target.value)}
                        className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    {/* Photo Evidence & Same-Angle Assistant Bar */}
                    <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Photographic Proof ({item.photos?.length || 0})
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveGuideItem(item)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold hover:bg-indigo-500/20 transition flex items-center gap-1.5"
                          >
                            <Compass className="w-3.5 h-3.5" /> Same-Angle Guide
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddPhoto(item.globalIndex)}
                            className="px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 text-xs font-bold hover:bg-brand-500/20 transition flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Photo
                          </button>
                        </div>
                      </div>

                      {/* Photo Thumbnails */}
                      <div className="flex flex-wrap gap-3 pt-1">
                        {item.photos?.map((pUrl, pIdx) => (
                          <div
                            key={pIdx}
                            className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 h-24 w-32 bg-slate-950"
                          >
                            <img src={pUrl} alt="Evidence" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(item.globalIndex, pIdx)}
                                className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Final Step: Review */}
        {currentStep === steps.length - 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Final Review & Sign-Off</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review all room evaluations and recorded photos before registering the condition baseline.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Total Items Evaluated:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.items.length} Fixtures</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Inspection Type:</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{formData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Target Date:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.inspectionDate}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Overall Inspection Summary Notes
              </label>
              <textarea
                rows={3}
                placeholder="Overall observations, key handover remarks, or mutual confirmations..."
                value={formData.overallNotes}
                onChange={(e) => setFormData({ ...formData, overallNotes: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-3 text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="outline"
            size="md"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          >
            Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next Room
            </Button>
          ) : (
            <Button
              variant="success"
              size="md"
              icon={CheckCircle2}
              loading={submitting}
              onClick={handleSubmit}
            >
              Finalize & Save Baseline
            </Button>
          )}
        </div>
      </div>

      {/* Same-Angle Photo Guide Modal */}
      {activeGuideItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Same-Angle Photo Alignment Guide
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                      {activeGuideItem.category} • {activeGuideItem.item}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Align your camera with the baseline reference overlay for exact AI pixel comparison.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveGuideItem(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            {/* Ghost Overlay / Side-by-Side Viewport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Baseline Reference Photo */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>1. Move-In Baseline Reference</span>
                  <span className="text-emerald-500 font-mono text-[11px]">Original Angle</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-64 bg-slate-950">
                  <img
                    src={activeGuideItem.baselinePhoto || activeGuideItem.photos?.[0]}
                    alt="Baseline Reference"
                    className="w-full h-full object-cover"
                  />
                  {showAlignmentGrid && (
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-cyan-400/40">
                      <div className="border-r border-b border-cyan-400/20" />
                      <div className="border-r border-b border-cyan-400/20" />
                      <div className="border-b border-cyan-400/20" />
                      <div className="border-r border-b border-cyan-400/20" />
                      <div className="border-r border-b border-cyan-400/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-dashed border-cyan-400/60" />
                      </div>
                      <div className="border-b border-cyan-400/20" />
                      <div className="border-r border-cyan-400/20" />
                      <div className="border-r border-cyan-400/20" />
                      <div />
                    </div>
                  )}
                </div>
              </div>

              {/* Ghost Matcher / Camera Alignment */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>2. Live / Matching Capture</span>
                  <span className="text-indigo-400 font-mono text-[11px]">Ghost Overlay Active</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-indigo-500/50 h-64 bg-slate-900 flex items-center justify-center">
                  <img
                    src={activeGuideItem.photos?.[0] || activeGuideItem.baselinePhoto}
                    alt="Ghost Matching"
                    style={{ opacity: ghostOpacity / 100 }}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none filter saturate-50 contrast-125"
                  />
                  <div className="relative z-10 text-center p-4">
                    <Camera className="w-8 h-8 text-indigo-400 mx-auto mb-2 animate-bounce" />
                    <span className="text-xs font-bold text-white block">Camera Target Aligned</span>
                    <span className="text-[11px] text-slate-300">Tilt 2° to match reference horizon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guide Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" /> Ghost Opacity: {ghostOpacity}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={ghostOpacity}
                  onChange={(e) => setGhostOpacity(Number(e.target.value))}
                  className="w-32 accent-indigo-600"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAlignmentGrid(!showAlignmentGrid)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                    showAlignmentGrid
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
                      : 'text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {showAlignmentGrid ? 'Grid Lines ON' : 'Grid Lines OFF'}
                </button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    showToast('Angle alignment verified & matched!', 'success');
                    setActiveGuideItem(null);
                  }}
                >
                  Accept Alignment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionWizardPage;

