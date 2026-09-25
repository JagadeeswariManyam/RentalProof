import React, { useState } from 'react';
import {
  Building2,
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
  Scan,
  Maximize2,
  Sparkles,
  Info,
} from 'lucide-react';

const Page01Property = () => {
  const [activeRoom, setActiveRoom] = useState('living');

  const rooms = [
    {
      id: 'living',
      name: 'Living Room',
      area: '240 sq ft',
      status: 'Documented',
      itemsCount: 14,
      points: 'North Wall, Hardwood, Main Sliding Door, AC Unit',
      top: '35%',
      left: '30%',
    },
    {
      id: 'kitchen',
      name: 'Modular Kitchen',
      area: '130 sq ft',
      status: 'Documented',
      itemsCount: 18,
      points: 'Granite Countertop, Sink Plumbing, Gas Hob, Cabinets',
      top: '40%',
      left: '70%',
    },
    {
      id: 'bedroom',
      name: 'Master Bedroom',
      area: '190 sq ft',
      status: 'Documented',
      itemsCount: 12,
      points: 'En-suite Door, Wardrobe Sliders, Window Casements',
      top: '70%',
      left: '35%',
    },
    {
      id: 'bathroom',
      name: 'Master Bathroom',
      area: '75 sq ft',
      status: 'Documented',
      itemsCount: 9,
      points: 'Shower Mixer, Ceramic Tiles, Exhaust, Vanity Mirror',
      top: '75%',
      left: '72%',
    },
  ];

  const current = rooms.find((r) => r.id === activeRoom) || rooms[0];

  return (
    <div className="h-full flex flex-col justify-between text-white select-none">
      {/* Page Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-600/20 border border-brand-500/30 text-cyan-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                DOSSIER CHAPTER 01
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-cyan-400 font-bold">PROPERTY #RP-08</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              PROPERTY CONDITION
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CONDITION: DOCUMENTED</span>
        </div>
      </div>

      {/* Main Architectural Visual & Room Inspection Dossier */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center flex-1 min-h-0">
        {/* Left: 3D Architectural Floorplan Blueprint with Interactive Pins */}
        <div className="lg:col-span-7 h-64 sm:h-72 lg:h-full min-h-[260px] rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 relative overflow-hidden flex items-center justify-center p-3">
          {/* Blueprint Grid Lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(56, 189, 248, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* SVG 3D Isometric Architectural Floorplan */}
          <svg className="w-full h-full max-w-sm sm:max-w-md p-2" viewBox="0 0 460 300" fill="none">
            {/* Outer Foundation */}
            <polygon
              points="230,40 410,130 230,220 50,130"
              fill="rgba(15, 23, 42, 0.9)"
              stroke="#0284c7"
              strokeWidth="2"
              strokeDasharray="4 2"
            />

            {/* Room Sub-Zones */}
            <polygon
              points="230,40 320,85 230,130 140,85"
              fill={activeRoom === 'living' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.08)'}
              stroke="#38bdf8"
              strokeWidth={activeRoom === 'living' ? '2' : '1'}
              className="cursor-pointer transition-all"
              onClick={() => setActiveRoom('living')}
            />
            <polygon
              points="320,85 410,130 320,175 230,130"
              fill={activeRoom === 'kitchen' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.08)'}
              stroke="#818cf8"
              strokeWidth={activeRoom === 'kitchen' ? '2' : '1'}
              className="cursor-pointer transition-all"
              onClick={() => setActiveRoom('kitchen')}
            />
            <polygon
              points="140,85 230,130 140,175 50,130"
              fill={activeRoom === 'bedroom' ? 'rgba(52, 211, 153, 0.25)' : 'rgba(52, 211, 153, 0.08)'}
              stroke="#34d399"
              strokeWidth={activeRoom === 'bedroom' ? '2' : '1'}
              className="cursor-pointer transition-all"
              onClick={() => setActiveRoom('bedroom')}
            />
            <polygon
              points="230,130 320,175 230,220 140,175"
              fill={activeRoom === 'bathroom' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.08)'}
              stroke="#fbbf24"
              strokeWidth={activeRoom === 'bathroom' ? '2' : '1'}
              className="cursor-pointer transition-all"
              onClick={() => setActiveRoom('bathroom')}
            />

            {/* Corner Structural Pillars */}
            <line x1="230" y1="40" x2="230" y2="10" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="410" y1="130" x2="410" y2="100" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="50" y1="130" x2="50" y2="100" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="230" y1="220" x2="230" y2="190" stroke="#0284c7" strokeWidth="1.5" />
          </svg>

          {/* Interactive Floating Hotspots */}
          {rooms.map((r) => {
            const isSelected = activeRoom === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveRoom(r.id)}
                style={{ top: r.top, left: r.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group flex items-center gap-1.5 focus:outline-none ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105 opacity-80'
                }`}
              >
                <div
                  className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold border transition-all ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 border-white shadow-lg shadow-cyan-400/50'
                      : 'bg-slate-900/90 text-slate-300 border-slate-700'
                  }`}
                >
                  {r.name.split(' ')[0]}
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[9px] font-mono text-slate-400 flex items-center gap-1.5">
            <Scan className="w-3 h-3 text-cyan-400" />
            <span>Click rooms to inspect spatial evidence nodes</span>
          </div>
        </div>

        {/* Right: Architectural Room Specification Sheet */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">SPECIFICATION DOSSIER</span>
              <span className="text-cyan-400 font-bold">{current.name}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Floor Area:</span>
                <span className="text-white font-mono font-bold">{current.area}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Baseline Items:</span>
                <span className="text-white font-mono font-bold">{current.itemsCount} Checkpoints</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Inspection Status:</span>
                <span className="text-emerald-400 font-mono font-bold">100% Documented</span>
              </div>
            </div>

            <div className="mt-3 pt-2 text-[11px] text-slate-400">
              <span className="text-slate-300 font-semibold block mb-0.5">Key Inventory Points:</span>
              <span>{current.points}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center gap-2 text-xs text-cyan-200">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Every room coordinates and inventory points are locked upon Move-In.</span>
          </div>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>ARCHITECTURAL DOSSIER • RP-SPEC-V1</span>
        <span className="text-slate-400">PAGE 01 / 08</span>
      </div>
    </div>
  );
};

export default Page01Property;
