import React from 'react';
import {
  FileCheck2,
  ShieldCheck,
  Building,
  Camera,
  Wrench,
  PiggyBank,
  CreditCard,
  History,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Page08CompleteRecord = () => {
  const pillars = [
    { icon: Building, label: 'PROPERTY', val: '2 BHK Unit #RP-08' },
    { icon: Camera, label: 'EVIDENCE', val: '42 Baseline Photos' },
    { icon: Wrench, label: 'MAINTENANCE', val: '1 Ticket Resolved' },
    { icon: CreditCard, label: 'PAYMENTS', val: '100% On-Time' },
    { icon: PiggyBank, label: 'DEPOSIT', val: '₹24,500 Returned' },
    { icon: History, label: 'TIMELINE', val: 'Audited & Locked' },
  ];

  return (
    <div className="h-full flex flex-col justify-between text-white select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-600/20 border border-teal-500/30 text-teal-400">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                DOSSIER CHAPTER 08
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-teal-400 font-bold">UNIFIED DOSSIER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              COMPLETE RENTAL RECORD
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-teal-950/80 border border-teal-800/60 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-teal-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>COURT-READY AUDIT CERTIFICATE</span>
        </div>
      </div>

      {/* Main Unified Record Stage */}
      <div className="my-4 flex-1 min-h-0 flex flex-col justify-center space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Unified Evidence Ledger</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Every rental has a story. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
              Keep the evidence.
            </span>
          </h3>
        </div>

        {/* 6 Unified Pillars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col items-center justify-between group hover:border-teal-500/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-slate-900 text-teal-400 border border-slate-800 mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                  {p.label}
                </span>
                <span className="text-xs font-bold text-white mt-0.5 leading-snug">
                  {p.val}
                </span>
              </div>
            );
          })}
        </div>

        {/* Certificate Stamp Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="font-mono font-bold text-teal-300 block">
              FINAL TENANCY RESOLUTION CERTIFICATE #RP-CERT-8841
            </span>
            <span className="text-[11px] text-slate-400">
              Verified by Landlord, Tenant, and Service Providers. Mutually closed.
            </span>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20 transition shrink-0"
          >
            <span>View Live Report Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>FINAL SETTLEMENT ARCHIVE</span>
        <span className="text-slate-400">PAGE 08 / 08</span>
      </div>
    </div>
  );
};

export default Page08CompleteRecord;
