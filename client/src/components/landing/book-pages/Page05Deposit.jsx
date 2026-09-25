import React from 'react';
import { PiggyBank, Receipt, ArrowDownRight, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';

const Page05Deposit = () => {
  return (
    <div className="h-full flex flex-col justify-between text-white select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                DOSSIER CHAPTER 05
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">FINANCIAL LEDGER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              DEPOSIT RECORD
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-slate-300">
          <span>MUTUALLY AGREED SETTLEMENT</span>
        </div>
      </div>

      {/* Main Deposit Financial Visualization Stage */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center flex-1 min-h-0">
        {/* Left: Initial Deposit & Balance Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              INITIAL SECURITY DEPOSIT
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              ₹30,000
            </div>
            <span className="text-[10px] text-slate-500 font-mono block mt-1">
              Escrow baseline verified upon move-in (01 Apr 2026)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-emerald-950/40 border border-emerald-800/60 shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                REFUNDABLE NET BALANCE
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
              ₹24,500
            </div>
            <span className="text-[10px] text-emerald-200/80 font-mono block mt-1">
              Direct return processed upon final walkthrough sign-off
            </span>
          </div>
        </div>

        {/* Right: Itemized Recorded Deductions Ledger */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">RECORDED DEDUCTIONS LEDGER</span>
              <span className="text-amber-400 font-bold">Total: -₹5,500</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-200 block">Deep Move-Out Cleaning</span>
                    <span className="text-[10px] text-slate-400 font-mono">Receipt #CL-8821 Attached</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-amber-400">-₹2,000</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-200 block">Baseboard Drywall Touch-up</span>
                    <span className="text-[10px] text-slate-400 font-mono">Invoice #RP-9914 Attached</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-amber-400">-₹3,500</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-start gap-2 text-[10px] text-slate-400">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              Recorded Deposit Ledger maintains transparent documentation. It reflects mutually signed agreements and does not imply unilateral legal judgment.
            </span>
          </div>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>SECURITY DEPOSIT RECONCILIATION AUDIT</span>
        <span className="text-slate-400">PAGE 05 / 08</span>
      </div>
    </div>
  );
};

export default Page05Deposit;
