import React, { useState } from 'react';
import {
  Building,
  UserPlus,
  KeyRound,
  Camera,
  Wrench,
  ClipboardCheck,
  SplitSquareVertical,
  PiggyBank,
  FileCheck2,
  CheckCircle2,
  ChevronRight,
  ArrowDown
} from 'lucide-react';

const TimelineSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const timelineNodes = [
    {
      step: 1,
      title: 'Property Added',
      icon: Building,
      desc: 'Landlord registers unit specifications, floorplan, and custom rooms.',
      badge: 'Portfolio Init',
    },
    {
      step: 2,
      title: 'Tenant Assigned',
      icon: UserPlus,
      desc: 'Tenancy agreement terms, rent amount, and security deposit locked.',
      badge: 'Lease Agreement',
    },
    {
      step: 3,
      title: 'Move-In Inspection',
      icon: KeyRound,
      desc: 'Baseline condition recorded with room-by-room photographic wizard.',
      badge: 'Baseline Benchmark',
    },
    {
      step: 4,
      title: 'Evidence Captured',
      icon: Camera,
      desc: 'All initial photos and notes timestamped and encrypted into ledger.',
      badge: 'Proof Vault',
    },
    {
      step: 5,
      title: 'Maintenance',
      icon: Wrench,
      desc: 'Repairs tracked, contractors dispatched, and receipt photos attached.',
      badge: 'Service Ledger',
    },
    {
      step: 6,
      title: 'Move-Out Inspection',
      icon: ClipboardCheck,
      desc: 'Checkout walkthrough conducted against original move-in checklist.',
      badge: 'Checkout Audit',
    },
    {
      step: 7,
      title: 'Before / After',
      icon: SplitSquareVertical,
      desc: 'Side-by-side visual difference comparison with AI observation assistance.',
      badge: 'Delta Analysis',
    },
    {
      step: 8,
      title: 'Deposit Record',
      icon: PiggyBank,
      desc: 'Itemized deposit calculations and deduction settlements finalized.',
      badge: 'Financial Settlement',
    },
    {
      step: 9,
      title: 'Final Report',
      icon: FileCheck2,
      desc: 'Comprehensive PDF tenancy report exported with complete audit trail.',
      badge: 'Final Resolution',
    },
  ];

  return (
    <section id="timeline" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-600 dark:text-cyan-400 bg-brand-50 dark:bg-cyan-950/80 border border-brand-200 dark:border-cyan-800/80 px-3.5 py-1.5 rounded-full">
            Full Tenancy Lifecycle Flow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            The Complete Tenancy Journey
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Every step is structured chronologically, ensuring complete accountability from listing to deposit settlement.
          </p>
        </div>

        {/* DESKTOP 9-STAGE HORIZONTAL FLOW */}
        <div className="hidden lg:grid grid-cols-9 gap-2.5">
          {timelineNodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeIdx === idx;
            return (
              <div
                key={node.step}
                onClick={() => setActiveIdx(idx)}
                className={`relative flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-brand-500 -translate-y-1.5 shadow-xl shadow-brand-500/10 ring-1 ring-brand-500/40'
                    : 'bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/60 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-cyan-400">
                      0{node.step}
                    </span>
                    <div
                      className={`p-1.5 rounded-lg border ${
                        isSelected
                          ? 'bg-brand-600 border-brand-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {node.title}
                  </h3>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                    {node.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
                    {node.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE VERTICAL FLOW */}
        <div className="lg:hidden space-y-3">
          {timelineNodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeIdx === idx;
            return (
              <div
                key={node.step}
                onClick={() => setActiveIdx(idx)}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-brand-500 shadow-lg'
                    : 'bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isSelected
                        ? 'bg-brand-600 border-brand-400 text-white'
                        : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-brand-600 dark:text-cyan-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {idx < timelineNodes.length - 1 && (
                    <div className="w-0.5 h-6 bg-slate-200 dark:bg-slate-800 mt-2" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-brand-600 dark:text-cyan-400 font-bold">
                      STAGE 0{node.step}
                    </span>
                    <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {node.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{node.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Flow Guarantee Summary */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Fully integrated, end-to-end synchronized tenancy ledger</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
