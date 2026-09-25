import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, ClipboardCheck, Wrench, Menu } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Mobile Bottom Quick Navigation
  const bottomNavItems = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Properties', to: '/properties', icon: Building2 },
    { name: 'Inspections', to: '/inspections', icon: ClipboardCheck },
    { name: 'Maintenance', to: '/maintenance', icon: Wrench },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Sidebar Drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Scrollable Content Container (With bottom padding on mobile for bottom nav bar) */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-200">
            <Outlet />
          </div>
        </main>

        {/* Mobile-First Bottom Navigation Dock (360px - 1024px) */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around shadow-2xl">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
                    isActive
                      ? 'text-brand-600 dark:text-cyan-400 font-bold scale-105'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] tracking-tight mt-0.5">{item.name}</span>
              </NavLink>
            );
          })}

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl"
            aria-label="More Navigation Menu"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
