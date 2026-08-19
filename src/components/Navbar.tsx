import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import fenkLogo from '../assets/images/fenk_logo_1787158316546.jpg';
import {
  Store as StoreIcon,
  ShoppingBag,
  Wrench,
  LayoutDashboard,
  ShieldCheck,
  Bell,
  Volume2,
  VolumeX,
  User,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Home,
  Package,
  Compass,
  Crown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    page,
    navigateTo,
    currentUser,
    logout,
    cartCount,
    setIsCartOpen,
    unreadNotifsCount,
    setIsNotifOpen,
    setIsLoginModalOpen,
    soundEnabled,
    toggleSound,
    setIsAddStoreModalOpen,
    setIsCraftsmanRegisterModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 h-[72px] bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#2a2a3a]/80 px-4 lg:px-8 transition-all">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0 select-none"
          >
            <div className="relative w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-tr from-[#00d4c8] via-[#00f2fe] to-[#4facfe] shadow-[0_0_20px_rgba(0,212,200,0.4)] group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(0,212,200,0.65)] transition-all duration-300 overflow-hidden flex items-center justify-center">
              <img
                src={fenkLogo}
                alt="Fenk Logo"
                className="w-full h-full object-cover rounded-[14px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#00d4c8] via-white to-slate-200 bg-clip-text text-transparent">
                fenk
              </span>
              <span className="text-[10px] -mt-1 font-semibold text-slate-400">
                سوق المتاجر والحرفيين
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                page === 'home'
                  ? 'text-[#00d4c8] bg-[#00d4c8]/10 border border-[#00d4c8]/30 shadow-[0_0_15px_rgba(0,212,200,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4" />
              الرئيسية
            </button>

            <button
              onClick={() => navigateTo('map')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                page === 'map'
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>الخريطة 🇩🇿</span>
            </button>

            <button
              onClick={() => navigateTo('stores')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                page === 'stores' || page === 'store-detail'
                  ? 'text-[#00d4c8] bg-[#00d4c8]/10 border border-[#00d4c8]/30 shadow-[0_0_15px_rgba(0,212,200,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <StoreIcon className="w-4 h-4" />
              المحلات
            </button>

            <button
              onClick={() => navigateTo('products')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                page === 'products'
                  ? 'text-[#00d4c8] bg-[#00d4c8]/10 border border-[#00d4c8]/30 shadow-[0_0_15px_rgba(0,212,200,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              المنتجات
            </button>

            <button
              onClick={() => navigateTo('craftsmen')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                page === 'craftsmen' || page === 'craftsman-profile'
                  ? 'text-[#00d4c8] bg-[#00d4c8]/10 border border-[#00d4c8]/30 shadow-[0_0_15px_rgba(0,212,200,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wrench className="w-4 h-4" />
              سوق الحرفيين
            </button>

            <button
              onClick={() => navigateTo('vip')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                page === 'vip'
                  ? 'text-amber-300 bg-amber-500/20 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>اشتراك VIP 👑</span>
            </button>

            <button
              onClick={() => navigateTo('profile')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                page === 'profile' || page === 'orders-tracking'
                  ? 'text-[#00d4c8] bg-[#00d4c8]/10 border border-[#00d4c8]/30 shadow-[0_0_15px_rgba(0,212,200,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="w-4 h-4" />
              سجل وتتبع الطلبات
            </button>

            {currentUser.type === 'vendor' && (
              <button
                onClick={() => navigateTo('dashboard')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  page === 'dashboard'
                    ? 'text-[#00e676] bg-[#00e676]/10 border border-[#00e676]/30'
                    : 'text-emerald-400 hover:bg-emerald-500/10'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                لوحة متجري
              </button>
            )}

            {currentUser.type === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  page === 'admin'
                    ? 'text-[#ff3366] bg-[#ff3366]/10 border border-[#ff3366]/30'
                    : 'text-rose-400 hover:bg-rose-500/10'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                لوحة المالك
              </button>
            )}
          </div>

          {/* Quick Actions (Wilaya Badge, Sound, Notifs, Cart, Auth) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Active Wilaya Indicator / Quick Switcher */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-all text-xs font-bold"
              title="انقر لتخصيص تنبيهات ولايتك"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{currentUser.wilaya || '57 - المغير'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                soundEnabled
                  ? 'border-[#00d4c8]/40 bg-[#00d4c8]/10 text-[#00d4c8] shadow-[0_0_10px_rgba(0,212,200,0.2)]'
                  : 'border-[#2a2a3a] bg-[#1a1a24] text-slate-400 hover:text-white'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative w-10 h-10 rounded-xl border border-[#2a2a3a] bg-[#1a1a24] text-slate-300 hover:text-[#00d4c8] hover:border-[#00d4c8]/50 flex items-center justify-center transition-all"
              title="الإشعارات الفورية"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff3366] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-[#ff3366]/40 animate-pulse">
                  {unreadNotifsCount > 9 ? '9+' : unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 sm:w-auto sm:px-3.5 sm:py-2 rounded-xl border border-[#00d4c8]/40 bg-gradient-to-r from-[#00d4c8]/20 to-[#00d4c8]/5 text-[#00d4c8] hover:bg-[#00d4c8]/25 flex items-center justify-center gap-2 transition-all font-bold text-sm shadow-[0_0_15px_rgba(0,212,200,0.15)]"
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">السلة</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:static bg-[#00d4c8] text-[#0a0a0f] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account button */}
            {currentUser.type === 'guest' ? (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-extrabold text-sm shadow-[0_0_20px_rgba(0,212,200,0.25)] hover:shadow-[0_0_30px_rgba(0,212,200,0.45)] hover:scale-[1.02] transition-all"
              >
                <User className="w-4 h-4" />
                دخول / تسجيل
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2 pl-1 border-r border-[#2a2a3a] pr-2">
                <div
                  onClick={() => {
                    if (currentUser.type === 'admin') navigateTo('admin');
                    else if (currentUser.type === 'vendor') navigateTo('dashboard');
                    else navigateTo('profile');
                  }}
                  className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#00d4c8]/40 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-[#00d4c8] flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-white max-w-[100px] truncate">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-semibold">
                      {currentUser.type === 'admin' ? 'المالك' : currentUser.type === 'vendor' ? 'بائع معتمد' : 'عميل'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  title="تسجيل الخروج"
                  className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl border border-[#2a2a3a] bg-[#1a1a24] text-slate-300 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl p-0.5 bg-gradient-to-tr from-[#00d4c8] to-[#00b8ad] shadow-[0_0_15px_rgba(0,212,200,0.4)] overflow-hidden flex items-center justify-center">
                <img
                  src={fenkLogo}
                  alt="Fenk Logo"
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-xl text-white">منصة فينك</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className="p-3.5 rounded-xl font-bold text-right flex items-center gap-3 bg-white/5 text-white"
            >
              <Home className="w-5 h-5 text-[#00d4c8]" />
              الرئيسية
            </button>

            <button
              onClick={() => {
                navigateTo('map');
                setMobileMenuOpen(false);
              }}
              className="p-3.5 rounded-xl font-bold text-right flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
            >
              <Compass className="w-5 h-5 text-emerald-400" />
              خريطة الجزائر التفاعلية (69 ولاية) 🇩🇿
            </button>

            <button
              onClick={() => {
                navigateTo('stores');
                setMobileMenuOpen(false);
              }}
              className="p-3.5 rounded-xl font-bold text-right flex items-center gap-3 bg-white/5 text-white"
            >
              <StoreIcon className="w-5 h-5 text-[#00d4c8]" />
              المحلات والمتاجر
            </button>

            <button
              onClick={() => {
                navigateTo('products');
                setMobileMenuOpen(false);
              }}
              className="p-3.5 rounded-xl font-bold text-right flex items-center gap-3 bg-white/5 text-white"
            >
              <ShoppingBag className="w-5 h-5 text-[#00d4c8]" />
              كافة المنتجات
            </button>

            <button
              onClick={() => {
                navigateTo('craftsmen');
                setMobileMenuOpen(false);
              }}
              className="p-3.5 rounded-xl font-bold text-right flex items-center gap-3 bg-white/5 text-white"
            >
              <Wrench className="w-5 h-5 text-[#00d4c8]" />
              سوق الحرفيين والمهن
            </button>

            <button
              onClick={() => {
                navigateTo('vip');
                setMobileMenuOpen(false);
              }}
              className="p-3.5 rounded-xl font-bold text-right flex items-center justify-between bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-500/30 text-amber-300 shadow-md"
            >
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>نادي المشتركين VIP 👑 (باقات مميزة)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black">
                حصري
              </span>
            </button>

            <button
              onClick={() => {
                navigateTo('profile');
                setMobileMenuOpen(false);
              }}
              className="p-3.5 rounded-xl font-bold text-right flex items-center gap-3 bg-[#00d4c8]/10 border border-[#00d4c8]/30 text-[#00d4c8]"
            >
              <Package className="w-5 h-5" />
              سجل وتتبع الطلبات
            </button>

            {currentUser.type === 'vendor' && (
              <button
                onClick={() => {
                  navigateTo('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="p-3.5 rounded-xl font-bold text-right flex items-center gap-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              >
                <LayoutDashboard className="w-5 h-5" />
                لوحة متجري
              </button>
            )}

            {currentUser.type === 'admin' && (
              <button
                onClick={() => {
                  navigateTo('admin');
                  setMobileMenuOpen(false);
                }}
                className="p-3.5 rounded-xl font-bold text-right flex items-center gap-3 bg-rose-500/10 text-rose-400 border border-rose-500/30"
              >
                <ShieldCheck className="w-5 h-5" />
                لوحة المالك
              </button>
            )}
          </div>

          <div className="mt-auto pb-10 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsAddStoreModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                سجل متجرك
              </button>

              <button
                onClick={() => {
                  setIsCraftsmanRegisterModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Wrench className="w-4 h-4" />
                سجل كحرفي
              </button>
            </div>

            {currentUser.type === 'guest' ? (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black text-center"
              >
                تسجيل الدخول / إنشاء حساب
              </button>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="font-bold text-sm text-white">{currentUser.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-400 text-sm font-bold flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
