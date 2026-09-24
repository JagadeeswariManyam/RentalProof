import React from 'react';

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1 font-semibold',
  };

  const variantClasses = {
    // General
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-brand-50 text-brand-700 border border-brand-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',

    // Conditions
    Excellent: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    Good: 'bg-blue-100 text-blue-800 border border-blue-300',
    Fair: 'bg-amber-100 text-amber-800 border border-amber-300',
    'Needs Attention': 'bg-orange-100 text-orange-800 border border-orange-300',
    Damaged: 'bg-rose-100 text-rose-800 border border-rose-300',

    // Attention Levels
    'No Significant Change': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'Possible Change': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Needs Review': 'bg-rose-50 text-rose-700 border border-rose-200',

    // Maintenance / Statuses
    Reported: 'bg-slate-100 text-slate-700 border border-slate-200',
    Reviewed: 'bg-blue-50 text-blue-700 border border-blue-200',
    Assigned: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
    Completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',

    // Tenancy
    Active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Upcoming: 'bg-blue-50 text-blue-700 border border-blue-200',
    'Ending Soon': 'bg-amber-50 text-amber-700 border border-amber-200',
    Terminated: 'bg-slate-100 text-slate-700 border border-slate-200',

    // Payment
    Paid: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    Late: 'bg-rose-50 text-rose-700 border border-rose-200',
    'Partially Paid': 'bg-indigo-50 text-indigo-700 border border-indigo-200',

    // Priorities
    Low: 'bg-slate-100 text-slate-700',
    Medium: 'bg-blue-50 text-blue-700 border border-blue-200',
    High: 'bg-amber-50 text-amber-700 border border-amber-200',
    Urgent: 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse',
  };

  const selectedClass = variantClasses[variant] || variantClasses.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]} ${selectedClass} ${className}`}
    >
      {children || variant}
    </span>
  );
};

export default Badge;
