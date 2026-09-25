import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Trash2, Tag, AlertTriangle, Check, ShieldCheck, Crosshair, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import api from '../../api/client';
import { useToast } from '../../context/ToastContext';

const SEVERITIES = [
  { value: 'Low', label: 'Low (Minor cosmetic / surface mark)', color: 'bg-emerald-500 text-white border-emerald-600' },
  { value: 'Medium', label: 'Medium (Noticeable wear or scratch)', color: 'bg-amber-500 text-white border-amber-600' },
  { value: 'High', label: 'High (Definite damage / functional issue)', color: 'bg-rose-500 text-white border-rose-600' },
  { value: 'Critical', label: 'Critical (Safety risk / requires immediate repair)', color: 'bg-purple-600 text-white border-purple-700' },
];

const DamageAnnotationModal = ({
  isOpen,
  onClose,
  inspectionId,
  item,
  photoUrl,
  photoIndex = 0,
  onAnnotationUpdated,
}) => {
  const { showToast } = useToast();
  const imageContainerRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null); // { x, y, width, height } in %

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [saving, setSaving] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState(null);

  // Filter annotations for this specific photo
  const itemAnnotations = (item?.annotations || []).filter(
    (a) => a.photoUrl === photoUrl || a.photoIndex === photoIndex
  );

  useEffect(() => {
    if (!isOpen) {
      setCurrentBox(null);
      setTitle('');
      setDescription('');
      setActiveAnnotation(null);
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleMouseDown = (e) => {
    if (activeAnnotation) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !startPos) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    const x = Math.max(0, Math.min(startPos.x, currentX));
    const y = Math.max(0, Math.min(startPos.y, currentY));
    const width = Math.min(100 - x, Math.abs(currentX - startPos.x));
    const height = Math.min(100 - y, Math.abs(currentY - startPos.y));

    setCurrentBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentBox && (currentBox.width < 3 || currentBox.height < 3)) {
      // Box too small, clear it
      setCurrentBox(null);
    }
  };

  const handleSaveAnnotation = async () => {
    if (!currentBox) {
      showToast('Please drag on the photo to mark the damaged area first.', 'error');
      return;
    }
    if (!title.trim()) {
      showToast('Please provide a title for the damage annotation.', 'error');
      return;
    }

    try {
      setSaving(true);
      const res = await api.post(`/inspections/${inspectionId}/items/${item._id}/annotations`, {
        photoIndex,
        photoUrl,
        coordinates: currentBox,
        title: title.trim(),
        description: description.trim(),
        severity,
      });

      if (res.data.success) {
        showToast('Damage annotation recorded with visual boundary!', 'success');
        setCurrentBox(null);
        setTitle('');
        setDescription('');
        if (onAnnotationUpdated) onAnnotationUpdated();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to save annotation', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAnnotation = async (annotationId) => {
    try {
      const res = await api.delete(`/inspections/${inspectionId}/items/${item._id}/annotations/${annotationId}`);
      if (res.data.success) {
        showToast('Damage marker removed.', 'info');
        setActiveAnnotation(null);
        if (onAnnotationUpdated) onAnnotationUpdated();
      }
    } catch (error) {
      showToast('Failed to remove annotation', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Damage Annotation Canvas
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold">
                  {item.category} • {item.item}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click & drag a rectangle over damage spots to attach tags, severity, and forensic notes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split view (Photo Canvas Left / Details Form Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* Photo Canvas Left */}
          <div className="lg:col-span-8 p-6 flex flex-col items-center justify-center bg-slate-950/90 relative select-none">
            <div
              ref={imageContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="relative max-w-full max-h-[58vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 cursor-crosshair group"
            >
              <img
                src={photoUrl}
                alt="Evidence Item"
                className="max-h-[58vh] w-auto object-contain block pointer-events-none"
              />

              {/* Render Saved Annotations */}
              {itemAnnotations.map((anno, idx) => {
                const isSelected = activeAnnotation?._id === anno._id;
                const sevColor =
                  anno.severity === 'Critical'
                    ? 'border-purple-500 bg-purple-500/20 text-purple-200'
                    : anno.severity === 'High'
                    ? 'border-rose-500 bg-rose-500/20 text-rose-200'
                    : anno.severity === 'Medium'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                    : 'border-emerald-500 bg-emerald-500/20 text-emerald-200';

                return (
                  <div
                    key={anno._id || idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveAnnotation(anno);
                    }}
                    style={{
                      left: `${anno.coordinates?.x}%`,
                      top: `${anno.coordinates?.y}%`,
                      width: `${anno.coordinates?.width}%`,
                      height: `${anno.coordinates?.height}%`,
                    }}
                    className={`absolute border-2 rounded-lg cursor-pointer transition-all ${sevColor} ${
                      isSelected ? 'ring-4 ring-brand-400 ring-offset-1 z-20' : 'hover:opacity-100 z-10'
                    }`}
                  >
                    <span className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-bold shadow-md whitespace-nowrap bg-slate-900/90 text-white border border-slate-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-current" />
                      #{idx + 1} {anno.title}
                    </span>
                  </div>
                );
              })}

              {/* Render Active Drawing Box */}
              {currentBox && (
                <div
                  style={{
                    left: `${currentBox.x}%`,
                    top: `${currentBox.y}%`,
                    width: `${currentBox.width}%`,
                    height: `${currentBox.height}%`,
                  }}
                  className="absolute border-2 border-dashed border-cyan-400 bg-cyan-400/25 rounded pointer-events-none z-30"
                >
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-600 text-white">
                    New Selection
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-brand-400" /> Click & drag box over damage
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" /> Click existing boxes to inspect/delete
              </span>
            </div>
          </div>

          {/* Form / Selected Details Right */}
          <div className="lg:col-span-4 p-6 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-6">
            
            {activeAnnotation ? (
              // Selected Annotation View
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Selected Annotation</span>
                  <button
                    onClick={() => setActiveAnnotation(null)}
                    className="text-xs text-brand-500 hover:underline"
                  >
                    + Draw New Marker
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{activeAnnotation.title}</h3>
                    <Badge variant={activeAnnotation.severity}>{activeAnnotation.severity}</Badge>
                  </div>
                  {activeAnnotation.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                      "{activeAnnotation.description}"
                    </p>
                  )}
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700">
                    Logged by <span className="font-semibold text-slate-700 dark:text-slate-200">{activeAnnotation.createdByName || 'Inspector'}</span> on {new Date(activeAnnotation.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-rose-500 border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  icon={Trash2}
                  onClick={() => handleDeleteAnnotation(activeAnnotation._id)}
                >
                  Delete This Damage Marker
                </Button>
              </div>
            ) : (
              // Create Annotation Form
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Damage Tag</span>
                  {currentBox ? (
                    <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Area Selected
                    </span>
                  ) : (
                    <span className="text-[11px] text-amber-500 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Drag area on left
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Damage Title / Feature</label>
                  <input
                    type="text"
                    placeholder="e.g. Scuffed paint, Cracked floor tile..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Severity Picker */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Severity Assessment</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SEVERITIES.map((s) => (
                      <button
                        type="button"
                        key={s.value}
                        onClick={() => setSeverity(s.value)}
                        className={`p-2 rounded-xl text-left border text-xs font-bold transition-all ${
                          severity === s.value
                            ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/30'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {s.value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description / Evidence Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Detailed condition notes, dimensions, or repair urgency..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={!currentBox || !title.trim() || saving}
                  loading={saving}
                  onClick={handleSaveAnnotation}
                  icon={Tag}
                >
                  Save Damage Annotation
                </Button>
              </div>
            )}

            {/* List of existing annotations for quick reference */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-2">
                Recorded Annotations ({itemAnnotations.length})
              </span>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {itemAnnotations.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No annotations logged on this photo yet.</p>
                ) : (
                  itemAnnotations.map((anno, idx) => (
                    <div
                      key={anno._id || idx}
                      onClick={() => setActiveAnnotation(anno)}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 hover:border-brand-500 cursor-pointer flex items-center justify-between text-xs transition"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        #{idx + 1} {anno.title}
                      </span>
                      <Badge variant={anno.severity}>{anno.severity}</Badge>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DamageAnnotationModal;
