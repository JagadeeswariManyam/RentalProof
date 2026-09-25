import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Search,
  Wrench,
  Lock,
  ArrowUpRight,
} from 'lucide-react';

const PropertyHeroVisual = () => {
  const [activePin, setActivePin] = useState('living-room');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Subtle mouse parallax effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const hotspots = [
    {
      id: 'living-room',
      title: 'Living Room Baseline',
      category: 'Move-In Inspection',
      status: 'Verified Baseline',
      statusColor: 'emerald',
      confidence: '98%',
      top: '32%',
      left: '30%',
      icon: Camera,
      preview: 'Drywall & Baseboard photographic ledger mapped to room coordinates.',
      timestamp: '01 Apr 2026 • 10:14 AM',
    },
    {
      id: 'kitchen-plumbing',
      title: 'Kitchen Fixture Audit',
      category: 'Maintenance & Service',
      status: 'Resolved & Signed',
      statusColor: 'blue',
      confidence: '94%',
      top: '52%',
      left: '68%',
      icon: Wrench,
      preview: 'Under-sink water line replacement with technician photo proof attached.',
      timestamp: '18 Jun 2026 • 02:40 PM',
    },
    {
      id: 'balcony-door',
      title: 'Balcony Slider Scan',
      category: 'AI Visual Variance',
      status: 'Flagged for Review',
      statusColor: 'amber',
      confidence: '82%',
      top: '72%',
      left: '38%',
      icon: Sparkles,
      preview: 'Surface track mark variance detected vs Move-In baseline.',
      timestamp: '15 Sep 2026 • 11:30 AM',
    },
  ];

  const currentHotspot = hotspots.find((h) => h.id === activePin) || hotspots[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto lg:max-w-none select-none transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-brand-500/20 via-indigo-500/20 to-purple-500/10 rounded-3xl blur-2xl -z-10 pointer-events-none" />

      {/* Main Glass Card Visual Container */}
      <div className="relative rounded-3xl bg-slate-900/95 border border-slate-700/70 p-4 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden text-white">
        {/* Card Header Bar (SaaS Window Mockup) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="ml-3 px-3 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 border border-slate-700/50">
              <Layers className="w-3.5 h-3.5 text-brand-400" />
              <span>Unit #402 • 3D Architectural Evidence Ledger</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Audit Trail Active</span>
          </div>
        </div>

        {/* Isometric 3D Architectural Property Schematic Stage */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-indigo-950/40 border border-slate-800/80 overflow-hidden flex items-center justify-center">
          {/* Subtle Isometric Grid Lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(99, 102, 241, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.25) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* SVG 3D Isometric Architectural Floorplan Representation */}
          <svg
            className="w-full h-full max-w-md p-4 transition-transform duration-500"
            viewBox="0 0 500 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="floorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="wallGradA" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="wallGradB" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Isometric Foundation Floor */}
            <polygon
              points="250,50 430,140 250,230 70,140"
              fill="url(#floorGrad)"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              className="transition-all"
            />

            {/* Room Division Walls */}
            {/* Living Room Area */}
            <polygon points="250,50 340,95 250,140 160,95" fill="rgba(59, 130, 246, 0.08)" stroke="#60a5fa" strokeWidth="1" />
            {/* Kitchen Area */}
            <polygon points="340,95 430,140 340,185 250,140" fill="rgba(99, 102, 241, 0.08)" stroke="#818cf8" strokeWidth="1" />
            {/* Bedroom/Balcony Area */}
            <polygon points="160,95 250,140 160,185 70,140" fill="rgba(16, 185, 129, 0.08)" stroke="#34d399" strokeWidth="1" />
            {/* Master Entry */}
            <polygon points="250,140 340,185 250,230 160,185" fill="rgba(245, 158, 11, 0.08)" stroke="#fbbf24" strokeWidth="1" />

            {/* 3D Vertical Corner Pillars */}
            <line x1="250" y1="50" x2="250" y2="10" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="430" y1="140" x2="430" y2="100" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="70" y1="140" x2="70" y2="100" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="250" y1="230" x2="250" y2="190" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Architectural Isometric Room Top Frame */}
            <polygon
              points="250,10 430,100 250,190 70,100"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1"
              strokeOpacity="0.4"
            />

            {/* Simulated Digital Scanning Ray */}
            <line x1="70" y1="140" x2="430" y2="140" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 4" />
          </svg>

          {/* Interactive Inspection Hotspots / Data Nodes */}
          {hotspots.map((spot) => {
            const isSelected = activePin === spot.id;
            const Icon = spot.icon;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActivePin(spot.id)}
                style={{ top: spot.top, left: spot.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-400 rounded-full transition-all duration-300 ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
                aria-label={`Select ${spot.title}`}
              >
                {/* Pulsing Ripple Effect */}
                <span
                  className={`absolute -inset-2 rounded-full animate-ping opacity-40 ${
                    spot.statusColor === 'emerald'
                      ? 'bg-emerald-400'
                      : spot.statusColor === 'amber'
                      ? 'bg-amber-400'
                      : 'bg-brand-400'
                  }`}
                />

                {/* Node Pill */}
                <div
                  className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg transition-colors border ${
                    isSelected
                      ? 'bg-white text-slate-900 border-white shadow-brand-500/50'
                      : 'bg-slate-900/90 text-slate-200 border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <Icon
                    className={`w-3 h-3 ${
                      spot.statusColor === 'emerald'
                        ? 'text-emerald-500'
                        : spot.statusColor === 'amber'
                        ? 'text-amber-500'
                        : 'text-brand-500'
                    }`}
                  />
                  <span className="hidden sm:inline">{spot.title.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}

          {/* Live Scanner Badge */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span>Interactive Multi-Room Property Model</span>
          </div>
        </div>

        {/* Dynamic Detail Card for the Selected Hotspot */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{currentHotspot.title}</span>
              <span className="text-[10px] text-slate-400">• {currentHotspot.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentHotspot.statusColor === 'emerald'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : currentHotspot.statusColor === 'amber'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}
              >
                {currentHotspot.status}
              </span>
              <span className="text-[10px] font-mono text-slate-400">Match {currentHotspot.confidence}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-2.5">{currentHotspot.preview}</p>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-700/60">
            <span>Timestamp: {currentHotspot.timestamp}</span>
            <span className="flex items-center gap-1 text-brand-400 font-semibold">
              <Lock className="w-3 h-3" /> Encrypted Audit Node
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeroVisual;
