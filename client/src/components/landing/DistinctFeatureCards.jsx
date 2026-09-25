import React, { useState, useEffect } from 'react';
import {
  Camera,
  SplitSquareVertical,
  Wrench,
  PiggyBank,
  Sparkles,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Lock,
  Layers,
  FileText,
  Scan,
  Check,
  Receipt,
  AlertCircle
} from 'lucide-react';

export const DistinctFeatureCards = () => {
  const scrollToTarget = (targetId, e) => {
    if (e) e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ----------------------------------------------------
  // Card 2: Before & After mini auto-comparison animation
  // ----------------------------------------------------
  const [miniSliderPos, setMiniSliderPos] = useState(50);
  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const animateMini = (time) => {
      const elapsed = (time - startTime) / 1000;
      // Oscillate smoothly between 20% and 80% over 4 seconds
      const pos = 50 + 30 * Math.sin(elapsed * 1.5);
      setMiniSliderPos(pos);
      animId = requestAnimationFrame(animateMini);
    };
    animId = requestAnimationFrame(animateMini);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ----------------------------------------------------
  // Card 5: AI scan line animation
  // ----------------------------------------------------
  const [scanLinePos, setScanLinePos] = useState(30);
  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const animateScan = (time) => {
      const elapsed = (time - startTime) / 1000;
      const pos = 50 + 40 * Math.sin(elapsed * 2.0);
      setScanLinePos(pos);
      animId = requestAnimationFrame(animateScan);
    };
    animId = requestAnimationFrame(animateScan);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
      
      {/* ========================================================
          CARD 1: PROPERTY EVIDENCE (Layered Physical Stack Style)
          ======================================================== */}
      <div className="group relative rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 shadow-lg dark:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-cyan-500/15 via-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shadow-sm">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/90 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
              Cryptographic Proof
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            Property Evidence
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Room-by-room photographic ledger tagged with SHA-256 integrity hashes, GPS coordinates, and NTP timestamps.
          </p>

          {/* VISUAL ARCHITECTURE: Layered 3D Document / Photo Stack */}
          <div className="relative mt-5 h-36 rounded-2xl bg-slate-100 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3 overflow-hidden flex items-center justify-center">
            {/* Background tilted card layer */}
            <div className="absolute w-[85%] h-24 rounded-xl bg-slate-200 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 -rotate-6 translate-y-1 shadow-sm opacity-60" />
            
            {/* Middle tilted card layer */}
            <div className="absolute w-[88%] h-24 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rotate-3 shadow-md opacity-80" />

            {/* Front Active Evidence Badge Card */}
            <div className="relative z-10 w-[92%] h-24 rounded-xl bg-white dark:bg-slate-900 border border-cyan-500/40 p-3 shadow-lg flex items-center gap-3">
              <div className="w-16 h-18 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=200&q=80"
                  alt="Evidence Item"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left space-y-1 overflow-hidden">
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 block uppercase">Living Room • Item #1</span>
                <span className="text-xs font-black text-slate-900 dark:text-white block truncate">Walls & Emulsion Paint</span>
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 block truncate">SHA256: 4c9f1a2b...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => scrollToTarget('before-after', e)}
          className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition w-full cursor-pointer group/btn"
        >
          <span>Explore Baseline Wizard</span>
          <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 group-hover/btn:translate-x-1 transition-transform">
            <span>Inspect Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* ========================================================
          CARD 2: BEFORE & AFTER (Interactive Mini Split Slider)
          ======================================================== */}
      <div className="group relative rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 shadow-lg dark:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/15 via-purple-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shadow-sm">
              <SplitSquareVertical className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/90 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
              Interactive Delta
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Before & After
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Side-by-side split visual diff comparing move-in benchmark photos directly against move-out condition.
          </p>

          {/* VISUAL ARCHITECTURE: Dynamic Mini Split Slider with Continuous Auto-Oscillation */}
          <div className="relative mt-5 h-36 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 select-none">
            {/* Background: Move-Out (Right) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 to-slate-900 flex items-center justify-end p-3">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80"
                alt="Move-Out"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <span className="relative z-10 px-2 py-0.5 rounded bg-indigo-600/90 text-white font-extrabold text-[9px] uppercase tracking-wider">
                Move-Out
              </span>
            </div>

            {/* Foreground: Move-In (Left - Clipped) */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-tr from-cyan-950 to-slate-900 border-r-2 border-white overflow-hidden"
              style={{ width: `${miniSliderPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80"
                alt="Move-In"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-600/90 text-white font-extrabold text-[9px] uppercase tracking-wider">
                Move-In
              </span>
            </div>

            {/* Split Divider Dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white text-slate-900 border-2 border-indigo-600 shadow-md flex items-center justify-center -translate-x-1/2"
              style={{ left: `${miniSliderPos}%` }}
            >
              <SplitSquareVertical className="w-3 h-3 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => scrollToTarget('before-after', e)}
          className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition w-full cursor-pointer group/btn"
        >
          <span>Launch Delta Engine</span>
          <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 group-hover/btn:translate-x-1 transition-transform">
            <span>Compare Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* ========================================================
          CARD 3: MAINTENANCE TRACKING (Repair Ticket / Stepper Style)
          ======================================================== */}
      <div className="group relative rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500/50 shadow-lg dark:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform shadow-sm">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/90 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              Audited Dispatch
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Maintenance Tracking
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Track repair requests, contractor work orders, cost estimates, and photo-verified completion certificates.
          </p>

          {/* VISUAL ARCHITECTURE: Ticket Stepper Timeline Interface */}
          <div className="mt-5 h-36 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Ticket #M-101 (Plumbing)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Completed
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-4 gap-1 pt-1 text-[9px] font-bold text-center">
              <div className="p-1 rounded bg-emerald-500 text-white">Reported</div>
              <div className="p-1 rounded bg-emerald-500 text-white">Assigned</div>
              <div className="p-1 rounded bg-emerald-500 text-white">Serviced</div>
              <div className="p-1 rounded bg-emerald-600 text-white ring-1 ring-emerald-400">Verified</div>
            </div>

            <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-1.5">
              <span>Technician: Apex Plumbing</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">₹1,200 (Invoice Attached)</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => scrollToTarget('ai-evidence', e)}
          className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition w-full cursor-pointer group/btn"
        >
          <span>View Dispatch Pipeline</span>
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 group-hover/btn:translate-x-1 transition-transform">
            <span>Audit Repairs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* ========================================================
          CARD 4: DEPOSIT RECORDS (Financial Ledger / Escrow Style)
          ======================================================== */}
      <div className="group relative rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 shadow-lg dark:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shadow-sm">
              <PiggyBank className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Immutable Escrow
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Deposit Records
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Transparent mathematical reconciliation of original security deposits, payment history, and verified deductions.
          </p>

          {/* VISUAL ARCHITECTURE: Bank Ledger / Escrow Statement */}
          <div className="mt-5 h-36 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col justify-between font-mono text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 text-[11px]">
              <span>INITIAL ESCROW DEPOSIT:</span>
              <span className="font-bold text-slate-900 dark:text-white">₹64,000.00</span>
            </div>

            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>+ 6 Months Verified Rent:</span>
                <span>100% Paid</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>- Approved Maintenance Deductions:</span>
                <span>₹1,200.00</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              <span>RECORDED REFUND BALANCE:</span>
              <span className="text-sm">₹62,800.00</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => scrollToTarget('ai-evidence', e)}
          className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition w-full cursor-pointer group/btn"
        >
          <span>Review Deposit Formula</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 group-hover/btn:translate-x-1 transition-transform">
            <span>View Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* ========================================================
          CARD 5: AI-ASSISTED OBSERVATION (Scanning Radar / HUD Style)
          ======================================================== */}
      <div className="group relative rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/50 shadow-lg dark:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-purple-500/15 via-pink-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/90 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">
              Assistive Vision
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            AI-Assisted Observation
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Automated visual scanning highlights condition variances between milestones for objective human sign-off.
          </p>

          {/* VISUAL ARCHITECTURE: Futuristic Radar / Scanning Matrix */}
          <div className="relative mt-5 h-36 rounded-2xl bg-slate-950 border border-purple-500/30 p-3 overflow-hidden flex flex-col justify-between">
            {/* Animated Laser Scan line */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_10px_rgba(192,132,252,0.9)] pointer-events-none"
              style={{ top: `${scanLinePos}%` }}
            />

            <div className="flex justify-between items-center text-[10px] font-mono text-purple-300">
              <span className="flex items-center gap-1">
                <Scan className="w-3 h-3 text-purple-400 animate-spin" /> SCANNING DELTA
              </span>
              <span>CONFIDENCE: 99.1%</span>
            </div>

            {/* Target Reticles */}
            <div className="grid grid-cols-2 gap-2 my-1">
              <div className="p-1.5 rounded-lg bg-purple-950/80 border border-purple-800/80 text-[10px] text-purple-200 flex items-center justify-between">
                <span>Wall Discoloration</span>
                <span className="text-amber-400 font-bold">1.4% Var</span>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-[10px] text-emerald-200 flex items-center justify-between">
                <span>Hardwood Floor</span>
                <span className="text-emerald-400 font-bold">Matched</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 flex items-center gap-1 italic">
              <AlertCircle className="w-3 h-3 text-purple-400 shrink-0" />
              <span>Advisory signal • Requires manual review</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => scrollToTarget('ai-evidence', e)}
          className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition w-full cursor-pointer group/btn"
        >
          <span>Inspect Variance Scanner</span>
          <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 group-hover/btn:translate-x-1 transition-transform">
            <span>AI Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* ========================================================
          CARD 6: RENTAL REPORTS (Stacked Document / Certificate Style)
          ======================================================== */}
      <div className="group relative rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 shadow-lg dark:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-sky-500/15 via-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform shadow-sm">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/90 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800">
              Court-Ready PDF
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            Rental Reports
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Export structured, printable PDF tenancy audit certificates with digital signatures, photo ledgers, and history.
          </p>

          {/* VISUAL ARCHITECTURE: Stacked Official Report Certificate */}
          <div className="relative mt-5 h-36 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-black text-slate-900 dark:text-white">RentalProof Certificate</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">RP-2026-CERT</span>
            </div>

            <div className="space-y-1 text-[10px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-500" /> Move-In & Move-Out Photo Appendices
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-500" /> Dual Landlord & Tenant Digital Signatures
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-500" /> Itemized Deposit Deductions Reconciled
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>Ready for Court / Arbitrator</span>
              <span className="font-bold text-sky-600 dark:text-sky-400">Instant PDF</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => scrollToTarget('timeline', e)}
          className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition w-full cursor-pointer group/btn"
        >
          <span>Explore Tenancy Timeline</span>
          <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 group-hover/btn:translate-x-1 transition-transform">
            <span>View Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

    </div>
  );
};

export default DistinctFeatureCards;
