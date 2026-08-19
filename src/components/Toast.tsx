import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 left-4 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-x-0 ${
              isSuccess
                ? 'bg-[#12121a]/95 border-[#00d4c8]/40 text-slate-100 shadow-[#00d4c8]/10'
                : isError
                ? 'bg-[#12121a]/95 border-[#ff3366]/40 text-slate-100 shadow-[#ff3366]/10'
                : isWarning
                ? 'bg-[#12121a]/95 border-[#ffab00]/40 text-slate-100 shadow-[#ffab00]/10'
                : 'bg-[#12121a]/95 border-slate-700 text-slate-100'
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 flex items-center justify-center ${
                isSuccess
                  ? 'bg-[#00d4c8]/10 text-[#00d4c8]'
                  : isError
                  ? 'bg-[#ff3366]/10 text-[#ff3366]'
                  : isWarning
                  ? 'bg-[#ffab00]/10 text-[#ffab00]'
                  : 'bg-blue-500/10 text-blue-400'
              }`}
            >
              {isSuccess && <CheckCircle2 className="w-5 h-5" />}
              {isError && <XCircle className="w-5 h-5" />}
              {isWarning && <AlertTriangle className="w-5 h-5" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-white mb-0.5">{toast.title}</h4>
              {toast.message && <p className="text-xs text-slate-300 leading-relaxed">{toast.message}</p>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
