import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AdminToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const AdminToast: React.FC<AdminToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-white text-emerald-950 border-emerald-200 shadow-lg shadow-emerald-500/10';
      case 'error':
        return 'bg-white text-red-950 border-red-200 shadow-lg shadow-red-500/10';
      default:
        return 'bg-white text-blue-950 border-blue-200 shadow-lg shadow-blue-500/10';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${getColors()}`}>
        {getIcon()}
        <span className="text-xs font-bold font-hindi">{toast.message}</span>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 ml-2 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
