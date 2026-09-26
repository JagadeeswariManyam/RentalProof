import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  History,
  FileSpreadsheet,
  Users2,
  FileCheck,
  KeyRound,
  Eye,
  CheckCircle2,
  Scan,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const SecuritySection = () => {
  // ----------------------------------------------------
  // CARD A: Laser Radar Scan line animation
  // ----------------------------------------------------
  const [radarPos, setRadarPos] = useState(25);
  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const animateRadar = (time) => {
      const elapsed = (time - startTime) / 1000;
      setRadarPos(50 + 40 * Math.sin(elapsed * 2.4));
      animId = requestAnimationFrame(animateRadar);
    };
    animId = requestAnimationFrame(animateRadar);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ----------------------------------------------------
  // CARD B: 3D DIGITAL BOOK-OPENING ANIMATION (Data Protection Ledger)
  // Continuous Loop: Closed (0-15%) -> Opening (15-40%) -> Open (40-75%) -> Closing (75-100%)
  // ----------------------------------------------------
  const [bookState, setBookState] = useState('opening');
  const [bookAngle, setBookAngle] = useState(0);

  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const cycleDuration = 5200; // 5.2s loop

    const animateBook = (currentTime) => {
      const elapsed = (currentTime - startTime) % cycleDuration;
      const progress = elapsed / cycleDuration;

      if (progress < 0.15) {
        setBookState('closed');
        setBookAngle(0);
      } else if (progress < 0.40) {
        const openProg = (progress - 0.15) / 0.25;
        const ease = openProg < 0.5 ? 4 * openProg * openProg * openProg : 1 - Math.pow(-2 * openProg + 2, 3) / 2;
        setBookState('opening');
        setBookAngle(ease * 165);
      } else if (progress < 0.75) {
        setBookState('open');
        setBookAngle(165);
      } else {
        const closeProg = (progress - 0.75) / 0.25;
        const ease = closeProg < 0.5 ? 4 * closeProg * closeProg * closeProg : 1 - Math.pow(-2 * closeProg + 2, 3) / 2;
        setBookState('closing');
        setBookAngle(165 - ease * 165);
      }

      animId = requestAnimationFrame(animateBook);
    };

    animId = requestAnimationFrame(animateBook);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ----------------------------------------------------
  // CARD D: ROLE-BASED ACCESS — Rotating Scope Slideshow
  // ----------------------------------------------------
  const [roleScopeIndex, setRoleScopeIndex] = useState(0);
  const roleScopes = [
    {
      role: 'Landlord Scope',
      badge: 'Portfolio Authority',
      access: 'Full Unit Catalog & Baseline Authoring',
      encryption: 'RSA-4096 / SHA-256',
    },
    {
      role: 'Tenant Scope',
      badge: 'Resident Sandbox',
      access: 'Personal Proof Vault & Deposit Ledger',
      encryption: 'Scoped Zero-Trust Node',
    },
    {
      role: 'Contractor Scope',
      badge: 'Work Order Auth',
      access: 'Assigned Tickets & Proof Verification',
      encryption: 'Restricted Dispatch API',
    },
    {
      role: 'Admin Scope',
      badge: 'Platform Root',
      access: 'System Audit Stream & Moderation',
      encryption: 'Multi-Tenant Root Guard',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleScopeIndex((prev) => (prev + 1) % roleScopes.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roleScopes.length]);

  return (
    <section id="security" className="py-20 sm:py-28 bg-slate-100/60 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800/80 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Cryptographic Trust & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Security & Zero-Ambiguity Infrastructure
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Eliminating disputes by enforcing tamper-evident evidence collection, encrypted tokens, and immutable audit trails.
          </p>
        </div>

        {/* 4 STRUCTURALLY DISTINCT SECURITY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          
          {/* ========================================================
              CARD A: SECURITY / AUTHENTICATION — Scanning Shield Interface
              ======================================================== */}
          <div className="rounded-3xl bg-white dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-lg dark:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Authentication Shield
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                JWT & Session Guards
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Cryptographically signed bearer tokens, bcrypt password hashing, and active session protection.
              </p>

              {/* VISUAL ARCHITECTURE: Radar HUD Scanner Box */}
              <div className="relative mt-4 h-36 rounded-2xl bg-slate-950 border border-emerald-500/30 p-3 flex flex-col justify-between overflow-hidden select-none shadow-inner font-mono text-xs text-emerald-300">
                {/* Horizontal Laser Line */}
                <div
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_10px_rgba(52,211,153,0.9)] pointer-events-none"
                  style={{ top: `${radarPos}%` }}
                />

                <div className="flex justify-between items-center text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Scan className="w-3 h-3 animate-spin" /> TOKEN VALIDATED
                  </span>
                  <span className="text-slate-400 text-[9px]">256-BIT AES</span>
                </div>

                <div className="space-y-1 my-auto">
                  <div className="flex justify-between text-[10px] bg-emerald-950/60 p-1.5 rounded-lg border border-emerald-800/60">
                    <span className="text-slate-300">Session Status:</span>
                    <span className="text-emerald-400 font-bold">Guarded • TLS 1.3</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800 pt-1">
                  <span>Signature Validity:</span>
                  <span className="text-cyan-400 font-bold">100% Intact</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Security Perimeter</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Verified</span>
            </div>
          </div>

          {/* ========================================================
              CARD B: DATA PROTECTION — 3D Continuous Book-Opening Animation
              ======================================================== */}
          <div className="rounded-3xl bg-white dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-lg dark:shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 shadow-sm group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
                    Book Opening Loop
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Data Protection Vault
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Immutable room condition records with SHA-256 integrity hashes locked into official tenancy registers.
              </p>

              {/* VISUAL ARCHITECTURE: Continuous 3D Digital Book Opening Presentation */}
              <div className="relative mt-4 h-36 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 overflow-hidden flex items-center justify-center select-none perspective-[800px]">
                
                {/* 3D Book Container */}
                <div className="relative w-48 h-28 flex items-center justify-center">
                  
                  {/* Fixed Interior Base Page */}
                  <div className="absolute inset-0 rounded-xl bg-slate-900 dark:bg-slate-950 border border-cyan-500/40 shadow-xl overflow-hidden flex flex-col justify-between p-2 text-white">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-0.5 text-[8px] font-bold text-cyan-400 uppercase">
                        <span>Vault Certificate</span>
                        <span className="text-[7px] text-slate-400">RP-2026-VAULT</span>
                      </div>
                      <div className="space-y-0.5 text-[8px] text-slate-300">
                        <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Check className="w-2.5 h-2.5 shrink-0" /> Baseline Cryptographically Locked
                        </div>
                        <div className="flex items-center gap-1 text-cyan-300 font-semibold">
                          <Check className="w-2.5 h-2.5 shrink-0" /> Zero Tamper Verification
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[7px] text-slate-400">
                      <span>Certified Tenancy</span>
                      <span className="font-bold text-cyan-400">SHA-256 Signed</span>
                    </div>
                  </div>

                  {/* Flipping Front Cover */}
                  <div
                    className="absolute inset-y-0 left-0 w-full rounded-xl bg-gradient-to-br from-cyan-600 via-teal-600 to-indigo-700 text-white shadow-2xl border border-cyan-300/40 p-2.5 flex flex-col justify-between transition-transform duration-100 ease-linear origin-left"
                    style={{
                      transform: `rotateY(-${bookAngle}deg)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      zIndex: bookAngle > 90 ? 5 : 25,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <Lock className="w-4 h-4 text-white" />
                      <span className="text-[7px] font-mono uppercase bg-black/30 px-1.5 py-0.5 rounded">
                        Encrypted Book
                      </span>
                    </div>
                    <div className="space-y-0.5 my-auto">
                      <span className="text-[8px] uppercase tracking-wider text-cyan-200 font-bold block">Digital Record</span>
                      <h4 className="text-[11px] font-black text-white leading-tight">Evidence Ledger</h4>
                    </div>
                    <div className="text-[7px] text-cyan-200 border-t border-white/20 pt-0.5">
                      <span>Unit #402 Multi-Spectrum</span>
                    </div>
                  </div>

                  {/* Reverse of Flipping Cover */}
                  <div
                    className="absolute inset-y-0 left-0 w-full rounded-xl bg-slate-900 text-white shadow-xl border border-slate-800 p-2 flex flex-col justify-between origin-left"
                    style={{
                      transform: `rotateY(-${bookAngle - 180}deg)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      zIndex: bookAngle > 90 ? 25 : 5,
                      opacity: bookAngle > 90 ? 1 : 0,
                    }}
                  >
                    <span className="text-[8px] font-bold text-cyan-400 border-b border-slate-800 pb-0.5">
                      Integrity Matrix
                    </span>
                    <div className="space-y-0.5 text-[8px] text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Hash:</span>
                        <span className="font-mono text-cyan-300">0x8a99..4f11</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Status:</span>
                        <span className="text-emerald-400 font-bold">Immutable</span>
                      </div>
                    </div>
                    <span className="text-[7px] text-slate-500 italic">Seal Active</span>
                  </div>

                </div>

                <div className="absolute bottom-1 right-2 px-1.5 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-[8px] font-mono text-cyan-300">
                  {bookState === 'closed' ? 'Closed Vault' : bookState === 'open' ? 'Book Open' : 'Opening Document...'}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Evidence Ledger</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">Sealed</span>
            </div>
          </div>

          {/* ========================================================
              CARD C: AUDIT TRAIL — Live Chronological Telemetry Log Card
              ======================================================== */}
          <div className="rounded-3xl bg-white dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-lg dark:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 shadow-sm group-hover:scale-105 transition-transform">
                  <History className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                  Audit Trail
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Chronological Logs
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Every walkthrough upload, contractor dispatch, and deposit change is time-stamped with IP verification.
              </p>

              {/* VISUAL ARCHITECTURE: Event Log Stream */}
              <div className="mt-4 h-36 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 flex flex-col justify-between select-none shadow-inner font-mono text-[10px]">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">Move-In Signed • Unit 402</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    <span className="truncate">Repair Photo Logged • M-101</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="truncate">Deposit Reconciled • ₹62,800</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-1">
                  <span>Tamper Flag:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">0 Violations</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Event Logger</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">Synchronized</span>
            </div>
          </div>

          {/* ========================================================
              CARD D: ROLE-BASED ACCESS — Automatic Scope Slideshow
              ======================================================== */}
          <div className="rounded-3xl bg-white dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-lg dark:shadow-xl hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 shadow-sm group-hover:scale-105 transition-transform">
                  <Users2 className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-800">
                    Scope Slideshow ({roleScopeIndex + 1}/4)
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Role-Based Guardrails
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Granular permission boundaries prevent unauthorized cross-tenant modifications or data leakage.
              </p>

              {/* VISUAL ARCHITECTURE: Rotating Role Permissions Card */}
              <div className="relative mt-4 h-36 rounded-2xl bg-slate-900 border border-purple-500/30 p-2.5 flex flex-col justify-between select-none shadow-inner text-white font-mono text-xs">
                {roleScopes.map((scope, i) => (
                  <div
                    key={i}
                    className={`absolute inset-2.5 flex flex-col justify-between transition-opacity duration-500 ${
                      roleScopeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-300 uppercase">
                        {scope.role}
                      </span>
                      <span className="text-[8px] bg-purple-950 text-purple-200 px-2 py-0.5 rounded border border-purple-800">
                        {scope.badge}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-200 font-sans my-auto leading-tight">
                      {scope.access}
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800 pt-1">
                      <span>Encryption:</span>
                      <span className="text-cyan-400 font-bold">{scope.encryption}</span>
                    </div>
                  </div>
                ))}

                {/* Scope Ticks */}
                <div className="absolute bottom-1 right-2 flex gap-1 z-20">
                  {roleScopes.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        roleScopeIndex === i ? 'w-4 bg-purple-400' : 'w-1.5 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>RBAC Boundary</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">Enforced</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SecuritySection;

