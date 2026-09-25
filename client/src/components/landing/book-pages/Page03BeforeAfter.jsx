import React, { useState } from 'react';
import {
  SplitSquareVertical,
  Sliders,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Calendar,
  Columns,
} from 'lucide-react';

const Page03BeforeAfter = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState('split'); // 'split' or 'side'

  const moveInImg =
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80';
  const moveOutImg =
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80';

  return (
    <div className="h-full flex flex-col justify-between text-white select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400">
            <SplitSquareVertical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                DOSSIER CHAPTER 03
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-cyan-400 font-bold">DELTA SCAN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              BEFORE / AFTER
            </h2>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition ${
              viewMode === 'split' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Slider
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side')}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition ${
              viewMode === 'side' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
        </div>
      </div>

      {/* Main Interactive Comparison Stage */}
      <div className="my-4 flex-1 min-h-0 flex flex-col justify-center">
        {viewMode === 'split' ? (
          <div className="relative w-full h-60 sm:h-72 lg:h-80 rounded-2xl overflow-hidden select-none border border-slate-800 shadow-2xl group">
            {/* Move-Out Image (Underneath) */}
            <img
              src={moveOutImg}
              alt="Move Out Condition"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md text-white text-xs font-mono font-bold px-3 py-1 rounded-full z-10 border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span>MOVE-OUT (15 SEP 2026)</span>
            </div>

            {/* Move-In Image (Clipped by slider position) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={moveInImg}
                alt="Move In Condition"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-white text-xs font-mono font-bold px-3 py-1 rounded-full z-10 border border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                <span>MOVE-IN (01 APR 2026)</span>
              </div>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-2xl z-20 flex items-center justify-center cursor-ew-resize"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-slate-950 shadow-xl border-2 border-cyan-400 flex items-center justify-center text-cyan-400">
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
              aria-label="Drag before and after image comparison slider"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-60 sm:h-72 lg:h-80">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800">
              <img src={moveInImg} alt="Move In Baseline" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-slate-950/90 text-xs font-mono font-bold px-3 py-1 rounded-full border border-slate-700">
                MOVE-IN BASELINE (01 APR 2026)
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-800">
              <img src={moveOutImg} alt="Move Out Checkout" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-slate-950/90 text-xs font-mono font-bold px-3 py-1 rounded-full border border-slate-700 text-amber-300">
                MOVE-OUT WALKTHROUGH (15 SEP 2026)
              </div>
            </div>
          </div>
        )}

        {/* AI-Assisted Observation Strip (Mentor-specified labels) */}
        <div className="mt-3.5 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              POSSIBLE CHANGE DETECTED
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              AI-Assisted Observation
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Manual Verification Recommended
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 italic">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Assistance only — never determines legal liability.</span>
          </div>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>INTERACTIVE VISUAL DELTA ENGINE</span>
        <span className="text-slate-400">PAGE 03 / 08</span>
      </div>
    </div>
  );
};

export default Page03BeforeAfter;
