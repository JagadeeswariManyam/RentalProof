import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

const LandingFooter = () => {
  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-white border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white block">RentalProof</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-600 dark:text-cyan-400 block -mt-1">
                  Evidence Platform
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Digital rental evidence, property condition, and deposit protection platform.
            </p>

            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 leading-relaxed max-w-md">
              Transforming tenancy documentation with room-by-room photographic ledgers, AI visual variance scans, dispatch maintenance tracking, and transparent deposit settlements.
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="#features"
                  onClick={(e) => scrollToSection(e, 'features')}
                  className="hover:text-brand-600 dark:hover:text-cyan-400 transition"
                >
                  Features & 3D Cards
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => scrollToSection(e, 'how-it-works')}
                  className="hover:text-brand-600 dark:hover:text-cyan-400 transition"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#before-after"
                  onClick={(e) => scrollToSection(e, 'before-after')}
                  className="hover:text-brand-600 dark:hover:text-cyan-400 transition"
                >
                  Before & After Slider
                </a>
              </li>
              <li>
                <a
                  href="#ai-evidence"
                  onClick={(e) => scrollToSection(e, 'ai-evidence')}
                  className="hover:text-brand-600 dark:hover:text-cyan-400 transition"
                >
                  AI Visual Variance Scan
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  onClick={(e) => scrollToSection(e, 'timeline')}
                  className="hover:text-brand-600 dark:hover:text-cyan-400 transition"
                >
                  Tenancy Timeline
                </a>
              </li>
            </ul>
          </div>

          {/* Account & Demo Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">
              Account & Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/login" className="hover:text-brand-600 dark:hover:text-cyan-400 transition">
                  Login to Portal
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-brand-600 dark:hover:text-cyan-400 transition">
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-brand-600 dark:text-cyan-400 hover:text-brand-700 dark:hover:text-cyan-300 transition flex items-center gap-1 font-semibold pt-1"
                >
                  <span>1-Click Demo Evaluation</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} RentalProof. Digital rental condition, evidence and deposit protection platform.
          </div>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <Lock className="w-3 h-3" />
              <span>Role-Based Access Protected</span>
            </span>
            <span>•</span>
            <span>Tamper-Evident Ledger</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default LandingFooter;
