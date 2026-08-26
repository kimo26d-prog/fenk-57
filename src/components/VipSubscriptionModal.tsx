import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, CheckCircle2, ShieldCheck, Sparkles, X, CreditCard, Building2, UserCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALGERIAN_WILAYAS } from '../data/algerianWilayas';
import { VipPlan } from '../types';

interface VipSubscriptionModalProps {
  initialEntityType?: 'store' | 'craftsman';
  initialEntityId?: number;
  initialPlanId?: string;
}

export const VipSubscriptionModal: React.FC<VipSubscriptionModalProps> = ({
  initialEntityType = 'store',
  initialEntityId,
  initialPlanId = 'gold'
}) => {
  const {
    isVipModalOpen,
    setIsVipModalOpen,
    vipPlans,
    submitVipSubscription,
    currentUser,
    stores,
    craftsmen,
    selectedWilaya
  } = useApp();

  const [entityType, setEntityType] = useState<'store' | 'craftsman'>(initialEntityType);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'baridimob' | 'ccp' | 'bank' | 'cash'>('baridimob');
  const [transactionRef, setTransactionRef] = useState('');
  const [receiptNote, setReceiptNote] = useState('');
  const [entityId, setEntityId] = useState<number | undefined>(initialEntityId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill from current user or selection
  useEffect(() => {
    if (currentUser.type === 'vendor' && currentUser.storeId) {
      const s = stores.find((item) => item.id === currentUser.storeId);
      if (s) {
        setName(s.name);
        setPhone(s.phone || currentUser.phone || '');
        setEmail(s.email || currentUser.email || '');
        setWilaya(s.wilaya || currentUser.wilaya || selectedWilaya.name);
        setEntityType('store');
        setEntityId(s.id);
      }
    } else {
      if (!wilaya) {
        setWilaya(selectedWilaya.name);
      }
      if (currentUser.name && currentUser.name !== 'زائر') {
        setName(currentUser.name);
      }
      if (currentUser.phone) {
        setPhone(currentUser.phone);
      }
    }
  }, [isVipModalOpen, currentUser, stores, selectedWilaya]);

  if (!isVipModalOpen) return null;

  const currentPlan: VipPlan = vipPlans.find((p) => p.id === selectedPlanId) || vipPlans[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !wilaya.trim()) return;

    setIsSubmitting(true);

    const success = submitVipSubscription({
      entityType,
      entityId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      wilaya,
      planId: currentPlan.id,
      planName: currentPlan.name,
      price: currentPlan.price,
      paymentMethod,
      transactionRef: transactionRef.trim() || undefined,
      receiptNote: receiptNote.trim() || undefined
    });

    setIsSubmitting(false);
    if (success) {
      setIsVipModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden my-8"
        >
          {/* Header Glow */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#00d4c8] to-amber-500 animate-pulse" />

          {/* Close Button */}
          <button
            id="close-vip-modal-btn"
            onClick={() => setIsVipModalOpen(false)}
            className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
            {/* Modal Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-cyan-500/20 border border-amber-500/40 text-amber-400 mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Crown className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                طلب الانضمام إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">نادي VIP المتميز</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                احصل على صدارة الصفحة الأولى، الأولوية في البحث، وشارة التوثيق الذهبية. الاشتراك يُراجع ويُعتمد من قبل مالك المنصة.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Entity Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  نوع الحساب المراد ترقيته إلى VIP:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    id="select-vip-store-btn"
                    onClick={() => setEntityType('store')}
                    className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border font-medium text-sm transition-all ${
                      entityType === 'store'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>متجر / محل تجاري</span>
                  </button>

                  <button
                    type="button"
                    id="select-vip-craftsman-btn"
                    onClick={() => setEntityType('craftsman')}
                    className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border font-medium text-sm transition-all ${
                      entityType === 'craftsman'
                        ? 'bg-[#00d4c8]/15 border-[#00d4c8] text-[#00d4c8] shadow-[0_0_15px_rgba(0,212,200,0.15)]'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                    <span>حرفي / فني مهني</span>
                  </button>
                </div>
              </div>

              {/* VIP Plans Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                  اختر باقة VIP المناسبة:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {vipPlans.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        id={`vip-plan-card-${plan.id}`}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`relative cursor-pointer p-4 rounded-xl border transition-all ${
                          isSelected
                            ? `${plan.borderGlow} bg-slate-800/90 ring-2 ring-amber-400/40`
                            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 opacity-80 hover:opacity-100'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md">
                            الأكثر طلباً ⭐
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-200">{plan.name}</span>
                          <span
                            className="text-[11px] px-2 py-0.5 rounded-md font-semibold"
                            style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
                          >
                            {plan.badge}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="text-xl font-extrabold text-white">{plan.price.toLocaleString()}</span>
                          <span className="text-xs text-slate-400 mr-1">د.ج / {plan.period}</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-slate-400">
                          {plan.features.slice(0, 3).map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="line-clamp-1">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Applicant Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    اسم {entityType === 'store' ? 'المتجر أو المحل' : 'الحرفي / المهني'} *
                  </label>
                  <input
                    type="text"
                    id="vip-input-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={entityType === 'store' ? 'مثال: متجر النخبة للأزياء' : 'مثال: أحمد بن علي (كهربائي)'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    رقم الهاتف (الواتساب) للتواصل والتفعيل *
                  </label>
                  <input
                    type="tel"
                    id="vip-input-phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0777946398 / 05xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    type="email"
                    id="vip-input-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    الولاية (مقر النشاط) *
                  </label>
                  <select
                    id="vip-select-wilaya"
                    required
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  >
                    {ALGERIAN_WILAYAS.map((w) => (
                      <option key={w.code} value={w.ar || w.name} className="bg-slate-900 text-white">
                        {w.code} - {w.ar} ({w.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Details Section */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200">طريقة تسديد الاشتراك المدفوع ({currentPlan.price.toLocaleString()} د.ج):</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    اشتراك VIP مدفوع
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'baridimob', label: 'بريدي موب BaridiMob', icon: '📱' },
                    { id: 'ccp', label: 'حوالة بريد CCP', icon: '📮' },
                    { id: 'bank', label: 'تحويل بنكي BNA/BEA', icon: '🏦' },
                    { id: 'cash', label: 'دفع مباشر للممثل', icon: '🤝' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs transition ${
                        paymentMethod === method.id
                          ? 'border-amber-400 bg-amber-500/15 text-white font-bold'
                          : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-base mb-1">{method.icon}</span>
                      <span className="text-[11px] text-center leading-tight">{method.label}</span>
                    </button>
                  ))}
                </div>

                {/* Account info box */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold">بيانات حساب الإدارة المعتمد:</span>
                    <span className="text-amber-400 font-mono">00799999000123456789</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    قم بإجراء التحويل عبر بريدي موب أو مكتب البريد، ثم دوّن رقم العملية المرجعي أو ملاحظة التحويل بالأسفل لتسريع اعتماد المالك.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      رقم العملية / المرجع (Transaction Ref)
                    </label>
                    <input
                      type="text"
                      id="vip-input-transaction-ref"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder="مثال: BM-2026-88992"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      ملاحظة الدفع أو وقت التحويل
                    </label>
                    <input
                      type="text"
                      id="vip-input-receipt-note"
                      value={receiptNote}
                      onChange={(e) => setReceiptNote(e.target.value)}
                      placeholder="مثال: تم الدفع عبر بريدي موب باسم فلان"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Owner Approval Notice */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">سياسة التفعيل من قبل مالك المنصة:</span>
                  <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                    يتم مراجعة إيصال وتفاصيل الاشتراك من قبل المالك. عند القبول، يتم تفعيل شارة VIP فوراً وصعود متجرك/حسابك الحرفي إلى مقدمة الصفحة الأولى ونتائج البحث.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  id="cancel-vip-sub-btn"
                  onClick={() => setIsVipModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  id="submit-vip-sub-btn"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Crown className="w-4 h-4 text-slate-950" />
                  <span>إرسال طلب اشتراك VIP للمالك</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
