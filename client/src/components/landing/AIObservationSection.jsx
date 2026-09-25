import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Scan,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Wrench,
  PiggyBank,
  ArrowRight,
  Maximize2,
  Lock,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

const AIObservationSection = () => {
  const [scanProgress, setScanProgress] = useState(25);
  const [activeAnalysisNode, setActiveAnalysisNode] = useState(0);

  // Animated subtle scanner loop
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 90 ? 10 : prev + 1));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const analysisPoints = [
    {
      id: 'point-1',
      title: 'Emulsion Paint Uniformity',
      room: 'Living Room North Wall',
      top: '28%',
      left: '32%',
      variance: '0.8%',
      status: 'Intact Baseline Match',
      statusColor: 'emerald',
      confidence: '99.1%',
      detail: 'No deep wall anchor cavities or structural cracking detected.'
    },
    {
      id: 'point-2',
      title: 'Under-Sink Compression Joint',
      room: 'Kitchen Fixture Matrix',
      top: '58%',
      left: '64%',
      variance: 'Resolved Ticket',
      status: 'Maintenance Verified',
      statusColor: 'blue',
      confidence: '97.4%',
      detail: 'Contractor signed invoice #8092 matched to replaced seal.'
    },
    {
      id: 'point-3',
      title: 'Sliding Track Anodization',
      room: 'Balcony Slider Channel',
      top: '72%',
      left: '42%',
      variance: '2.1% Surface Dust',
      status: 'Advisory Review',
      statusColor: 'amber',
      confidence: '88.6%',
      detail: 'Surface dust trace only. Zero structural channel deformation.'
    }
  ];

  return (
    <section id="ai-evidence" className="py-20 sm:py-28 bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-300 text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <span>Assisted Condition Verification</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            AI-Assisted Visual Variance Scanning
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Objective visual analysis detects potential discrepancies between move-in benchmark photos and checkout walkthroughs, providing non-binding assistance for human verification.
          </p>
        </div>

        {/* 2-Column High-Tech Interface Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Simulated Visual Scanning Chamber */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl overflow-hidden">
              
              {/* Header Telemetry */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-mono mb-4 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                  <span className="text-slate-900 dark:text-white font-bold">DELTA SCAN: Unit #402 Multi-Spectrum</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <Scan className="w-3.5 h-3.5" />
                  <span>Scanning @ {scanProgress}%</span>
                </div>
              </div>

              {/* Viewport Stage with Scanning Grid & Laser */}
              <div className="relative w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center select-none shadow-inner">
                
                {/* Isometric Matrix Grid */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(168, 85, 247, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Animated Horizontal Laser Scan Line */}
                <div
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(56,189,248,0.9)] pointer-events-none transition-all duration-75"
                  style={{ top: `${scanProgress}%` }}
                />

                {/* Bounding Area / Target Reticles */}
                {analysisPoints.map((pt, idx) => {
                  const isSelected = activeAnalysisNode === idx;
                  return (
                    <div
                      key={pt.id}
                      onClick={() => setActiveAnalysisNode(idx)}
                      style={{ top: pt.top, left: pt.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-all duration-300 ${
                        isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                      }`}
                    >
                      {/* Bounding Box Wireframe */}
                      <div
                        className={`w-12 h-12 rounded-xl border border-dashed transition-all flex items-center justify-center ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_16px_rgba(56,189,248,0.4)]'
                            : 'border-purple-400/50 bg-purple-500/5 hover:border-purple-300'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            pt.statusColor === 'emerald'
                              ? 'bg-emerald-400'
                              : pt.statusColor === 'amber'
                              ? 'bg-amber-400'
                              : 'bg-blue-400'
                          }`}
                        />
                      </div>

                      {/* Tag Pill */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[9px] font-mono whitespace-nowrap shadow-md border ${
                          isSelected
                            ? 'bg-white text-slate-900 border-white font-bold'
                            : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        {pt.title.split(' ')[0]} • {pt.variance}
                      </div>
                    </div>
                  );
                })}

                {/* Floorplan Centerpiece */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center pointer-events-none">
                  <div className="text-[11px] font-mono text-slate-400">
                    ALIGNING PHOTOGRAMMETRY MATRICES...
                  </div>
                  <div className="text-xs font-bold text-white mt-1">
                    3 Evidence Anchor Points Synchronized
                  </div>
                </div>

                {/* Bottom Left Corner HUD Badge */}
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span>Tap bounding boxes to inspect delta</span>
                </div>
              </div>

              {/* Selected Point Telemetry Card */}
              <div className="mt-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {analysisPoints[activeAnalysisNode].title}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 px-2 py-0.5 rounded-full">
                    Confidence {analysisPoints[activeAnalysisNode].confidence}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {analysisPoints[activeAnalysisNode].detail}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Location: {analysisPoints[activeAnalysisNode].room}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Status: {analysisPoints[activeAnalysisNode].status}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Complete Lifecycle Connection */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Maintenance Pipeline Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Maintenance Workflow</h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Photo-Verified Resolution</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  Audited
                </span>
              </div>

              {/* 4-Step Status Progression */}
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {[
                  { label: 'Reported', color: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80' },
                  { label: 'Assigned', color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800' },
                  { label: 'In Progress', color: 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800' },
                  { label: 'Completed', color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800' },
                ].map((step, i) => (
                  <div key={i} className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-bold ${step.color}`}>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Repairs logged during the tenancy are permanently cross-referenced against move-out checklists to protect tenants from unfair wear claims.
              </p>
            </div>

            {/* Deposit Reconciliation Mathematical Formula Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <PiggyBank className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Deposit Protection Ledger</h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Mathematical Reconciliation</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                  SHA-256
                </span>
              </div>

              {/* Calculation Formula Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Initial Escrow Deposit:</span>
                  <span className="text-slate-900 dark:text-white font-bold">₹64,000.00</span>
                </div>
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span>+ Verified Rent History:</span>
                  <span>100% On-Time</span>
                </div>
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                  <span>- Recorded Deductions:</span>
                  <span>₹1,200.00 (Invoice Reconciled)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  <span>= Recorded Balance:</span>
                  <span>₹62,800.00 (Refundable)</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                *Values displayed represent platform-recorded accounting records based on verified walkthroughs and receipts.
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AIObservationSection;
