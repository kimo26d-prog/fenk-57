import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Plus,
  Filter,
  ArrowUpDown,
  Store as StoreIcon
} from 'lucide-react';

export const ProductsView: React.FC = () => {
  const { products, categories, addToCart, toggleFavorite, favorites, navigateTo } = useApp();
  
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'rating'>('default');

  let filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'الكل' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.store.toLowerCase().includes(search.toLowerCase()) ||
      (p.desc && p.desc.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  if (sortBy === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          جميع <span className="text-[#00d4c8]">المنتجات</span>
        </h1>
        <p className="text-sm text-slate-400">
          تسوق آلاف المنتجات المميزة والأصلية من مختلف المحلات التجارية في مكان واحد
        </p>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن منتج أو متجر (مثال: آيفون، قميص، عطر)..."
            className="w-full pr-12 pl-4 py-3.5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-[#00d4c8] shadow-lg transition-colors placeholder:text-slate-500"
          />
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 bg-[#1a1a24] border border-[#2a2a3a] rounded-2xl px-4 py-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer"
          >
            <option value="default" className="bg-[#1a1a24]">الترتيب الافتراضي</option>
            <option value="price_asc" className="bg-[#1a1a24]">السعر: من الأقل للأعلى</option>
            <option value="price_desc" className="bg-[#1a1a24]">السعر: من الأعلى للأقل</option>
            <option value="rating" className="bg-[#1a1a24]">الأعلى تقييماً</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
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

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-[#1a1a24]/50 border border-[#2a2a3a] rounded-3xl p-8 max-w-md mx-auto">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <h4 className="text-lg font-bold text-white mb-1">لا توجد منتجات مطابقة</h4>
          <p className="text-xs text-slate-400">جرب البحث بكلمة مختلفة أو تغيير التصنيف</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((prod) => {
            const isFav = favorites.includes(prod.id);
            return (
              <div
                key={prod.id}
                className="bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#00d4c8]/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Image / Icon container */}
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

                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <button
                      onClick={() => navigateTo('store-detail', { storeId: prod.storeId })}
                      className="text-[11px] font-bold text-[#00d4c8] hover:underline flex items-center gap-1 block"
                    >
                      <StoreIcon className="w-3 h-3" />
                      <span>{prod.store}</span>
                    </button>

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
      )}
    </div>
  );
};
