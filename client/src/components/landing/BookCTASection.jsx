import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ShieldCheck, Sparkles, Building, Layers } from 'lucide-react';

const BookCTASection = () => {
  return (
    <section className="py-24 sm:py-28 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-700/80 p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-center max-w-4xl mx-auto">
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>The Next Standard in Tenancy Transparency</span>
            </div>

            {/* Mentor-specified Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Your Rental. <br />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Documented.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
              Bring room baselines, photographic evidence, repairs, payments, and deposit records into one immutable digital book.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white shadow-xl shadow-brand-500/25 active:scale-[0.98] transition group border border-white/10"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 backdrop-blur-md active:scale-[0.98] transition"
              >
                <span>EXPLORE PLATFORM</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
              <span>⚡ 1-Click Evaluation Logins</span>
              <span>•</span>
              <span>🔒 Encrypted Audit Trail</span>
              <span>•</span>
              <span>📋 Instant PDF Reports</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCTASection;
