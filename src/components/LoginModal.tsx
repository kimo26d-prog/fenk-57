import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import fenkLogo from '../assets/images/fenk_logo_1787158316546.jpg';
import {
  X,
  Store as StoreIcon,
  ShieldCheck,
  User,
  KeyRound,
  Lock,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone
} from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../data/mockData';
import { ALGERIAN_WILAYAS } from '../data/algerianWilayas';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginAsVendor,
    loginAsAdmin,
    loginAsCustomer,
    setIsAddStoreModalOpen,
    setIsCraftsmanRegisterModalOpen,
    stores,
    adminCredentials
  } = useApp();

  const [tab, setTab] = useState<'vendor' | 'admin' | 'customer'>('customer');
  const [vendorCode, setVendorCode] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWilaya, setCustomerWilaya] = useState('57 - المغير');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isLoginModalOpen) return null;

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsVendor(vendorCode);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin(adminCode, adminPassword);
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsCustomer(customerName, customerPhone, customerWilaya, customerAddress);
  };

  // Quick fill helper for demo convenience
  const fillVendorDemo = (code: string) => {
    setVendorCode(code);
  };

  const fillAdminDemo = () => {
    setAdminCode(adminCredentials.code);
    setAdminPassword(adminCredentials.password);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsLoginModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#12121a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl z-10">
        
        {/* Header */}
        <div className="p-6 pb-4 bg-gradient-to-b from-[#1a1a24] to-[#12121a] border-b border-[#2a2a3a] text-center relative">
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-5 left-5 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-tr from-[#00d4c8] via-[#00f2fe] to-[#4facfe] shadow-[0_0_30px_rgba(0,212,200,0.5)] mx-auto mb-3 overflow-hidden flex items-center justify-center">
            <img
              src={fenkLogo}
              alt="Fenk Logo"
              className="w-full h-full object-cover rounded-[14px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-xl font-extrabold text-white">تسجيل الدخول إلى فينك</h3>
          <p className="text-xs text-slate-400 mt-1">اختر نوع حسابك للمتابعة</p>

          {/* Role selector tabs */}
          <div className="grid grid-cols-3 gap-1.5 mt-5 p-1 bg-[#0a0a0f] rounded-2xl border border-[#2a2a3a]">
            <button
              onClick={() => setTab('vendor')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                tab === 'vendor'
                  ? 'bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <StoreIcon className="w-3.5 h-3.5" />
              بائع متجر
            </button>

            <button
              onClick={() => setTab('admin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                tab === 'admin'
                  ? 'bg-gradient-to-r from-[#ff3366] to-[#e62e5c] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              مالك المنصة
            </button>

            <button
              onClick={() => setTab('customer')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                tab === 'customer'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              عميل / زائر
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="p-6">
          {tab === 'vendor' && (
            <form onSubmit={handleVendorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  كود الدخول السري للبائع *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={vendorCode}
                    onChange={(e) => setVendorCode(e.target.value.toUpperCase())}
                    placeholder="مثال: VEND1001"
                    className="w-full pr-10 pl-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white font-mono text-center tracking-widest focus:outline-none focus:border-[#00d4c8]"
                  />
                </div>
              </div>

              {/* Demo quick selector */}
              <div className="p-3 bg-[#1a1a24] rounded-2xl border border-[#2a2a3a]">
                <span className="text-[11px] text-slate-400 block mb-2 font-semibold">
                  أكواد تجريبية سريعة للمحلات المعتمدة:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stores.slice(0, 3).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => fillVendorDemo(s.code)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#00d4c8]/20 border border-[#2a2a3a] text-[11px] text-[#00d4c8] font-bold transition-all"
                    >
                      {s.name} ({s.code})
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-sm shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-[1.02] transition-all"
              >
                دخول إلى لوحة البائع
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsAddStoreModalOpen(true);
                  }}
                  className="text-xs text-slate-400 hover:text-[#00d4c8] font-bold"
                >
                  ليس لديك متجر بعد؟ <span className="underline">سجل متجرك الآن مجاناً</span>
                </button>
              </div>
            </form>
          )}

          {tab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  كود المالك السري *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="OWNER-2026"
                    className="w-full pr-10 pl-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white font-mono text-center tracking-widest focus:outline-none focus:border-[#ff3366]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  كلمة المرور المشفرة *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Fenk@Owner2026!"
                    className="w-full pr-10 pl-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white text-center tracking-wider focus:outline-none focus:border-[#ff3366]"
                  />
                </div>
              </div>

              <div className="p-3 bg-rose-950/25 border border-rose-500/30 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-rose-300 font-bold">بيانات دخول المالك الرسمية:</span>
                  <button
                    type="button"
                    onClick={fillAdminDemo}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold transition-colors"
                  >
                    ملء تلقائي
                  </button>
                </div>
                <div className="text-[11px] text-slate-300 font-mono flex items-center justify-between bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
                  <span>الكود: <strong className="text-rose-400 font-black">{adminCredentials.code}</strong></span>
                  <span>الرمز: <strong className="text-rose-400 font-black">{adminCredentials.password}</strong></span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff3366] to-[#e62e5c] text-white font-black text-sm shadow-[0_0_20px_rgba(255,51,102,0.3)] hover:scale-[1.02] transition-all"
              >
                دخول إلى لوحة المالك (Super Admin)
              </button>
            </form>
          )}

          {tab === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-300">
                <span className="font-bold flex items-center gap-1.5">
                  <span>🇩🇿</span> جمهورية الجزائر (69 ولاية)
                </span>
                <span className="text-[11px] bg-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-bold">
                  +213
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  الاسم الكامل (الاسم واللقب) *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: كريم الدراجي"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الولاية (69 ولاية) *
                  </label>
                  <select
                    value={customerWilaya}
                    onChange={(e) => setCustomerWilaya(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    {ALGERIAN_WILAYAS.map((w) => (
                      <option key={w.code} value={`${w.code} - ${w.ar}`}>
                        {w.code} - {w.ar} ({w.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رقم الهاتف الجزائري *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0777946398"
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-cyan-500 text-left dir-ltr"
                    />
                    <span className="absolute right-3 top-3 text-[11px] font-mono text-slate-500">
                      +213
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  البلدية / الحي / العنوان التفصيلي (اختياري)
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="مثال: وسط المدينة، حي الاستقلال"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all"
              >
                تسجيل الدخول كعميل 🇩🇿
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsCraftsmanRegisterModalOpen(true);
                  }}
                  className="text-xs text-slate-400 hover:text-purple-400 font-bold"
                >
                  هل أنت حرفي أو صاحب مهنة في الجزائر؟ <span className="underline text-purple-400">انضم لقائمة الحرفيين</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
