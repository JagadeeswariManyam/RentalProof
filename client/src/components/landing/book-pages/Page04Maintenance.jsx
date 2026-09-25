import React from 'react';
import { Wrench, CheckCircle2, Clock, AlertCircle, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

const Page04Maintenance = () => {
  const steps = [
    { label: 'REQUESTED', date: '18 JUN • 09:15 AM', status: 'done', desc: 'Tenant reported slow kitchen drain' },
    { label: 'ASSIGNED', date: '18 JUN • 10:30 AM', status: 'done', desc: 'Landlord assigned ProPlumb Ltd.' },
    { label: 'IN PROGRESS', date: '19 JUN • 02:00 PM', status: 'done', desc: 'Technician on-site inspection' },
    { label: 'COMPLETED', date: '19 JUN • 04:15 PM', status: 'active', desc: 'Trap replaced & signed off with photo' },
  ];

  return (
    <div className="h-full flex flex-col justify-between text-white select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                DOSSIER CHAPTER 04
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-amber-400 font-bold">DISPATCH LOG</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              MAINTENANCE HISTORY
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>STATUS: COMPLETED</span>
        </div>
      </div>

      {/* Main Maintenance Ticket & Workflow Stage */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center flex-1 min-h-0">
        {/* Left: Ticket Specification & Photo Evidence */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
            <span className="text-slate-400">TICKET #MT-2026-09</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              PRIORITY: MEDIUM
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">Kitchen Sink Leak</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Under-sink wastewater trap joint seal was weeping during drainage.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned To:</span>
              <span className="text-slate-200">Elite Plumbing Services</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Resolution Cost:</span>
              <span className="text-emerald-400 font-bold">₹1,850 (Landlord Covered)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Photo Proof:</span>
              <span className="text-cyan-400">Attached & Verified</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Co-signed by Tenant & Contractor on completion.</span>
          </div>
        </div>

        {/* Right: 4-Stage Visual Maintenance Timeline */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-center">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-4">
            Audited Maintenance Lifecycle:
          </span>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 via-cyan-400 to-emerald-400">
            {steps.map((st, i) => (
              <div key={i} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-xs font-mono font-bold text-white tracking-wide">
                    {st.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{st.date}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>MAINTENANCE DISPATCH & PROOF RECORD</span>
        <span className="text-slate-400">PAGE 04 / 08</span>
      </div>
    </div>
  );
};

export default Page04Maintenance;
