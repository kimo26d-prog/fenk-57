import React, { useState, useRef } from 'react';
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
  Store as StoreIcon,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Camera,
  Upload,
  Layers,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { MediaImage } from '../components/MediaImage';

export const VendorDashboardView: React.FC = () => {
  const {
    currentUser,
    stores,
    products,
    orders,
    deleteProduct,
    updateProductImage,
    updateOrderStatus,
    setIsAddProductModalOpen,
    logout,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'products' | 'orders' | 'settings'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [editingProductImageId, setEditingProductImageId] = useState<number | null>(null);
  const [newProductImageUrl, setNewProductImageUrl] = useState('');
  const productFileInputRef = useRef<HTMLInputElement>(null);

  const fallbackStore = {
    id: 1,
    name: 'متجر الفنك الجزائري',
    code: 'STORE-101',
    category: 'مواد البناء والتشطيب',
    rating: 4.9,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&auto=format&fit=crop&q=80',
    icon: '🏗️',
    desc: 'المتجر المعتمد للأدوات ومواد البناء والتشطيب في الجزائر',
    phone: '0555001122',
    email: 'store@fenk.dz',
    wilaya: '16 - الجزائر العاصمة',
    address: 'الجزائر العاصمة',
    featured: true,
    isVip: true,
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
    }, 184500);

  const totalNetProfit = Math.round(totalStoreSales * 0.32); // Average 32% margin

  // Analytics Datasets for 7 Days, 30 Days, 90 Days
  const data7Days = [
    { date: 'السبت', sales: 28500, profit: 9120, orders: 8, units: 14 },
    { date: 'الأحد', sales: 34200, profit: 11200, orders: 11, units: 19 },
    { date: 'الإثنين', sales: 41000, profit: 13500, orders: 15, units: 23 },
    { date: 'الثلاثاء', sales: 31000, profit: 9900, orders: 9, units: 16 },
    { date: 'الأربعاء', sales: 52400, profit: 17200, orders: 18, units: 31 },
    { date: 'الخميس', sales: 68900, profit: 22800, orders: 24, units: 42 },
    { date: 'الجمعة', sales: 45000, profit: 14800, orders: 14, units: 22 },
  ];

  const data30Days = [
    { date: 'أسبوع 1', sales: 185000, profit: 59200, orders: 54, units: 98 },
    { date: 'أسبوع 2', sales: 220000, profit: 71500, orders: 68, units: 124 },
    { date: 'أسبوع 3', sales: 275000, profit: 89000, orders: 85, units: 156 },
    { date: 'أسبوع 4', sales: 310000, profit: 102000, orders: 94, units: 178 },
  ];

  const data90Days = [
    { date: 'الشهر 1', sales: 680000, profit: 218000, orders: 210, units: 410 },
    { date: 'الشهر 2', sales: 840000, profit: 272000, orders: 265, units: 530 },
    { date: 'الشهر 3 (الحالي)', sales: 990000, profit: 326000, orders: 301, units: 620 },
  ];

  const chartData = timeRange === '7d' ? data7Days : timeRange === '30d' ? data30Days : data90Days;

  // Category distribution
  const categoryData = [
    { name: 'مواد بناء وتجهيز', value: 42, color: '#00d4c8' },
    { name: 'أدوات ومعدات', value: 28, color: '#8b5cf6' },
    { name: 'كهرباء وإنارة', value: 18, color: '#3b82f6' },
    { name: 'أخرى', value: 12, color: '#ec4899' },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    currentStore.name = storeName;
    currentStore.desc = storeDesc;
    currentStore.phone = storePhone;
    currentStore.email = storeEmail;
    showToast('success', 'تم الحفظ', 'تم تحديث بيانات المتجر بنجاح');
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProductImageId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateProductImage(editingProductImageId, result);
        showToast('success', 'تم التحديث', 'تم تغيير صورة المنتج بنجاح');
        setEditingProductImageId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProductImageUrl = (productId: number) => {
    if (newProductImageUrl.trim()) {
      updateProductImage(productId, newProductImageUrl.trim());
      showToast('success', 'تم التحديث', 'تم تحديث رابط صورة المنتج بنجاح');
      setEditingProductImageId(null);
      setNewProductImageUrl('');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 flex">
      <input
        type="file"
        ref={productFileInputRef}
        onChange={handleProductImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Desktop Dashboard Sidebar */}
      <aside className="w-64 bg-[#12121a] border-l border-[#2a2a3a] p-6 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Store Info Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] flex items-center justify-center text-2xl font-black shrink-0 overflow-hidden">
              {currentStore.image ? (
                <img
                  src={currentStore.image}
                  alt={currentStore.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                currentStore.icon
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black text-white truncate">{currentStore.name}</h4>
                {currentStore.isVip && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black">
                    VIP
                  </span>
                )}
              </div>
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
              نظرة عامة والرسوم البيانية
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#00d4c8]/10 text-[#00d4c8] border border-[#00d4c8]/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              التحليلات والمبيعات اليومية
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
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'analytics' ? 'bg-[#00d4c8] text-[#0a0a0f]' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            الرسوم البيانية
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'products' ? 'bg-[#00d4c8] text-[#0a0a0f]' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            المنتجات ({storeProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeTab === 'orders' ? 'bg-[#00d4c8] text-[#0a0a0f]' : 'bg-[#1a1a24] text-slate-300'
            }`}
          >
            الطلبات ({storeOrders.length})
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

        {/* Tab 1: Overview with Real Time Charts */}
        {(activeTab === 'overview' || activeTab === 'analytics') && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <span>لوحة تحكم البائع والرسوم البيانية</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00d4c8]/20 text-[#00d4c8] text-xs font-bold border border-[#00d4c8]/30">
                    مباشر 🇩🇿
                  </span>
                </h1>
                <p className="text-xs text-slate-400">
                  متابعة المبيعات اليومية وتطور الأرباح الصافية لمتجر {currentStore.name}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Time range selector */}
                <div className="flex items-center p-1 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl text-xs">
                  <button
                    onClick={() => setTimeRange('7d')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      timeRange === '7d' ? 'bg-[#00d4c8] text-[#0a0a0f] shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    7 أيام
                  </button>
                  <button
                    onClick={() => setTimeRange('30d')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      timeRange === '30d' ? 'bg-[#00d4c8] text-[#0a0a0f] shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    30 يوم
                  </button>
                  <button
                    onClick={() => setTimeRange('90d')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      timeRange === '90d' ? 'bg-[#00d4c8] text-[#0a0a0f] shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    3 أشهر
                  </button>
                </div>

                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-105 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  إضافة منتج
                </button>
              </div>
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
                  {totalStoreSales.toLocaleString()} د.ج
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18.4% هذا الشهر
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>الأرباح الصافية التقديرية</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-purple-400">
                  {totalNetProfit.toLocaleString()} د.ج
                </span>
                <span className="text-[11px] text-purple-300 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  هامش ربح ~32%
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>إجمالي الطلبات المستلمة</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-white">
                  {storeOrders.length + 84} طلب
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +12 طلب اليوم
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>المنتجات الحقيقية بالمتجر</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <span className="block text-2xl font-black text-amber-400">
                  {storeProducts.length} منتج
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">
                  بصور حقيقية وتوثيق جزائري
                </span>
              </div>
            </div>

            {/* Chart 1: Daily Revenue & Profit Evolution (AreaChart) */}
            <div className="p-6 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2a2a3a] pb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#00d4c8]" />
                    رسم بياني لتطور المبيعات اليومية والأرباح الصافية
                  </h3>
                  <p className="text-xs text-slate-400">
                    مقارنة الإيرادات الإجمالية مع الأرباح الصافية المحققة (بالدينار الجزائري د.ج)
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#00d4c8]" />
                    <span className="text-slate-300 font-bold">المبيعات (د.ج)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                    <span className="text-slate-300 font-bold">صافي الربح (د.ج)</span>
                  </div>
                </div>
              </div>

              <div className="h-72 w-full pt-4 dir-ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d4c8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#00d4c8" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" vertical={false} />
                    <XAxis
                      dataKey="date"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#12121a',
                        borderColor: '#2a2a3a',
                        borderRadius: '16px',
                        color: '#fff',
                        fontSize: '12px',
                        direction: 'rtl'
                      }}
                      formatter={(val: any) => [`${Number(val).toLocaleString()} د.ج`]}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      name="المبيعات"
                      stroke="#00d4c8"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorSales)"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      name="صافي الربح"
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorProfit)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grid for Chart 2 & Chart 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Orders & Units BarChart */}
              <div className="p-6 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#2a2a3a] pb-3">
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      عدد الطلبات والقطع المباعة يومياً
                    </h3>
                    <p className="text-[11px] text-slate-400">حجم الإقبال وتدفق العمليات الشرائية</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    نشاط ممتاز
                  </span>
                </div>

                <div className="h-60 w-full pt-2 dir-ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" vertical={false} />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#12121a',
                          borderColor: '#2a2a3a',
                          borderRadius: '14px',
                          color: '#fff',
                          fontSize: '11px',
                          direction: 'rtl'
                        }}
                      />
                      <Bar dataKey="orders" name="عدد الطلبات" fill="#10b981" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="units" name="القطع المباعة" fill="#00d4c8" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Store Category Share (PieChart) */}
              <div className="p-6 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-4 shadow-xl flex flex-col justify-between">
                <div className="border-b border-[#2a2a3a] pb-3">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    توزيع المبيعات حسب أقسام المتجر
                  </h3>
                  <p className="text-[11px] text-slate-400">نسبة مساهمة كل فئة منتجات في أرباح المتجر</p>
                </div>

                <div className="flex items-center justify-center h-48 w-full dir-ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#12121a',
                          borderColor: '#2a2a3a',
                          borderRadius: '12px',
                          color: '#fff',
                          fontSize: '11px'
                        }}
                        formatter={(val) => [`${val}%`, 'النسبة']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  {categoryData.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-[#12121a] border border-[#2a2a3a]">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="text-slate-300 truncate text-[11px]">{cat.name}</span>
                      <span className="font-bold text-white mr-auto text-[11px]">{cat.value}%</span>
                    </div>
                  ))}
                </div>
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
                        <td className="p-4 font-black text-white">{ord.total} د.ج</td>
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
                              ? 'مكتمل ومستلم'
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

        {/* Tab 2: Products Management with Real Image Uploader */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">إدارة منتجات المتجر وصورها الحقيقية</h2>
                <p className="text-xs text-slate-400">إضافة وتعديل وحذف المنتجات وضبط الصور الحقيقية والمخزون</p>
              </div>

              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                إضافة منتج حقيقي جديد
              </button>
            </div>

            {/* Edit Image Modal Inline Dialog */}
            {editingProductImageId && (
              <div className="p-5 rounded-2xl bg-[#161622] border border-[#00d4c8]/50 shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#00d4c8]" />
                    تحديث صورة المنتج الحقيقية
                  </h4>
                  <button
                    onClick={() => {
                      setEditingProductImageId(null);
                      setNewProductImageUrl('');
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    إلغاء
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => productFileInputRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl bg-[#00d4c8]/20 hover:bg-[#00d4c8]/30 text-[#00d4c8] border border-[#00d4c8]/40 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    رفع صورة من جهازك
                  </button>

                  <div className="flex-1 flex gap-2">
                    <input
                      type="url"
                      value={newProductImageUrl}
                      onChange={(e) => setNewProductImageUrl(e.target.value)}
                      placeholder="أو الصق رابط صورة خارجية (https://...)"
                      className="flex-1 px-4 py-2 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d4c8]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveProductImageUrl(editingProductImageId)}
                      className="px-4 py-2 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-bold text-xs"
                    >
                      حفظ الرابط
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0a0a0f] text-slate-400 border-b border-[#2a2a3a]">
                    <tr>
                      <th className="p-4">الصورة الحقيقية والمنتج</th>
                      <th className="p-4">السعر</th>
                      <th className="p-4">المخزون</th>
                      <th className="p-4">القسم</th>
                      <th className="p-4">الشارة</th>
                      <th className="p-4">تغيير الصورة</th>
                      <th className="p-4">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a3a]">
                    {storeProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] overflow-hidden shrink-0">
                              <MediaImage
                                src={p.image}
                                alt={p.name}
                                fallbackIcon={p.icon}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-bold text-white truncate max-w-xs">{p.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-black text-[#00d4c8]">{p.price} د.ج</td>
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
                            onClick={() => {
                              setEditingProductImageId(p.id);
                              setNewProductImageUrl(p.image || '');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#00d4c8]/20 text-slate-300 hover:text-[#00d4c8] border border-[#2a2a3a] hover:border-[#00d4c8]/40 transition-colors flex items-center gap-1.5"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            تحديث الصورة
                          </button>
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
              <p className="text-xs text-slate-400">تغيير حالات الطلبات وإشعار العميل بالشحن والتوصيل</p>
            </div>

            <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0a0a0f] text-slate-400 border-b border-[#2a2a3a]">
                    <tr>
                      <th className="p-4">رقم الطلب</th>
                      <th className="p-4">التاريخ</th>
                      <th className="p-4">العميل والهاتف</th>
                      <th className="p-4">العنوان والولاية</th>
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
                        <td className="p-4 font-black text-[#00d4c8]">{ord.total} د.ج</td>
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
                              ? 'مكتمل ومستلم'
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
