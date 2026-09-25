import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ArrowDown,
  ShieldCheck,
  Sparkles,
  Layers,
  Camera,
  GitCompare,
  FileCheck,
  Wrench,
  ChevronRight,
  Eye,
} from 'lucide-react';

const BookHeroSection = ({ onOpenBook }) => {
  const scrollToBook = () => {
    if (onOpenBook) {
      onOpenBook(0);
    }
    const bookEl = document.getElementById('rental-book-stage');
    if (bookEl) {
      const yOffset = -40;
      const y = bookEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-slate-950 text-white min-h-[92vh] flex flex-col justify-center">
      {/* Cinematic Cybernetic Ambient Lighting (ThreeUI & Vanta inspired) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-brand-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[130px]" />

        {/* Architectural Mesh Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(99, 102, 241, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.25) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Message & Concept Intro */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            {/* Architectural Dossier Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-brand-300 text-xs font-semibold backdrop-blur-md shadow-xl">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono uppercase tracking-wider text-[11px]">3D Digital Rental Dossier</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Interactive Volume I</span>
            </div>

            {/* Main Headline (Project name is NOT giant; the main headline is the value proposition) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Your Rental. <br />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Your Evidence.
              </span>{' '}
              <br />
              Your Protection.
            </h1>

            {/* Mentor-specified Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Document property condition. Track maintenance. Compare evidence. Preserve the complete rental history.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToBook}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white shadow-2xl shadow-brand-500/30 active:scale-[0.98] transition group border border-white/10"
              >
                <BookOpen className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
                <span>Open Digital Rental Book</span>
                <ArrowDown className="w-4 h-4 text-cyan-200 group-hover:translate-y-1 transition-transform" />
              </button>

              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 backdrop-blur-md active:scale-[0.98] transition"
              >
                <span>Explore Demo Portals</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Dossier Metadata Indicators */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>8 Structured Chapters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span>3D Spatial Page Flip</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Tamper-Evident History</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Book Cover / Dossier Preview Teaser */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              onClick={scrollToBook}
              className="relative cursor-pointer group w-full max-w-md perspective-[1200px]"
              title="Click to open the interactive 3D book"
            >
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-600/30 via-indigo-600/20 to-cyan-500/30 rounded-3xl blur-2xl group-hover:scale-105 transition duration-500" />

              {/* 3D Physical Book Silhouette / Hardcover Dossier */}
              <div className="relative rounded-3xl bg-slate-900 border-2 border-slate-700/80 p-6 sm:p-8 shadow-2xl shadow-slate-950 backdrop-blur-xl transform-gpu group-hover:-rotate-y-6 group-hover:rotate-x-3 transition-transform duration-500 text-left overflow-hidden">
                {/* Book Spine Simulation Accent */}
                <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-slate-950 via-slate-800 to-transparent border-r border-slate-700/50" />

                {/* Cover Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 pl-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                        ARCHITECTURAL EVIDENCE DOSSIER
                      </span>
                      <span className="text-sm font-bold text-white block">
                        PROPERTY #RP-08 • 2 BHK
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-full">
                    LOCKED & AUDITED
                  </span>
                </div>

                {/* Isometric Blueprint Art on Cover */}
                <div className="relative h-48 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                  {/* Subtle Blueprint grid */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(56, 189, 248, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* SVG Blueprint Wireframe */}
                  <svg className="w-full h-full max-w-xs" viewBox="0 0 300 160" fill="none">
                    <polygon points="150,20 270,80 150,140 30,80" stroke="#38bdf8" strokeWidth="1.5" fill="rgba(56, 189, 248, 0.05)" strokeDasharray="3 3" />
                    <polygon points="150,20 210,50 150,80 90,50" stroke="#818cf8" strokeWidth="1" fill="rgba(99, 102, 241, 0.1)" />
                    <polygon points="210,50 270,80 210,110 150,80" stroke="#34d399" strokeWidth="1" fill="rgba(52, 211, 153, 0.1)" />
                    <line x1="150" y1="20" x2="150" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="270" y1="80" x2="270" y2="60" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="30" y1="80" x2="30" y2="60" stroke="#38bdf8" strokeWidth="1.5" />
                    <circle cx="150" cy="50" r="4" fill="#38bdf8" className="animate-ping" />
                  </svg>

                  {/* Floating Action Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="px-4 py-2 rounded-xl bg-slate-900/95 border border-brand-400 text-white text-xs font-bold flex items-center gap-2 shadow-2xl group-hover:scale-105 transition-transform">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Click to Open Book & Turn Pages</span>
                    </div>
                  </div>
                </div>

                {/* Chapter Outline Summary */}
                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: '01. Baseline', icon: Camera },
                    { label: '02. Compare', icon: GitCompare },
                    { label: '03. Repairs', icon: Wrench },
                    { label: '04. Ledger', icon: FileCheck },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
                        <Icon className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-[10px] text-slate-400 block font-mono font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookHeroSection;
