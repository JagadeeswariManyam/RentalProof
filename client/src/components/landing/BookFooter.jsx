import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';

const BookFooter = ({ onSelectPage }) => {
  const chapters = [
    { label: '01. Property Condition', idx: 0 },
    { label: '02. Move-In Evidence', idx: 1 },
    { label: '03. Before / After', idx: 2 },
    { label: '04. Maintenance History', idx: 3 },
    { label: '05. Deposit Record', idx: 4 },
    { label: '06. AI Observation', idx: 5 },
    { label: '07. Rental Timeline', idx: 6 },
    { label: '08. Complete Record', idx: 7 },
  ];

  const handleChapterClick = (idx) => {
    if (onSelectPage) onSelectPage(idx);
    const bookEl = document.getElementById('rental-book-stage');
    if (bookEl) {
      const yOffset = -60;
      const y = bookEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Mark & Narrative */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 border border-white/10">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">RentalProof</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 block -mt-1 font-mono">
                  Evidence Platform
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A digital rental condition, evidence and deposit protection platform engineered as an architectural evidence ledger.
            </p>

            <div className="text-xs text-slate-500 font-mono pt-2">
              Unit #RP-08 Dossier • Version 2.4.0 • Encrypted Multi-Party Signature Vault
            </div>
          </div>

          {/* Dossier Chapters */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Dossier Chapters
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {chapters.slice(0, 4).map((ch) => (
                <li key={ch.idx}>
                  <button
                    type="button"
                    onClick={() => handleChapterClick(ch.idx)}
                    className="hover:text-cyan-400 transition font-mono text-left"
                  >
                    {ch.label}
                  </button>
                </li>
              ))}
              {chapters.slice(4).map((ch) => (
                <li key={ch.idx}>
                  <button
                    type="button"
                    onClick={() => handleChapterClick(ch.idx)}
                    className="hover:text-cyan-400 transition font-mono text-left"
                  >
                    {ch.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & Portals */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Evaluation & Access
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition">
                  Sign In to Workspace
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-cyan-400 transition">
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 font-mono font-bold"
                >
                  <span>1-Click Mentor Portals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} RentalProof. Digital rental condition, evidence and deposit protection platform.
          </div>
          <div className="flex items-center gap-4">
            <span>Role-Based Access</span>
            <span>•</span>
            <span>Tamper-Evident SHA-256</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BookFooter;
