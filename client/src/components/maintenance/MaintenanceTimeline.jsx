import React, { useState } from 'react';
import { CheckCircle2, Clock, Wrench, UserCheck, AlertCircle, Calendar, Image as ImageIcon } from 'lucide-react';
import ImageModal from '../common/ImageModal';

const MaintenanceTimeline = ({ timeline = [], completionPhotos = [], completionNotes = '' }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Reported':
        return <AlertCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      case 'Reviewed':
        return <UserCheck className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
      case 'Assigned':
        return <Wrench className="w-4 h-4 text-purple-500 dark:text-purple-400" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />;
    }
  };

  const getDotBg = (status) => {
    switch (status) {
      case 'Reported':
        return 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800/80';
      case 'Reviewed':
        return 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/80';
      case 'Assigned':
        return 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800/80';
      case 'In Progress':
        return 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/80';
      case 'Completed':
        return 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/80';
      default:
        return 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/70 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Maintenance Resolution Timeline</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Chronological audit trail of technician service & repairs</p>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {timeline.map((event, index) => (
          <div key={index} className="relative group">
            {/* Timeline node */}
            <div
              className={`absolute -left-[31px] top-0 flex items-center justify-center w-8 h-8 rounded-full border shadow-sm ${getDotBg(
                event.status
              )}`}
            >
              {getStatusIcon(event.status)}
            </div>

            <div className="bg-slate-50/70 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60 hover:border-slate-200 dark:hover:border-slate-600 transition">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{event.status}</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3" />
                  {new Date(event.timestamp).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{event.note}</p>

              {event.updatedBy && (
                <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                  Updated by: <span className="text-slate-700 dark:text-slate-300 font-semibold">{event.updatedBy.name || 'Staff'}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Evidence Section */}
      {completionPhotos.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Service Completion Photographic Proof</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {completionPhotos.map((photo, i) => (
              <div
                key={i}
                onClick={() => setSelectedPhoto(photo)}
                className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-28 cursor-pointer group shadow-sm"
              >
                <img src={photo} alt="Service proof" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
            ))}
          </div>

          {completionNotes && (
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 italic bg-emerald-50/50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/40">
              "{completionNotes}"
            </p>
          )}
        </div>
      )}

      <ImageModal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        src={selectedPhoto}
        title="Resolution Photo Evidence"
      />
    </div>
  );
};

export default MaintenanceTimeline;
