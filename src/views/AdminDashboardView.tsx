import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Store as StoreIcon,
  Wrench,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
  XCircle,
  Trash2,
  Settings,
  KeyRound,
  LayoutDashboard,
  Percent,
  Truck,
  Mail,
  Phone,
  LogOut,
  AlertTriangle,
  Lock,
  Copy,
  Check,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    stores,
    products,
    craftsmen,
    orders,
    platformSettings,
    updatePlatformSettings,
    adminCredentials,
    updateAdminCredentials,
    approveStore,
    deleteStore,
    approveCraftsman,
    deleteCraftsman,
    logout,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'stores' | 'craftsmen' | 'settings'>('overview');

  // Platform settings state
  const [platformName, setPlatformName] = useState(platformSettings.platformName);
  const [commission, setCommission] = useState(platformSettings.commissionRate);
  const [deliveryFee, setDeliveryFee] = useState(platformSettings.deliveryFee);
  const [supportEmail, setSupportEmail] = useState(platformSettings.supportEmail);
  const [emergencyPhone, setEmergencyPhone] = useState(platformSettings.emergencyPhone);
  const [location, setLocation] = useState(platformSettings.location || 'ولاية المغير');

  // Admin credentials state
  const [newAdminCode, setNewAdminCode] = useState(adminCredentials.code);
  const [newAdminPassword, setNewAdminPassword] = useState(adminCredentials.password);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  const totalGMV = orders.reduce((sum, o) => sum + o.total, 384500);
  const totalCommissionRevenue = (totalGMV * commission) / 100;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlatformSettings({
      platformName,
      commissionRate: Number(commission),
      deliveryFee: Number(deliveryFee),
      supportEmail,
      emergencyPhone,
      location
    });
    showToast('success', 'تم حفظ الإعدادات', 'تم تحديث سياسات وعمولات وبيانات المنصة بنجاح');
  };

  const handleUpdateAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminCode.trim()) {
      showToast('error', 'خطأ', 'يرجى إدخال كود المالك');
      return;
    }
    if (newAdminPassword.length < 6) {
      showToast('error', 'كلمة مرور قصيرة', 'يجب ألا تقل كلمة المرور عن 6 أحرف أو أرقام');
      return;
    }
    updateAdminCredentials(newAdminCode, newAdminPassword);
  };

  const copyToClipboard = (text: string, type: 'code' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
    showToast('info', 'تم النسخ', 'تم نسخ البيانات إلى الحافظة');
  };

  return (
    <div className="min-h-screen pt-20 pb-20 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#12121a] border-l border-[#2a2a3a] p-6 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#ff3366]/10 border border-[#ff3366]/30">
            <div className="w-10 h-10 rounded-xl bg-[#ff3366] text-white flex items-center justify-center text-xl font-black">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white">إدارة منصة فينك</h4>
              <span className="text-[10px] text-[#ff3366] font-bold">صلاحيات المدير العام</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#ff3366]/10 text-[#ff3366] border border-[#ff3366]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              نظرة عامة والمالية
            </button>

            <button
              onClick={() => setActiveTab('stores')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'stores'
                  ? 'bg-[#ff3366]/10 text-[#ff3366] border border-[#ff3366]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <StoreIcon className="w-4 h-4" />
              إدارة المتاجر ({stores.length})
            </button>

            <button
              onClick={() => setActiveTab('craftsmen')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'craftsmen'
                  ? 'bg-[#ff3366]/10 text-[#ff3366] border border-[#ff3366]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wrench className="w-4 h-4" />
              سوق الحرفيين ({craftsmen.length})
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#ff3366]/10 text-[#ff3366] border border-[#ff3366]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              إعدادات المنصة والعمولات
            </button>
          </nav>
        </div>

        <button
          onClick={logout}
          className="p-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
        
        {/* Mobile Pills */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-[#ff3366] text-white' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('stores')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'stores' ? 'bg-[#ff3366] text-white' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            المتاجر
          </button>
          <button
            onClick={() => setActiveTab('craftsmen')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'craftsmen' ? 'bg-[#ff3366] text-white' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            الحرفيين
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-[#ff3366] text-white' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            الإعدادات
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-black text-white">لوحة الإدارة المركزية</h1>
              <p className="text-xs text-slate-400">مؤشرات الأداء العامة، حجم المبيعات والعمولات المحصلة</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>إجمالي مبيعات المنصة (GMV)</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-white">
                  {totalGMV.toLocaleString()} ر.س
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +22% نمو سنوي
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>أرباح عمولات المنصة ({commission}%)</span>
                  <div className="p-2 rounded-xl bg-[#00d4c8]/10 text-[#00d4c8]">
                    <Percent className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-[#00d4c8]">
                  {totalCommissionRevenue.toLocaleString()} ر.س
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">
                  صافي الإيراد التشغيلي
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>المحلات المسجلة</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <StoreIcon className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-amber-400">
                  {stores.length}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {stores.filter((s) => s.status === 'active').length} متجر نشط
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>الحرفيين والمهنيين</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-purple-400">
                  {craftsmen.length}
                </span>
                <span className="text-[11px] text-purple-300 font-semibold">
                  {craftsmen.filter((c) => c.verified).length} حرفي موثق
                </span>
              </div>
            </div>

            {/* Quick Vendor Codes Access */}
            <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl p-6 space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                أكواد الدخول السريع لأصحاب المحلات المعتمدة
              </h3>
              <p className="text-xs text-slate-400">
                يمكن للبائعين استخدام هذه الأكواد المخصصة لتسجيل الدخول الفوري للوحة التحكم الخاصة بهم:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {stores.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <h5 className="text-xs font-bold text-white">{s.name}</h5>
                        <span className="text-[10px] text-slate-400">{s.category}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-[#00d4c8] bg-[#00d4c8]/10 px-2.5 py-1 rounded-lg border border-[#00d4c8]/20">
                      {s.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Stores Management */}
        {activeTab === 'stores' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">إدارة المحلات والمتاجر</h2>
              <p className="text-xs text-slate-400">مراجعة المتاجر الجديدة، تفعيلها وحذفها</p>
            </div>

            <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0a0a0f] text-slate-400 border-b border-[#2a2a3a]">
                    <tr>
                      <th className="p-4">المتجر</th>
                      <th className="p-4">القسم</th>
                      <th className="p-4">كود البائع</th>
                      <th className="p-4">المنتجات</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a3a]">
                    {stores.map((s) => (
                      <tr key={s.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] flex items-center justify-center text-xl shrink-0">
                              {s.icon}
                            </div>
                            <div>
                              <span className="font-bold text-white block">{s.name}</span>
                              <span className="text-[11px] text-slate-400 line-clamp-1">{s.desc}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">{s.category}</td>
                        <td className="p-4 font-mono font-bold text-[#00d4c8]">{s.code}</td>
                        <td className="p-4 font-bold text-slate-300">{s.products}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              s.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {s.status === 'active' ? 'نشط ومعتمد' : 'بانتظار المراجعة'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {s.status === 'pending' && (
                              <button
                                onClick={() => approveStore(s.id)}
                                className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-[11px] hover:bg-emerald-500/30 transition-colors"
                              >
                                تفعيل
                              </button>
                            )}
                            <button
                              onClick={() => deleteStore(s.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                              title="حذف المتجر"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Craftsmen Management */}
        {activeTab === 'craftsmen' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">إدارة شبكة الحرفيين والمهنيين</h2>
              <p className="text-xs text-slate-400">توثيق الحسابات، مراجعة الطلبات وضبط الجودة</p>
            </div>

            <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0a0a0f] text-slate-400 border-b border-[#2a2a3a]">
                    <tr>
                      <th className="p-4">الحرفي</th>
                      <th className="p-4">المهنة</th>
                      <th className="p-4">المدينة</th>
                      <th className="p-4">التقييم</th>
                      <th className="p-4">التوثيق</th>
                      <th className="p-4">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a3a]">
                    {craftsmen.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-xl shrink-0">
                              {c.avatar}
                            </div>
                            <span className="font-bold text-white">{c.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-purple-300 font-bold">{c.profession}</td>
                        <td className="p-4 text-slate-300">{c.city}</td>
                        <td className="p-4 font-bold text-amber-400">★ {c.rating} ({c.reviews})</td>
                        <td className="p-4">
                          {c.verified ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" />
                              موثق
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                              غير موثق
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => approveCraftsman(c.id)}
                              className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-[11px] hover:bg-purple-500/30 transition-colors"
                            >
                              {c.verified ? 'إلغاء التوثيق' : 'توثيق الحساب'}
                            </button>
                            <button
                              onClick={() => deleteCraftsman(c.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Platform Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-black text-white">إعدادات المنصة والسياسات المالية</h2>
              <p className="text-xs text-slate-400">تعديل نسبة العمولة، رسوم التوصيل، ومعلومات الدعم الفني</p>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم المنصة الرسمي</label>
                <input
                  type="text"
                  required
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#ff3366]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">نسبة عمولة المبيعات (%)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    max={50}
                    value={commission}
                    onChange={(e) => setCommission(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#ff3366]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">رسوم التوصيل الموحدة (د.ج)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#ff3366]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">البريد الإلكتروني للدعم الفني</label>
                  <input
                    type="email"
                    required
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#ff3366] text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم هاتف خدمة العملاء</label>
                  <input
                    type="tel"
                    required
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#ff3366] text-left dir-ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">المقر والموقع الجغرافي للمنصة وخدمة العملاء</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="مثال: ولاية المغير"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#ff3366]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ff3366] hover:bg-[#ff1a53] text-white font-black text-sm shadow-lg shadow-[#ff3366]/25 hover:scale-[1.02] transition-all"
              >
                تحديث وحفظ الإعدادات
              </button>
            </form>

            {/* Owner Security Credentials Card */}
            <div className="p-6 rounded-3xl bg-[#1a1a24] border border-[#ff3366]/40 shadow-[0_0_30px_rgba(255,51,102,0.15)] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#2a2a3a]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#ff3366]/20 border border-[#ff3366]/40 text-[#ff3366] flex items-center justify-center">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">بيانات أمان ودخول مالك المنصة</h3>
                    <p className="text-xs text-slate-400">تغيير كود الدخول وكلمة المرور الرئيسية للوحة التحكم</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#ff3366]/20 text-[#ff3366] border border-[#ff3366]/40">
                  حساب المالك
                </span>
              </div>

              {/* Current Active Credentials Display */}
              <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] space-y-3">
                <span className="text-xs font-bold text-slate-400 block">البيانات الفعالة حالياً:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1a1a24] border border-white/5">
                    <div>
                      <span className="text-[10px] text-slate-400 block">كود المالك (Code)</span>
                      <span className="text-sm font-mono font-black text-white">{adminCredentials.code}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(adminCredentials.code, 'code')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#ff3366]/20 text-slate-300 hover:text-[#ff3366] transition-colors"
                      title="نسخ الكود"
                    >
                      {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1a1a24] border border-white/5">
                    <div>
                      <span className="text-[10px] text-slate-400 block">كلمة السر (Password)</span>
                      <span className="text-sm font-mono font-black text-[#ff3366]">{adminCredentials.password}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(adminCredentials.password, 'pass')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#ff3366]/20 text-slate-300 hover:text-[#ff3366] transition-colors"
                      title="نسخ كلمة السر"
                    >
                      {copiedPass ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Update Form */}
              <form onSubmit={handleUpdateAdminAuth} className="space-y-4 pt-2">
                <h4 className="text-xs font-black text-white">تحديث وتعيين كود وكلمة سر جديدة:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">كود المالك الجديد *</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={newAdminCode}
                        onChange={(e) => setNewAdminCode(e.target.value.toUpperCase())}
                        placeholder="مثال: OWNER-2026"
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white font-mono uppercase focus:outline-none focus:border-[#ff3366]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">كلمة السر الجديدة *</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        placeholder="مثال: Fenk@Owner2026!"
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white font-mono focus:outline-none focus:border-[#ff3366]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff3366] to-[#e62e5c] text-white font-black text-sm shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  حفظ وتطبيق كود وكلمة سر المالك الجديدة
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
