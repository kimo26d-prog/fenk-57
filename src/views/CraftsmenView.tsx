import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Wrench,
  Star,
  MapPin,
  Car,
  Briefcase,
  Clock,
  Phone,
  MessageSquare,
  PlusCircle,
  CheckCircle2,
  Filter,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { ALGERIAN_WILAYAS } from '../data/algerianWilayas';
import { MediaImage } from '../components/MediaImage';

export const CraftsmenView: React.FC = () => {
  const {
    craftsmen,
    navigateTo,
    openChatWithCraftsman,
    setIsCraftsmanRegisterModalOpen,
    setIsVipModalOpen,
    showToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [onlyMobile, setOnlyMobile] = useState(false);

  const professions = [
    { value: 'all', label: 'جميع المهن والتخصصات' },
    { value: 'بناء', label: 'بناء وتشطيب' },
    { value: 'نجار', label: 'نجارة وديكور' },
    { value: 'سباك', label: 'سباكة وتمديدات' },
    { value: 'كهربائي', label: 'كهرباء وإنارة' },
    { value: 'دهان', label: 'دهانات وبويات' },
    { value: 'حداد', label: 'حدادة ولحام' },
    { value: 'مبلط', label: 'بلاط ورخام' },
    { value: 'تكييف', label: 'تكييف وتبريد' }
  ];

  const cities = [
    { value: 'all', label: 'جميع ولايات الجزائر 🇩🇿 (69 ولاية)' },
    ...ALGERIAN_WILAYAS.map((w) => ({
      value: w.ar,
      label: `${w.code} - ${w.ar} (${w.name})`
    }))
  ];

  const filteredCraftsmen = craftsmen
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.profession.toLowerCase().includes(search.toLowerCase()) ||
        c.bio.toLowerCase().includes(search.toLowerCase()) ||
        c.skills.some((sk) => sk.toLowerCase().includes(search.toLowerCase()));

      const matchesProf =
        selectedProfession === 'all' || c.profession.includes(selectedProfession);

      const matchesCity =
        selectedCity === 'all' || c.city.includes(selectedCity);

      const matchesMobility = !onlyMobile || c.mobility;

      return c.status === 'active' && matchesSearch && matchesProf && matchesCity && matchesMobility;
    })
    .sort((a, b) => {
      // VIP craftsmen always placed first
      if (a.isVip && !b.isVip) return -1;
      if (!a.isVip && b.isVip) return 1;
      return (b.vipPriority || 0) - (a.vipPriority || 0);
    });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>خدمات الحرفيين والمقاولين المعتمدين في الـ 69 ولاية جزائرية 🇩🇿</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          سوق <span className="text-purple-400">الحرفيين والمهن بالجزائر</span>
        </h1>
        <p className="text-sm text-slate-400">
          اكتشف أفضل المقاولين، السباكين، الكهربائيين والفنيين في ولايتك، شاهد أعمالهم السابقة وتواصل معهم مباشرة
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-center">
          <span className="block text-2xl sm:text-3xl font-black text-[#00d4c8]">69</span>
          <span className="text-xs text-slate-400">ولاية جزائرية مغطاة</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-center">
          <span className="block text-2xl sm:text-3xl font-black text-[#00e676]">+3,500</span>
          <span className="text-xs text-slate-400">حرفي ومقاول مسجل</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-center">
          <span className="block text-2xl sm:text-3xl font-black text-amber-400">4.9</span>
          <span className="text-xs text-slate-400">متوسط تقييم العملاء</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-center">
          <span className="block text-2xl sm:text-3xl font-black text-purple-400">100%</span>
          <span className="text-xs text-slate-400">خدمات معتمدة وموثقة</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-3xl p-5 mb-10 shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم الحرفي أو المهنة..."
              className="w-full pr-10 pl-3.5 py-3 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Profession filter */}
          <div>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs font-bold text-white focus:outline-none focus:border-purple-500"
            >
              {professions.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* City filter */}
          <div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs font-bold text-white focus:outline-none focus:border-purple-500"
            >
              {cities.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Register & VIP CTA buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsVipModalOpen(true)}
              className="px-3.5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-all shrink-0"
              title="ترقية اشتراك حرفي VIP"
            >
              <Crown className="w-3.5 h-3.5 fill-slate-950" />
              <span>VIP 👑</span>
            </button>

            <button
              onClick={() => setIsCraftsmanRegisterModalOpen(true)}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:scale-105 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              سجل كحرفي
            </button>
          </div>
        </div>

        {/* Mobility checkbox toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-[#2a2a3a]/60 text-xs text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyMobile}
              onChange={(e) => setOnlyMobile(e.target.checked)}
              className="w-4 h-4 rounded accent-purple-500"
            />
            <span>إظهار الحرفيين المستعدين للتنقل خارج مدينتهم فقط</span>
          </label>

          <span className="text-slate-400 font-semibold">
            عدد النتائج: {filteredCraftsmen.length} حرفي
          </span>
        </div>
      </div>

      {/* Craftsmen Grid */}
      {filteredCraftsmen.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-[#1a1a24]/50 border border-[#2a2a3a] rounded-3xl p-8 max-w-md mx-auto">
          <Wrench className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <h4 className="text-lg font-bold text-white mb-1">لا يوجد حرفيين مطابقين لبحثك</h4>
          <p className="text-xs text-slate-400">جرب تغيير معايير البحث أو اختيار مهنة أخرى</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCraftsmen.map((c) => (
            <div
              key={c.id}
              onClick={() => navigateTo('craftsman-profile', { craftsmanId: c.id })}
              className={`group bg-[#1a1a24] border ${c.isVip ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.12)]' : 'border-[#2a2a3a]'} hover:border-purple-500/60 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between`}
            >
              <div className="space-y-4">
                
                {/* Header with Avatar & Details */}
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 overflow-hidden flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0 group-hover:scale-105 transition-transform">
                    <MediaImage
                      src={c.photo || c.avatarImage}
                      alt={c.name}
                      fallbackIcon={c.avatar}
                      className="w-full h-full object-cover"
                    />
                    {c.isVip && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md z-10">
                        <Crown className="w-3.5 h-3.5 fill-slate-950" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-white truncate">{c.name}</h3>
                      {c.verified && (
                        <CheckCircle2 className="w-4 h-4 text-[#00d4c8] shrink-0" title="حرفي موثق" />
                      )}
                      {c.isVip && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black">
                          VIP
                        </span>
                      )}
                    </div>
                    
                    <span className="text-xs font-bold text-purple-400 block mt-0.5">
                      {c.profession}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00d4c8]" />
                      <span>{c.city}</span>
                    </div>
                  </div>
                </div>

                {/* Rating and Mobility badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{c.rating} ({c.reviews} تقييم)</span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                      c.mobility
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <Car className="w-3 h-3" />
                    {c.mobility ? 'متاح للتنقل' : 'في مدينته فقط'}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {c.bio}
                </p>

                {/* Skills chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {c.skills.slice(0, 3).map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-0.5 rounded-lg bg-[#0a0a0f] border border-[#2a2a3a] text-[10px] font-semibold text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                  {c.skills.length > 3 && (
                    <span className="px-2 py-0.5 rounded-lg bg-[#0a0a0f] text-[10px] text-slate-500 font-semibold">
                      +{c.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs pt-3 border-t border-[#2a2a3a] text-slate-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                    {c.jobs} عملية منجزة
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00d4c8]" />
                    {c.experience} سنة خبرة
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openChatWithCraftsman(c);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  دردشة مباشرة
                </button>

                <a
                  href={`tel:${c.phone}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast('info', 'الاتصال بالحرفي', `رقم الهاتف: ${c.phone}`);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-white/10 flex items-center justify-center transition-colors"
                  title="اتصال هاتفي"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('craftsman-profile', { craftsmanId: c.id });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-colors"
                >
                  الملف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
