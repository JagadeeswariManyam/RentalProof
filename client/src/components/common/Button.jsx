import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5 font-bold min-h-[36px]',
    md: 'text-xs sm:text-sm px-4 py-2.5 rounded-xl gap-2 font-bold min-h-[42px]',
    lg: 'text-sm sm:text-base px-6 py-3.5 rounded-2xl gap-2.5 font-black min-h-[48px]',
  };

  const variantClasses = {
    primary:
      'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/25 active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-brand-400',
    secondary:
      'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 shadow-md active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-slate-500',
    outline:
      'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-sm active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-brand-400',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-rose-400',
    ghost:
      'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition',
    success:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-emerald-400',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center select-none transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
    </button>
  );
};

export default Button;
