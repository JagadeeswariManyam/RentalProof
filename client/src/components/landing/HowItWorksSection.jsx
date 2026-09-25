import React, { useState } from 'react';
import {
  KeyRound,
  Camera,
  GitCompare,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'MOVE IN',
      summary: 'Record the initial baseline property condition.',
      detail:
        'Upon digital key handover, the landlord or tenant initiates the baseline digital walkthrough, establishing the verified benchmark for the entire tenancy.',
      icon: KeyRound,
      badge: 'Step 1 • Baseline Setup',
      bulletPoints: [
        'Room-by-room structured inventory checklist',
        'High-resolution baseline photo uploads',
        'Mutual landlord and tenant digital sign-off',
      ],
      previewSnippet: 'BASELINE BENCHMARK: Living Room, Kitchen, Master Bedroom locked.',
    },
    {
      step: '02',
      title: 'CAPTURE',
      summary: 'Upload room-by-room evidence.',
      detail:
        'Throughout the lease or during periodic walkthroughs, add timestamped photos, maintenance requests, and receipt proof directly to specific room nodes.',
      icon: Camera,
      badge: 'Step 2 • Evidence Ledger',
      bulletPoints: [
        'Automatic timestamp and location metadata tagging',
        'Direct maintenance ticket linking to affected areas',
        'Encrypted, tamper-evident audit storage',
      ],
      previewSnippet: 'PHOTO ATTACHED: Radiator valve inspected & logged (18 Jun).',
    },
    {
      step: '03',
      title: 'COMPARE',
      summary: 'Review move-in and move-out evidence.',
      detail:
        'When the tenancy concludes, execute the checkout walkthrough. The comparison engine aligns Move-In baseline photos side-by-side with checkout photos.',
      icon: GitCompare,
      badge: 'Step 3 • Visual Verification',
      bulletPoints: [
        'Interactive split-slider overlay comparison',
        'AI-assisted visual variance detection for oversight',
        'Objective review without disputed memory gaps',
      ],
      previewSnippet: 'DELTA ANALYSIS: Wall paint condition aligned with baseline.',
    },
    {
      step: '04',
      title: 'REPORT',
      summary: 'Create a complete rental history and deposit record.',
      detail:
        'Generate an exhaustive, printable summary report connecting photographic evidence directly to transparent deposit reconciliations or returns.',
      icon: FileSpreadsheet,
      badge: 'Step 4 • Settlement',
      bulletPoints: [
        'Printable court-ready PDF tenancy summaries',
        'Itemized deposit deductions backed by receipts',
        'Prompt, dispute-free security deposit returns',
      ],
      previewSnippet: 'REPORT GENERATED: 100% Deposit Refund Approved & Signed.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase font-black tracking-widest text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/80 px-3.5 py-1.5 rounded-full">
            The Rental Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            How RentalProof Works
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            A frictionless four-step journey designed to ensure every milestone is clearly documented and mutually verified.
          </p>
        </div>

        {/* 4 Interactive Step Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`text-left p-5 sm:p-6 rounded-3xl border transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-brand-500 shadow-xl dark:shadow-2xl scale-[1.02]'
                    : 'bg-white/70 dark:bg-slate-950/60 hover:bg-white dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className={`text-2xl sm:text-3xl font-black tracking-tight ${
                      isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-500'
                    }`}
                  >
                    {s.step}
                  </span>
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isSelected
                        ? 'bg-brand-50 dark:bg-brand-950 border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400'
                        : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">{s.title}</h3>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isSelected ? 'text-slate-600 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {s.summary}
                </p>

                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-brand-600 via-cyan-500 to-indigo-600 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Deep-Dive Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Deep-Dive Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/80 text-brand-600 dark:text-brand-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400 shrink-0" />
                <span>{steps[activeStep].badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {steps[activeStep].step}. {steps[activeStep].title} — {steps[activeStep].summary}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {steps[activeStep].detail}
              </p>

              <div className="space-y-2 pt-2">
                {steps[activeStep].bulletPoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Live Simulated Ledger Node */}
            <div className="lg:col-span-5">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-inner font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                    LEDGER TELEMETRY
                  </span>
                  <span>NODE #{steps[activeStep].step}</span>
                </div>

                <div className="py-3.5 space-y-2 text-slate-700 dark:text-slate-300">
                  <div className="text-[11px] text-slate-400">// Tenancy State Verification</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">{`> STAGE: ${steps[activeStep].title}_VERIFIED`}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    {`> LOG: "${steps[activeStep].previewSnippet}"`}
                  </div>
                  <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span>Cryptographic Hash:</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">SHA256: 0x8a99..4f11</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Next suggested action:</span>
                  <Link
                    to="/login"
                    className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-500 font-bold flex items-center gap-1"
                  >
                    <span>Test In Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
