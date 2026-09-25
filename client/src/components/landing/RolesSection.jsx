import React from 'react';
import { Home, UserCheck, Wrench, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RolesSection = () => {
  const roles = [
    {
      id: 'landlord',
      role: 'LANDLORD',
      tagline: 'Property & Portfolio Management',
      description: 'Manage properties, inspections, maintenance and deposits with audited transparency.',
      icon: Home,
      features: [
        'Organize multi-unit property portfolio',
        'Create baseline & move-out inspection checklists',
        'Transparent security deposit ledger management',
      ],
      iconStyle: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border-cyan-200 dark:border-cyan-500/30',
      badge: 'Portfolio Owner',
    },
    {
      id: 'tenant',
      role: 'TENANT',
      tagline: 'Deposit & Condition Protection',
      description: 'Document your rental condition and maintain your personal verifiable evidence vault.',
      icon: UserCheck,
      features: [
        'Upload personal move-in timestamped proof',
        'Submit maintenance tickets with photos',
        'Immutable personal tenancy record vault',
      ],
      iconStyle: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-500/30',
      badge: 'Resident',
    },
    {
      id: 'service_provider',
      role: 'SERVICE PROVIDER',
      tagline: 'Contractor & Repair Dispatch',
      description: 'Receive and manage assigned maintenance work orders with photo verification.',
      icon: Wrench,
      features: [
        'Receive prioritized work orders with job details',
        'Upload before/after repair proof photos',
        'Log completion timestamps & invoice notes',
      ],
      iconStyle: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-500/30',
      badge: 'Contractor',
    },
    {
      id: 'admin',
      role: 'ADMIN',
      tagline: 'Platform & Compliance Control',
      description: 'Monitor platform activity, system audit trails, and multi-role compliance.',
      icon: Shield,
      features: [
        'Audit trail and chronological event monitoring',
        'User management and tenancy oversight',
        'Platform compliance verification & reports',
      ],
      iconStyle: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-500/30',
      badge: 'System Overseer',
    },
  ];

  return (
    <section id="roles" className="py-20 sm:py-28 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/80 px-3.5 py-1.5 rounded-full">
            Tailored Workspaces
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            Designed for Every Tenancy Stakeholder
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Whether you manage 100 properties, rent your first apartment, or service residential repairs, RentalProof provides a purpose-built workspace.
          </p>
        </div>

        {/* 4 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className="group rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-lg dark:shadow-xl hover:border-brand-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl border ${r.iconStyle} shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700/60 shadow-sm">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-cyan-400 transition-colors">
                    {r.role}
                  </h3>
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-300 block mt-0.5 mb-2.5">
                    {r.tagline}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {r.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                    {r.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-200 dark:border-slate-800">
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-white hover:bg-brand-600 hover:text-white dark:bg-slate-800/90 dark:hover:bg-brand-600 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    <span>Test {r.role.split(' ')[0]} Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default RolesSection;
