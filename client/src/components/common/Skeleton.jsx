import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm animate-pulse space-y-4">
    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
    <div className="h-8 bg-slate-200 rounded w-1/2"></div>
    <div className="h-3 bg-slate-100 rounded w-full"></div>
    <div className="h-3 bg-slate-100 rounded w-4/5"></div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="w-full bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm animate-pulse">
    <div className="h-12 bg-slate-100 border-b border-slate-200"></div>
    <div className="p-4 space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  </div>
);

export default { CardSkeleton, TableSkeleton };
