import React from 'react';
import { AlertTriangle, Trash2, CheckCircle2, XCircle, X } from 'lucide-react';

export interface AdminConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'success' | 'warning' | 'primary';
  inputLabel?: string;
  inputValue?: string;
  onInputChange?: (val: string) => void;
  inputPlaceholder?: string;
  inputPresets?: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

export const AdminConfirmDialog: React.FC<AdminConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'स्वीकार करें (Confirm)',
  cancelText = 'रद्द करें (Cancel)',
  variant = 'danger',
  inputLabel,
  inputValue,
  onInputChange,
  inputPlaceholder,
  inputPresets,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <Trash2 className="w-6 h-6 text-red-600" />;
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-[#C8102E]" />;
    }
  };

  const getButtonClass = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow';
      case 'success':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow';
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow';
      default:
        return 'bg-[#C8102E] hover:bg-[#A30C25] text-white shadow-sm hover:shadow';
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100';
      case 'success':
        return 'bg-emerald-100';
      case 'warning':
        return 'bg-amber-100';
      default:
        return 'bg-red-50';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${getIconBg()}`}>
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-hindi leading-snug">
                {title}
              </h3>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 font-hindi leading-relaxed">
          {message}
        </p>

        {inputLabel && (
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-gray-700 font-hindi">
              {inputLabel}
            </label>
            <input
              type="text"
              value={inputValue || ''}
              onChange={(e) => onInputChange?.(e.target.value)}
              placeholder={inputPlaceholder}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E] font-hindi"
              autoFocus
            />

            {inputPresets && inputPresets.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {inputPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onInputChange?.(preset)}
                    className="text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg font-hindi transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${getButtonClass()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
