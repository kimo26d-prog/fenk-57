import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ShoppingBag, Truck, ArrowLeft, Download, Phone } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { isOrderSuccessModalOpen, setIsOrderSuccessModalOpen, latestPlacedOrder, navigateTo } = useApp();

  if (!isOrderSuccessModalOpen || !latestPlacedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsOrderSuccessModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#12121a] border border-[#00d4c8]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,212,200,0.25)] text-center z-10 animate-pulse-subtle">
        
        {/* Glowing badge icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#00d4c8] to-[#00e676] text-[#0a0a0f] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(0,212,200,0.5)] text-4xl">
          🎉
        </div>

        <h3 className="text-2xl font-black text-white mb-2">
          تم استلام طلبك بنجاح!
        </h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          شكراً لتسوقك عبر منصة Fenk. تم إخطار المتاجر المعنية وبدء تحضير طلبك للشحن الموحد.
        </p>

        {/* Order Card Summary */}
        <div className="bg-[#1a1a24] rounded-2xl border border-[#2a2a3a] p-4 text-right mb-6 space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-[#2a2a3a]">
            <span className="text-xs text-slate-400">رقم الطلب:</span>
            <span className="font-extrabold text-[#00d4c8] text-sm tracking-wider">
              #{latestPlacedOrder.orderNumber}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">اسم العميل:</span>
            <span className="font-bold text-white">{latestPlacedOrder.customerName}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">رقم الهاتف:</span>
            <span className="font-bold text-white dir-ltr">{latestPlacedOrder.customerPhone}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">عنوان التوصيل:</span>
            <span className="font-bold text-white max-w-[200px] truncate">{latestPlacedOrder.customerAddress}</span>
          </div>

          <div className="flex justify-between items-center text-xs pt-2 border-t border-[#2a2a3a]">
            <span className="text-slate-400">عدد الأصناف:</span>
            <span className="font-bold text-white">{latestPlacedOrder.items.length} منتجات</span>
          </div>

          <div className="flex justify-between items-center pt-1 text-sm font-black">
            <span className="text-white">المبلغ الإجمالي المدفوع:</span>
            <span className="text-[#00d4c8] font-black text-base">{latestPlacedOrder.total} ر.س</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              setIsOrderSuccessModalOpen(false);
              navigateTo('profile');
            }}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-xs sm:text-sm hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,212,200,0.3)] flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            تتبع الشحنة في ملفي الشخصي
          </button>

          <button
            onClick={() => {
              setIsOrderSuccessModalOpen(false);
              navigateTo('products');
            }}
            className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm border border-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            متابعة التسوق
          </button>
        </div>
      </div>
    </div>
  );
};
