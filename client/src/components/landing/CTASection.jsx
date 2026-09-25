import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 sm:py-28 bg-slate-100/60 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 text-white p-7 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border border-brand-800/40">
          
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-brand-300 text-xs font-semibold backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span>Ready for Dispute-Free Tenancies?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Keep the evidence. <br />
              <span className="bg-gradient-to-r from-brand-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Simplify the rental.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
              Bring inspections, evidence, maintenance, payments and deposit records together in one unified platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white shadow-xl shadow-brand-500/25 active:scale-[0.98] transition group focus:outline-none focus:ring-4 focus:ring-brand-400/40"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-md active:scale-[0.98] transition focus:outline-none focus:ring-4 focus:ring-slate-700/40 shadow-sm"
              >
                <span>View Demo Portals</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant 1-Click Evaluation Mode</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Court-Ready Export</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
