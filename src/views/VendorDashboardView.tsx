import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  Plus,
  Trash2,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Edit,
  Store as StoreIcon
} from 'lucide-react';

export const VendorDashboardView: React.FC = () => {
  const {
    currentUser,
    stores,
    products,
    orders,
    deleteProduct,
    updateOrderStatus,
    setIsAddProductModalOpen,
    logout,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');

  const fallbackStore = {
    id: 1,
    name: 'متجر الفنك النموذجي',
    code: 'STORE-101',
    category: 'مواد البناء',
    rating: 4.9,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&auto=format&fit=crop&q=80',
    icon: '🏗️',
    desc: 'المتجر الرسمي للأدوات ومواد البناء',
    phone: '0555001122',
    email: 'store@fenk.dz',
    wilaya: '16 - الجزائر العاصمة',
    address: 'الجزائر العاصمة',
    featured: true,
    status: 'approved' as const
  };

  const currentStore = stores.find((s) => s.id === currentUser.storeId) || stores[0] || fallbackStore;
  const storeProducts = products.filter((p) => p.storeId === currentStore.id);
  const storeOrders = orders.filter((o) => o.storeIds && o.storeIds.includes(currentStore.id));

  // Store settings form state
  const [storeName, setStoreName] = useState(currentStore.name || 'متجري');
  const [storeDesc, setStoreDesc] = useState(currentStore.desc || '');
  const [storePhone, setStorePhone] = useState(currentStore.phone || '');
  const [storeEmail, setStoreEmail] = useState(currentStore.email || '');

  const totalStoreSales = storeOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => {
      const itemsSum = o.items
        .filter((i) => i.storeId === currentStore.id)
        .reduce((acc, i) => acc + i.price * i.qty, 0);
      return sum + itemsSum;
    }, 45230);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    currentStore.name = storeName;
    currentStore.desc = storeDesc;
    currentStore.phone = storePhone;
    currentStore.email = storeEmail;
    showToast('success', 'تم الحفظ', 'تم تحديث بيانات المتجر بنجاح');
  };

  return (
    <div className="min-h-screen pt-20 pb-20 flex">
      
      {/* Desktop Dashboard Sidebar */}
      <aside className="w-64 bg-[#12121a] border-l border-[#2a2a3a] p-6 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* Store Info Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] flex items-center justify-center text-2xl font-black">
              {currentStore.icon}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-white truncate">{currentStore.name}</h4>
              <span className="text-[11px] text-[#00d4c8] font-bold block">كود: {currentStore.code}</span>
            </div>
          </div>

          {/* Navigation items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              نظرة عامة
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'products'
                  ? 'bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="w-4 h-4" />
              إدارة المنتجات ({storeProducts.length})
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              إدارة الطلبات ({storeOrders.length})
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              إعدادات المتجر
            </button>
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
        
        {/* Mobile Tab Pills */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-[#00d4c8] text-[#0a0a0f]' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'products' ? 'bg-[#00d4c8] text-[#0a0a0f]' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            المنتجات
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'orders' ? 'bg-[#00d4c8] text-[#0a0a0f]' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            الطلبات
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-[#00d4c8] text-[#0a0a0f]' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            الإعدادات
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white">لوحة تحكم البائع</h1>
                <p className="text-xs text-slate-400">مرحباً بك في لوحة إدارة متجر {currentStore.name}</p>
              </div>

              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                إضافة منتج جديد
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>إجمالي المبيعات</span>
                  <div className="p-2 rounded-xl bg-[#00d4c8]/10 text-[#00d4c8]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-[#00d4c8]">
                  {totalStoreSales.toLocaleString()} ر.س
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +14% هذا الشهر
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>إجمالي الطلبات</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-white">
                  {storeOrders.length + 328}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% نمو الطلبات
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>المنتجات المسجلة</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-amber-400">
                  {storeProducts.length}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">
                  جميعها معروضة بالمتجر
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>تقييم المتجر</span>
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-white">
                  {currentStore.rating}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">
                  من {currentStore.reviews} تقييم حقيقي
                </span>
              </div>
            </div>

            {/* Latest Orders Table */}
            <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-[#2a2a3a] flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00d4c8]" />
                  آخر الطلبات الواردة للمتجر
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#00d4c8] hover:underline font-bold"
                >
                  عرض كافة الطلبات
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0a0a0f] text-slate-400 border-b border-[#2a2a3a]">
                    <tr>
                      <th className="p-4">رقم الطلب</th>
                      <th className="p-4">العميل</th>
                      <th className="p-4">الأصناف</th>
                      <th className="p-4">المبلغ</th>
                      <th className="p-4">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a3a]">
                    {orders.slice(0, 4).map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#00d4c8]">#{ord.orderNumber}</td>
                        <td className="p-4 font-bold text-white">{ord.customerName}</td>
                        <td className="p-4 text-slate-300">{ord.items.length} أصناف</td>
                        <td className="p-4 font-black text-white">{ord.total} ر.س</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                              ord.status === 'completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : ord.status === 'processing'
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {ord.status === 'completed'
                              ? 'مكتمل'
                              : ord.status === 'processing'
                              ? 'قيد التجهيز'
                              : 'جديد بانتظار التأكيد'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">إدارة منتجات المتجر</h2>
                <p className="text-xs text-slate-400">إضافة وتعديل وحذف المنتجات وضبط المخزون</p>
              </div>

              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                إضافة منتج جديد
              </button>
            </div>

            <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0a0a0f] text-slate-400 border-b border-[#2a2a3a]">
                    <tr>
                      <th className="p-4">المنتج</th>
                      <th className="p-4">السعر</th>
                      <th className="p-4">المخزون</th>
                      <th className="p-4">القسم</th>
                      <th className="p-4">الشارة</th>
                      <th className="p-4">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a3a]">
                    {storeProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] flex items-center justify-center text-xl shrink-0">
                              {p.icon}
                            </div>
                            <span className="font-bold text-white truncate max-w-xs">{p.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-black text-[#00d4c8]">{p.price} ر.س</td>
                        <td className="p-4 font-bold text-slate-300">{p.stock || 20} قطعة</td>
                        <td className="p-4 text-slate-400">{p.category}</td>
                        <td className="p-4">
                          {p.badge ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#ff3366]/20 text-[#ff3366] text-[10px] font-bold border border-[#ff3366]/30">
                              {p.badge}
                            </span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-colors"
                            title="حذف المنتج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">إدارة ومتابعة الطلبات</h2>
              <p className="text-xs text-slate-400">تغيير حالات الطلبات وإشعار العميل بالشحن</p>
            </div>

            <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0a0a0f] text-slate-400 border-b border-[#2a2a3a]">
                    <tr>
                      <th className="p-4">رقم الطلب</th>
                      <th className="p-4">التاريخ</th>
                      <th className="p-4">العميل والهاتف</th>
                      <th className="p-4">العنوان</th>
                      <th className="p-4">المبلغ</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4">تحديث الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a3a]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#00d4c8]">#{ord.orderNumber}</td>
                        <td className="p-4 text-slate-400">{ord.date}</td>
                        <td className="p-4">
                          <div className="font-bold text-white">{ord.customerName}</div>
                          <div className="text-[11px] text-slate-400 dir-ltr text-right">{ord.customerPhone}</div>
                        </td>
                        <td className="p-4 text-slate-300 max-w-[150px] truncate">{ord.customerAddress}</td>
                        <td className="p-4 font-black text-[#00d4c8]">{ord.total} ر.س</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                              ord.status === 'completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : ord.status === 'processing'
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                                : ord.status === 'shipped'
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {ord.status === 'completed'
                              ? 'مكتمل'
                              : ord.status === 'processing'
                              ? 'قيد التجهيز'
                              : ord.status === 'shipped'
                              ? 'تم الشحن'
                              : 'جديد'}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                            className="px-2.5 py-1.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs font-bold text-white focus:outline-none focus:border-[#00d4c8]"
                          >
                            <option value="pending">جديد</option>
                            <option value="processing">قيد التجهيز</option>
                            <option value="shipped">تم الشحن</option>
                            <option value="completed">مكتمل ومستلم</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Store Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-black text-white">إعدادات ملف المتجر</h2>
              <p className="text-xs text-slate-400">تعديل معلومات وبيانات المتجر العامة</p>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم المتجر</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">وصف المتجر</label>
                <textarea
                  rows={3}
                  value={storeDesc}
                  onChange={(e) => setStoreDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف للتواصل</label>
                  <input
                    type="tel"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8] text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8] text-left dir-ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-sm shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-[1.02] transition-all"
              >
                حفظ التعديلات
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
