import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  ClipboardCheck,
  SplitSquareVertical,
  Wrench,
  CreditCard,
  PiggyBank,
  FileText,
  Printer,
  History,
  ShieldAlert,
  UserCheck,
  X,
  Lock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const getNavLinks = () => {
    switch (user?.role) {
      case 'landlord':
        return [
          { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
          { name: 'Properties', to: '/properties', icon: Building2 },
          { name: 'Tenancies & Invites', to: '/tenancies', icon: Users },
          { name: 'Inspections', to: '/inspections', icon: ClipboardCheck },
          { name: 'Before vs After', to: '/inspections/compare', icon: SplitSquareVertical },
          { name: 'Maintenance', to: '/maintenance', icon: Wrench },
          { name: 'Rent Payments', to: '/payments', icon: CreditCard },
          { name: 'Security Deposits', to: '/deposits', icon: PiggyBank },
          { name: 'Document Vault', to: '/documents', icon: FileText },
          { name: 'Audit Reports', to: '/reports', icon: Printer },
          { name: 'Audit Trail', to: '/audit-logs', icon: History },
        ];
      case 'tenant':
        return [
          { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
          { name: 'My Rental Property', to: '/properties', icon: Building2 },
          { name: 'Tenancy Details', to: '/tenancies', icon: Users },
          { name: 'Condition Inspections', to: '/inspections', icon: ClipboardCheck },
          { name: 'Before vs After', to: '/inspections/compare', icon: SplitSquareVertical },
          { name: 'Maintenance Requests', to: '/maintenance', icon: Wrench },
          { name: 'Rent Ledger', to: '/payments', icon: CreditCard },
          { name: 'Security Deposit', to: '/deposits', icon: PiggyBank },
          { name: 'Documents', to: '/documents', icon: FileText },
          { name: 'Inspection Reports', to: '/reports', icon: Printer },
        ];
      case 'service_provider':
        return [
          { name: 'Contractor Hub', to: '/dashboard', icon: LayoutDashboard },
          { name: 'Assigned Work Orders', to: '/maintenance', icon: Wrench },
          { name: 'Work Documents', to: '/documents', icon: FileText },
          { name: 'My Profile & Rates', to: '/profile', icon: UserCheck },
        ];
      case 'admin':
        return [
          { name: 'Admin Overview', to: '/admin', icon: ShieldAlert },
          { name: 'User Directory', to: '/admin/users', icon: Users },
          { name: 'All Properties', to: '/properties', icon: Building2 },
          { name: 'Tenancies', to: '/tenancies', icon: Users },
          { name: 'Inspections', to: '/inspections', icon: ClipboardCheck },
          { name: 'Before vs After', to: '/inspections/compare', icon: SplitSquareVertical },
          { name: 'Maintenance', to: '/maintenance', icon: Wrench },
          { name: 'Payments Ledger', to: '/payments', icon: CreditCard },
          { name: 'Deposits', to: '/deposits', icon: PiggyBank },
          { name: 'Platform Audit Log', to: '/audit-logs', icon: History },
        ];
      default:
        return [{ name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard }];
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-slate-950 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header on mobile */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 lg:hidden">
            <span className="font-bold text-slate-900 dark:text-white text-sm">Navigation Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Workspace Navigation
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition group ${
                      isActive
                        ? 'bg-brand-500/10 dark:bg-brand-500/15 text-brand-600 dark:text-cyan-400 font-bold border border-brand-500/20 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/80 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 transition ${
                          isActive ? 'text-brand-600 dark:text-cyan-400' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                        }`}
                      />
                      <span>{link.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Bottom Card for Trust / Tamper-Evident Notice */}
          <div className="mt-auto p-4 m-3 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white text-xs shadow-lg">
            <div className="flex items-center gap-2 font-bold text-cyan-400 mb-1">
              <Lock className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span>Evidence Vault</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              All photos, timestamps and maintenance ledgers are protected by cryptographic integrity checks.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
