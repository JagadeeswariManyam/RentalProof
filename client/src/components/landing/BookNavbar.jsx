import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

const BookNavbar = ({ activePage = 0, onSelectPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chapters = [
    { label: 'Property', index: 0 },
    { label: 'Evidence', index: 1 },
    { label: 'Compare', index: 2 },
    { label: 'Maintenance', index: 3 },
    { label: 'Deposit', index: 4 },
    { label: 'AI Scan', index: 5 },
    { label: 'Timeline', index: 6 },
    { label: 'Record', index: 7 },
  ];

  const handleNavClick = (idx) => {
    if (onSelectPage) onSelectPage(idx);
    setMobileMenuOpen(false);
    const bookEl = document.getElementById('rental-book-stage');
    if (bookEl) {
      const yOffset = -60;
      const y = bookEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Mark & Identity */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform border border-white/10">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white">RentalProof</span>
              <span className="text-[9px] uppercase font-bold tracking-widest bg-brand-500/20 text-brand-300 border border-brand-500/30 px-1.5 py-0.5 rounded">
                Dossier
              </span>
            </div>
            <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 -mt-0.5">
              Evidence Platform
            </span>
          </div>
        </Link>

        {/* Desktop Book Chapters Fast-Navigation */}
        <nav
          className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs font-semibold text-slate-300"
          aria-label="Book Chapters"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-500 font-mono border-r border-slate-800 mr-1">
            <BookOpen className="w-3 h-3 text-brand-400" />
            <span>Chapters</span>
          </div>

          {chapters.map((ch) => (
            <button
              key={ch.index}
              type="button"
              onClick={() => handleNavClick(ch.index)}
              className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                activePage === ch.index
                  ? 'bg-brand-600 text-white font-bold shadow-md shadow-brand-500/30'
                  : 'hover:text-white hover:bg-slate-800 text-slate-400'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </nav>

        {/* Right CTA / Auth Links */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-800/80 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-4 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 border border-brand-400/30 active:scale-[0.98] transition"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200 text-white">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-400" />
            <span>Select Dossier Chapter</span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-3">
            {chapters.map((ch) => (
              <button
                key={ch.index}
                type="button"
                onClick={() => handleNavClick(ch.index)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  activePage === ch.index
                    ? 'bg-brand-600 text-white font-bold'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300'
                }`}
              >
                0{ch.index + 1}. {ch.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-slate-200 bg-slate-900 rounded-xl hover:bg-slate-800 transition border border-slate-800"
            >
              Sign In to Portal
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-brand-600 rounded-xl hover:bg-brand-500 shadow-lg shadow-brand-500/25 transition"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default BookNavbar;
