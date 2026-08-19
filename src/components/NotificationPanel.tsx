import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALGERIAN_WILAYAS } from '../data/algerianWilayas';
import {
  Bell,
  X,
  Trash2,
  CheckCircle2,
  ShoppingBag,
  Wrench,
  Tag,
  MapPin,
  Clock,
  Sparkles,
  Sliders,
  Play,
  Volume2,
  VolumeX,
  ShieldCheck,
  Truck,
  Layers
} from 'lucide-react';

export const NotificationPanel: React.FC = () => {
  const {
    isNotifOpen,
    setIsNotifOpen,
    notifications,
    markNotifAsRead,
    clearAllNotifications,
    navigateTo,
    showToast,
    currentUser,
    pushConfig,
    updatePushConfig,
    requestBrowserNotificationPermission,
    triggerSimulatedOrderPush,
    triggerSimulatedWilayaOfferPush,
    triggerSimulatedCraftsmanPush,
    orders
  } = useApp();

  const [activeTab, setActiveTab] = useState<'notifications' | 'settings' | 'simulate'>('notifications');
  const [filterType, setFilterType] = useState<'all' | 'order' | 'deal' | 'service'>('all');

  if (!isNotifOpen) return null;

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'order') return n.type === 'order';
    if (filterType === 'deal') return n.type === 'offer' || n.type === 'wilaya_deal';
    if (filterType === 'service') return n.type === 'service';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsNotifOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-[#12121a] border border-[#2a2a3a] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1a1a24] border-b border-[#2a2a3a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30 flex items-center justify-center relative">
              <Bell className="w-5 h-5" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00d4c8] border-2 border-[#12121a] animate-pulse" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <span>مركز الإشعارات وتنبيهات الدفع</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  69 ولاية 🇩🇿
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                تنبيهات حالة الطلبات، عروض الولايات، وخدمات الحرفيين الفورية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && activeTab === 'notifications' && (
              <button
                onClick={clearAllNotifications}
                className="text-xs text-slate-400 hover:text-rose-400 px-2.5 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors flex items-center gap-1 font-semibold"
                title="مسح جميع الإشعارات"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">مسح الكل</span>
              </button>
            )}
            <button
              onClick={() => setIsNotifOpen(false)}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 py-2.5 bg-[#14141e] border-b border-[#2a2a3a] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-[#0a0a0f] rounded-xl border border-white/5 flex-1">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'notifications'
                  ? 'bg-[#00d4c8] text-[#0a0a0f] shadow-md shadow-[#00d4c8]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>الإشعارات</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                {notifications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-[#00d4c8] text-[#0a0a0f] shadow-md shadow-[#00d4c8]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>تخصيص الولاية</span>
            </button>

            <button
              onClick={() => setActiveTab('simulate')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'simulate'
                  ? 'bg-[#00d4c8] text-[#0a0a0f] shadow-md shadow-[#00d4c8]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>تجربة التنبيهات</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Notifications List */}
        {activeTab === 'notifications' && (
          <>
            {/* Filter Pills */}
            <div className="px-4 py-2 bg-[#12121a] flex items-center gap-1.5 overflow-x-auto border-b border-white/5 no-scrollbar">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
                  filterType === 'all'
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                الكل ({notifications.length})
              </button>
              <button
                onClick={() => setFilterType('order')}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                  filterType === 'order'
                    ? 'bg-[#00d4c8]/20 text-[#00d4c8] border border-[#00d4c8]/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Truck className="w-3 h-3" />
                حالة الطلبات
              </button>
              <button
                onClick={() => setFilterType('deal')}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                  filterType === 'deal'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Tag className="w-3 h-3" />
                عروض الولايات
              </button>
              <button
                onClick={() => setFilterType('service')}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                  filterType === 'service'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wrench className="w-3 h-3" />
                الحرفيين
              </button>
            </div>

            {/* Notifications List Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredNotifs.length === 0 ? (
                <div className="text-center py-12 px-4 text-slate-400">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto mb-3 flex items-center justify-center text-3xl">
                    🔔
                  </div>
                  <h4 className="font-bold text-white mb-1">لا توجد إشعارات في هذا القسم</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                    ستصلك تنبيهات الدفع الفورية تلقائياً عند تغيير حالة شحنتك أو إضافة عروض جديدة في ولايتك.
                  </p>
                  <button
                    onClick={() => setActiveTab('simulate')}
                    className="px-4 py-2 rounded-xl bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30 text-xs font-bold hover:bg-[#00d4c8]/20 transition-all"
                  >
                    🚀 إرسال إشعار تجريبي الآن
                  </button>
                </div>
              ) : (
                filteredNotifs.map((n) => {
                  const isOrder = n.type === 'order';
                  const isDeal = n.type === 'offer' || n.type === 'wilaya_deal';
                  const isService = n.type === 'service';
                  const isSuccess = n.type === 'success';

                  return (
                    <div
                      key={n.id}
                      onClick={() => markNotifAsRead(n.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        !n.read
                          ? 'bg-[#00d4c8]/5 border-[#00d4c8]/40 shadow-[0_0_15px_rgba(0,212,200,0.08)]'
                          : 'bg-[#1a1a24] border-[#2a2a3a] hover:border-slate-600 opacity-85'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                            isOrder
                              ? 'bg-[#00d4c8]/15 border-[#00d4c8]/30 text-[#00d4c8]'
                              : isDeal
                              ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                              : isService
                              ? 'bg-purple-500/15 border-purple-500/30 text-purple-400'
                              : isSuccess
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                              : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
                          }`}
                        >
                          {isOrder && <Truck className="w-5 h-5" />}
                          {isDeal && <Tag className="w-5 h-5" />}
                          {isService && <Wrench className="w-5 h-5" />}
                          {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                          {!isOrder && !isDeal && !isService && !isSuccess && <Bell className="w-5 h-5" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">{n.title}</h4>
                              {!n.read && (
                                <span className="w-2 h-2 rounded-full bg-[#00d4c8] shrink-0" />
                              )}
                            </div>

                            <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>{n.time}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed mb-2">{n.message}</p>

                          {/* Extra info badge */}
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5 flex-wrap">
                            {n.wilaya && (
                              <span className="text-[10px] text-slate-400 bg-black/30 px-2 py-0.5 rounded-md border border-white/5 flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                                {n.wilaya}
                              </span>
                            )}

                            <div className="flex items-center gap-2">
                              {isOrder && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNotifOpen(false);
                                    if (currentUser.type === 'vendor') navigateTo('dashboard');
                                    else if (currentUser.type === 'admin') navigateTo('admin');
                                    else navigateTo('orders-tracking');
                                  }}
                                  className="px-3 py-1 rounded-lg bg-[#00d4c8] text-[#0a0a0f] font-black text-xs hover:bg-[#00b8ad] transition-colors flex items-center gap-1"
                                >
                                  <span>تتبع الشحنة</span>
                                </button>
                              )}

                              {isDeal && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNotifOpen(false);
                                    navigateTo('products');
                                  }}
                                  className="px-3 py-1 rounded-lg bg-amber-500 text-[#0a0a0f] font-black text-xs hover:bg-amber-400 transition-colors"
                                >
                                  تصفح العروض
                                </button>
                              )}

                              {isService && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNotifOpen(false);
                                    navigateTo('craftsmen');
                                  }}
                                  className="px-3 py-1 rounded-lg bg-purple-500 text-white font-bold text-xs hover:bg-purple-600 transition-colors"
                                >
                                  عرض الحرفيين
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Tab 2: Push Notification Settings & Wilaya Subscription */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Preferred Wilaya Selection */}
            <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a]">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">ولايتك المفضلة للتنبيهات والعروض</h4>
                  <p className="text-xs text-slate-400">اختر ولايتك لتصلك العروض الحصرية وتحديثات الشحن الخاصة بها</p>
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  حدد الولاية من القائمة (69 ولاية جزائرية):
                </label>
                <select
                  value={pushConfig.selectedWilaya}
                  onChange={(e) => updatePushConfig({ selectedWilaya: e.target.value })}
                  className="w-full bg-[#12121a] border border-[#2a2a3a] text-white text-sm rounded-xl p-3 focus:outline-none focus:border-[#00d4c8]"
                >
                  {ALGERIAN_WILAYAS.map((w) => (
                    <option key={w.code} value={`${w.code} - ${w.nameAr}`}>
                      {w.code} - {w.nameAr} ({w.nameEn}) - {w.region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00d4c8]" />
                <span>الولاية الحالية المفعلة: <strong className="text-[#00d4c8]">{pushConfig.selectedWilaya}</strong></span>
              </div>
            </div>

            {/* Notification Channels Toggles */}
            <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-3">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00d4c8]" />
                <span>قنوات التنبيهات الفورية (Push Channels)</span>
              </h4>

              {/* Master Push Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#12121a] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white">تفعيل نظام تنبيهات الدفع (In-App Push)</div>
                  <div className="text-[11px] text-slate-400">إظهار إشعارات منبثقة تفاعلية أعلى الشاشة</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushConfig.enabled}
                    onChange={(e) => updatePushConfig({ enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d4c8]"></div>
                </label>
              </div>

              {/* Order Status Updates */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#12121a] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#00d4c8]" />
                    <span>تحديثات حالة الطلبات والشحن</span>
                  </div>
                  <div className="text-[11px] text-slate-400">إشعار فوري عند التجهيز، الشحن، أو التسليم</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushConfig.orderUpdates}
                    onChange={(e) => updatePushConfig({ orderUpdates: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d4c8]"></div>
                </label>
              </div>

              {/* Wilaya Offers & Discounts */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#12121a] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>عروض وخصومات الولاية المختارة</span>
                  </div>
                  <div className="text-[11px] text-slate-400">تخفيضات وكوبونات التوصيل في ولاية {pushConfig.selectedWilaya}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushConfig.wilayaOffers}
                    onChange={(e) => updatePushConfig({ wilayaOffers: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d4c8]"></div>
                </label>
              </div>

              {/* Nearby Craftsmen Alerts */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#12121a] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-purple-400" />
                    <span>تنبيهات الحرفيين والخدمات المنزلية</span>
                  </div>
                  <div className="text-[11px] text-slate-400">إشعار عند توفر حرفيين جدد ومعتمدين في ولايتك</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushConfig.newCraftsmenAlerts}
                    onChange={(e) => updatePushConfig({ newCraftsmenAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d4c8]"></div>
                </label>
              </div>

              {/* Sound Alerts */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#12121a] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>رنين التنبيه الصوتي</span>
                  </div>
                  <div className="text-[11px] text-slate-400">تشغيل نغمة تنبيه صوتية عند وصول إشعار جديد</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushConfig.soundAlerts}
                    onChange={(e) => updatePushConfig({ soundAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d4c8]"></div>
                </label>
              </div>
            </div>

            {/* Browser Permission Button */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/30 flex items-center justify-between gap-3">
              <div>
                <h5 className="text-xs font-bold text-white mb-0.5">إشعارات سطح المكتب والمتصفح</h5>
                <p className="text-[11px] text-slate-300">للحصول على تنبيهات حتى عند تصغير أو إغلاق التطبيق</p>
              </div>
              <button
                onClick={requestBrowserNotificationPermission}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all shrink-0 shadow-md shadow-emerald-500/20"
              >
                تفعيل الإذن 🔔
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Live Simulator Triggers */}
        {activeTab === 'simulate' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="p-3 bg-[#00d4c8]/10 border border-[#00d4c8]/30 rounded-2xl">
              <h4 className="text-xs font-bold text-[#00d4c8] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>أدوات محاكاة واختبار التنبيهات الفورية (Live Testing)</span>
              </h4>
              <p className="text-[11px] text-slate-300">
                اضغط على أي زر أدناه لتجربة ظهور إشعار الدفع الفوري (Toast Banner) مع الصوت المخصص للولاية المحددة: <strong className="text-white">{pushConfig.selectedWilaya}</strong>.
              </p>
            </div>

            {/* Order Status Push Test */}
            <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00d4c8]/15 border border-[#00d4c8]/30 text-[#00d4c8] flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">إشعار تحديث حالة وتتبع الطلب</h5>
                  <p className="text-[11px] text-slate-400">يحاكي تغيير حالة الشحنة إلى (قيد التجهيز / خرج للتوصيل / تم التسليم)</p>
                </div>
              </div>
              <button
                onClick={() => triggerSimulatedOrderPush()}
                className="px-3.5 py-2 rounded-xl bg-[#00d4c8] text-slate-950 font-black text-xs hover:bg-[#00b8ad] transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-[#00d4c8]/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>إرسال تنبيه</span>
              </button>
            </div>

            {/* Wilaya Discount / Offer Push Test */}
            <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">إشعار عروض وخصومات ولايتي</h5>
                  <p className="text-[11px] text-slate-400">يرسل تنبيه بخصم 30% أو شحن مجاني موجه لسكان ({pushConfig.selectedWilaya})</p>
                </div>
              </div>
              <button
                onClick={() => triggerSimulatedWilayaOfferPush()}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>إرسال عرض</span>
              </button>
            </div>

            {/* Craftsman Arrival Push Test */}
            <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">إشعار حرفي جديد متاح بالولاية</h5>
                  <p className="text-[11px] text-slate-400">ينبه المستخدم بتوفر فني صيانة أو كهربائي معتمد في منطقته</p>
                </div>
              </div>
              <button
                onClick={() => triggerSimulatedCraftsmanPush()}
                className="px-3.5 py-2 rounded-xl bg-purple-500 text-white font-black text-xs hover:bg-purple-600 transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-purple-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>إرسال تنبيه</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3.5 bg-[#1a1a24] border-t border-[#2a2a3a] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>نظام الإشعارات الفورية متصل ويعمل بنشاط</span>
          </div>
          <button
            onClick={() => setActiveTab('settings')}
            className="text-[#00d4c8] hover:underline font-bold"
          >
            تغيير الولاية ({pushConfig.selectedWilaya.split('-')[0]})
          </button>
        </div>
      </div>
    </div>
  );
};
