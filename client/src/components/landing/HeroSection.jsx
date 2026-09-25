import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, CheckCircle2, ChevronRight, FileCheck, Layers } from 'lucide-react';
import PropertyHero3D from './PropertyHero3D';

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background Interactive Lighting & Ambient Grids */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[300px] sm:h-[400px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-[100px] sm:blur-[130px]" />
        <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[350px] bg-indigo-500/10 rounded-full blur-[90px]" />
        <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[450px] h-[200px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-[90px]" />

        {/* Subtle Architectural Dot / Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs (Mobile-First Layout) */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-brand-600 dark:text-brand-300 text-xs font-bold backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400 shrink-0" />
              <span className="truncate">Next-Gen PropTech Evidence Ledger</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5 shrink-0" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white">
              Your Rental. <br />
              <span className="bg-gradient-to-r from-brand-600 via-cyan-600 to-indigo-600 dark:from-brand-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
                Your Evidence.
              </span>{' '}
              <br />
              Your Protection.
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Document property condition from move-in to move-out. Compare evidence, track maintenance, manage deposits, and keep your complete rental history in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-xl shadow-brand-500/25 active:scale-[0.98] transition group focus:outline-none focus:ring-4 focus:ring-brand-500/30"
              >
                <span>Start Your Rental Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 backdrop-blur-md active:scale-[0.98] transition shadow-sm"
              >
                <span>Explore Demo</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Proof Trust Points */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero Ambiguity Move-Outs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Audited Deposit Ledgers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Court-Ready Reports</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Property Cinematic Visual */}
          <div className="lg:col-span-6 w-full mt-2 lg:mt-0">
            <PropertyHero3D />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
