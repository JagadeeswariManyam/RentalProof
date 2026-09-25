import React from 'react';
import { Sparkles, Scan, AlertTriangle, ShieldAlert, CheckCircle2, Info, Eye } from 'lucide-react';

const Page06AIObservation = () => {
  return (
    <div className="h-full flex flex-col justify-between text-white select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                DOSSIER CHAPTER 06
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-purple-400 font-bold">VARIANCE SCAN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              AI-ASSISTED OBSERVATION
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-purple-950/80 border border-purple-800/60 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-purple-300">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>ALGORITHMIC SCAN ACTIVE</span>
        </div>
      </div>

      {/* Main AI Visual Scanner & Analysis Matrix */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center flex-1 min-h-0">
        {/* Left: Futuristic Visual Scanner Viewport */}
        <div className="lg:col-span-6 h-60 sm:h-72 lg:h-full min-h-[250px] rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
            alt="AI Visual Inspection"
            className="w-full h-full object-cover opacity-80"
          />

          {/* Futuristic Scanning Overlay Laser Line */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Ambient Cyan/Purple Scan Grid */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(168, 85, 247, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.4) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Bounding Box on Detected Area */}
            <div className="absolute top-[40%] left-[30%] w-36 h-24 border-2 border-purple-400 bg-purple-500/10 rounded-lg animate-pulse flex flex-col justify-between p-1.5">
              <span className="text-[9px] font-mono text-purple-300 font-bold bg-slate-950/90 px-1 py-0.5 rounded w-fit">
                VARIANCE #01 • 87%
              </span>
              <span className="text-[8px] font-mono text-amber-300 bg-slate-950/90 px-1 py-0.5 rounded self-end">
                MANUAL REVIEW
              </span>
            </div>

            {/* Animated Laser Scanning Beam */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] top-1/2 -translate-y-1/2" />
          </div>

          <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] font-mono text-slate-300 flex items-center gap-1.5">
            <Scan className="w-3 h-3 text-purple-400" />
            <span>IMAGE COMPARISON ENGINE</span>
          </div>
        </div>

        {/* Right: Analysis Metrics & Ethical Review Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">ANALYSIS TARGET</span>
              <span className="text-white font-bold">Living Room Wall Surface</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 block">Observation Output:</span>
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Possible Change Detected</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Localized luminance delta detected near lower left drywall relative to move-in benchmark.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block mb-0.5">Confidence:</span>
                <span className="text-xl font-mono font-black text-purple-400">87%</span>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '87%' }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-slate-500 block mb-0.5">Recommendation:</span>
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-1 rounded">
                  MANUAL VERIFICATION
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-200/90 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>Ethical Notice:</strong> RentalProof AI highlights pixel differences to prevent inspection oversight. It never determines legal responsibility.
            </span>
          </div>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>AI-ASSISTED VARIANCE DETECTION MODULE</span>
        <span className="text-slate-400">PAGE 06 / 08</span>
      </div>
    </div>
  );
};

export default Page06AIObservation;
