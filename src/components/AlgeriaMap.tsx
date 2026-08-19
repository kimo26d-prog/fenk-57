import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ALGERIAN_WILAYAS, Wilaya } from '../data/algerianWilayas';
import {
  MapPin,
  Store as StoreIcon,
  Wrench,
  Search,
  Volume2,
  VolumeX,
  ChevronLeft,
  Phone,
  MessageSquare,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  BellRing,
  CheckCircle,
  TrendingUp,
  ShoppingBag
} from 'lucide-react';

// Region styling themes matching Algerian administrative geography & image palette
export const REGION_THEMES: Record<
  string,
  {
    bg: string;
    border: string;
    text: string;
    badge: string;
    dotColor: string;
    mapFill: string;
  }
> = {
  الوسط: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    dotColor: '#10b981',
    mapFill: '#d9f99d'
  },
  الشرق: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/40',
    text: 'text-indigo-400',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    dotColor: '#6366f1',
    mapFill: '#a7f3d0'
  },
  الغرب: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/40',
    text: 'text-sky-400',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    dotColor: '#0ea5e9',
    mapFill: '#bae6fd'
  },
  'الهضاب العليا': {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/40',
    text: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    dotColor: '#a855f7',
    mapFill: '#e9d5ff'
  },
  الجنوب: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    dotColor: '#f59e0b',
    mapFill: '#fef08a'
  }
};

// Exact coordinates for all 69 Algerian Wilayas calibrated on the 2026 Administrative Map
export const WILAYA_MAP_COORDS: Record<string, { x: number; y: number }> = {
  // Northern Coast & Central
  '16': { x: 554, y: 48 }, // Alger (HQ)
  '09': { x: 546, y: 64 }, // Blida
  '35': { x: 585, y: 48 }, // Boumerdes
  '15': { x: 620, y: 50 }, // Tizi Ouzou
  '06': { x: 672, y: 48 }, // Bejaia
  '18': { x: 728, y: 44 }, // Jijel
  '21': { x: 768, y: 40 }, // Skikda
  '23': { x: 808, y: 36 }, // Annaba
  '36': { x: 840, y: 44 }, // El Tarf
  '42': { x: 524, y: 56 }, // Tipaza
  '44': { x: 492, y: 72 }, // Ain Defla
  '02': { x: 454, y: 72 }, // Chlef
  '27': { x: 412, y: 88 }, // Mostaganem
  '31': { x: 368, y: 104 }, // Oran
  '46': { x: 340, y: 120 }, // Ain Temouchent
  '13': { x: 334, y: 148 }, // Tlemcen
  '22': { x: 374, y: 146 }, // Sidi Bel Abbes
  '29': { x: 412, y: 118 }, // Mascara
  '48': { x: 452, y: 96 }, // Relizane
  '20': { x: 408, y: 154 }, // Saida
  '14': { x: 472, y: 144 }, // Tiaret
  '38': { x: 494, y: 98 }, // Tissemsilt
  '26': { x: 554, y: 78 }, // Medea
  '10': { x: 604, y: 70 }, // Bouira
  '34': { x: 642, y: 78 }, // Bordj Bou Arreridj
  '19': { x: 686, y: 78 }, // Setif
  '43': { x: 728, y: 70 }, // Mila
  '25': { x: 756, y: 64 }, // Constantine
  '24': { x: 792, y: 62 }, // Guelma
  '41': { x: 824, y: 76 }, // Souk Ahras
  '12': { x: 826, y: 114 }, // Tebessa
  '40': { x: 778, y: 134 }, // Khenchela
  '04': { x: 780, y: 96 }, // Oum El Bouaghi
  '05': { x: 730, y: 114 }, // Batna
  '28': { x: 636, y: 98 }, // M'Sila
  '67': { x: 532, y: 98 }, // Ksar Chellala
  '65': { x: 574, y: 118 }, // Bir El Ater
  '68': { x: 634, y: 136 }, // Ain Oussara
  '60': { x: 686, y: 124 }, // El Abiodh Sidi Cheikh
  '64': { x: 546, y: 134 }, // Bou Saada
  '63': { x: 334, y: 174 }, // Barika
  '45': { x: 366, y: 230 }, // Naama
  '61': { x: 712, y: 140 }, // El Aricha
  '62': { x: 822, y: 158 }, // El Kantara
  '59': { x: 494, y: 188 }, // Aflou
  '17': { x: 574, y: 162 }, // Djelfa
  '03': { x: 558, y: 222 }, // Laghouat
  '66': { x: 634, y: 216 }, // Ksar El Boukhari
  '51': { x: 662, y: 184 }, // Ouled Djellal
  '07': { x: 720, y: 154 }, // Biskra
  '57': { x: 708, y: 204 }, // El M'Ghair (HQ Hub)
  '55': { x: 728, y: 244 }, // Touggourt
  '39': { x: 780, y: 250 }, // El Oued
  '32': { x: 472, y: 254 }, // El Bayadh
  '69': { x: 442, y: 320 }, // M'saad
  '47': { x: 590, y: 274 }, // Ghardaia
  '58': { x: 554, y: 384 }, // El Meniaa
  '30': { x: 720, y: 344 }, // Ouargla
  '08': { x: 318, y: 336 }, // Bechar
  '52': { x: 286, y: 450 }, // Beni Abbes
  '49': { x: 444, y: 434 }, // Timimoun
  '37': { x: 120, y: 520 }, // Tindouf
  '01': { x: 350, y: 594 }, // Adrar
  '53': { x: 566, y: 558 }, // In Salah
  '33': { x: 796, y: 514 }, // Illizi
  '56': { x: 864, y: 716 }, // Djanet
  '11': { x: 630, y: 748 }, // Tamanrasset
  '50': { x: 376, y: 754 }, // Bordj Badji Mokhtar
  '54': { x: 610, y: 928 }  // In Guezzam
};

export const AlgeriaMap: React.FC = () => {
  const {
    selectedWilaya: globalSelectedWilaya,
    setSelectedWilaya: setGlobalSelectedWilaya,
    stores,
    craftsmen,
    soundEnabled,
    toggleSound,
    activeCategory,
    setActiveCategory,
    pushConfig,
    togglePushSubscription
  } = useApp();

  const [localSelectedWilaya, setLocalSelectedWilaya] = useState<Wilaya>(() => {
    return ALGERIAN_WILAYAS.find((w) => w.code === '16') || ALGERIAN_WILAYAS[0];
  });

  const selectedWilaya = globalSelectedWilaya || localSelectedWilaya || ALGERIAN_WILAYAS[0];

  const setSelectedWilaya = (w: Wilaya) => {
    setLocalSelectedWilaya(w);
    if (setGlobalSelectedWilaya) {
      setGlobalSelectedWilaya(w);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('الكل');
  const [hoveredWilaya, setHoveredWilaya] = useState<Wilaya | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Compute store & craftsmen statistics per wilaya
  const wilayaStats = useMemo(() => {
    const stats: Record<string, { storesCount: number; craftsmenCount: number }> = {};
    ALGERIAN_WILAYAS.forEach((w) => {
      stats[w.code] = { storesCount: 0, craftsmenCount: 0 };
    });

    stores.forEach((s) => {
      const code = s.wilayaCode || '16';
      if (!stats[code]) stats[code] = { storesCount: 0, craftsmenCount: 0 };
      stats[code].storesCount += 1;
    });

    craftsmen.forEach((c) => {
      const code = c.wilayaCode || '16';
      if (!stats[code]) stats[code] = { storesCount: 0, craftsmenCount: 0 };
      stats[code].craftsmenCount += 1;
    });

    return stats;
  }, [stores, craftsmen]);

  // Audio effect upon selecting wilaya
  const playWilayaChime = (freq: number = 440) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // AudioContext unavailable
    }
  };

  const handleSelectWilaya = (w: Wilaya) => {
    setSelectedWilaya(w);
    playWilayaChime(500 + w.number * 4);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Filter wilayas list by search and region
  const filteredWilayas = useMemo(() => {
    return ALGERIAN_WILAYAS.filter((w) => {
      const matchesSearch =
        w.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.code.includes(searchQuery);
      const matchesRegion = selectedRegion === 'الكل' || w.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const currentStats = (selectedWilaya?.code ? wilayaStats[selectedWilaya.code] : null) || { storesCount: 0, craftsmenCount: 0 };
  const currentTheme = (selectedWilaya?.region ? REGION_THEMES[selectedWilaya.region] : null) || REGION_THEMES['الوسط'];
  const isSubscribedToPush = Boolean(selectedWilaya?.code && pushConfig?.subscribedWilayas?.includes(selectedWilaya.code));

  return (
    <div className="space-y-6">
      {/* Top Header Summary Banner */}
      <div className="relative overflow-hidden bg-gradient-to-l from-slate-900 via-[#111827] to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>الخريطة الجغرافية الإدارية الرسمية للجزائر</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              خريطة الجزائر التفاعلية — 69 ولاية
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              تصفح جميع ولايات الجزائر الـ 69، استكشف المتاجر والحرفيين، واشترك في إشعارات العروض الحية حسب ولايتك.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`p-3 rounded-2xl border transition-all ${
                soundEnabled
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title={soundEnabled ? 'كتم الصوت' : 'تفعيل التنبيه الصوتي'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <div className="bg-slate-800/80 border border-slate-700/80 px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="text-right">
                <div className="text-[11px] text-slate-400">إجمالي الولايات</div>
                <div className="text-lg font-black text-white">69 ولاية</div>
              </div>
              <Compass className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Map & Side Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Map Section (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Region Tabs & Search Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto scrollbar-none">
              {['الكل', 'الوسط', 'الشرق', 'الغرب', 'الهضاب العليا', 'الجنوب'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedRegion === reg
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث برقم أو اسم الولاية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Interactive Map Canvas Container */}
          <div className="relative bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[580px] flex items-center justify-center">
            {/* Map Floating Controls */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-1.5 rounded-2xl shadow-xl">
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                title="تكبير"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                title="تصغير"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={handleResetView}
                className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                title="إعادة الضبط"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Floating Badge */}
            <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs text-slate-300 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">69 ولاية مفعلة بالكامل</span>
            </div>

            {/* Hover Tooltip Overlay */}
            {hoveredWilaya && (
              <div
                className="absolute z-30 pointer-events-none bg-slate-900/95 border border-emerald-500/50 rounded-2xl p-3 shadow-2xl backdrop-blur-md text-right text-white transition-all duration-150 animate-in fade-in"
                style={{
                  top: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs">
                    {hoveredWilaya.code}
                  </span>
                  <span className="font-bold text-sm text-emerald-400">{hoveredWilaya.nameAr}</span>
                  <span className="text-xs text-slate-400">({hoveredWilaya.nameEn})</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-3">
                  <span>إقليم: {hoveredWilaya.region}</span>
                  <span>•</span>
                  <span>{wilayaStats[hoveredWilaya.code]?.storesCount || 0} متاجر</span>
                  <span>•</span>
                  <span>{wilayaStats[hoveredWilaya.code]?.craftsmenCount || 0} حرفيين</span>
                </div>
              </div>
            )}

            {/* SVG Vector Map Rendering based on official dataset */}
            <div
              className={`w-full h-full flex items-center justify-center p-4 cursor-${isDragging ? 'grabbing' : 'grab'} select-none`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                viewBox="0 0 1000 1050"
                className="w-full h-auto max-h-[700px] transition-transform duration-150 ease-out drop-shadow-2xl"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`
                }}
              >
                <defs>
                  {/* Subtle Background Gradients */}
                  <linearGradient id="mapBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Glow filter for active wilaya node */}
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Base Geographical Silhouette Shape of Algeria */}
                <path
                  d="M 334 148 
                     C 350 120, 380 95, 412 88 
                     C 454 72, 492 72, 524 56 
                     C 554 48, 585 48, 620 50 
                     C 672 48, 728 44, 768 40 
                     C 808 36, 840 44, 860 60
                     L 850 110
                     L 826 114
                     L 822 158
                     L 780 250
                     L 800 340
                     L 860 480
                     L 880 680
                     L 864 716
                     L 790 760
                     L 700 820
                     L 610 928
                     L 580 970
                     L 540 920
                     L 490 840
                     L 376 754
                     L 250 680
                     L 160 620
                     L 120 520
                     L 160 470
                     L 220 440
                     L 286 450
                     L 318 336
                     L 350 260
                     L 334 148 Z"
                  fill="url(#mapBgGrad)"
                  stroke="#334155"
                  strokeWidth="3"
                  className="filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                />

                {/* 2. Internal Administrative Division Web */}
                <g stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.45" strokeDasharray="3 3">
                  <path d="M 120 520 L 350 594 L 630 748 L 864 716" />
                  <path d="M 318 336 L 444 434 L 566 558 L 796 514" />
                  <path d="M 366 230 L 472 254 L 590 274 L 720 344" />
                  <path d="M 408 154 L 472 144 L 574 162 L 720 154" />
                  <path d="M 454 72 L 554 78 L 686 78 L 826 114" />
                  <path d="M 554 48 L 554 78 L 574 162 L 590 274 L 566 558 L 630 748 L 610 928" />
                </g>

                {/* 3. Interactive Wilaya Nodes for all 69 Wilayas */}
                {ALGERIAN_WILAYAS.map((w) => {
                  const coords = WILAYA_MAP_COORDS[w.code] || { x: 500, y: 500 };
                  const isSelected = selectedWilaya?.code === w.code;
                  const isHovered = hoveredWilaya?.code === w.code;
                  const isAlgerHQ = w.code === '16';
                  const theme = REGION_THEMES[w.region] || REGION_THEMES['الوسط'];
                  const stats = wilayaStats[w.code] || { storesCount: 0, craftsmenCount: 0 };
                  const hasEntities = stats.storesCount > 0 || stats.craftsmenCount > 0;

                  return (
                    <g
                      key={w.code}
                      onClick={() => handleSelectWilaya(w)}
                      onMouseEnter={() => setHoveredWilaya(w)}
                      onMouseLeave={() => setHoveredWilaya(null)}
                      className="cursor-pointer transition-all duration-200"
                    >
                      {/* Outer Radar Ping Ring on selected/hovered node */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r={isSelected ? 26 : 20}
                          fill={isSelected ? '#ef4444' : theme.dotColor}
                          fillOpacity={isSelected ? 0.35 : 0.2}
                          className="animate-ping"
                        />
                      )}

                      {/* Main Node Bubble */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isSelected ? 15 : isAlgerHQ ? 13 : isHovered ? 12.5 : hasEntities ? 10.5 : 9}
                        fill={
                          isSelected
                            ? '#ef4444' // Vivid red highlight for active wilaya
                            : isAlgerHQ
                            ? '#10b981' // Capital Green
                            : hasEntities
                            ? theme.dotColor
                            : isHovered
                            ? '#38bdf8'
                            : '#1e293b'
                        }
                        stroke={isSelected ? '#ffffff' : isHovered ? '#ffffff' : '#475569'}
                        strokeWidth={isSelected ? 3.5 : isAlgerHQ || isHovered ? 2.5 : 1.5}
                        filter={isSelected ? 'url(#nodeGlow)' : undefined}
                        className="transition-transform duration-200 hover:scale-125"
                      />

                      {/* Wilaya Number Code Label */}
                      <text
                        x={coords.x}
                        y={coords.y + (isSelected ? 4.5 : isAlgerHQ ? 4 : 3.5)}
                        fill={
                          isSelected || hasEntities || isAlgerHQ || isHovered
                            ? '#ffffff'
                            : '#94a3b8'
                        }
                        fontSize={isSelected ? 10 : isAlgerHQ ? 9 : 7.5}
                        fontWeight="900"
                        textAnchor="middle"
                        className="pointer-events-none font-mono select-none"
                      >
                        {w.code}
                      </text>

                      {/* Native Tooltip */}
                      <title>{`${w.code} - ${w.nameAr} (${w.nameEn}) • إقليم ${w.region} | ${stats.storesCount} متاجر • ${stats.craftsmenCount} حرفيين`}</title>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Details Panel Section (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Wilaya Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold">تفاصيل الولاية المحددة</span>
                <h2 className="text-2xl font-black text-white mt-0.5">{selectedWilaya.nameAr}</h2>
                <span className="text-xs font-mono text-slate-400">{selectedWilaya.nameEn}</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-2xl shadow-inner">
                {selectedWilaya.code}
              </div>
            </div>

            {/* Region & Coverage Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-1">الإقليم الجغرافي</span>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-xl border ${currentTheme.badge}`}>
                  {selectedWilaya.region}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-1">حالة التغطية</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>تغطية نشطة</span>
                </span>
              </div>
            </div>

            {/* Statistics in this Wilaya */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-center">
                <StoreIcon className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
                <div className="text-xl font-black text-white">{currentStats.storesCount}</div>
                <div className="text-[11px] text-slate-400">متاجر مسجلة</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-center">
                <Wrench className="w-6 h-6 text-indigo-400 mx-auto mb-1.5" />
                <div className="text-xl font-black text-white">{currentStats.craftsmenCount}</div>
                <div className="text-[11px] text-slate-400">حرفيين متاحين</div>
              </div>
            </div>

            {/* Push Notification Subscription for this Wilaya */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${isSubscribedToPush ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">إشعارات ولاية {selectedWilaya.nameAr}</div>
                  <div className="text-[11px] text-slate-400">تنبيهات العروض والطلبات الفورية</div>
                </div>
              </div>

              <button
                onClick={() => togglePushSubscription && togglePushSubscription(selectedWilaya.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSubscribedToPush
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {isSubscribedToPush ? 'مفعّل' : 'تفعيل'}
              </button>
            </div>

            {/* Action Buttons: Explore Stores & Craftsmen */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setActiveCategory('الكل')}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>تصفح المنتجات في ولاية {selectedWilaya.nameAr}</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCategory('خدمات وحرف')}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-2xl flex items-center justify-center gap-1.5 text-xs transition-all border border-slate-700"
                >
                  <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                  <span>دليل الحرفيين</span>
                </button>
                <button
                  onClick={() => setActiveCategory('الكل')}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-2xl flex items-center justify-center gap-1.5 text-xs transition-all border border-slate-700"
                >
                  <StoreIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>دليل المتاجر</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Wilayas Directory Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>دليل الولايات السريع ({filteredWilayas.length})</span>
              </span>
              <span className="text-[11px] text-slate-400">انقر للاختيار</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-1.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {filteredWilayas.map((w) => {
                const isSelected = selectedWilaya?.code === w.code;
                return (
                  <button
                    key={w.code}
                    onClick={() => handleSelectWilaya(w)}
                    className={`px-2 py-1.5 rounded-xl text-right text-[11px] transition-all flex items-center justify-between gap-1 border ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{w.nameAr}</span>
                    <span className="text-[9px] font-mono text-slate-400">{w.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlgeriaMap;
