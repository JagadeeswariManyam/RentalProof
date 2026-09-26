import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X, ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/90 shadow-md dark:shadow-2xl py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo (Clean Icon Mark Only, 40-44px) */}
        <Link
          to="/"
          aria-label="RentalProof Home"
          className="flex items-center group focus:outline-none focus:ring-2 focus:ring-brand-400 rounded-xl"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm"
          aria-label="Main Navigation"
        >
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, 'features')}
            className="px-3 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, 'how-it-works')}
            className="px-3 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition"
          >
            How It Works
          </a>
          <a
            href="#before-after"
            onClick={(e) => scrollToSection(e, 'before-after')}
            className="px-3 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Before & After
          </a>
          <a
            href="#ai-evidence"
            onClick={(e) => scrollToSection(e, 'ai-evidence')}
            className="px-3 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-brand-500 dark:text-cyan-400" />
            AI Evidence
          </a>
          <a
            href="#roles"
            onClick={(e) => scrollToSection(e, 'roles')}
            className="px-3 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Roles
          </a>
          <a
            href="#security"
            onClick={(e) => scrollToSection(e, 'security')}
            className="px-3 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Security
          </a>
          <a
            href="#timeline"
            onClick={(e) => scrollToSection(e, 'timeline')}
            className="px-3 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Timeline
          </a>
        </nav>

        {/* Right Auth Links & Theme Switcher */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition cursor-pointer shadow-sm"
            aria-label="Toggle Dark / Light Theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <Link
            to="/login"
            className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-4 py-2.5 rounded-xl shadow-md shadow-brand-500/20 active:scale-[0.98] transition"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Actions: Theme Switcher & Drawer Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-5 py-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1 text-sm font-bold text-slate-700 dark:text-slate-200">
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, 'features')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              How It Works
            </a>
            <a
              href="#before-after"
              onClick={(e) => scrollToSection(e, 'before-after')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Before & After
            </a>
            <a
              href="#ai-evidence"
              onClick={(e) => scrollToSection(e, 'ai-evidence')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-brand-500 dark:text-cyan-400" />
              AI Evidence
            </a>
            <a
              href="#roles"
              onClick={(e) => scrollToSection(e, 'roles')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Roles
            </a>
            <a
              href="#security"
              onClick={(e) => scrollToSection(e, 'security')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Security
            </a>
            <a
              href="#timeline"
              onClick={(e) => scrollToSection(e, 'timeline')}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Timeline
            </a>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                Login to Portal
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-brand-600 rounded-xl hover:bg-brand-500 shadow-md shadow-brand-500/25 transition"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
