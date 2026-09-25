import React, { useState } from 'react';
import { Camera, Calendar, User, CheckCircle2, Lock, Sparkles, ZoomIn } from 'lucide-react';

const Page02MoveInEvidence = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const evidenceItems = [
    {
      id: 1,
      room: 'Living Room — North Wall & AC Unit',
      date: '12 JUN 2026',
      time: '10:42 AM',
      uploadedBy: 'LANDLORD (Jagadeeswari M.)',
      status: 'VERIFIED BASELINE',
      hash: 'SHA256: 4f8b9...c102',
      image:
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
      note: 'Wall paint pristine, no abrasions, AC remote functional.',
    },
    {
      id: 2,
      room: 'Modular Kitchen — Sink & Granite Slab',
      date: '12 JUN 2026',
      time: '11:15 AM',
      uploadedBy: 'TENANT (Co-signed)',
      status: 'VERIFIED BASELINE',
      hash: 'SHA256: 9e2a1...fa88',
      image:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      note: 'Plumbing leak test passed, silicone sealing intact.',
    },
    {
      id: 3,
      room: 'Master Bedroom — Hardwood & Window Frame',
      date: '12 JUN 2026',
      time: '11:45 AM',
      uploadedBy: 'LANDLORD',
      status: 'VERIFIED BASELINE',
      hash: 'SHA256: 7d1c5...33d1',
      image:
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      note: 'Hardwood floor clear of scratches, sliding windows smooth.',
    },
  ];

  const current = evidenceItems[selectedPhoto];

  return (
    <div className="h-full flex flex-col justify-between text-white select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                DOSSIER CHAPTER 02
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-indigo-400 font-bold">MOVE-IN ARCHIVE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              MOVE-IN EVIDENCE
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-indigo-300">
          <Lock className="w-3.5 h-3.5" />
          <span>MUTUALLY SIGNED RECORD</span>
        </div>
      </div>

      {/* Main Layered Photographic Evidence Stage */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center flex-1 min-h-0">
        {/* Left: Interactive Evidence Preview Frame */}
        <div className="lg:col-span-7 h-60 sm:h-72 lg:h-full min-h-[250px] rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden group shadow-2xl">
          <img
            src={current.image}
            alt={current.room}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Embedded Watermark Stamp */}
          <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs font-mono">
            <div className="text-white font-bold">{current.room.split('—')[0]}</div>
            <div className="text-[10px] text-cyan-400">{current.date} • {current.time}</div>
          </div>

          <div className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>{current.status}</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="truncate pr-2 italic">"{current.note}"</span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">{current.hash}</span>
          </div>
        </div>

        {/* Right: Layered Thumbnail Stack & Metadata Dossier */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Select Photographic Node:
            </span>

            {evidenceItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPhoto(idx)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                  selectedPhoto === idx
                    ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.room}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                />
                <div className="truncate flex-1">
                  <div className="text-xs font-bold text-white truncate">{item.room}</div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="text-indigo-400">{item.uploadedBy.split(' ')[0]}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Audit Trail: Locked & Time-Stamped</span>
            <span className="text-emerald-400 font-bold">100% Immutable</span>
          </div>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>PHOTOGRAPHIC BASELINE LEDGER</span>
        <span className="text-slate-400">PAGE 02 / 08</span>
      </div>
    </div>
  );
};

export default Page02MoveInEvidence;
