import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  X,
  ShoppingBag,
  Wrench,
  Tag,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  Truck
} from 'lucide-react';

export const PushNotificationToast: React.FC = () => {
  const {
    activePushToast,
    dismissPushToast,
    navigateTo,
    pushConfig
  } = useApp();

  if (!activePushToast || !pushConfig.enabled) return null;

  const isOrder = activePushToast.type === 'order';
  const isOffer = activePushToast.type === 'offer' || activePushToast.type === 'wilaya_deal';
  const isService = activePushToast.type === 'service';
  const isSuccess = activePushToast.type === 'success';

  const handleAction = () => {
    if (activePushToast.actionPage) {
      navigateTo(activePushToast.actionPage, activePushToast.actionParams);
    }
    dismissPushToast();
  };

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto select-none">
      <div className="bg-[#12121a]/95 backdrop-blur-md border border-[#00d4c8]/50 rounded-2xl shadow-[0_10px_35px_rgba(0,212,200,0.25)] p-4 relative overflow-hidden ring-1 ring-white/10">
        
        {/* Animated Progress bar */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-[#2a2a3a]">
          <div className="h-full bg-gradient-to-r from-[#00d4c8] via-emerald-400 to-teal-300 animate-[width_6s_linear_forwards]" style={{ width: '100%' }} />
        </div>

        {/* Content Layout */}
        <div className="flex items-start gap-3 pt-1">
          {/* Icon Badge */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              isOrder
                ? 'bg-[#00d4c8]/15 border-[#00d4c8]/40 text-[#00d4c8]'
                : isOffer
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : isService
                ? 'bg-purple-500/15 border-purple-500/40 text-purple-400'
                : isSuccess
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
            }`}
          >
            {isOrder ? (
              <Truck className="w-5 h-5 animate-pulse" />
            ) : isOffer ? (
              <Tag className="w-5 h-5 animate-bounce" />
            ) : isService ? (
              <Wrench className="w-5 h-5" />
            ) : (
              <Bell className="w-5 h-5 animate-wiggle" />
            )}
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#00d4c8]/20 text-[#00d4c8] border border-[#00d4c8]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4c8] animate-ping" />
                  <span>تنبيه دفع فوري</span>
                </span>

                {activePushToast.wilaya && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                    <span>{activePushToast.wilaya}</span>
                  </span>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={dismissPushToast}
                className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="إغلاق التنبيه"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h4 className="text-xs font-bold text-white mb-0.5 leading-snug">
              {activePushToast.title}
            </h4>

            <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
              {activePushToast.message}
            </p>

            {/* Action Bar */}
            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-[9px] text-slate-500 font-mono">الآن • تطبيق فينك</span>

              <button
                onClick={handleAction}
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#00d4c8] to-teal-500 text-slate-950 font-black text-xs hover:brightness-110 transition-all flex items-center gap-1 shadow-md shadow-[#00d4c8]/20"
              >
                <span>{activePushToast.actionLabel || 'عرض التفاصيل'}</span>
                <ChevronLeft className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
