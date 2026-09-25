import React from 'react';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title = 'No items found',
  description = 'Get started by creating your first entry.',
  actionLabel,
  onAction,
  actionIcon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white dark:bg-slate-900/60 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm">
      {Icon && (
        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 text-brand-600 dark:text-cyan-400 rounded-2xl mb-4 border border-slate-200 dark:border-slate-700 shadow-inner">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" icon={actionIcon} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
