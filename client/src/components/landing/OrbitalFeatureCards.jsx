import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  SplitSquareVertical,
  Wrench,
  PiggyBank,
  Sparkles,
  FileCheck2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Lock,
  ExternalLink
} from 'lucide-react';

const OrbitalFeatureCards = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);

  const angleRef = useRef(0);
  const animFrameRef = useRef(null);
  const touchStartX = useRef(0);

  const features = [
    {
      id: 'evidence',
      targetId: 'before-after',
      icon: Camera,
      title: 'Property Evidence',
      tagline: 'Cryptographic Room Ledger',
      description: 'Capture room-by-room property condition with encrypted timestamped photographic proof.',
      badge: 'Baseline Wizard',
      accentColor: 'text-cyan-600 dark:text-cyan-400',
      badgeBg: 'bg-cyan-50 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/40',
      borderColor: 'border-cyan-200 dark:border-cyan-500/40',
      activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/30 shadow-cyan-500/20',
      stats: '100% Tamper-Evident Ledger',
      actionText: 'Inspect Evidence',
    },
    {
      id: 'comparison',
      targetId: 'before-after',
      icon: SplitSquareVertical,
      title: 'Before & After',
      tagline: 'Interactive Delta Comparison',
      description: 'Compare move-in baseline photos directly against move-out checkout evidence in a split view.',
      badge: 'Split Slider',
      accentColor: 'text-indigo-600 dark:text-indigo-400',
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/90 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/40',
      borderColor: 'border-indigo-200 dark:border-indigo-500/40',
      activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/30 shadow-indigo-500/20',
      stats: 'Zero-Dispute Checkout',
      actionText: 'Compare Evidence',
    },
    {
      id: 'maintenance',
      targetId: 'ai-evidence',
      icon: Wrench,
      title: 'Maintenance Tracking',
      tagline: 'Audited Dispatch Workflow',
      description: 'Track repair requests, contractor dispatch, priority levels, and photo-verified resolutions.',
      badge: 'Dispatch Workflow',
      accentColor: 'text-amber-600 dark:text-amber-400',
      badgeBg: 'bg-amber-50 dark:bg-amber-950/90 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/40',
      borderColor: 'border-amber-200 dark:border-amber-500/40',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/30 shadow-amber-500/20',
      stats: 'End-to-End Service Audit',
      actionText: 'Audit Repairs',
    },
    {
      id: 'deposits',
      targetId: 'ai-evidence',
      icon: PiggyBank,
      title: 'Deposit Records',
      tagline: 'Transparent Balance Formula',
      description: 'Maintain an immutable transparent ledger of security deposits, payments, and deductions.',
      badge: 'Transparent Ledger',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40',
      borderColor: 'border-emerald-200 dark:border-emerald-500/40',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-emerald-500/20',
      stats: 'Mathematically Reconciled',
      actionText: 'View Ledger',
    },
    {
      id: 'ai',
      targetId: 'ai-evidence',
      icon: Sparkles,
      title: 'AI-Assisted Observation',
      tagline: 'Assisted Variance Scanning',
      description: 'Scan visual variances between milestones and highlight areas for objective human review.',
      badge: 'Visual Variance Scan',
      accentColor: 'text-purple-600 dark:text-purple-400',
      badgeBg: 'bg-purple-50 dark:bg-purple-950/90 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/40',
      borderColor: 'border-purple-200 dark:border-purple-500/40',
      activeBorder: 'border-purple-500 ring-2 ring-purple-500/30 shadow-purple-500/20',
      stats: 'Human-in-the-Loop AI',
      actionText: 'AI Evidence',
    },
    {
      id: 'reports',
      targetId: 'timeline',
      icon: FileCheck2,
      title: 'Rental Reports',
      tagline: 'Court-Ready PDF Vault',
      description: 'Export structured court-ready PDF tenancy records with complete photographic audit ledgers.',
      badge: 'Instant PDF Export',
      accentColor: 'text-sky-600 dark:text-sky-400',
      badgeBg: 'bg-sky-50 dark:bg-sky-950/90 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/40',
      borderColor: 'border-sky-200 dark:border-sky-500/40',
      activeBorder: 'border-sky-500 ring-2 ring-sky-500/30 shadow-sky-500/20',
      stats: 'Court-Ready Tenancy Proof',
      actionText: 'View Timeline',
    }
  ];

  const totalCards = features.length;

  // ==========================================
  // CONTINUOUS 60FPS COMPACT ORBITAL MOTION
  // ==========================================
  useEffect(() => {
    let lastTime = performance.now();

    const updateOrbit = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Speed: 12 degrees per second, slows to 2.5 deg/sec on hover
      const speed = isHovered ? 2.5 : 12.0;
      angleRef.current = (angleRef.current + speed * delta) % 360;
      setOrbitAngle(angleRef.current);

      const normalizedAngle = (angleRef.current % 360 + 360) % 360;
      const step = 360 / totalCards;
      const closestIdx = Math.round((360 - normalizedAngle) / step) % totalCards;
      setActiveCardIndex(closestIdx);

      animFrameRef.current = requestAnimationFrame(updateOrbit);
    };

    animFrameRef.current = requestAnimationFrame(updateOrbit);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, totalCards]);

  const handleScrollToTarget = (targetId, e) => {
    if (e) e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleManualSelect = (idx) => {
    const targetAngle = (360 - idx * (360 / totalCards)) % 360;
    angleRef.current = targetAngle;
    setOrbitAngle(targetAngle);
    setActiveCardIndex(idx);
  };

  const currentCard = features[activeCardIndex] || features[0];
  const CurrentIcon = currentCard.icon;

  return (
    <div
      className="w-full relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* ========================================================
          DESKTOP COMPACT 3D ORBITAL STAGE (Contained radius)
          ======================================================== */}
      <div className="hidden lg:block relative w-full h-[520px] perspective-[1000px] my-2">
        
        {/* Central Spatial Hub Platform */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 backdrop-blur-2xl shadow-xl dark:shadow-2xl flex flex-col items-center justify-center p-6 text-center z-10 transition-colors duration-300">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-2 shadow-inner transition-all duration-300">
            <CurrentIcon className={`w-7 h-7 ${currentCard.accentColor}`} />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Active Spatial Node #{activeCardIndex + 1}
          </span>
          <h4 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {currentCard.title}
          </h4>
          <span className={`text-xs font-bold ${currentCard.accentColor} mt-0.5`}>
            {currentCard.stats}
          </span>

          {/* Working Explore Action Button on Central Hub */}
          <button
            type="button"
            onClick={(e) => handleScrollToTarget(currentCard.targetId, e)}
            className="mt-3.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>{currentCard.actionText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
          </button>
        </div>

        {/* Circular Orbital Ring Guide */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[340px] rounded-full border border-dashed border-slate-300 dark:border-slate-700/60 pointer-events-none -rotate-6" />

        {/* 6 Procedural 3D Orbital Cards (Compact radius: X=240, Z=150) */}
        <div
          className="absolute inset-0 transition-transform duration-75 ease-linear"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${orbitAngle}deg) rotateX(10deg)`
          }}
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const angleDeg = idx * (360 / totalCards);
            const angleRad = angleDeg * (Math.PI / 180);
            const radiusX = 240;
            const radiusZ = 150;
            const x = Math.sin(angleRad) * radiusX;
            const z = Math.cos(angleRad) * radiusZ;
            const isFront = activeCardIndex === idx;

            return (
              <div
                key={feat.id}
                onClick={() => handleManualSelect(idx)}
                style={{
                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${-orbitAngle - angleDeg}deg)`,
                  transformOrigin: 'center center'
                }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 p-4.5 rounded-3xl backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
                  isFront
                    ? `bg-white dark:bg-slate-900/98 ${feat.activeBorder} scale-105 z-30 opacity-100 shadow-2xl`
                    : 'bg-white/70 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800/90 hover:border-slate-400 dark:hover:border-slate-700 opacity-60 hover:opacity-95 scale-85 z-20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl border ${feat.borderColor} bg-slate-50 dark:bg-slate-950 shadow-sm`}>
                    <Icon className={`w-4 h-4 ${feat.accentColor}`} />
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${feat.badgeBg}`}>
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">{feat.title}</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-2">
                  {feat.description}
                </p>

                {/* Explore Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScrollToTarget(feat.targetId, e);
                  }}
                  className="w-full pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition group/btn"
                >
                  <span>{feat.actionText}</span>
                  <span className={`flex items-center gap-1 ${feat.accentColor} group-hover/btn:translate-x-1 transition-transform`}>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Orbit Navigation Controls */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg">
            {features.map((feat, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleManualSelect(i)}
                className={`h-2 rounded-full transition-all ${
                  activeCardIndex === i ? `w-6 ${feat.accentColor} bg-current` : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Select ${feat.title}`}
              />
            ))}
          </div>

          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            {isHovered ? 'Orbit Paused' : 'Autonomous Orbit Active'}
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE COMPACT STACK & TOUCH SWIPER (360px - 1024px)
          ======================================================== */}
      <div
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
          setIsHovered(true);
        }}
        onTouchEnd={(e) => {
          setIsHovered(false);
          const deltaX = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(deltaX) > 35) {
            if (deltaX > 0) {
              handleManualSelect((activeCardIndex + 1) % totalCards);
            } else {
              handleManualSelect((activeCardIndex - 1 + totalCards) % totalCards);
            }
          }
        }}
        className="lg:hidden w-full relative px-2 py-4 select-none"
      >
        <div className="relative min-h-[360px] flex items-center justify-center">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const offset = (idx - activeCardIndex + totalCards) % totalCards;
            
            if (offset > 2 && offset < totalCards - 1) return null;

            const isCurrent = offset === 0;
            const isNext = offset === 1;
            const isSecondNext = offset === 2;

            let translateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isNext) {
              translateY = 12;
              scale = 0.94;
              opacity = 0.75;
              zIndex = 20;
            } else if (isSecondNext) {
              translateY = 24;
              scale = 0.88;
              opacity = 0.45;
              zIndex = 10;
            }

            return (
              <div
                key={feat.id}
                onClick={() => {
                  if (!isCurrent) handleManualSelect(idx);
                }}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                className={`absolute w-full max-w-sm rounded-3xl p-5 backdrop-blur-2xl border transition-all duration-300 shadow-xl ${
                  isCurrent
                    ? `bg-white dark:bg-slate-900/98 ${feat.activeBorder}`
                    : 'bg-white/80 dark:bg-slate-950/90 border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl border ${feat.borderColor} bg-slate-50 dark:bg-slate-950 shadow-md`}>
                    <Icon className={`w-5 h-5 ${feat.accentColor}`} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${feat.badgeBg}`}>
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{feat.title}</h3>
                <span className={`text-xs font-bold ${feat.accentColor} block mt-0.5 mb-2`}>
                  {feat.stats}
                </span>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {feat.description}
                </p>

                {/* Explore Action Button */}
                <button
                  type="button"
                  onClick={(e) => handleScrollToTarget(feat.targetId, e)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white flex items-center justify-between text-xs font-bold shadow-md active:scale-95 transition cursor-pointer"
                >
                  <span>{feat.actionText}</span>
                  <span className={`flex items-center gap-1 ${feat.accentColor}`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Navigation Controls */}
        <div className="flex items-center justify-between gap-3 mt-4 px-2">
          <button
            type="button"
            onClick={() => handleManualSelect((activeCardIndex - 1 + totalCards) % totalCards)}
            className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1 text-xs font-bold shadow-sm active:scale-95 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {features.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleManualSelect(i)}
                className={`h-2 rounded-full transition-all ${
                  activeCardIndex === i ? 'w-5 bg-brand-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleManualSelect((activeCardIndex + 1) % totalCards)}
            className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center gap-1 text-xs font-bold shadow-md shadow-brand-500/20 active:scale-95 transition cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default OrbitalFeatureCards;
