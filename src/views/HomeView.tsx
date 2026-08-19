import React from 'react';
import { useApp } from '../context/AppContext';
import { AlgeriaMap } from '../components/AlgeriaMap';
import {
  Store as StoreIcon,
  ShoppingBag,
  Wrench,
  Star,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Zap,
  Sparkles,
  Heart,
  Plus,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    stores,
    products,
    craftsmen,
    navigateTo,
    addToCart,
    toggleFavorite,
    favorites,
    openChatWithCraftsman
  } = useApp();

  const featuredStores = stores.filter((s) => s.status === 'active').slice(0, 3);
  const featuredProducts = products.slice(0, 4);
  const featuredCraftsmen = craftsmen.filter((c) => c.status === 'active').slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
        
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#00d4c8]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#ff3366]/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4c808_1px,transparent_1px),linear-gradient(to_bottom,#00d4c808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        {/* Floating preview cards */}
        <div className="hidden lg:block absolute top-28 right-12 animate-float-slow z-10 pointer-events-none">
          <div className="p-3.5 rounded-2xl bg-[#1a1a24]/90 border border-[#2a2a3a] backdrop-blur-xl shadow-2xl flex items-center gap-3 w-56">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-[#00d4c8] text-2xl flex items-center justify-center">
              👟
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">حذاء إير ماكس</h5>
              <span className="text-xs font-black text-[#00d4c8]">320 ر.س</span>
              <span className="block text-[10px] text-slate-400">رياضة بلس للأبطال</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-24 left-12 animate-float-slow [animation-delay:2s] z-10 pointer-events-none">
          <div className="p-3.5 rounded-2xl bg-[#1a1a24]/90 border border-[#2a2a3a] backdrop-blur-xl shadow-2xl flex items-center gap-3 w-60">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-2xl flex items-center justify-center">
              👷‍♂️
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">أحمد العتيبي (مقاول)</h5>
              <span className="text-xs font-black text-purple-400">★ 4.9 (142 تقييم)</span>
              <span className="block text-[10px] text-emerald-400 font-semibold">متاح للتنقل الفوري</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-1/2 left-8 -translate-y-1/2 animate-float-slow [animation-delay:4s] z-10 pointer-events-none">
          <div className="p-3 rounded-2xl bg-[#1a1a24]/90 border border-[#2a2a3a] backdrop-blur-xl shadow-2xl flex items-center gap-3 w-52">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-xl flex items-center justify-center">
              📱
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">آيفون 16 برو ماكس</h5>
              <span className="text-xs font-black text-rose-400">الأكثر مبيعاً 🔥</span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center z-20 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00d4c8]/10 border border-[#00d4c8]/30 text-[#00d4c8] text-xs font-bold shadow-[0_0_20px_rgba(0,212,200,0.15)] animate-pulse-subtle">
            <Sparkles className="w-4 h-4" />
            <span>سوق المتاجر والخدمات والحرفيين الأول في المملكة</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight sm:leading-none tracking-tight">
            اكتشف <span className="bg-gradient-to-r from-[#00d4c8] via-teal-200 to-white bg-clip-text text-transparent">أفضل المحلات</span> والحرفيين في مكان واحد
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            منصة فينك (Fenk) تجمع لك مئات المتاجر المعتمدة ونخبة الحرفيين المهرة. تسوق بسهولة واطلب من محلات متعددة بشحنة واحدة مجمعة أو تواصل مع أفضل الفنيين فوراً.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={() => navigateTo('stores')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-black text-base shadow-[0_0_30px_rgba(0,212,200,0.35)] hover:shadow-[0_0_40px_rgba(0,212,200,0.5)] hover:scale-105 transition-all flex items-center gap-2.5"
            >
              <StoreIcon className="w-5 h-5" />
              تصفح المحلات المعتمدة
            </button>

            <button
              onClick={() => navigateTo('craftsmen')}
              className="px-8 py-4 rounded-2xl bg-[#1a1a24] hover:bg-purple-500/20 text-purple-300 font-black text-base border border-purple-500/40 hover:border-purple-400 hover:scale-105 transition-all flex items-center gap-2.5 shadow-lg shadow-purple-500/10"
            >
              <Wrench className="w-5 h-5 text-purple-400" />
              سوق الحرفيين والمهن
            </button>

            <button
              onClick={() => navigateTo('products')}
              className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-base border border-white/10 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-[#00d4c8]" />
              كافة المنتجات
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#1a1a24]/60 border border-[#2a2a3a]">
              <span className="block text-2xl sm:text-3xl font-black text-[#00d4c8]">+500</span>
              <span className="text-xs text-slate-400 font-semibold">محل تجاري معتمد</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1a1a24]/60 border border-[#2a2a3a]">
              <span className="block text-2xl sm:text-3xl font-black text-[#00e676]">+50K</span>
              <span className="text-xs text-slate-400 font-semibold">منتج متنوع وأصلي</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1a1a24]/60 border border-[#2a2a3a]">
              <span className="block text-2xl sm:text-3xl font-black text-purple-400">+2,500</span>
              <span className="text-xs text-slate-400 font-semibold">حرفي وفني موثق</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1a1a24]/60 border border-[#2a2a3a]">
              <span className="block text-2xl sm:text-3xl font-black text-amber-400">69 ولاية</span>
              <span className="text-xs text-slate-400 font-semibold">تغطية شاملة للجزائر</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Algeria Map Section */}
      <AlgeriaMap />

      {/* Featured Stores Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00d4c8] mb-1">
              <Star className="w-4 h-4 fill-[#00d4c8]" />
              <span>متاجر معتمدة ذات تقييم فائق</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              محلات ومتاجر <span className="text-[#00d4c8]">مميزة</span>
            </h2>
          </div>

          <button
            onClick={() => navigateTo('stores')}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#00d4c8]/20 text-[#00d4c8] font-bold text-xs sm:text-sm border border-[#00d4c8]/30 flex items-center gap-2 transition-all"
          >
            <span>عرض كافة المحلات ({stores.length})</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStores.map((store) => (
            <div
              key={store.id}
              onClick={() => navigateTo('store-detail', { storeId: store.id })}
              className="group bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#00d4c8]/60 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(0,212,200,0.15)]"
            >
              {/* Store Banner */}
              <div className={`h-36 bg-gradient-to-r ${store.bannerColor || 'from-cyan-900/60 to-slate-900'} relative p-4 flex items-start justify-between`}>
                <span className="px-3 py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md text-[#00d4c8] text-xs font-black border border-[#00d4c8]/30">
                  {store.category}
                </span>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{store.rating}</span>
                </div>

                {/* Logo floating */}
                <div className="absolute -bottom-8 right-6 w-18 h-18 rounded-2xl bg-[#0a0a0f] border-4 border-[#1a1a24] flex items-center justify-center text-4xl shadow-xl group-hover:scale-105 transition-transform">
                  {store.icon}
                </div>
              </div>

              {/* Store Info */}
              <div className="p-6 pt-12 space-y-3">
                <h3 className="text-lg font-black text-white group-hover:text-[#00d4c8] transition-colors">
                  {store.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {store.desc}
                </p>

                <div className="pt-3 border-t border-[#2a2a3a] flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#00d4c8]" />
                    {store.products} منتج متاح
                  </span>
                  <span>{store.reviews} تقييم حقيقي</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff3366] mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>الأكثر طلباً وتفضيلاً هذا الأسبوع</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              عروض ومنتجات <span className="text-[#00d4c8]">مختارة</span>
            </h2>
          </div>

          <button
            onClick={() => navigateTo('products')}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#00d4c8]/20 text-[#00d4c8] font-bold text-xs sm:text-sm border border-[#00d4c8]/30 flex items-center gap-2 transition-all"
          >
            <span>تصفح الكل</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => {
            const isFav = favorites.includes(prod.id);
            return (
              <div
                key={prod.id}
                className="bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#00d4c8]/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Image/Icon Box */}
                  <div className="h-52 bg-gradient-to-b from-[#12121a] to-[#0a0a0f] relative flex items-center justify-center text-7xl p-4 overflow-hidden">
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {prod.icon}
                    </span>

                    {prod.badge && (
                      <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#ff3366] text-white text-[11px] font-black shadow-lg shadow-[#ff3366]/30">
                        {prod.badge}
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(prod.id);
                      }}
                      className={`absolute top-3.5 left-3.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        isFav
                          ? 'bg-[#ff3366] text-white'
                          : 'bg-black/40 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-bold text-[#00d4c8] block">
                      {prod.store}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate" title={prod.name}>
                      {prod.name}
                    </h4>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-lg font-black text-[#00d4c8]">
                        {prod.price} ر.س
                      </span>
                      {prod.oldPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          {prod.oldPrice} ر.س
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => addToCart(prod.id)}
                    className="w-full py-2.5 rounded-xl bg-[#00d4c8] hover:bg-[#00b8ad] text-[#0a0a0f] font-black text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,212,200,0.2)] hover:shadow-[0_0_25px_rgba(0,212,200,0.4)]"
                  >
                    <Plus className="w-4 h-4" />
                    أضف للسلة
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Craftsmen Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-1">
              <Award className="w-4 h-4" />
              <span>نخبة المقاولين والفنيين المعتمدين</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              سوق الحرفيين <span className="text-purple-400">والخدمات</span>
            </h2>
          </div>

          <button
            onClick={() => navigateTo('craftsmen')}
            className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-xs sm:text-sm border border-purple-500/30 flex items-center gap-2 transition-all"
          >
            <span>استعراض كافة الحرفيين</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCraftsmen.map((c) => (
            <div
              key={c.id}
              onClick={() => navigateTo('craftsman-profile', { craftsmanId: c.id })}
              className="bg-[#1a1a24] border border-[#2a2a3a] hover:border-purple-500/60 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-3xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                    {c.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-white">{c.name}</h4>
                      {c.verified && (
                        <CheckCircle2 className="w-4 h-4 text-[#00d4c8]" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-purple-400 block">{c.profession}</span>
                    <span className="text-xs text-slate-400">{c.city}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {c.bio}
                </p>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-[#2a2a3a]">
                  <span className="flex items-center gap-1 text-amber-400 font-black">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {c.rating} ({c.reviews} تقييم)
                  </span>
                  <span className="text-slate-400 font-semibold">{c.jobs} عملية منجزة</span>
                </div>
              </div>

              <div className="pt-5 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openChatWithCraftsman(c);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  محادثة فورية
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('craftsman-profile', { craftsmanId: c.id });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 transition-colors"
                >
                  الملف
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works 3-step section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="bg-gradient-to-b from-[#1a1a24] to-[#12121a] border border-[#2a2a3a] rounded-3xl p-8 sm:p-14">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              كيف يعمل <span className="text-[#00d4c8]">سوق فينك</span>؟
            </h3>
            <p className="text-sm text-slate-400">
              تجربة تسوق وحجز خدمات مبتكرة وبسيطة في ثلاث خطوات فقط
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-[#0a0a0f]/60 border border-[#2a2a3a] relative">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-[#00d4c8] border border-[#00d4c8]/30 flex items-center justify-center text-3xl mx-auto mb-5 shadow-[0_0_20px_rgba(0,212,200,0.2)]">
                🔍
              </div>
              <h4 className="font-extrabold text-base text-white mb-2">1. تصفح واختر</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                استعرض مئات المتاجر وآلاف المنتجات وقوائم الحرفيين المعتمدين في مدينتك بكل سهولة.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-[#0a0a0f]/60 border border-[#2a2a3a] relative">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto mb-5 shadow-[0_0_20px_rgba(255,171,0,0.2)]">
                🛒
              </div>
              <h4 className="font-extrabold text-base text-white mb-2">2. أضف للسلة أو دردش</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                اجمع منتجات من محلات متعددة في سلة واحدة، أو تواصل فورياً عبر المحادثة المباشرة مع الحرفي.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-[#0a0a0f]/60 border border-[#2a2a3a] relative">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto mb-5 shadow-[0_0_20px_rgba(0,230,118,0.2)]">
                🚚
              </div>
              <h4 className="font-extrabold text-base text-white mb-2">3. استلم بشحنة واحدة</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                توصيل موحد وسريع لكافة مشترياتك حتى باب منزلك مع ضمان معتمد وخدمة عملاء على مدار الساعة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
