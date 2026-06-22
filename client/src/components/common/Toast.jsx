import { X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  const bgType = type === 'success' ? 'bg-emerald-600' : 'bg-accent';
  return (
    <div className={`fixed bottom-5 right-5 ${bgType} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-4 z-50 animate-zoom-in`}>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="hover:opacity-80 transition-opacity"><X size={16} /></button>
    </div>
  );
};