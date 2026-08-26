import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Star,
  ShoppingBag,
  Phone,
  Mail,
  Heart,
  Plus,
  Search,
  CheckCircle2,
  Share2,
  Crown
} from 'lucide-react';
import { MediaImage } from '../components/MediaImage';

export const StoreDetailView: React.FC = () => {
  const { stores, products, selectedStoreId, navigateTo, addToCart, toggleFavorite, favorites, showToast } = useApp();
  const [productSearch, setProductSearch] = useState('');

  const store = stores.find((s) => s.id === selectedStoreId) || stores[0];
  const storeProducts = products.filter(
    (p) =>
      p.storeId === store.id &&
      (p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.desc && p.desc.toLowerCase().includes(productSearch.toLowerCase())))
  );

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Store Hero Header */}
      <div className={`relative bg-gradient-to-b ${store.bannerColor || 'from-cyan-950/80 via-[#1a1a24] to-[#0a0a0f]'} border-b border-[#2a2a3a] px-4 sm:px-8 py-12`}>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigateTo('stores')}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00d4c8] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لدليل المتاجر</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Real Store Logo / MediaImage */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#0a0a0f] border-4 border-[#1a1a24] overflow-hidden flex items-center justify-center text-5xl sm:text-6xl shadow-2xl shrink-0">
              <MediaImage
                src={store.image}
                alt={store.name}
                fallbackIcon={store.icon}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white">{store.name}</h1>
                <span className="px-3 py-1 rounded-full bg-[#00d4c8]/15 border border-[#00d4c8]/30 text-[#00d4c8] text-xs font-black">
                  {store.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  بائع معتمد 🇩🇿
                </span>
                {store.isVip && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md">
                    <Crown className="w-3.5 h-3.5 fill-slate-950" /> متجر VIP
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {store.desc}
              </p>

              {/* Badges / Contacts */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-semibold">
                <div className="flex items-center gap-1.5 text-amber-400 font-black">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{store.rating} ({store.reviews} تقييم)</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <ShoppingBag className="w-4 h-4 text-[#00d4c8]" />
                  <span>{storeProducts.length} منتج متاح</span>
                </div>

                {store.phone && (
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Phone className="w-4 h-4 text-[#00d4c8]" />
                    <span className="dir-ltr">{store.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('success', 'تم نسخ الرابط', 'يمكنك الآن مشاركة رابط المتجر');
              }}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center gap-2 text-xs font-bold transition-all"
            >
              <Share2 className="w-4 h-4" />
              مشاركة المتجر
            </button>
          </div>
        </div>
      </div>

      {/* Store Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        {/* Search header within store */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              منتجات <span className="text-[#00d4c8]">{store.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">تسوق مباشرة من هذا المتجر واطلب بأفضل الأسعار المعتمدة</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="ابحث في منتجات المتجر..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d4c8]"
            />
          </div>
        </div>

        {/* Products Grid */}
        {storeProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#1a1a24]/50 border border-[#2a2a3a] rounded-3xl p-8 max-w-md mx-auto text-slate-400">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <h4 className="text-base font-bold text-white mb-1">لا توجد منتجات مطابقة في هذا المتجر</h4>
            <p className="text-xs text-slate-400">جرب البحث بكلمة مختلفة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeProducts.map((prod) => {
              const isFav = favorites.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#00d4c8]/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Media Image Box */}
                    <div className="h-52 bg-gradient-to-b from-[#12121a] to-[#0a0a0f] relative flex items-center justify-center overflow-hidden">
                      <MediaImage
                        src={prod.image}
                        alt={prod.name}
                        fallbackIcon={prod.icon}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {prod.badge && (
                        <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#ff3366] text-white text-[11px] font-black shadow-lg shadow-[#ff3366]/30 z-10">
                          {prod.badge}
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(prod.id);
                        }}
                        className={`absolute top-3.5 left-3.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-10 ${
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
                        {prod.category}
                      </span>
                      <h4 className="text-sm font-bold text-white truncate" title={prod.name}>
                        {prod.name}
                      </h4>
                      {prod.desc && (
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {prod.desc}
                        </p>
                      )}

                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-lg font-black text-[#00d4c8]">
                          {prod.price.toLocaleString()} د.ج
                        </span>
                        {prod.oldPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            {prod.oldPrice.toLocaleString()} د.ج
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
        )}
      </div>
    </div>
  );
};
