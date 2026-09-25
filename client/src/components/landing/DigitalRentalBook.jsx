import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

// Import the 8 individual architectural pages
import Page01Property from './book-pages/Page01Property';
import Page02MoveInEvidence from './book-pages/Page02MoveInEvidence';
import Page03BeforeAfter from './book-pages/Page03BeforeAfter';
import Page04Maintenance from './book-pages/Page04Maintenance';
import Page05Deposit from './book-pages/Page05Deposit';
import Page06AIObservation from './book-pages/Page06AIObservation';
import Page07RentalTimeline from './book-pages/Page07RentalTimeline';
import Page08CompleteRecord from './book-pages/Page08CompleteRecord';

const DigitalRentalBook = ({ activePage, setActivePage }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInteractingRef = useRef(false);

  const pageComponents = [
    { component: Page01Property, title: 'PROPERTY', subtitle: 'Property Condition' },
    { component: Page02MoveInEvidence, title: 'EVIDENCE', subtitle: 'Move-In Evidence' },
    { component: Page03BeforeAfter, title: 'BEFORE / AFTER', subtitle: 'Delta Comparison' },
    { component: Page04Maintenance, title: 'MAINTENANCE', subtitle: 'Maintenance History' },
    { component: Page05Deposit, title: 'DEPOSIT', subtitle: 'Deposit Record' },
    { component: Page06AIObservation, title: 'AI OBSERVATION', subtitle: 'Variance Scan' },
    { component: Page07RentalTimeline, title: 'TIMELINE', subtitle: 'Rental Chronicle' },
    { component: Page08CompleteRecord, title: 'RECORD', subtitle: 'Complete Dossier' },
  ];

  const totalPages = pageComponents.length;

  const handlePrev = () => {
    setActivePage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActivePage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // Subtle 3D mouse parallax on desktop
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setActivePage((prev) => Math.min(totalPages - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setActivePage((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, setActivePage]);

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  return (
    <section
      id="rental-book-stage"
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-slate-950 text-white overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-brand-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px]" />

        {/* Cybernetic Dot & Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Dossier Header & Floating Page Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 shadow-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  DIGITAL RENTAL BOOK
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  UNIT #RP-08 AUDIT
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Architectural Evidence Dossier
              </h2>
            </div>
          </div>

          {/* Minimal Floating Page Indicator (Mentor requirement: e.g. 03 / 08 • BEFORE / AFTER) */}
          <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 px-4 py-2 rounded-2xl shadow-xl">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-base font-black text-cyan-400">
                0{activePage + 1}
              </span>
              <span className="text-xs text-slate-500 font-bold">/ 0{totalPages}</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {pageComponents[activePage].title}
            </span>
          </div>
        </div>

        {/* 3D Physical Book Master Container with Perspective */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-5xl mx-auto select-none transition-transform duration-300 ease-out"
          style={{
            perspective: '1600px',
            transform: `perspective(1600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >
          {/* Ambient Outer Book Glow & Table Shadow */}
          <div className="absolute -inset-6 bg-gradient-to-r from-brand-600/20 via-indigo-600/10 to-cyan-500/20 rounded-[40px] blur-3xl -z-10 pointer-events-none" />

          {/* Physical Architectural Book Frame / Hardcover Chassis */}
          <div className="relative rounded-[28px] sm:rounded-[36px] bg-slate-900/95 border-2 border-slate-700/80 p-4 sm:p-7 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden min-h-[520px] sm:min-h-[560px] md:min-h-[600px] flex flex-col justify-between">
            {/* Metallic Left Spine Binding Effect */}
            <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-5 bg-gradient-to-r from-slate-950 via-slate-800 to-transparent border-r border-slate-700/60 z-30 pointer-events-none" />

            {/* Page Layering Depth Stack (Creates realistic book thickness underneath) */}
            <div className="absolute top-2 right-2 bottom-2 left-2 rounded-3xl border border-slate-800/40 pointer-events-none -z-10" />
            <div className="absolute top-4 right-4 bottom-4 left-4 rounded-3xl border border-slate-800/30 pointer-events-none -z-20" />

            {/* Book Inner Page Stage with 3D Spatial Flip Transition */}
            <div className="relative flex-1 w-full h-full pl-2 sm:pl-3 overflow-hidden">
              {pageComponents.map((item, idx) => {
                const PageComp = item.component;
                const isCurrent = activePage === idx;
                const isPast = idx < activePage;

                // 3D realistic page rotation transform calculation
                let pageStyle = {};
                if (isCurrent) {
                  pageStyle = {
                    transform: 'rotateY(0deg) scale(1)',
                    opacity: 1,
                    zIndex: 20,
                    pointerEvents: 'auto',
                  };
                } else if (isPast) {
                  pageStyle = {
                    transform: 'rotateY(-110deg) translateZ(-40px) scale(0.95)',
                    opacity: 0,
                    zIndex: 10,
                    pointerEvents: 'none',
                  };
                } else {
                  pageStyle = {
                    transform: 'rotateY(25deg) translateZ(-30px) scale(0.96)',
                    opacity: 0,
                    zIndex: 5,
                    pointerEvents: 'none',
                  };
                }

                return (
                  <div
                    key={idx}
                    style={{
                      ...pageStyle,
                      transformOrigin: 'left center',
                    }}
                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu ${
                      isCurrent ? 'visible' : 'invisible'
                    }`}
                  >
                    <PageComp />
                  </div>
                );
              })}
            </div>

            {/* Book Navigation Bar (Prev / Next & Chapter Tabs) */}
            <div className="pt-5 mt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 z-30">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={activePage === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-950/80 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:pointer-events-none border border-slate-800 transition active:scale-95"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              {/* Center Chapter Tabs */}
              <div className="hidden md:flex items-center gap-1.5 bg-slate-950/90 p-1 rounded-xl border border-slate-800">
                {pageComponents.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePage(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                      activePage === idx
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                disabled={activePage === totalPages - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-brand-500/20 transition active:scale-95"
                aria-label="Next Page"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Helpful Prompt for User Interaction */}
        <div className="mt-8 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-3">
          <span>Tip: Use keyboard ← → arrows or click Next Page to flip through the evidence book.</span>
        </div>
      </div>
    </section>
  );
};

export default DigitalRentalBook;
