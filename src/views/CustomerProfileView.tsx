import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, CartItem, Product } from '../types';
import {
  User,
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Receipt,
  FileText,
  Heart,
  MapPin,
  Phone,
  Mail,
  Copy,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
  CreditCard,
  Printer,
  Download,
  AlertTriangle,
  Sparkles,
  Store as StoreIcon,
  ShieldCheck,
  Calendar,
  HelpCircle,
  Trash2
} from 'lucide-react';

export const CustomerProfileView: React.FC = () => {
  const {
    currentUser,
    orders,
    products,
    stores,
    favorites,
    toggleFavorite,
    addToCart,
    reorderOrder,
    reorderSingleProduct,
    cancelOrder,
    updateCustomerProfile,
    navigateTo,
    showToast
  } = useApp();

  // Active tab inside Profile
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses' | 'invoices'>('orders');

  // Order filters and search
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'processing' | 'shipped' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Selected order for E-Invoice modal
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Cancel order modal state
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('تغيير عنوان التوصيل أو رغبة العميل');

  // Profile Edit Form State
  const [editName, setEditName] = useState(currentUser.name || 'أحمد محمد الشمري');
  const [editPhone, setEditPhone] = useState(currentUser.phone || '0501239876');
  const [editEmail, setEditEmail] = useState(currentUser.email || 'customer@fenk.com');
  const [editCity, setEditCity] = useState(currentUser.city || 'الرياض');
  const [editAddress, setEditAddress] = useState(
    currentUser.address || 'حي الياسمين - شارع أنس بن مالك - عمارة 42'
  );
  const [editNotes, setEditNotes] = useState('يرجى الاتصال قبل الوصول بـ 15 دقيقة');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (statusFilter === 'active') {
      if (order.status !== 'pending' && order.status !== 'processing' && order.status !== 'shipped') {
        return false;
      }
    } else if (statusFilter !== 'all') {
      if (order.status !== statusFilter) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchOrderNum = order.orderNumber.toLowerCase().includes(q);
      const matchItemName = order.items.some((item) => item.name.toLowerCase().includes(q));
      const matchStoreName = order.items.some((item) => item.store.toLowerCase().includes(q));
      if (!matchOrderNum && !matchItemName && !matchStoreName) return false;
    }

    return true;
  });

  // Calculate quick stats
  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'pending' || o.status === 'processing' || o.status === 'shipped'
  ).length;
  const completedOrdersCount = orders.filter((o) => o.status === 'completed').length;
  const totalSpent = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  // Favorite products list
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  // Copy order number helper
  const handleCopyOrderNumber = (orderNumber: string) => {
    navigator.clipboard?.writeText(orderNumber);
    showToast('info', 'تم النسخ', `تم نسخ رقم الطلب #${orderNumber} إلى الحافظة`);
  };

  // Submit Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
      city: editCity,
      address: editAddress
    });
  };

  // Confirm cancel order
  const handleConfirmCancel = () => {
    if (orderToCancel) {
      cancelOrder(orderToCancel.id);
      setOrderToCancel(null);
    }
  };

  // Status badge renderer
  const renderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cyan-500/15 text-[#00d4c8] border border-cyan-500/30 shadow-[0_0_12px_rgba(0,212,200,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00d4c8] animate-ping" />
            <Truck className="w-3.5 h-3.5" />
            في الطريق للشحن والتوصيل
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <Clock className="w-3.5 h-3.5" />
            قيد التجهيز في المتجر
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <Package className="w-3.5 h-3.5" />
            تم استلام الطلب
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-[#00e676] border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            تم التسليم بنجاح
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            طلب ملغي
          </span>
        );
      default:
        return null;
    }
  };

  // Payment method badge
  const renderPaymentBadge = (method?: Order['paymentMethod']) => {
    switch (method) {
      case 'applepay':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-white/10 text-white border border-white/15">
            <span></span> Apple Pay
          </span>
        );
      case 'card':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/25">
            <CreditCard className="w-3 h-3" /> بطاقة مدى / ائتمانية
          </span>
        );
      case 'cod':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/25">
            <span>💵</span> الدفع عند الاستلام
          </span>
        );
    }
  };

  // Tracking timeline steps renderer
  const renderTrackingTimeline = (order: Order) => {
    const isCancelled = order.status === 'cancelled';
    if (isCancelled) {
      return (
        <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <p className="font-bold">تم إلغاء هذا الطلب</p>
            <p className="text-[11px] text-rose-300/80 mt-0.5">
              تم إلغاء الشحنة ولم يتم خصم أي مبالغ. يمكنك إعادة طلب المنتجات في أي وقت.
            </p>
          </div>
        </div>
      );
    }

    const steps = [
      {
        key: 'placed',
        title: 'تم استلام الطلب',
        desc: 'تم تسجيل الطلب وإرسال الإشعار للمحلات',
        done: true,
        current: order.status === 'pending'
      },
      {
        key: 'processing',
        title: 'جاري التجهيز والتغليف',
        desc: 'المتاجر تقوم بتجهيز المنتجات وفحص الجودة',
        done: order.status === 'processing' || order.status === 'shipped' || order.status === 'completed',
        current: order.status === 'processing'
      },
      {
        key: 'shipped',
        title: 'خرج للتوصيل والشحن',
        desc: 'الشحنة مع مندوب التوصيل الموحد',
        done: order.status === 'shipped' || order.status === 'completed',
        current: order.status === 'shipped'
      },
      {
        key: 'completed',
        title: 'تم التسليم بنجاح',
        desc: 'تم استلام العميل للطلب بالكامل',
        done: order.status === 'completed',
        current: order.status === 'completed'
      }
    ];

    return (
      <div className="bg-[#0e0e16] border border-[#2a2a3a] rounded-2xl p-4 sm:p-5 my-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#00d4c8]" />
            <span className="text-xs font-black text-white">تتبع مراحل الشحنة الحية:</span>
          </div>
          {order.trackingNote && (
            <span className="text-[11px] text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30">
              {order.trackingNote}
            </span>
          )}
        </div>

        {/* Visual Timeline Steps */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-2">
          {steps.map((step, idx) => {
            return (
              <div
                key={step.key}
                className={`relative flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                  step.current
                    ? 'bg-[#00d4c8]/10 border-[#00d4c8]/50 shadow-[0_0_15px_rgba(0,212,200,0.15)]'
                    : step.done
                    ? 'bg-white/5 border-emerald-500/30 text-slate-200'
                    : 'bg-[#12121a]/60 border-[#2a2a3a] text-slate-500 opacity-60'
                }`}
              >
                {/* Step Icon / Number */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black mb-2 ${
                    step.current
                      ? 'bg-[#00d4c8] text-[#0a0a0f] shadow-lg shadow-[#00d4c8]/40 animate-pulse'
                      : step.done
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#1a1a24] text-slate-500 border border-[#2a2a3a]'
                  }`}
                >
                  {step.done && !step.current ? '✓' : idx + 1}
                </div>

                <span
                  className={`text-xs font-extrabold mb-1 ${
                    step.current ? 'text-[#00d4c8]' : step.done ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight">
                  {step.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Banner & Profile Overview */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#161622] via-[#12121a] to-[#0a0a0f] border border-[#2a2a3a] p-6 sm:p-8 shadow-2xl">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00d4c8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* User Details */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#00d4c8] via-cyan-500 to-indigo-600 p-0.5 shadow-[0_0_25px_rgba(0,212,200,0.3)]">
                <div className="w-full h-full bg-[#12121a] rounded-[22px] flex items-center justify-center text-3xl sm:text-4xl font-black text-[#00d4c8]">
                  {currentUser.name ? currentUser.name.charAt(0) : '👤'}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-[#0a0a0f] text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-[#12121a] flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0f]" />
                نشط
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentUser.name || 'أحمد محمد الشمري'}
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-[#00d4c8]/15 text-[#00d4c8] border border-[#00d4c8]/30 text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  عضو مميز في فينك
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="dir-ltr">{currentUser.phone || '0501239876'}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentUser.city || 'الرياض'} - حي الياسمين</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentUser.email || 'customer@fenk.com'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                setActiveTab('orders');
                setStatusFilter('active');
              }}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#00d4c8]/15 hover:bg-[#00d4c8]/25 text-[#00d4c8] border border-[#00d4c8]/30 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,212,200,0.15)]"
            >
              <Truck className="w-4 h-4" />
              تتبع الطلبات الجارية ({activeOrdersCount})
            </button>

            <button
              onClick={() => navigateTo('products')}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              تصفح المنتجات
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#2a2a3a]">
          
          <div className="bg-[#12121a]/80 p-4 rounded-2xl border border-[#2a2a3a] flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-[#00d4c8] border border-cyan-500/20 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-white">{totalOrdersCount}</span>
              <span className="block text-[11px] text-slate-400 font-semibold">إجمالي الطلبات</span>
            </div>
          </div>

          <div className="bg-[#12121a]/80 p-4 rounded-2xl border border-[#2a2a3a] flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-[#00d4c8] border border-cyan-500/20 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-[#00d4c8]">{activeOrdersCount}</span>
              <span className="block text-[11px] text-slate-400 font-semibold">طلبات جاري تتبعها</span>
            </div>
          </div>

          <div className="bg-[#12121a]/80 p-4 rounded-2xl border border-[#2a2a3a] flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-[#00e676] border border-emerald-500/20 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-white">{completedOrdersCount}</span>
              <span className="block text-[11px] text-slate-400 font-semibold">طلبات مكتملة ومستلمة</span>
            </div>
          </div>

          <div className="bg-[#12121a]/80 p-4 rounded-2xl border border-[#2a2a3a] flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-white">{totalSpent} <span className="text-xs font-bold text-slate-400">ر.س</span></span>
              <span className="block text-[11px] text-slate-400 font-semibold">إجمالي المشتريات</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-[#12121a] rounded-2xl border border-[#2a2a3a] overflow-x-auto no-scrollbar">
        
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm transition-all whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,212,200,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Package className="w-4 h-4" />
          سجل وتتبع الطلبات
          {activeOrdersCount > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === 'orders' ? 'bg-[#0a0a0f] text-[#00d4c8]' : 'bg-[#00d4c8] text-[#0a0a0f]'
              }`}
            >
              {activeOrdersCount} نشط
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm transition-all whitespace-nowrap ${
            activeTab === 'favorites'
              ? 'bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,212,200,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Heart className="w-4 h-4" />
          قائمة المفضلة ({favoriteProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm transition-all whitespace-nowrap ${
            activeTab === 'invoices'
              ? 'bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,212,200,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          الفواتير وسجل المعاملات
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm transition-all whitespace-nowrap ${
            activeTab === 'addresses'
              ? 'bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,212,200,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <MapPin className="w-4 h-4" />
          بيانات الحساب وعنوان التوصيل
        </button>
      </div>

      {/* TAB 1: ORDER HISTORY & TRACKING */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Controls: Search & Status Filters */}
          <div className="bg-[#12121a] p-4 sm:p-5 rounded-2xl border border-[#2a2a3a] space-y-4">
            
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث برقم الطلب (مثال: ORD-2026)، اسم المنتج أو المتجر..."
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4c8]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    مسح
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-400 font-semibold self-start sm:self-auto">
                عرض <span className="font-bold text-[#00d4c8]">{filteredOrders.length}</span> من أصل{' '}
                <span className="text-white">{orders.length}</span> طلبات
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-[#2a2a3a]">
              <span className="text-xs font-bold text-slate-400 ml-1 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                الحالة:
              </span>

              {[
                { id: 'all', label: 'كافة الطلبات' },
                { id: 'active', label: `الطلبات الجارية (${activeOrdersCount})` },
                { id: 'shipped', label: 'في الشحن والتوصيل' },
                { id: 'processing', label: 'قيد التجهيز' },
                { id: 'completed', label: 'مكتملة ومستلمة' },
                { id: 'cancelled', label: 'ملغية' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setStatusFilter(pill.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    statusFilter === pill.id
                      ? 'bg-[#00d4c8]/20 text-[#00d4c8] border border-[#00d4c8]/40 shadow-[0_0_10px_rgba(0,212,200,0.15)]'
                      : 'bg-[#0a0a0f] text-slate-400 hover:text-white border border-[#2a2a3a]'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-[#12121a] rounded-3xl border border-[#2a2a3a] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-[#00d4c8] flex items-center justify-center mx-auto text-3xl">
                📦
              </div>
              <h3 className="text-lg font-bold text-white">لا توجد طلبات مطابقة</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                لم نجد أي طلبات تطابق الفلتر أو البحث الحالي. يمكنك تصفح المنتجات وإجراء طلبك الأول!
              </p>
              <button
                onClick={() => navigateTo('products')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-xs hover:scale-105 transition-all shadow-lg"
              >
                تصفح المنتجات الآن
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                const canCancel = order.status === 'pending' || order.status === 'processing';

                return (
                  <div
                    key={order.id}
                    className="bg-[#12121a] rounded-3xl border border-[#2a2a3a] hover:border-[#00d4c8]/40 transition-all overflow-hidden shadow-lg group"
                  >
                    {/* Order Card Header */}
                    <div className="p-5 sm:p-6 bg-gradient-to-r from-[#161622] to-[#12121a] border-b border-[#2a2a3a]">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        {/* Order Metadata */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2 bg-[#0a0a0f] px-3 py-1.5 rounded-xl border border-[#2a2a3a]">
                            <span className="text-xs text-slate-400">رقم الطلب:</span>
                            <span className="font-mono font-black text-white text-sm tracking-wider">
                              #{order.orderNumber}
                            </span>
                            <button
                              onClick={() => handleCopyOrderNumber(order.orderNumber)}
                              title="نسخ رقم الطلب"
                              className="text-slate-400 hover:text-[#00d4c8] transition-colors p-1"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>{order.date}</span>
                          </div>

                          {renderPaymentBadge(order.paymentMethod)}
                        </div>

                        {/* Status badge & Collapse toggle */}
                        <div className="flex items-center gap-3 self-end lg:self-auto">
                          {renderStatusBadge(order.status)}

                          <button
                            onClick={() =>
                              setExpandedOrderId(isExpanded ? null : order.id)
                            }
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
                          >
                            <span>{isExpanded ? 'طي التفاصيل' : 'عرض التفاصيل والتتبع'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Order Body */}
                    <div className="p-5 sm:p-6 space-y-5">
                      
                      {/* Stores involved chips */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold">المحلات المشاركة في الشحنة:</span>
                        {Array.from(new Set(order.items.map((i) => i.store))).map((storeName) => (
                          <span
                            key={storeName}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-950/40 text-cyan-300 border border-cyan-500/25 text-xs font-bold"
                          >
                            <StoreIcon className="w-3.5 h-3.5 text-[#00d4c8]" />
                            {storeName}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Tracking Timeline (Always visible for active orders, or when expanded) */}
                      {(isExpanded || order.status === 'shipped' || order.status === 'processing') &&
                        renderTrackingTimeline(order)}

                      {/* Items List */}
                      <div className="space-y-2.5">
                        <span className="text-xs font-black text-slate-300 block">
                          الأصناف المطلوبة ({order.items.reduce((s, i) => s + (i.qty || 1), 0)} قطعة):
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] hover:border-[#00d4c8]/30 transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-2xl shrink-0">
                                  {item.icon || '📦'}
                                </div>
                                <div className="space-y-0.5">
                                  <h4 className="text-xs font-bold text-white line-clamp-1">
                                    {item.name}
                                  </h4>
                                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                                    <span>{item.store}</span>
                                    <span>•</span>
                                    <span className="font-semibold text-cyan-300">الكمية: {item.qty}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-left">
                                  <span className="text-xs font-extrabold text-white block">
                                    {item.price * item.qty} ر.س
                                  </span>
                                  <span className="text-[10px] text-slate-500 block">
                                    ({item.price} ر.س / للقطعة)
                                  </span>
                                </div>

                                {/* Reorder single item button */}
                                <button
                                  onClick={() => reorderSingleProduct(item)}
                                  title="إعادة طلب هذا المنتج فقط"
                                  className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-[#00d4c8] border border-cyan-500/30 text-xs font-bold transition-all"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Financial & Delivery Summary */}
                      <div className="p-4 rounded-2xl bg-[#161622] border border-[#2a2a3a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 text-xs text-slate-400">
                          <div>
                            عنوان التوصيل المسجل:{' '}
                            <span className="font-bold text-white">
                              {order.customerAddress || currentUser.address || 'حي الياسمين - الرياض'}
                            </span>
                          </div>
                          <div>
                            المستلم:{' '}
                            <span className="font-bold text-white">{order.customerName}</span> (
                            <span className="dir-ltr font-mono">{order.customerPhone}</span>)
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto text-left">
                          <div className="text-right">
                            <span className="text-[11px] text-slate-400 block">قيمة المنتجات: {order.subtotal} ر.س</span>
                            <span className="text-[11px] text-cyan-400 block">الشحن الموحد: {order.deliveryFee} ر.س</span>
                          </div>
                          <div className="h-8 w-px bg-[#2a2a3a]" />
                          <div className="text-right">
                            <span className="text-xs text-slate-400 block">المبلغ الإجمالي</span>
                            <span className="text-lg font-black text-[#00d4c8]">
                              {order.total} ر.س
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions: Reorder All, E-Invoice, Cancel, Support */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        
                        {/* Right side: Reorder All Items & E-Invoice */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          
                          {/* Reorder All Items Button */}
                          <button
                            onClick={() => reorderOrder(order.id)}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-xs hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,212,200,0.25)] flex items-center gap-2"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            إعادة طلب جميع الأصناف ({order.items.length})
                          </button>

                          {/* E-Invoice Button */}
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-2 transition-colors"
                          >
                            <Receipt className="w-3.5 h-3.5 text-cyan-400" />
                            عرض الفاتورة الإلكترونية
                          </button>
                        </div>

                        {/* Left side: Cancel Order & Need Help */}
                        <div className="flex items-center gap-2">
                          {canCancel && (
                            <button
                              onClick={() => setOrderToCancel(order)}
                              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              إلغاء الطلب
                            </button>
                          )}

                          <button
                            onClick={() => {
                              showToast(
                                'info',
                                'خدمة العملاء والدعم',
                                `تم فتح تذكرة دعم للطلب #${order.orderNumber}. فريق فينك معك على مدار الساعة.`
                              );
                            }}
                            className="p-2.5 rounded-xl bg-[#0a0a0f] hover:bg-white/5 text-slate-400 hover:text-white border border-[#2a2a3a] text-xs font-bold transition-colors"
                            title="مساعدة بخصوص هذا الطلب"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#ff3366]" />
              المنتجات المحفوظة في المفضلة ({favoriteProducts.length})
            </h3>
            <button
              onClick={() => navigateTo('products')}
              className="text-xs text-[#00d4c8] hover:underline font-bold"
            >
              استعراض المزيد من المنتجات ←
            </button>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="bg-[#12121a] rounded-3xl border border-[#2a2a3a] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto text-3xl">
                ❤️
              </div>
              <h3 className="text-lg font-bold text-white">قائمة المفضلة فارغة</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                يمكنك حفظ أي منتج يعجبك أثناء التسوق بالنقر على أيقونة القلب للعودة إليه وإضافته للسلة لاحقاً.
              </p>
              <button
                onClick={() => navigateTo('products')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-xs hover:scale-105 transition-all shadow-lg"
              >
                تصفح المنتجات الآن
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#12121a] rounded-2xl border border-[#2a2a3a] p-4 flex flex-col justify-between hover:border-[#00d4c8]/40 transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-14 h-14 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-3xl">
                        {prod.icon || '📦'}
                      </div>
                      <button
                        onClick={() => toggleFavorite(prod.id)}
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="إزالة من المفضلة"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <h4 className="font-bold text-white text-sm line-clamp-1 mb-1">{prod.name}</h4>
                    <p className="text-xs text-cyan-400 font-semibold mb-2">{prod.store}</p>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {prod.desc || 'منتج عالي الجودة متوفر لدى المتجر المعتمد.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2a2a3a] flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-[#00d4c8]">{prod.price} ر.س</span>
                      {prod.oldPrice && (
                        <span className="text-xs text-slate-500 line-through mr-2">
                          {prod.oldPrice} ر.س
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(prod.id)}
                      className="px-3.5 py-2 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black text-xs flex items-center gap-1.5 hover:scale-105 transition-all shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      أضف للسلة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INVOICES & TRANSACTIONS */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              سجل الفواتير الضريبية المبسطة ({orders.length})
            </h3>
          </div>

          <div className="bg-[#12121a] rounded-3xl border border-[#2a2a3a] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#1a1a24] text-slate-400 border-b border-[#2a2a3a]">
                  <tr>
                    <th className="p-4 font-bold">رقم الفاتورة</th>
                    <th className="p-4 font-bold">التاريخ</th>
                    <th className="p-4 font-bold">المحلات المشاركة</th>
                    <th className="p-4 font-bold">طريقة الدفع</th>
                    <th className="p-4 font-bold">المبلغ الإجمالي</th>
                    <th className="p-4 font-bold">حالة الطلب</th>
                    <th className="p-4 font-bold text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a3a] text-slate-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-mono font-bold text-cyan-400">
                        INV-{order.orderNumber}
                      </td>
                      <td className="p-4">{order.date}</td>
                      <td className="p-4">
                        <span className="font-semibold text-white">
                          {Array.from(new Set(order.items.map((i) => i.store))).join('، ')}
                        </span>
                      </td>
                      <td className="p-4">{renderPaymentBadge(order.paymentMethod)}</td>
                      <td className="p-4 font-black text-[#00d4c8] text-sm">
                        {order.total} ر.س
                      </td>
                      <td className="p-4">{renderStatusBadge(order.status)}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-[#00d4c8] border border-cyan-500/30 font-bold transition-all"
                          >
                            عرض الفاتورة
                          </button>

                          <button
                            onClick={() => reorderOrder(order.id)}
                            title="إعادة الطلب"
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
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

      {/* TAB 4: SAVED ADDRESSES & SETTINGS */}
      {activeTab === 'addresses' && (
        <div className="max-w-2xl bg-[#12121a] rounded-3xl border border-[#2a2a3a] p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#00d4c8]" />
              بيانات العميل وعناوين التوصيل
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              تُستخدم هذه البيانات تلقائياً عند إجراء وتتبع الطلبات الموحدة في المنصة.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رقم الجوال *
                </label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8] text-left dir-ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  المدينة الرئيسية *
                </label>
                <select
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
                >
                  <option value="ولاية المغير">ولاية المغير</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="مكة المكرمة">مكة المكرمة</option>
                  <option value="المدينة المنورة">المدينة المنورة</option>
                  <option value="الدمام">الدمام</option>
                  <option value="الخبر">الخبر</option>
                  <option value="القصيم">القصيم</option>
                  <option value="أبها">أبها</option>
                  <option value="تبوك">تبوك</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                عنوان التوصيل بالتفصيل (الحي، الشارع، المبنى) *
              </label>
              <textarea
                required
                rows={3}
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                placeholder="اسم الحي، الشارع، رقم العمارة أو المنزل..."
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                ملاحظات المندوب والتسليم
              </label>
              <input
                type="text"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="مثال: الاتصال قبل الوصول بـ 15 دقيقة"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#00d4c8]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-sm hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,212,200,0.3)]"
            >
              حفظ التعديلات في الحساب
            </button>
          </form>
        </div>
      )}

      {/* E-INVOICE MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedInvoiceOrder(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <div className="relative w-full max-w-2xl bg-[#12121a] border border-[#00d4c8]/50 rounded-3xl overflow-hidden shadow-2xl z-10 animate-fade-in text-slate-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#1a1a24] border-b border-[#2a2a3a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black flex items-center justify-center text-xl">
                  F
                </div>
                <div>
                  <h3 className="text-base font-black text-white">فاتورة ضريبية مبسطة (الكترونية)</h3>
                  <p className="text-xs text-slate-400">منصة فينك للتجارة والمتاجر والحرفيين</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center gap-1 border border-white/10"
                >
                  <Printer className="w-3.5 h-3.5" />
                  طباعة
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Invoice Printable Sheet Content */}
            <div className="p-6 sm:p-8 space-y-6 bg-[#0e0e16] text-xs">
              
              {/* Top Details & QR Stamp */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#161622] border border-[#2a2a3a]">
                <div className="space-y-1">
                  <div className="text-sm font-black text-white">
                    رقم الفاتورة: <span className="text-[#00d4c8]">INV-{selectedInvoiceOrder.orderNumber}</span>
                  </div>
                  <div className="text-slate-400">
                    تاريخ الإصدار: <span className="text-slate-200 font-semibold">{selectedInvoiceOrder.date}</span>
                  </div>
                  <div className="text-slate-400">
                    الرقم الضريبي للمنصة: <span className="text-slate-200 font-mono">310928475900003</span>
                  </div>
                  <div className="text-slate-400">
                    حالة السداد: <span className="text-emerald-400 font-bold">مدفوع بالكامل ({renderPaymentBadge(selectedInvoiceOrder.paymentMethod)})</span>
                  </div>
                </div>

                {/* QR Code graphic placeholder */}
                <div className="flex flex-col items-center p-3 bg-white text-black rounded-xl">
                  <div className="w-20 h-20 bg-slate-900 flex items-center justify-center text-white font-mono text-[9px] text-center p-1 rounded">
                    ZATCA e-Invoice QR Code Verified
                  </div>
                  <span className="text-[9px] font-bold mt-1 text-slate-800">فاتورة معتمدة</span>
                </div>
              </div>

              {/* Customer and Shipping Details */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#161622] border border-[#2a2a3a]">
                <div>
                  <span className="text-slate-400 block mb-1 font-bold">بيانات العميل:</span>
                  <p className="font-bold text-white">{selectedInvoiceOrder.customerName}</p>
                  <p className="text-slate-400 dir-ltr text-right">{selectedInvoiceOrder.customerPhone}</p>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1 font-bold">عنوان الشحن:</span>
                  <p className="text-white font-semibold">{selectedInvoiceOrder.customerAddress || 'الرياض - حي الياسمين'}</p>
                  <p className="text-cyan-400 font-bold">شحن موحد لجميع المتاجر</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-[#2a2a3a] rounded-2xl overflow-hidden">
                <table className="w-full text-right">
                  <thead className="bg-[#1a1a24] text-slate-400">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">الصنف</th>
                      <th className="p-3">المتجر</th>
                      <th className="p-3">الكمية</th>
                      <th className="p-3">سعر الوحدة</th>
                      <th className="p-3">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a3a]">
                    {selectedInvoiceOrder.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="p-3 text-slate-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-white">{item.name}</td>
                        <td className="p-3 text-cyan-300">{item.store}</td>
                        <td className="p-3 font-bold">{item.qty}</td>
                        <td className="p-3">{item.price} ر.س</td>
                        <td className="p-3 font-black text-white">{item.price * item.qty} ر.س</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Breakdown with 15% VAT */}
              <div className="p-4 rounded-2xl bg-[#161622] border border-[#2a2a3a] space-y-2 text-right">
                <div className="flex justify-between text-slate-400">
                  <span>المجموع الفرعي (غير شامل الضريبة):</span>
                  <span className="font-bold text-white">
                    {(selectedInvoiceOrder.subtotal / 1.15).toFixed(2)} ر.س
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ضريبة القيمة المضافة (15% VAT):</span>
                  <span className="font-bold text-white">
                    {(selectedInvoiceOrder.subtotal - selectedInvoiceOrder.subtotal / 1.15).toFixed(2)} ر.س
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>رسوم الشحن والتوصيل الموحد:</span>
                  <span className="font-bold text-cyan-400">{selectedInvoiceOrder.deliveryFee} ر.س</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#2a2a3a]">
                  <span>الإجمالي النهائي المستحق:</span>
                  <span className="text-[#00d4c8] text-lg">{selectedInvoiceOrder.total} ر.س</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-[#1a1a24] border-t border-[#2a2a3a] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  reorderOrder(selectedInvoiceOrder.id);
                  setSelectedInvoiceOrder(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                إعادة طلب هذه الفاتورة
              </button>

              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL ORDER CONFIRMATION MODAL */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setOrderToCancel(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#12121a] border border-rose-500/50 rounded-3xl p-6 shadow-2xl z-10 animate-fade-in text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto text-2xl">
              ⚠️
            </div>

            <h3 className="text-lg font-black text-white">تأكيد إلغاء الطلب #{orderToCancel.orderNumber}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟ سيتم إخطار المتاجر المعنية فوراً وإلغاء الشحنة.
            </p>

            <div className="text-right">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                سبب الإلغاء:
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="تغيير عنوان التوصيل أو رغبة العميل">تغيير عنوان التوصيل أو رغبة العميل</option>
                <option value="الرغبة في إضافة أو تغيير منتجات أخرى">الرغبة في إضافة أو تغيير منتجات أخرى</option>
                <option value="التأخر في المعالجة">التأخر في المعالجة</option>
                <option value="طلب بالخطأ">طلب بالخطأ</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all shadow-lg"
              >
                نعم، تأكيد الإلغاء
              </button>
              <button
                onClick={() => setOrderToCancel(null)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
              >
                تراجع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
