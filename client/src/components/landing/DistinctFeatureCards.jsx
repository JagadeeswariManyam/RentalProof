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
  AlertCircle,
  BookOpen,
  ChevronRight,
  Eye
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
  // CARD 1: AUTOMATIC EVIDENCE SLIDESHOW (Cycles 4 photos)
  // ----------------------------------------------------
  const [slideIndex, setSlideIndex] = useState(0);
  const evidenceSlides = [
    {
      img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
      room: 'Living Room',
      item: 'North Wall & Paint',
      hash: 'SHA256: 4c9f1a2b',
      tag: 'Move-In Baseline'
    },
    {
      img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
      room: 'Kitchen Fixture',
      item: 'Under-Sink Valve',
      hash: 'SHA256: 8a17e03c',
      tag: 'Plumbing Proof'
    },
    {
      img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80',
      room: 'Master Bedroom',
      item: 'Hardwood Floor',
      hash: 'SHA256: 1e99d7fa',
      tag: 'Surface Condition'
    },
    {
      img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
      room: 'Bathroom',
      item: 'Chrome Mixer & Seal',
      hash: 'SHA256: 7f3b890a',
      tag: 'Fixture Benchmark'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % evidenceSlides.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [evidenceSlides.length]);

  // ----------------------------------------------------
  // CARD 2: Mini Before & After auto-comparison animation
  // ----------------------------------------------------
  const [miniSliderPos, setMiniSliderPos] = useState(50);
  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const animateMini = (time) => {
      const elapsed = (time - startTime) / 1000;
      // Smooth sinusoidal oscillation between 15% and 85%
      const pos = 50 + 35 * Math.sin(elapsed * 1.6);
      setMiniSliderPos(pos);
      animId = requestAnimationFrame(animateMini);
    };
    animId = requestAnimationFrame(animateMini);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ----------------------------------------------------
  // CARD 5: AI scan line animation
  // ----------------------------------------------------
  const [scanLinePos, setScanLinePos] = useState(30);
  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const animateScan = (time) => {
      const elapsed = (time - startTime) / 1000;
      const pos = 50 + 40 * Math.sin(elapsed * 2.2);
      setScanLinePos(pos);
      animId = requestAnimationFrame(animateScan);
    };
    animId = requestAnimationFrame(animateScan);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ----------------------------------------------------
  // CARD 6: 3D DIGITAL BOOK-OPENING ANIMATION (Continuous Loop)
  // Loop stages: CLOSED (0-20%) -> OPENING (20-40%) -> FULLY OPEN (40-70%) -> CLOSING (70-90%) -> CLOSED (90-100%)
  // ----------------------------------------------------
  const [bookState, setBookState] = useState('opening'); // 'closed', 'opening', 'open', 'closing'
  const [bookAngle, setBookAngle] = useState(0);

  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const cycleDuration = 5500; // 5.5s total book loop

    const animateBook = (currentTime) => {
      const elapsed = (currentTime - startTime) % cycleDuration;
      const progress = elapsed / cycleDuration;

      if (progress < 0.15) {
        // Hold Closed
        setBookState('closed');
        setBookAngle(0);
      } else if (progress < 0.40) {
        // Opening smooth ease
        const openProg = (progress - 0.15) / 0.25;
        // EaseInOutCubic
        const ease = openProg < 0.5 ? 4 * openProg * openProg * openProg : 1 - Math.pow(-2 * openProg + 2, 3) / 2;
        setBookState('opening');
        setBookAngle(ease * 165);
      } else if (progress < 0.75) {
        // Hold Fully Open
        setBookState('open');
        setBookAngle(165);
      } else {
        // Closing smooth ease
        const closeProg = (progress - 0.75) / 0.25;
        const ease = closeProg < 0.5 ? 4 * closeProg * closeProg * closeProg : 1 - Math.pow(-2 * closeProg + 2, 3) / 2;
        setBookState('closing');
        setBookAngle(165 - ease * 165);
      }

      animId = requestAnimationFrame(animateBook);
    };

    animId = requestAnimationFrame(animateBook);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
      
      {/* ========================================================
          CARD 1: PROPERTY EVIDENCE — LAYERED STACK + AUTONOMOUS SLIDESHOW
          ======================================================== */}
      <div className="group relative rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 shadow-lg dark:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-cyan-500/15 via-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shadow-sm">
              <Camera className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/90 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
                Auto Slideshow ({slideIndex + 1}/4)
              </span>
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            Property Evidence
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Room-by-room photographic ledger tagged with SHA-256 integrity hashes, GPS coordinates, and NTP timestamps.
          </p>

          {/* VISUAL ARCHITECTURE: Layered 3D Stack + Smooth Rotating Photo Slideshow */}
          <div className="relative mt-5 h-40 rounded-2xl bg-slate-100 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3 overflow-hidden flex items-center justify-center select-none">
            {/* Background tilted card layer */}
            <div className="absolute w-[85%] h-28 rounded-xl bg-slate-200 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 -rotate-6 translate-y-2 shadow-sm opacity-60 pointer-events-none" />
            
            {/* Middle tilted card layer */}
            <div className="absolute w-[89%] h-28 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rotate-3 shadow-md opacity-80 pointer-events-none" />

            {/* Active Slideshow Foreground Card */}
            <div className="relative z-10 w-[94%] h-28 rounded-xl bg-white dark:bg-slate-900 border border-cyan-500/40 p-2.5 shadow-xl flex items-center gap-3 transition-all duration-500">
              <div className="relative w-20 h-22 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-950">
                {evidenceSlides.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.img}
                    alt={slide.item}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      slideIndex === i ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
                    }`}
                  />
                ))}
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[8px] font-mono text-cyan-300">
                  {slideIndex + 1}/4
                </div>
              </div>

              <div className="text-left space-y-1 overflow-hidden flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 block uppercase">
                    {evidenceSlides[slideIndex].room}
                  </span>
                  <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                    {evidenceSlides[slideIndex].tag}
                  </span>
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white block truncate">
                  {evidenceSlides[slideIndex].item}
                </span>
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 block truncate">
                  {evidenceSlides[slideIndex].hash}
                </span>

                {/* Slideshow Progress Bar Ticks */}
                <div className="flex items-center gap-1 pt-1">
                  {evidenceSlides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        slideIndex === i ? 'w-5 bg-cyan-500' : 'w-1.5 bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
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
          CARD 2: BEFORE & AFTER — AUTONOMOUS SPLIT COMPARISON SLIDER
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
          <div className="relative mt-5 h-40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 select-none">
            {/* Background: Move-Out (Right) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 to-slate-900 flex items-center justify-end p-3">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80"
                alt="Move-Out"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <span className="relative z-10 px-2 py-0.5 rounded bg-indigo-600/90 text-white font-extrabold text-[9px] uppercase tracking-wider shadow-sm">
                Move-Out
              </span>
            </div>

            {/* Foreground: Move-In (Left - Clipped) */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-tr from-cyan-950 to-slate-900 border-r-2 border-white shadow-[0_0_12px_rgba(255,255,255,0.8)] overflow-hidden"
              style={{ width: `${miniSliderPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80"
                alt="Move-In"
                className="absolute inset-0 w-full h-full object-cover opacity-90 max-w-none"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-600/90 text-white font-extrabold text-[9px] uppercase tracking-wider shadow-sm">
                Move-In
              </span>
            </div>

            {/* Split Divider Dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white text-slate-900 border-2 border-indigo-600 shadow-xl flex items-center justify-center -translate-x-1/2 z-20 pointer-events-none"
              style={{ left: `${miniSliderPos}%` }}
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-indigo-600" />
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-[8px] font-mono text-slate-300 z-10">
              Autonomous Delta Motion
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
          CARD 3: MAINTENANCE TRACKING — VERTICAL REPAIR PROGRESS
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
          <div className="mt-5 h-40 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Ticket #M-101 (Plumbing)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Completed
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-4 gap-1 pt-1 text-[9px] font-bold text-center">
              <div className="p-1.5 rounded-lg bg-emerald-500 text-white shadow-sm">Reported</div>
              <div className="p-1.5 rounded-lg bg-emerald-500 text-white shadow-sm">Assigned</div>
              <div className="p-1.5 rounded-lg bg-emerald-500 text-white shadow-sm">Serviced</div>
              <div className="p-1.5 rounded-lg bg-emerald-600 text-white ring-1 ring-emerald-400 shadow-sm animate-pulse">Verified</div>
            </div>

            <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-2">
              <span className="truncate">Contractor: Apex Plumbing</span>
              <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">₹1,200 (Reconciled)</span>
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
          CARD 4: DEPOSIT RECORDS — MATHEMATICAL FINANCIAL LEDGER
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
          <div className="mt-5 h-40 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col justify-between font-mono text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 text-[11px]">
              <span>INITIAL ESCROW DEPOSIT:</span>
              <span className="font-bold text-slate-900 dark:text-white">₹64,000.00</span>
            </div>

            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>+ 6 Months Verified Rent:</span>
                <span>100% On-Time</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>- Approved Maintenance Deductions:</span>
                <span>₹1,200.00</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              <span>RECORDED REFUND BALANCE:</span>
              <span className="text-sm font-black">₹62,800.00</span>
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
          CARD 5: AI-ASSISTED OBSERVATION — RADAR HUD SCANNER
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
          <div className="relative mt-5 h-40 rounded-2xl bg-slate-950 border border-purple-500/30 p-3 overflow-hidden flex flex-col justify-between select-none">
            {/* Animated Laser Scan line */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_12px_rgba(192,132,252,0.95)] pointer-events-none"
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
                <span>Possible Change</span>
                <span className="text-amber-400 font-bold">1.4% Var</span>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-[10px] text-emerald-200 flex items-center justify-between">
                <span>Requires Review</span>
                <span className="text-emerald-400 font-bold">Advisory</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 flex items-center gap-1 italic">
              <AlertCircle className="w-3 h-3 text-purple-400 shrink-0" />
              <span>Manual verification recommended before sign-off</span>
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
          CARD 6: RENTAL REPORTS — CONTINUOUS 3D BOOK-OPENING ANIMATION
          ======================================================== */}
      <div className="group relative rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 shadow-lg dark:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-sky-500/15 via-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/90 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800">
                Book Open Animation
              </span>
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            Rental Reports
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Export structured, printable PDF tenancy audit certificates with digital signatures, photo ledgers, and history.
          </p>

          {/* VISUAL ARCHITECTURE: Continuous 3D Digital Book / Document Opening Presentation */}
          <div className="relative mt-5 h-40 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 p-3 overflow-hidden flex items-center justify-center select-none perspective-[800px]">
            
            {/* 3D BOOK CONTAINER */}
            <div className="relative w-56 h-32 flex items-center justify-center">
              
              {/* BACK COVER / BASE OF BOOK */}
              <div className="absolute inset-0 rounded-xl bg-slate-900 dark:bg-slate-950 border border-sky-500/40 shadow-xl overflow-hidden flex flex-col justify-between p-2.5 text-white">
                {/* Right Page (Fixed Interior Right Page) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                    <span className="text-[8px] font-bold text-sky-400 uppercase tracking-wider">Audit Certificate</span>
                    <span className="text-[7px] font-mono text-slate-400">RP-2026-CERT</span>
                  </div>
                  
                  <div className="space-y-1 text-[8px] text-slate-300">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Check className="w-2.5 h-2.5 shrink-0" /> Dual Signatures Verified
                    </div>
                    <div className="flex items-center gap-1 text-cyan-400 font-bold">
                      <Check className="w-2.5 h-2.5 shrink-0" /> 16 Photo Evidence Entries
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Check className="w-2.5 h-2.5 shrink-0" /> Deposit Deductions Itemized
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[8px] text-slate-400">
                  <span>Court / Arbitrator Ready</span>
                  <span className="font-bold text-sky-400">Signed PDF</span>
                </div>
              </div>

              {/* FLIPPING FRONT COVER (Rotates around left spine: Y-axis rotation from 0deg to -165deg) */}
              <div
                className="absolute inset-y-0 left-0 w-full rounded-xl bg-gradient-to-br from-sky-600 via-brand-600 to-indigo-700 text-white shadow-2xl border border-sky-300/40 p-3 flex flex-col justify-between transition-transform duration-100 ease-linear origin-left"
                style={{
                  transform: `rotateY(-${bookAngle}deg)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  zIndex: bookAngle > 90 ? 5 : 25,
                }}
              >
                <div className="flex items-center justify-between">
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span className="text-[8px] font-mono uppercase tracking-widest bg-black/30 px-1.5 py-0.5 rounded">
                    Official Ledger
                  </span>
                </div>

                <div className="space-y-0.5 my-auto">
                  <span className="text-[9px] uppercase tracking-wider text-sky-200 block font-bold">Tenancy Certificate</span>
                  <h4 className="text-xs font-black text-white leading-tight">RentalProof Audit Record</h4>
                  <p className="text-[8px] text-sky-100 opacity-90">Tamper-evident move-in to checkout export</p>
                </div>

                <div className="flex items-center justify-between text-[7px] text-sky-200 border-t border-white/20 pt-1">
                  <span>Unit #402 Multi-Spectrum</span>
                  <span>SHA-256 Validated</span>
                </div>
              </div>

              {/* REVERSE SIDE OF FLIPPING COVER (Revealed when opened > 90deg) */}
              <div
                className="absolute inset-y-0 left-0 w-full rounded-xl bg-slate-900 text-white shadow-xl border border-slate-800 p-2.5 flex flex-col justify-between origin-left"
                style={{
                  transform: `rotateY(-${bookAngle - 180}deg)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  zIndex: bookAngle > 90 ? 25 : 5,
                  opacity: bookAngle > 90 ? 1 : 0,
                }}
              >
                <div className="text-[8px] font-bold text-sky-400 border-b border-slate-800 pb-1">
                  Tenancy Summary Details
                </div>
                <div className="space-y-1 text-[8px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lease:</span>
                    <span>Apr 2026 - Mar 2027</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Baseline Hash:</span>
                    <span className="font-mono text-cyan-400">0x4c9f..1a2b</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Deposit Balance:</span>
                    <span className="text-emerald-400 font-bold">₹62,800.00</span>
                  </div>
                </div>
                <div className="text-[7px] text-slate-500 italic">
                  Digital RentalProof Seal Affixed
                </div>
              </div>

            </div>

            {/* Continuous Book Indicator Overlay */}
            <div className="absolute bottom-1.5 right-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-[8px] font-mono text-sky-300 z-30">
              {bookState === 'closed' ? 'Closed Document' : bookState === 'open' ? 'Report Open' : 'Animating Book Page...'}
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

