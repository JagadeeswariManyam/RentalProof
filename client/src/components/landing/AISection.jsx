import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Search,
  Scan,
  Info,
  Check,
  SlidersHorizontal,
} from 'lucide-react';

const AISection = () => {
  const [activeTab, setActiveTab] = useState('diff');

  return (
    <section id="ai-evidence" className="py-24 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Heading, Explanation & Principles */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Intelligent Inspection Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              AI-assisted evidence. <br />
              <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
                Human-verified decisions.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              RentalProof can highlight possible visual changes between inspection evidence. AI observations are provided as assistance and should be manually verified.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 shrink-0 mt-0.5">
                  <Scan className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pixel & Variance Alignment</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Surfaces textural anomalies and scuffs between baseline and move-out photos to reduce oversight during walkthroughs.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-950">Strict Ethical Guardrail</h4>
                  <p className="text-xs text-amber-900/80 mt-0.5 leading-relaxed">
                    AI never determines financial liability or automatically withholds deposits. Final inspection approval always requires human sign-off.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Product UI Card Mockup */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl p-6 sm:p-8 relative overflow-hidden font-sans">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">AI Visual Observation Node</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Module: #RP-OBS-2026-04</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-full text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ANALYSIS COMPLETE</span>
                </div>
              </div>

              {/* Exact Specified Output Fields */}
              <div className="space-y-4">
                {/* Area */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Area</span>
                  <span className="text-sm font-bold text-white bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
                    Living Room Wall
                  </span>
                </div>

                {/* Observation */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-semibold text-slate-400 block">Observation</span>
                  <div className="flex items-start gap-2 text-sm font-bold text-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Possible discoloration / surface change</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pl-6">
                    Detected subtle luminance drop on north quadrant drywall compared to baseline snapshot recorded on 01 Apr 2026.
                  </p>
                </div>

                {/* Confidence & Status Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">Confidence</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-brand-400">82%</span>
                      <span className="text-[10px] text-slate-500 font-mono">High Precision</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1.5 rounded-xl">
                      <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Manual Verification Recommended</span>
                    </span>
                  </div>
                </div>

                {/* Audit Sign-Off Section */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Logged into Inspection Audit Ledger</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">Hash: 8f72a...d019</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
