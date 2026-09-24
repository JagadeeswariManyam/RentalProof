import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  SplitSquareVertical,
  Wrench,
  PiggyBank,
  FileCheck2,
  Lock,
  ArrowRight,
  Sparkles,
  Camera,
  CheckCircle,
  Building,
  Users,
  Search,
  Scale,
} from 'lucide-react';
import Button from '../components/common/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">RentalProof</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-brand-600 -mt-1">
                Evidence Platform
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-brand-600 transition">How It Works</a>
            <a href="#features" className="hover:text-brand-600 transition">Features</a>
            <a href="#ai-comparison" className="hover:text-brand-600 transition">AI Evidence</a>
            <a href="#security" className="hover:text-brand-600 transition">Transparency</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="md">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="md" icon={ArrowRight}>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 bg-gradient-to-b from-brand-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-8">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Digital Rental Condition & Deposit Protection Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Protect Your Rental. <br />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-800 bg-clip-text text-transparent">
              Preserve the Proof.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            RentalProof creates a transparent digital record of property condition, maintenance, payments, and rental evidence from move-in to move-out.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight} className="shadow-lg shadow-brand-500/25">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Explore Demo Portals
              </Button>
            </Link>
          </div>

          {/* SaaS Preview Mockup */}
          <div className="mt-16 relative max-w-5xl mx-auto rounded-3xl p-3 bg-slate-900/5 ring-1 ring-slate-900/10 shadow-2xl">
            <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-xs text-slate-500 font-mono ml-2">rentalproof.app/inspections/compare</span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-brand-600">Move-In Baseline</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">Good</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
                    alt="Move In"
                    className="w-full h-48 object-cover rounded-xl border border-slate-100 mb-2"
                  />
                  <p className="text-xs text-slate-500">Living Room Walls — 01 Apr 2026</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-indigo-600">Move-Out Walkthrough</span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">Possible Change</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
                    alt="Move Out"
                    className="w-full h-48 object-cover rounded-xl border border-slate-100 mb-2"
                  />
                  <p className="text-xs text-slate-500">Living Room Walls — 15 Sep 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* The Problem */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-rose-100 shadow-sm">
              <div className="inline-flex p-3 rounded-2xl bg-rose-50 text-rose-600 font-bold text-sm mb-4">
                The Pain Point
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Rental documentation is fragmented & contentious
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                When moving out, landlords and tenants often dispute damage, deposit deductions, and maintenance histories because proof is scattered across:
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span>Unorganized WhatsApp chats and voice notes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span>Buried phone photos without timestamps or room mapping</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span>Lost handwritten paper condition checklists</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span>Disputed security deposit deductions without audit trails</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-emerald-100 shadow-sm">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-sm mb-4">
                The RentalProof Solution
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                One centralized digital vault from move-in to move-out
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                RentalProof unifies the entire tenancy lifecycle into an immutable, room-by-room evidence ledger accessible by both parties.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Room-by-room photo-verified baseline inspections</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Side-by-side Before vs After visual comparison</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Audited maintenance requests with completion evidence</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Security deposit ledger with documented deduction links</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Complete Tenancy Lifecycle
          </h2>
          <p className="text-base text-slate-600 mt-3 max-w-xl mx-auto">
            From the day keys are handed over to deposit reconciliation, every milestone is structured and verified.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-16 text-left">
            {[
              { step: '01', title: 'Create Property', desc: 'Add property specifications, rooms, and custom checklists.' },
              { step: '02', title: 'Document Move-In', desc: 'Capture baseline condition photos with room-by-room wizard.' },
              { step: '03', title: 'Manage Tenancy', desc: 'Digital agreements, rent payment records, and notifications.' },
              { step: '04', title: 'Track Maintenance', desc: 'Report issues, assign service technicians, and log proof.' },
              { step: '05', title: 'Document Move-Out', desc: 'Repeat inspection mapped directly to baseline items.' },
              { step: '06', title: 'Compare & Settle', desc: 'Side-by-side visual comparison and deposit calculation.' },
            ].map((s, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-brand-500 transition">
                <span className="text-2xl font-black text-brand-200 group-hover:text-brand-600 transition block mb-2">{s.step}</span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-400">Platform Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
              Everything Needed for Seamless Tenancies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center mb-6">
                <SplitSquareVertical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Before vs After Comparison</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Signature split-slider and side-by-side viewer highlighting condition deltas between move-in and move-out.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">AI-Assisted Observations</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Algorithmic visual variance analysis that flags scuffs or fixture shifts for objective human inspection.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-6">
                <PiggyBank className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Security Deposit Accounting</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Transparent deduction tracking directly linked to verified maintenance repair bills and condition changes.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Maintenance Workflows</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                End-to-end ticketing, service provider dispatch, and photographic proof of repair completion.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center mb-6">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Printable Audit Reports</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Instant PDF / print generation for Move-In baseline, Move-Out inspection, and Tenancy Summary ledgers.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-2xl bg-teal-600/20 text-teal-400 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Tamper-Evident Audit Trail</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every action, upload, status shift, and sign-off is logged with chronological timestamps and user IDs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Assisted Section */}
      <section id="ai-comparison" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Evidence Analysis</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                AI-Assisted Observations. <br />
                Human-Centric Review.
              </h2>
              <p className="text-base text-slate-600 mt-4 leading-relaxed">
                RentalProof’s comparison engine calculates visual differences between baseline photos and checkout walkthroughs to surface potential surface discoloration, scuffs, or displaced fixtures.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                <span className="font-bold block mb-1">Our Core Ethical Principle:</span>
                RentalProof does not make legal determinations or assign financial liability. AI observations exist strictly to eliminate oversight and guide mutual, transparent inspection reviews.
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 text-white font-mono text-xs shadow-2xl border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                <span>AI Observation Output Schema</span>
                <span className="text-emerald-400">STATUS: ANALYZED</span>
              </div>
              <pre className="mt-4 text-emerald-300 overflow-x-auto leading-relaxed">
{`{
  "changeDetected": true,
  "confidence": 0.84,
  "observations": [
    "Localized surface texture variance on north drywall",
    "Visible mark near baseboard consistent with furniture scuff"
  ],
  "requiresManualReview": true,
  "disclaimer": "AI-assisted observation — manual review required."
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Security */}
      <section id="security" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Scale className="w-12 h-12 text-brand-600 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-slate-900">
            Transparency + Accountability + Evidence
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed text-sm sm:text-base">
            RentalProof empowers landlords, tenants, and service providers with an objective, shared source of truth. By systematically preserving photographic evidence, timestamps, and payment ledgers, rental disputes become a thing of the past.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Start documenting your rental journey today.
          </h2>
          <p className="text-brand-100 text-base mt-4 max-w-xl mx-auto">
            Experience effortless move-in checklists, side-by-side evidence comparison, and transparent deposit management.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="secondary" size="lg" icon={ArrowRight}>
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                Explore Demo Portals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <span className="font-bold text-slate-800 text-sm">RentalProof</span>
            <span>— Digital Rental Condition, Evidence & Deposit Protection Platform</span>
          </div>
          <div>© {new Date().getFullYear()} RentalProof Platform. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
