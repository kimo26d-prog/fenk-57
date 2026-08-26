import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Store as StoreIcon,
  Star,
  ShoppingBag,
  PlusCircle,
  Filter,
  CheckCircle2,
  Crown
} from 'lucide-react';
import { MediaImage } from '../components/MediaImage';

export const StoresView: React.FC = () => {
  const { stores, categories, navigateTo, setIsAddStoreModalOpen, setIsVipModalOpen } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const filteredStores = stores
    .filter((s) => {
      const matchesCat = selectedCategory === 'الكل' || s.category === selectedCategory;
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase());
      return s.status === 'active' && matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      // VIP accounts appear first in search and directory
      if (a.isVip && !b.isVip) return -1;
      if (!a.isVip && b.isVip) return 1;
      return (b.vipPriority || 0) - (a.vipPriority || 0);
    });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          اكتشف <span className="text-[#00d4c8]">المحلات والمتاجر</span>
        </h1>
        <p className="text-sm text-slate-400">
          تصفح قائمة المتاجر المعتمدة في مختلف المجالات بالجزائر، مع أولوية الظهور للمشتركين بـ VIP المميزين
        </p>
      </div>

      {/* Search & Registration Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن متجر أو تصنيف (مثال: أزياء، إلكترونيات، مواد بناء)..."
            className="w-full pr-12 pl-4 py-3.5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-[#00d4c8] shadow-lg transition-colors placeholder:text-slate-500"
          />
        </div>

        <button
          onClick={() => setIsVipModalOpen(true)}
          className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-all shrink-0"
        >
          <Crown className="w-4 h-4 fill-slate-950" />
          ترقية لـ VIP 👑
        </button>

        <button
          onClick={() => setIsAddStoreModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-[#00d4c8] hover:bg-[#00b8ad] text-[#0a0a0f] font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,212,200,0.25)] hover:scale-105 transition-all shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          سجل متجرك
        </button>
      </div>

      {/* Categories Filter Pills */}
      <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar justify-start sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              selectedCategory === cat.name
                ? 'bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] shadow-[0_0_15px_rgba(0,212,200,0.3)]'
                : 'bg-[#1a1a24] border border-[#2a2a3a] text-slate-300 hover:text-white hover:border-[#00d4c8]/30'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Stores Grid */}
      {filteredStores.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-[#1a1a24]/50 border border-[#2a2a3a] rounded-3xl p-8 max-w-md mx-auto">
          <StoreIcon className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <h4 className="text-lg font-bold text-white mb-1">لا توجد محلات مطابقة للبحث</h4>
          <p className="text-xs text-slate-400">جرب البحث بكلمة أخرى أو اختر تصنيفاً مختلفاً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              onClick={() => navigateTo('store-detail', { storeId: store.id })}
              className={`group bg-[#1a1a24] border ${store.isVip ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.12)]' : 'border-[#2a2a3a]'} hover:border-[#00d4c8]/60 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(0,212,200,0.15)] flex flex-col justify-between`}
            >
              <div>
                {/* Store Header Banner */}
                <div className={`h-36 bg-gradient-to-r ${store.bannerColor || 'from-cyan-900/60 to-slate-900'} relative p-4 flex items-start justify-between`}>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md text-[#00d4c8] text-xs font-black border border-[#00d4c8]/30">
                      {store.category}
                    </span>
                    {store.isVip && (
                      <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md">
                        <Crown className="w-3.5 h-3.5 fill-slate-950" /> VIP
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{store.rating}</span>
                  </div>

                  {/* Real Logo / MediaImage */}
                  <div className="absolute -bottom-8 right-6 w-18 h-18 rounded-2xl bg-[#0a0a0f] border-4 border-[#1a1a24] overflow-hidden flex items-center justify-center text-4xl shadow-xl group-hover:scale-105 transition-transform">
                    <MediaImage
                      src={store.image}
                      alt={store.name}
                      fallbackIcon={store.icon}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 pt-12 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white group-hover:text-[#00d4c8] transition-colors">
                        {store.name}
                      </h3>
                      <CheckCircle2 className="w-4 h-4 text-[#00d4c8]" />
                    </div>
                    {store.isVip && (
                      <span className="text-[10px] text-amber-400 font-extrabold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                        صدارة البحث ★
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {store.desc}
                  </p>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-[#2a2a3a] flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#00d4c8]" />
                    {store.products} منتج متاح
                  </span>
                  <span>{store.reviews} تقييم</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
