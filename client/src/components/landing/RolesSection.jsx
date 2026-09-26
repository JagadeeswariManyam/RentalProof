import React, { useState, useEffect } from 'react';
import {
  Home,
  UserCheck,
  Wrench,
  Shield,
  ArrowRight,
  Building2,
  FileCheck,
  CheckCircle2,
  Clock,
  Activity,
  Layers,
  Sparkles,
  KeyRound,
  FileText,
  Sliders,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RolesSection = () => {
  // ----------------------------------------------------
  // CARD 1: LANDLORD — Subtle floating card-stack oscillation
  // ----------------------------------------------------
  const [stackOffset, setStackOffset] = useState(0);
  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const animateStack = (time) => {
      const elapsed = (time - startTime) / 1000;
      setStackOffset(Math.sin(elapsed * 1.5) * 6);
      animId = requestAnimationFrame(animateStack);
    };
    animId = requestAnimationFrame(animateStack);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ----------------------------------------------------
  // CARD 2: TENANT — Automatic Slideshow (Cycles 3 tenant proof milestones)
  // ----------------------------------------------------
  const [tenantSlide, setTenantSlide] = useState(0);
  const tenantSlides = [
    {
      title: 'Move-In Baseline Signed',
      badge: 'Protected',
      room: 'Unit 402 • Living & Kitchen',
      date: '01 Apr 2026',
      img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Personal Proof Attached',
      badge: 'SHA-256 Vault',
      room: 'Master Bedroom Floor',
      date: '12 Jul 2026',
      img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Full Deposit Reconciled',
      badge: '100% Refundable',
      room: 'Deposit Ledger ₹62,800',
      date: '31 Mar 2027',
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTenantSlide((prev) => (prev + 1) % tenantSlides.length);
    }, 2700);
    return () => clearInterval(timer);
  }, [tenantSlides.length]);

  // ----------------------------------------------------
  // CARD 3: CONTRACTOR — Animated Repair Step Loop
  // ----------------------------------------------------
  const [contractorStep, setContractorStep] = useState(2);
  useEffect(() => {
    const timer = setInterval(() => {
      setContractorStep((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // ----------------------------------------------------
  // CARD 4: ADMIN — Live Telemetry Pulse & Metric Oscillation
  // ----------------------------------------------------
  const [adminPulse, setAdminPulse] = useState(99.4);
  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const animateAdmin = (time) => {
      const elapsed = (time - startTime) / 1000;
      setAdminPulse(+(99.1 + Math.sin(elapsed * 2) * 0.5).toFixed(1));
      animId = requestAnimationFrame(animateAdmin);
    };
    animId = requestAnimationFrame(animateAdmin);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="roles" className="py-20 sm:py-28 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/80 px-3.5 py-1.5 rounded-full shadow-sm">
            Role-Based Workspaces
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            Tailored Experiences for Every Stakeholder
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Whether you manage portfolios, rent your home, execute maintenance work orders, or oversee platform governance.
          </p>
        </div>

        {/* 4 GENUINELY DIFFERENT VISUAL ROLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          
          {/* ========================================================
              ROLE 1: LANDLORD — Layered Property / Document Stack Card
              ======================================================== */}
          <div className="group rounded-3xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-lg dark:shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shadow-sm group-hover:scale-105 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/90 px-2.5 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
                  Portfolio Owner
                </span>
              </div>

              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Landlord
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Manage property units, initiate room-by-room baselines, dispatch repairs, and maintain audited escrow ledgers.
              </p>

              {/* VISUAL ARCHITECTURE: Layered Moving Card Stack */}
              <div className="relative mt-4 h-36 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 overflow-hidden flex items-center justify-center select-none shadow-inner">
                {/* Back card */}
                <div
                  className="absolute w-[86%] h-24 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-sm transition-transform duration-75"
                  style={{ transform: `translateY(${-4 - stackOffset * 0.4}px) rotate(-4deg)` }}
                />
                
                {/* Front active property card */}
                <div
                  className="relative z-10 w-[92%] h-24 rounded-xl bg-white dark:bg-slate-900 border border-cyan-500/40 p-2.5 shadow-md flex items-center gap-2.5 transition-transform duration-75"
                  style={{ transform: `translateY(${stackOffset * 0.5}px)` }}
                >
                  <div className="w-12 h-14 rounded-lg bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="text-left space-y-0.5 overflow-hidden flex-1">
                    <span className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400 block uppercase">Palm Grove #402</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white block truncate">12 Verified Units</span>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold block">₹15,000/mo • Active Lease</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-white hover:bg-cyan-600 hover:text-white dark:bg-slate-800/90 dark:hover:bg-cyan-600 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <span>Evaluate Landlord Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ========================================================
              ROLE 2: TENANT — Modern Residence Profile & Auto Slideshow Card
              ======================================================== */}
          <div className="group rounded-3xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-lg dark:shadow-xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:scale-105 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/90 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                  Resident Vault
                </span>
              </div>

              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Tenant
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Document baseline photos, request repairs with instant photo proof, and protect 100% of your deposit.
              </p>

              {/* VISUAL ARCHITECTURE: Rotating Resident Evidence Slideshow */}
              <div className="relative mt-4 h-36 rounded-2xl bg-slate-900 border border-slate-800 p-2.5 overflow-hidden flex items-center justify-center select-none shadow-inner">
                {tenantSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-2 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex flex-col justify-between p-2.5 text-white transition-opacity duration-500 ${
                      tenantSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-indigo-300">
                        {slide.date}
                      </span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/40">
                        {slide.badge}
                      </span>
                    </div>

                    <div className="space-y-0.5 my-auto">
                      <h4 className="text-xs font-black text-white">{slide.title}</h4>
                      <p className="text-[9px] text-slate-300">{slide.room}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[8px] text-slate-400">
                      <span>Personal Verification Vault</span>
                      <span className="text-cyan-400 font-bold">SHA-256</span>
                    </div>
                  </div>
                ))}

                {/* Ticks */}
                <div className="absolute bottom-1 right-2 flex gap-1 z-20">
                  {tenantSlides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        tenantSlide === i ? 'w-4 bg-indigo-400' : 'w-1.5 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-white hover:bg-indigo-600 hover:text-white dark:bg-slate-800/90 dark:hover:bg-indigo-600 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <span>Evaluate Tenant Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ========================================================
              ROLE 3: CONTRACTOR — Maintenance Work Order Timeline Card
              ======================================================== */}
          <div className="group rounded-3xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-lg dark:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-sm group-hover:scale-105 transition-transform">
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/90 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                  Service Dispatch
                </span>
              </div>

              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Contractor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Receive prioritized work orders, upload before/after repair proof photos, and attach invoices.
              </p>

              {/* VISUAL ARCHITECTURE: Stepper Work Order Timeline */}
              <div className="relative mt-4 h-36 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 flex flex-col justify-between select-none shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    WO #204: Plumbing Valve
                  </span>
                  <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    High Priority
                  </span>
                </div>

                {/* 4 Steps with dynamic active stage */}
                <div className="grid grid-cols-4 gap-1 text-[8px] font-bold text-center">
                  {['Assigned', 'In Transit', 'Repairing', 'Signed'].map((label, i) => (
                    <div
                      key={label}
                      className={`py-1 rounded-md transition-all duration-300 ${
                        contractorStep === i
                          ? 'bg-amber-500 text-white shadow-sm ring-1 ring-amber-400 scale-105'
                          : contractorStep > i
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                <div className="text-[9px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-1.5">
                  <span>Photo Attachment: Required</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹1,200 Invoice</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-white hover:bg-amber-600 hover:text-white dark:bg-slate-800/90 dark:hover:bg-amber-600 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <span>Evaluate Contractor Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ========================================================
              ROLE 4: ADMIN — Platform Control Center & Live Telemetry Card
              ======================================================== */}
          <div className="group rounded-3xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-lg dark:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/90 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  System Overseer
                </span>
              </div>

              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Admin
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Monitor platform telemetry, inspect chronological audit trails, and oversee compliance across users.
              </p>

              {/* VISUAL ARCHITECTURE: Mini Control Dashboard HUD */}
              <div className="relative mt-4 h-36 rounded-2xl bg-slate-950 border border-emerald-500/30 p-3 flex flex-col justify-between font-mono text-xs select-none shadow-inner text-emerald-300">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                    GOVERNANCE HUD
                  </span>
                  <span className="font-bold text-emerald-400">{adminPulse}% HEALTH</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                  <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80">
                    <span className="text-slate-400 block">Active Nodes</span>
                    <span className="text-white font-bold text-[10px]">100% Online</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Audit Stream</span>
                    <span className="text-cyan-400 font-bold text-[10px]">Synchronized</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800 pt-1.5">
                  <span>Cryptographic Seal:</span>
                  <span className="text-emerald-400 font-bold">ACTIVE ROOT</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-white hover:bg-emerald-600 hover:text-white dark:bg-slate-800/90 dark:hover:bg-emerald-600 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <span>Evaluate Admin Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default RolesSection;

