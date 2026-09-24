import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, src, title }) => {
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

  if (!isOpen || !src) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-slate-800/80 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={src}
          alt={title || 'Evidence Preview'}
          className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
        />
        {title && <p className="text-white/90 text-sm mt-3 font-medium bg-slate-900/60 px-4 py-1.5 rounded-full">{title}</p>}
      </div>
    </div>
  );
};

export default ImageModal;
