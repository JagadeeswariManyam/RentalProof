import React from 'react';
import {
  History,
  Building,
  UserCheck,
  KeyRound,
  Wrench,
  CreditCard,
  ClipboardCheck,
  SplitSquareVertical,
  PiggyBank,
  CheckCircle2,
} from 'lucide-react';

const Page07RentalTimeline = () => {
  const events = [
    { icon: Building, label: 'PROPERTY CREATED', date: '01 Mar 2026', note: 'Unit #RP-08 registered & floorplan mapped' },
    { icon: UserCheck, label: 'TENANCY STARTED', date: '01 Apr 2026', note: '12-month agreement locked in vault' },
    { icon: KeyRound, label: 'MOVE-IN INSPECTION', date: '01 Apr 2026', note: 'Baseline photos & room inventory signed' },
    { icon: Wrench, label: 'MAINTENANCE', date: '19 Jun 2026', note: 'Kitchen sink leak repaired & photo verified' },
    { icon: CreditCard, label: 'RENT PAYMENTS', date: 'Monthly (1-5th)', note: 'On-time automated ledger reconciliation' },
    { icon: ClipboardCheck, label: 'MOVE-OUT INSPECTION', date: '15 Sep 2026', note: 'Walkthrough conducted against baseline' },
    { icon: SplitSquareVertical, label: 'BEFORE / AFTER REVIEW', date: '15 Sep 2026', note: 'Delta analysis & condition verified' },
    { icon: PiggyBank, label: 'DEPOSIT RECORD', date: '16 Sep 2026', note: 'Transparent deduction & ₹24,500 refund settled' },
  ];

  return (
    <div className="h-full flex flex-col justify-between text-white select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                DOSSIER CHAPTER 07
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-blue-400 font-bold">CHRONICLE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              PROPERTY TIMELINE
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-blue-950/80 border border-blue-800/60 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-blue-300">
          <span>COMPLETE TENANCY HISTORY</span>
        </div>
      </div>

      {/* Main Glowing Chronological Timeline Stage */}
      <div className="my-4 flex-1 min-h-0 flex flex-col justify-center">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {events.map((ev, idx) => {
              const Icon = ev.icon;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">0{idx + 1}</span>
                      <div className="p-1 rounded-lg bg-slate-800 text-slate-300 group-hover:text-cyan-400 group-hover:bg-cyan-950/50 transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h4 className="text-xs font-mono font-bold text-white tracking-tight leading-snug">
                      {ev.label}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                      {ev.date}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-slate-800/80 line-clamp-2">
                    {ev.note}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Timeline Summary Anchor */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Ledger Guarantee:</span>
            <span className="text-cyan-300 font-bold">
              Every important rental event is preserved in one place.
            </span>
          </div>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>IMMUTABLE CHRONOLOGICAL AUDIT LOG</span>
        <span className="text-slate-400">PAGE 07 / 08</span>
      </div>
    </div>
  );
};

export default Page07RentalTimeline;
