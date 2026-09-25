import React, { useState } from 'react';
import { ShieldCheck, Orbit, LayoutGrid } from 'lucide-react';
import OrbitalFeatureCards from './OrbitalFeatureCards';
import DistinctFeatureCards from './DistinctFeatureCards';

const FeatureSection = () => {
  const [viewMode, setViewMode] = useState('orbital'); // 'orbital' or 'grid'

  return (
    <section id="features" className="py-20 sm:py-28 bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Architectural Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-cyan-300 text-xs font-bold mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-500 dark:text-cyan-400 shrink-0" />
            <span>Engineered for Complete Evidence Clarity</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Six Pillars of Rental Protection
          </h2>
          
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Every feature is designed to replace ambiguous disputes with verifiable, room-by-room records that protect both tenant deposits and property value.
          </p>

          {/* Dual-View Switcher Pill */}
          <div className="inline-flex items-center gap-1 p-1 mt-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md">
            <button
              type="button"
              onClick={() => setViewMode('orbital')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewMode === 'orbital'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Orbital Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>6 Unique Card Systems</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display based on view mode */}
        {viewMode === 'orbital' ? (
          <OrbitalFeatureCards />
        ) : (
          <DistinctFeatureCards />
        )}

      </div>
    </section>
  );
};

export default FeatureSection;
