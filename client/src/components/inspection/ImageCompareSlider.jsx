import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Columns,
  Maximize2,
  Calendar,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Eye,
} from 'lucide-react';
import Badge from '../common/Badge';
import ImageModal from '../common/ImageModal';

const ImageCompareSlider = ({
  category,
  item,
  moveInImage,
  moveOutImage,
  moveInCondition = 'Good',
  moveOutCondition = 'Good',
  moveInDate,
  moveOutDate,
  moveInNotes = '',
  moveOutNotes = '',
  attentionLevel = 'No Significant Change',
  aiObservation,
  onRunAiAnalysis,
  analyzing = false,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState('split'); // 'split' (interactive slider) or 'side-by-side'
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const fallbackMoveIn =
    moveInImage || 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80';
  const fallbackMoveOut =
    moveOutImage || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">{category}</span>
            <span className="text-slate-300">•</span>
            <h3 className="text-base font-bold text-slate-900">{item}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Baseline vs Move-Out condition documentation & verification
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={attentionLevel} size="md">
            {attentionLevel}
          </Badge>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition ${
                viewMode === 'split' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Slider
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition ${
                viewMode === 'side-by-side'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" /> Side-by-Side
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Visual Stage */}
      <div className="p-5 sm:p-6">
        {viewMode === 'split' ? (
          /* Interactive Split Image Comparison Slider */
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden select-none shadow-inner border border-slate-200 group">
            {/* Move-Out Image (Underneath) */}
            <img
              src={fallbackMoveOut}
              alt="Move Out Condition"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full pointer-events-none z-10 flex items-center gap-1.5">
              <span>Move-Out</span>
              <span className="text-slate-300">•</span>
              <Badge variant={moveOutCondition} size="sm">
                {moveOutCondition}
              </Badge>
            </div>

            {/* Move-In Image (Clipped by slider position) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={fallbackMoveIn}
                alt="Move In Condition"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full pointer-events-none z-10 flex items-center gap-1.5">
                <span>Move-In</span>
                <span className="text-slate-300">•</span>
                <Badge variant={moveInCondition} size="sm">
                  {moveInCondition}
                </Badge>
              </div>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-2xl z-20 flex items-center justify-center cursor-ew-resize"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-xl border-2 border-brand-600 flex items-center justify-center text-brand-600">
                <Sliders className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* Range Input for dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Image comparison slider"
            />

            {/* Fullscreen zoom action */}
            <button
              onClick={() => setFullscreenImage(fallbackMoveOut)}
              className="absolute bottom-3 right-3 z-30 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-xl backdrop-blur-md transition"
              title="View full resolution"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Side-by-Side Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-72 group">
              <img
                src={fallbackMoveIn}
                alt="Move In Condition"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <span>Move-In</span>
                <span className="text-slate-300">•</span>
                <Badge variant={moveInCondition} size="sm">
                  {moveInCondition}
                </Badge>
              </div>
              <button
                onClick={() => setFullscreenImage(fallbackMoveIn)}
                className="absolute bottom-3 right-3 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-xl backdrop-blur-md transition"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-72 group">
              <img
                src={fallbackMoveOut}
                alt="Move Out Condition"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <span>Move-Out</span>
                <span className="text-slate-300">•</span>
                <Badge variant={moveOutCondition} size="sm">
                  {moveOutCondition}
                </Badge>
              </div>
              <button
                onClick={() => setFullscreenImage(fallbackMoveOut)}
                className="absolute bottom-3 right-3 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-xl backdrop-blur-md transition"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Condition Notes & Dates Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Move-In Record</span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {moveInDate ? new Date(moveInDate).toLocaleDateString() : 'Baseline'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "{moveInNotes || 'Condition verified in good order upon tenant check-in.'}"
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Move-Out Record</span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {moveOutDate ? new Date(moveOutDate).toLocaleDateString() : 'Move-Out Walkthrough'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "{moveOutNotes || 'Walkthrough condition recorded for deposit settlement.'}"
            </p>
          </div>
        </div>

        {/* AI-Assisted Evidence Observation Card */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-brand-50/60 via-purple-50/40 to-slate-50 border border-brand-100">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-brand-600 text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">AI-Assisted Visual Analysis</h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  Automated visual comparison between photographic baselines
                </p>
              </div>
            </div>

            {aiObservation ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">Confidence:</span>
                <span className="text-xs font-bold text-brand-700 bg-brand-100/80 px-2 py-0.5 rounded-full">
                  {Math.round(aiObservation.confidence * 100)}%
                </span>
              </div>
            ) : onRunAiAnalysis ? (
              <button
                onClick={onRunAiAnalysis}
                disabled={analyzing}
                className="text-xs font-bold bg-white text-brand-600 hover:text-brand-700 border border-brand-200 px-3 py-1.5 rounded-xl shadow-sm hover:shadow transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {analyzing ? 'Analyzing Pixels...' : 'Run AI Analysis'}
              </button>
            ) : null}
          </div>

          {aiObservation && (
            <div className="space-y-1.5 mt-2">
              {aiObservation.observations?.map((obs, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  <span>{obs}</span>
                </div>
              ))}
            </div>
          )}

          {/* Legal Notice */}
          <div className="mt-3 pt-2.5 border-t border-brand-100/60 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>AI-assisted observation — manual review required. Not an automated legal determination.</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Preview */}
      <ImageModal
        isOpen={!!fullscreenImage}
        onClose={() => setFullscreenImage(null)}
        src={fullscreenImage}
        title={`${category} — ${item}`}
      />
    </div>
  );
};

export default ImageCompareSlider;
