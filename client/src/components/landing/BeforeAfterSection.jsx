import React, { useState, useEffect, useRef } from 'react';
import {
  SplitSquareVertical,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Calendar,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';

const BeforeAfterSection = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [activeScene, setActiveScene] = useState('living-room');
  
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const autoPhaseRef = useRef(0);

  const scenes = [
    {
      id: 'living-room',
      title: 'Living Room Wall & Baseboards',
      room: 'Living Room',
      moveInDate: '01 Apr 2026',
      moveOutDate: '31 Mar 2027',
      beforeImg: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
      afterImg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      baselineStatus: 'Clean • Fresh Emulsion Finish',
      checkoutStatus: 'Minor surface scuff detected near switch',
      aiFinding: 'AI-Assisted Finding: 1.4% Surface Variance',
      recommendation: 'Manual Verification Recommended (Normal Wear & Tear)',
      moveInBadge: 'Move-In Baseline (SHA256: 8f92)',
      moveOutBadge: 'Move-Out Checkout (SHA256: 3c19)',
      beforeDesc: 'Uniform satin paint coat without holes or discoloration.',
      afterDesc: 'Minor superficial rub mark. Wall integrity remains 100% sound.'
    },
    {
      id: 'kitchen-sink',
      title: 'Kitchen Sink & Fixtures',
      room: 'Kitchen Area',
      moveInDate: '01 Apr 2026',
      moveOutDate: '31 Mar 2027',
      beforeImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      afterImg: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
      baselineStatus: 'Polished Chrome • Leak-Free',
      checkoutStatus: 'Aerator replaced under recorded maintenance ticket #104',
      aiFinding: 'AI-Assisted Finding: Hardware Upgrade Verified',
      recommendation: 'Manual Verification Recommended (Tenant Not Liable)',
      moveInBadge: 'Move-In Baseline (SHA256: 4b17)',
      moveOutBadge: 'Move-Out Checkout (SHA256: 91fa)',
      beforeDesc: 'Standard brass valve baseline installation.',
      afterDesc: 'Upgraded high-efficiency ceramic fixture logged with receipt proof.'
    },
    {
      id: 'master-bedroom',
      title: 'Master Bedroom Hardwood Flooring',
      room: 'Bedroom',
      moveInDate: '01 Apr 2026',
      moveOutDate: '31 Mar 2027',
      beforeImg: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      afterImg: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      baselineStatus: 'Polished Oak • Zero Scratches',
      checkoutStatus: 'Pristine condition preserved with felt pads',
      aiFinding: 'AI-Assisted Finding: 99.8% Match to Baseline',
      recommendation: 'Verified Intact • 100% Full Deposit Return',
      moveInBadge: 'Move-In Baseline (SHA256: 1a77)',
      moveOutBadge: 'Move-Out Checkout (SHA256: 7e44)',
      beforeDesc: 'Freshly sealed polyurethane hardwood floor.',
      afterDesc: 'Zero deep gouges or liquid staining. Immaculate preservation.'
    },
    {
      id: 'bathroom-vanity',
      title: 'Master Bathroom Mixer & Mirror',
      room: 'Bathroom',
      moveInDate: '01 Apr 2026',
      moveOutDate: '31 Mar 2027',
      beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      afterImg: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80',
      baselineStatus: 'Spotless Mirror & Clean Grout',
      checkoutStatus: 'Maintenance ticket M-101 replaced ceramic cartridge',
      aiFinding: 'AI-Assisted Finding: Seal Maintenance Verified',
      recommendation: 'Manual Verification Recommended (Invoice Reconciled)',
      moveInBadge: 'Move-In Baseline (SHA256: 5f88)',
      moveOutBadge: 'Move-Out Checkout (SHA256: e21a)',
      beforeDesc: 'Standard builder fixture with tight silicone seal.',
      afterDesc: 'Fully operational with warranty cartridge replacement.'
    }
  ];

  const currentScene = scenes.find((s) => s.id === activeScene) || scenes[0];

  // ========================================================
  // CONTINUOUS AUTOMATIC SINE-WAVE COMPARISON SLIDER MOTION
  // Smoothly moves between 15% and 85% back-and-forth
  // Pauses on manual user drag/touch, resumes after 2.5s
  // ========================================================
  useEffect(() => {
    let lastTime = performance.now();

    const animateSlider = (currentTime) => {
      if (!isUserInteracting) {
        const delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        // Advance cycle: complete period ~5.5 seconds
        autoPhaseRef.current += delta * 1.15;
        // Map sine from [-1, 1] to [15%, 85%]
        const calculatedPos = 50 + 35 * Math.sin(autoPhaseRef.current);
        setSliderPosition(calculatedPos);
      } else {
        lastTime = currentTime;
      }
      animFrameRef.current = requestAnimationFrame(animateSlider);
    };

    animFrameRef.current = requestAnimationFrame(animateSlider);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [isUserInteracting]);

  const handleSliderMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleInteractionStart = (clientX) => {
    setIsUserInteracting(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    handleSliderMove(clientX);
  };

  const handleInteractionEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2500);
  };

  return (
    <section id="before-after" className="py-20 sm:py-28 bg-white dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-slate-950 border border-indigo-200 dark:border-slate-800 text-indigo-600 dark:text-cyan-400 text-xs font-bold mb-3 shadow-sm">
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Autonomous Tenancy Delta Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Before & After: Move-In vs Move-Out
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Eliminate memory bias. Watch the continuous split comparison glide automatically between verified move-in baseline photos and move-out checkout evidence.
          </p>

          {/* Scene Selector Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => {
                  setActiveScene(scene.id);
                  handleInteractionEnd();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer ${
                  activeScene === scene.id
                    ? 'bg-brand-600 text-white border-brand-500 shadow-md shadow-brand-500/25 scale-105'
                    : 'bg-slate-100 dark:bg-slate-950/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {scene.room}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Split Visualizer */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-7 shadow-xl dark:shadow-2xl backdrop-blur-xl">
          
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-mono mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-500" />
              <span className="font-bold text-slate-900 dark:text-white">{currentScene.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                Move-In: {currentScene.moveInDate}
              </span>
              <span className="text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                Move-Out: {currentScene.moveOutDate}
              </span>
            </div>
          </div>

          {/* Continuous Split Slider Stage */}
          <div
            ref={containerRef}
            onMouseDown={(e) => handleInteractionStart(e.clientX)}
            onMouseMove={(e) => {
              if (isUserInteracting) handleSliderMove(e.clientX);
            }}
            onMouseUp={handleInteractionEnd}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={(e) => {
              if (e.touches.length > 0) handleInteractionStart(e.touches[0].clientX);
            }}
            onTouchMove={(e) => {
              if (e.touches.length > 0) handleSliderMove(e.touches[0].clientX);
            }}
            onTouchEnd={handleInteractionEnd}
            className="relative w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-300 dark:border-slate-800 shadow-inner bg-slate-950"
          >
            {/* MOVE-OUT RIGHT SIDE (Full background container) */}
            <div className="absolute inset-0">
              <img
                src={currentScene.afterImg}
                alt="Move-Out Checkout"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Move-Out Checkout Pill Badge */}
              <div className="absolute top-3.5 right-3.5 bg-indigo-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg shadow-lg border border-indigo-400/40">
                MOVE-OUT CHECKOUT
              </div>

              {/* Move-Out Note Overlay Bottom Right */}
              <div className="absolute bottom-3.5 right-3.5 max-w-xs p-3 rounded-xl bg-slate-900/90 border border-indigo-500/40 text-right backdrop-blur-md hidden sm:block">
                <span className="text-[10px] font-mono text-indigo-400 block uppercase font-bold">SHA-256 Verified Delta</span>
                <p className="text-xs text-white leading-snug">{currentScene.afterDesc}</p>
              </div>
            </div>

            {/* MOVE-IN LEFT SIDE (Clipped dynamically by sliderPosition) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentScene.beforeImg}
                alt="Move-In Baseline"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Move-In Baseline Pill Badge */}
              <div className="absolute top-3.5 left-3.5 bg-cyan-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg shadow-lg border border-cyan-400/40">
                MOVE-IN BASELINE
              </div>

              {/* Move-In Note Overlay Bottom Left */}
              <div className="absolute bottom-3.5 left-3.5 max-w-xs p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-left backdrop-blur-md hidden sm:block">
                <span className="text-[10px] font-mono text-cyan-400 block uppercase font-bold">Baseline Benchmark</span>
                <p className="text-xs text-white leading-snug">{currentScene.beforeDesc}</p>
              </div>
            </div>

            {/* Draggable Split Handle Line & Central Thumb */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)] -translate-x-1/2 pointer-events-none flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-2xl flex items-center justify-center text-white pointer-events-auto">
                <Sliders className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Autonomous status indicator on bottom */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-[10px] text-slate-300 pointer-events-none flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{isUserInteracting ? 'Manual Mode • Release to resume auto-slider' : 'Auto-Comparing 60fps • Drag anytime'}</span>
            </div>
          </div>

          {/* AI-Assisted Observation & Compliance Verification Bar */}
          <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {currentScene.aiFinding}
                </span>
              </div>
              
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800/80 px-2.5 py-0.5 rounded-full">
                {currentScene.recommendation}
              </span>
            </div>

            {/* Mandatory Regulatory / Non-Binding Disclaimer */}
            <div className="flex items-start gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-700 dark:text-slate-300">Assistive Observation Principle:</strong> AI scans highlight visual differences as advisory signals. Final lease condition decisions and deposit agreements remain entirely in the hands of landlord and tenant verification.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
