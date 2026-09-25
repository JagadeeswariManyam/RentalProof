import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4 text-center">
        {/* Modal Container: Bottom sheet on mobile, centered card on desktop */}
        <div
          className={`relative transform overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all w-full ${maxWidth} border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 my-0 sm:my-8 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200`}
        >
          {/* Mobile Handle Drag Bar */}
          <div className="sm:hidden w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-3 mb-1" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 sm:px-6 py-4 bg-slate-50/70 dark:bg-slate-950/70">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
              {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 sm:px-6 py-5 max-h-[calc(85vh-120px)] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
