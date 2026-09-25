import React from 'react';
import {
  ShieldCheck,
  Lock,
  History,
  FileSpreadsheet,
  Users2,
  FileCheck,
  KeyRound,
  Eye,
  CheckCircle2
} from 'lucide-react';

const SecuritySection = () => {
  const securityPillars = [
    {
      icon: Users2,
      title: 'Role-Based Access Control',
      description:
        'Dedicated permission boundaries for landlords, tenants, contractors, and admins prevent unauthorized access or edits.',
    },
    {
      icon: KeyRound,
      title: 'Secure Authentication',
      description:
        'Industry-standard token encryption and session guards protect credentials and private tenancy records.',
    },
    {
      icon: History,
      title: 'Immutable Evidence History',
      description:
        'All inspection photos, notes, and timestamp records are locked into an unalterable chronological ledger.',
    },
    {
      icon: Eye,
      title: 'Comprehensive Audit Trail',
      description:
        'Every status change, report generation, or deposit adjustment is logged with specific timestamps and user IDs.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Structured Rental Records',
      description:
        'Room-by-room inventories, condition checklists, and agreement terms stored in an organized, searchable database.',
    },
    {
      icon: FileCheck,
      title: 'Transparent Deposit Records',
      description:
        'Itemized security deposit reconciliations backed by attached repair invoices and mutually verified walkthroughs.',
    },
  ];

  return (
    <section id="security" className="py-20 sm:py-28 bg-slate-100/60 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800/80 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Security & Integrity Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Built on Trust, Verification & Objectivity
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            RentalProof eliminates ambiguity by enforcing structured evidence collection and audited workflows throughout the entire rental lifecycle.
          </p>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {securityPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50 hover:shadow-xl transition-all duration-300 group shadow-md"
              >
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm w-fit mb-4 text-brand-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Banner */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Standardized & Objective Evidence Ledger</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Clear visual proof reduces dispute escalation and ensures fast, objective deposit returns.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Full Audit Trail Active</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SecuritySection;
