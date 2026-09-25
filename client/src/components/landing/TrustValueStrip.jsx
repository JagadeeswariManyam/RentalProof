import React from 'react';
import {
  Camera,
  SplitSquareVertical,
  Wrench,
  PiggyBank,
  Sparkles,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';

const TrustValueStrip = () => {
  const items = [
    {
      icon: Camera,
      label: 'Property Evidence',
      badge: 'Room-by-Room',
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border-cyan-200 dark:border-cyan-500/30',
    },
    {
      icon: SplitSquareVertical,
      label: 'Before / After',
      badge: 'Split Slider',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-500/30',
    },
    {
      icon: Wrench,
      label: 'Maintenance',
      badge: 'Audited Dispatch',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-500/30',
    },
    {
      icon: PiggyBank,
      label: 'Rent & Deposits',
      badge: 'Transparent Ledger',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-500/30',
    },
    {
      icon: Sparkles,
      label: 'AI Observation',
      badge: 'Variance Scan',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 border-purple-200 dark:border-purple-500/30',
    },
    {
      icon: FileCheck2,
      label: 'Rental Reports',
      badge: 'Court-Ready PDF',
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 border-sky-200 dark:border-sky-500/30',
    },
  ];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl dark:shadow-2xl p-5 sm:p-7 transition-colors duration-300">
        
        {/* Strip Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-black text-brand-600 dark:text-brand-400 block">
              Unified Tenancy Architecture
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
              One platform for the complete rental lifecycle
            </h3>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>From digital key exchange to deposit settlement</span>
          </div>
        </div>

        {/* 6 Value Cards Grid (Mobile Responsive 2x3 or 6x1) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 mt-4 sm:mt-5">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center sm:items-start p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100 dark:bg-slate-950/80 dark:hover:bg-slate-800/90 border border-slate-200/80 hover:border-slate-300 dark:border-slate-800/80 dark:hover:border-slate-700 transition-all duration-200 text-center sm:text-left"
              >
                <div className={`p-2 rounded-xl mb-2 border ${item.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-brand-600 dark:group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {item.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustValueStrip;
