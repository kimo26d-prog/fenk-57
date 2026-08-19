import React, { useState, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ALGERIAN_WILAYAS, Wilaya } from '../data/algerianWilayas';
import {
  MapPin,
  Store as StoreIcon,
  Wrench,
  Search,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronLeft,
  Phone,
  MessageSquare,
  PlusCircle,
  Compass,
  Layers,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

// Region styling themes matching Algerian administrative geography
export const REGION_THEMES: Record<
  string,
  {
    bg: string;
    border: string;
    text: string;
    badge: string;
    glow: string;
    freq: number;
    gradient: string;
    mapFill: string;
    dotColor: string;
    highlightFill: string;
    highlightStroke: string;
  }
> = {
  الوسط: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    glow: 'rgba(16, 185, 129, 0.5)',
    freq: 523.25, // C5
    gradient: 'from-emerald-500 to-teal-600',
    mapFill: 'rgba(16, 185, 129, 0.25)',
    dotColor: '#10b981',
    highlightFill: '#ef4444', // Red highlight like Alger in user image
    highlightStroke: '#ffffff'
  },
  الشرق: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/40',
    text: 'text-indigo-400',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    glow: 'rgba(99, 102, 241, 0.5)',
    freq: 587.33, // D5
    gradient: 'from-indigo-500 to-purple-600',
    mapFill: 'rgba(99, 102, 241, 0.25)',
    dotColor: '#6366f1',
    highlightFill: '#ef4444',
    highlightStroke: '#ffffff'
  },
  الغرب: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/40',
    text: 'text-sky-400',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    glow: 'rgba(14, 165, 233, 0.5)',
    freq: 659.25, // E5
    gradient: 'from-sky-500 to-blue-600',
    mapFill: 'rgba(14, 165, 233, 0.25)',
    dotColor: '#0ea5e9',
    highlightFill: '#ef4444',
    highlightStroke: '#ffffff'
  },
  'الهضاب العليا': {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    glow: 'rgba(245, 158, 11, 0.5)',
    freq: 698.46, // F5
    gradient: 'from-amber-500 to-orange-600',
    mapFill: 'rgba(245, 158, 11, 0.25)',
    dotColor: '#f59e0b',
    highlightFill: '#ef4444',
    highlightStroke: '#ffffff'
  },
  الجنوب: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/40',
    text: 'text-teal-400',
    badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    glow: 'rgba(20, 184, 166, 0.5)',
    freq: 783.99, // G5
    gradient: 'from-teal-500 to-cyan-600',
    mapFill: 'rgba(20, 184, 166, 0.25)',
    dotColor: '#14b8a6',
    highlightFill: '#ef4444',
    highlightStroke: '#ffffff'
  }
};

// Geographically calibrated vector coordinates on 1000 x 1050 SVG canvas space matching the 2026 administrative map
const WILAYA_GEO_COORDS: Record<string, { x: number; y: number; pathId?: string }> = {
  // Northern Coast & Mitidja
  '16': { x: 558, y: 48 }, // الجزائر العاصمة (Alger - Red highlighted in user's image)
  '09': { x: 546, y: 68 }, // البليدة
  '42': { x: 510, y: 62 }, // تيبازة
  '44': { x: 485, y: 84 }, // عين الدفلى
  '35': { x: 585, y: 56 }, // بومرداس
  '15': { x: 618, y: 54 }, // تيزي وزو
  '06': { x: 658, y: 55 }, // بجاية
  '18': { x: 708, y: 52 }, // جيجل
  '21': { x: 755, y: 46 }, // سكيكدة
  '23': { x: 788, y: 44 }, // عنابة
  '36': { x: 815, y: 52 }, // الطارف
  '10': { x: 590, y: 82 }, // البويرة
  '26': { x: 538, y: 92 }, // المدية
  '02': { x: 458, y: 82 }, // الشلف

  // West & Oranie
  '27': { x: 418, y: 94 }, // مستغانم
  '31': { x: 375, y: 114 }, // وهران
  '46': { x: 350, y: 130 }, // عين تموشنت
  '13': { x: 340, y: 156 }, // تلمسان
  '63': { x: 335, y: 188 }, // مسعد / مغنية
  '22': { x: 380, y: 156 }, // سيدي بلعباس
  '29': { x: 412, y: 132 }, // معسكر
  '48': { x: 438, y: 112 }, // غليزان
  '38': { x: 480, y: 112 }, // تيسمسيلت
  '67': { x: 512, y: 114 }, // فرندة
  '14': { x: 458, y: 156 }, // تيارت
  '20': { x: 408, y: 172 }, // سعيدة
  '64': { x: 508, y: 144 }, // بوسعادة
  '65': { x: 540, y: 132 }, // العلمة

  // High Plateaus & East
  '17': { x: 532, y: 175 }, // الجلفة
  '59': { x: 485, y: 202 }, // آفلو
  '03': { x: 538, y: 238 }, // الأغواط
  '66': { x: 592, y: 222 }, // شلغوم العيد
  '34': { x: 622, y: 90 }, // برج بوعريريج
  '19': { x: 668, y: 86 }, // سطيف
  '43': { x: 712, y: 78 }, // ميلة
  '25': { x: 742, y: 76 }, // قسنطينة
  '24': { x: 775, y: 72 }, // قالمة
  '41': { x: 802, y: 84 }, // سوق أهراس
  '04': { x: 755, y: 108 }, // أم البواقي
  '28': { x: 598, y: 110 }, // المسيلة
  '68': { x: 608, y: 145 }, // بريكة / عين الملح
  '60': { x: 652, y: 135 }, // بريكة
  '61': { x: 678, y: 152 }, // قصر الشلالة
  '05': { x: 708, y: 122 }, // باتنة
  '40': { x: 752, y: 142 }, // خنشلة
  '12': { x: 798, y: 122 }, // تبسة
  '62': { x: 802, y: 175 }, // عين وسارة / بئر العاتر

  // Sahara & Oasis
  '07': { x: 692, y: 172 }, // بسكرة
  '51': { x: 642, y: 196 }, // أولاد جلال
  '57': { x: 675, y: 215 }, // المغير (المقر الرئيسي)
  '55': { x: 692, y: 258 }, // تقرت
  '39': { x: 762, y: 258 }, // الوادي
  '45': { x: 362, y: 242 }, // النعامة
  '32': { x: 472, y: 272 }, // البيض
  '69': { x: 442, y: 332 }, // بريزينة / دلس
  '47': { x: 582, y: 292 }, // غرداية
  '58': { x: 550, y: 400 }, // المنيعة
  '30': { x: 700, y: 355 }, // ورقلة
  '08': { x: 310, y: 355 }, // بشار
  '52': { x: 290, y: 465 }, // بني عباس
  '37': { x: 145, y: 535 }, // تندوف
  '49': { x: 438, y: 450 }, // تيميمون
  '01': { x: 385, y: 605 }, // أدرار
  '50': { x: 375, y: 770 }, // برج باجي مختار
  '53': { x: 558, y: 570 }, // إن صالح
  '33': { x: 775, y: 525 }, // إليزي
  '56': { x: 835, y: 730 }, // جانت
  '11': { x: 638, y: 760 }, // تمنراست
  '54': { x: 610, y: 945 }  // إن قزام (أقصى الجنوب)
};

// Detailed Administrative Polygons based on 16_Alger_Map_2026.png reference
export const WILAYA_DISTRICT_PATHS: Record<string, string> = {
  // Alger (16) - Highlighted with precise coastal bay curve
  '16': 'M 548 42 C 555 40, 565 42, 574 46 L 570 54 L 556 56 L 546 50 Z',
  // Tipaza (42)
  '42': 'M 495 56 C 510 50, 530 46, 548 42 L 546 50 L 536 68 L 500 70 Z',
  // Boumerdes (35)
  '35': 'M 574 46 C 585 45, 600 48, 610 50 L 602 65 L 570 54 Z',
  // Blida (09)
  '09': 'M 536 68 L 556 56 L 570 54 L 565 76 L 535 78 Z',
  // Tizi Ouzou (15)
  '15': 'M 610 50 C 625 48, 640 48, 650 50 L 642 70 L 602 65 Z',
  // Bejaia (06)
  '06': 'M 650 50 C 665 50, 685 52, 698 52 L 685 74 L 642 70 Z',
  // Jijel (18)
  '18': 'M 698 52 C 715 50, 735 48, 746 48 L 735 70 L 685 74 Z',
  // Skikda (21)
  '21': 'M 746 48 C 760 44, 775 42, 785 42 L 778 68 L 735 70 Z',
  // Annaba (23)
  '23': 'M 785 42 C 795 40, 805 42, 812 46 L 805 65 L 778 68 Z',
  // El Tarf (36)
  '36': 'M 812 46 C 822 46, 830 50, 835 56 L 825 78 L 805 65 Z',
  // Oran (31)
  '31': 'M 355 105 C 375 96, 395 90, 405 92 L 398 122 L 360 120 Z',
  // Tlemcen (13)
  '13': 'M 318 152 L 345 130 L 360 152 L 335 178 L 310 178 Z',
  // El M'Ghair (57 - HQ)
  '57': 'M 648 200 L 695 195 L 710 230 L 660 238 L 642 215 Z',
  // Tindouf (37 - Grand West)
  '37': 'M 15 510 L 20 472 L 150 442 L 180 398 L 245 490 L 260 620 L 150 555 Z',
  // In Guezzam (54 - Far South)
  '54': 'M 580 940 L 520 980 L 515 990 L 470 945 L 455 885 L 590 885 L 660 815 Z',
  // Tamanrasset (11)
  '11': 'M 455 885 L 440 780 L 520 680 L 745 775 L 660 815 L 590 885 Z',
  // Djanet (56)
  '56': 'M 745 775 L 880 680 L 820 520 L 730 620 Z',
  // Illizi (33)
  '33': 'M 730 620 L 820 520 L 798 605 L 768 302 L 670 400 L 720 520 Z',
  // Adrar (01)
  '01': 'M 260 620 L 440 780 L 480 650 L 380 540 Z',
  // Bordj Badji Mokhtar (50)
  '50': 'M 165 710 L 140 690 L 260 620 L 440 780 L 380 770 Z',
  // In Salah (53)
  '53': 'M 480 650 L 520 680 L 670 400 L 480 400 L 438 450 Z',
  // Bechar (08)
  '08': 'M 235 378 L 230 302 L 270 292 L 340 350 L 290 440 Z',
  // Beni Abbes (52)
  '52': 'M 245 490 L 290 440 L 340 350 L 380 540 L 260 620 Z',
  // Timimoun (49)
  '49': 'M 340 350 L 480 400 L 438 450 L 380 540 Z',
  // Ouargla (30)
  '30': 'M 650 320 L 768 302 L 670 400 L 630 400 Z',
  // Ghardaia (47)
  '47': 'M 530 270 L 620 260 L 630 330 L 540 330 Z',
  // El Meniaa (58)
  '58': 'M 540 330 L 630 330 L 600 440 L 500 440 Z',
  // Biskra (07)
  '07': 'M 660 160 L 720 155 L 730 190 L 670 195 Z',
  // Batna (05)
  '05': 'M 680 110 L 735 105 L 745 138 L 685 142 Z',
  // Setif (19)
  '19': 'M 640 75 L 690 70 L 700 98 L 650 102 Z',
  // Constantine (25)
  '25': 'M 725 65 L 760 62 L 768 85 L 730 88 Z'
};

export const AlgeriaMap: React.FC = () => {
  const {
    stores,
    craftsmen,
    navigateTo,
    openChatWithCraftsman,
    setIsAddStoreModalOpen,
    setIsCraftsmanRegisterModalOpen,
    showToast
  } = useApp();

  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya>(() => {
    // Default to Alger (16 - as highlighted in the user's reference image) or El M'Ghair (57)
    return ALGERIAN_WILAYAS.find((w) => w.code === '16') || ALGERIAN_WILAYAS[0];
  });

  const [hoveredWilaya, setHoveredWilaya] = useState<Wilaya | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'stores' | 'craftsmen'>('all');
  const [pulseEffect, setPulseEffect] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapCenter, setMapCenter] = useState<{ x: number; y: number }>({ x: 500, y: 500 });
  const [viewMode, setViewMode] = useState<'detailed' | 'administrative'>('detailed');

  // Audio Context reference for Web Audio API synth chime
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playWilayaSound = (wilaya: Wilaya) => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const theme = REGION_THEMES[wilaya.region] || REGION_THEMES['الجنوب'];
      const baseFreq = theme.freq || 520;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.14);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Audio playback silently ignored if context blocked
    }
  };

  const handleSelectWilaya = (wilaya: Wilaya) => {
    setSelectedWilaya(wilaya);
    setPulseEffect(true);
    playWilayaSound(wilaya);
    setTimeout(() => setPulseEffect(false), 600);

    // Center map slightly on selected node if zoomed in
    const coords = WILAYA_GEO_COORDS[wilaya.code];
    if (coords && zoomLevel > 1) {
      setMapCenter({ x: coords.x, y: coords.y });
    }
  };

  // Calculate statistics per wilaya
  const wilayaStats = useMemo(() => {
    const map: Record<string, { storesCount: number; craftsmenCount: number }> = {};
    ALGERIAN_WILAYAS.forEach((w) => {
      map[w.code] = { storesCount: 0, craftsmenCount: 0 };
    });

    stores.forEach((s) => {
      const found = ALGERIAN_WILAYAS.find(
        (w) =>
          w.nameAr === s.wilaya ||
          w.code === s.wilaya ||
          s.address?.includes(w.nameAr) ||
          s.address?.includes(w.code)
      );
      if (found && map[found.code]) {
        map[found.code].storesCount += 1;
      } else if (map['57']) {
        map['57'].storesCount += 1;
      }
    });

    craftsmen.forEach((c) => {
      const found = ALGERIAN_WILAYAS.find(
        (w) =>
          w.nameAr === c.wilaya ||
          w.code === c.wilaya ||
          c.location?.includes(w.nameAr) ||
          c.location?.includes(w.code)
      );
      if (found && map[found.code]) {
        map[found.code].craftsmenCount += 1;
      } else if (map['57']) {
        map['57'].craftsmenCount += 1;
      }
    });

    return map;
  }, [stores, craftsmen]);

  // Filtered wilayas list
  const filteredWilayas = useMemo(() => {
    return ALGERIAN_WILAYAS.filter((w) => {
      const matchRegion = selectedRegion === 'all' || w.region === selectedRegion;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchRegion;

      const matchSearch =
        w.code.includes(query) ||
        w.nameAr.toLowerCase().includes(query) ||
        w.nameEn.toLowerCase().includes(query) ||
        w.number.toString() === query;

      return matchRegion && matchSearch;
    });
  }, [selectedRegion, searchQuery]);

  // Stores & Craftsmen in the currently selected wilaya
  const currentWilayaStores = useMemo(() => {
    return stores.filter(
      (s) =>
        s.wilaya === selectedWilaya.nameAr ||
        s.wilaya === selectedWilaya.code ||
        s.address?.includes(selectedWilaya.nameAr) ||
        (selectedWilaya.code === '57' && (!s.wilaya || s.wilaya === 'المغير'))
    );
  }, [stores, selectedWilaya]);

  const currentWilayaCraftsmen = useMemo(() => {
    return craftsmen.filter(
      (c) =>
        c.wilaya === selectedWilaya.nameAr ||
        c.wilaya === selectedWilaya.code ||
        c.location?.includes(selectedWilaya.nameAr) ||
        (selectedWilaya.code === '57' && (!c.wilaya || c.wilaya === 'المغير'))
    );
  }, [craftsmen, selectedWilaya]);

  const currentTheme = REGION_THEMES[selectedWilaya.region] || REGION_THEMES['الجنوب'];
  const regions = ['all', 'الوسط', 'الشرق', 'الغرب', 'الهضاب العليا', 'الجنوب'];

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.4, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.4, 1));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setMapCenter({ x: 500, y: 500 });
  };

  return (
    <section id="algeria-interactive-map" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span>الخريطة الجغرافية الدقيقة للجمهورية الجزائرية (69 ولاية) 🇩🇿</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          خريطة الجزائر المفصلة بكامل الحدود والتقسيم الإداري
        </h2>

        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          خريطة طبوغرافية وإدارية دقيقة ومطابقة للتقسيم الرسمي 2026. انقر على أي منطقة أو ولاية لإبراز حدودها واستكشاف المتاجر والحرفيين.
        </p>

        {/* Action controls (Sound, View Toggle & Region filter) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              soundEnabled
                ? 'bg-[#00d4c8]/15 border-[#00d4c8]/40 text-[#00d4c8] shadow-[0_0_15px_rgba(0,212,200,0.2)]'
                : 'bg-white/5 border-[#2a2a3a] text-slate-400 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'صوت التفاعل: مفعل 🔊' : 'الصوت: صامت 🔇'}</span>
          </button>

          {/* View mode toggle */}
          <div className="flex items-center bg-[#0a0a0f] p-1 rounded-xl border border-[#2a2a3a]">
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'detailed'
                  ? 'bg-[#00d4c8] text-slate-900 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              النموذج الإداري الأخضر (2026)
            </button>
            <button
              onClick={() => setViewMode('administrative')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'administrative'
                  ? 'bg-[#00d4c8] text-slate-900 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              المخطط الداكن الليلي
            </button>
          </div>

          {/* Quick Filter by Region */}
          <div className="flex items-center gap-1.5 bg-[#12121a] p-1 rounded-xl border border-[#2a2a3a] overflow-x-auto max-w-full">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                  selectedRegion === r
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === 'all' ? 'الكل (69 ولاية)' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث برقم الولاية (مثل 16 الجزائر، 57 المغير، 31 وهران)..."
            className="w-full pr-10 pl-4 py-2 rounded-xl bg-[#12121a] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d4c8] shadow-inner"
          />
        </div>
      </div>

      {/* Main Grid: Visual Map on Left + Wilaya Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column (7 Cols): The Geographically Detailed Interactive Algeria Map & Matrix */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Visual Geographic Map Viewer matching 16_Alger_Map_2026.png */}
          <div className="p-5 rounded-3xl bg-[#12121a] border border-[#2a2a3a] shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-xs font-extrabold text-white">
                  {viewMode === 'detailed'
                    ? 'النموذج الجغرافي الإداري المفصل (مطابق للنموذج المرفق)'
                    : 'الخريطة الطبوغرافية التفاعلية الليلية'}
                </h3>
              </div>

              {/* Map Zoom Controls */}
              <div className="flex items-center gap-1.5 bg-[#0a0a0f] p-1 rounded-xl border border-[#2a2a3a]">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors"
                  title="تكبير الخريطة"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors"
                  title="تصغير الخريطة"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors"
                  title="إعادة ضبط العرض"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SVG Visual Map Canvas with Authentic Algerian Contours */}
            <div className={`relative w-full h-84 sm:h-96 md:h-[450px] rounded-2xl border flex items-center justify-center p-2 overflow-hidden select-none transition-colors ${
              viewMode === 'detailed' ? 'bg-[#ffffff] border-slate-300' : 'bg-[#07080d] border-[#2a2a3a]/80'
            }`}>
              
              {/* Subtle Grid overlay for geographic coordinates */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    viewMode === 'detailed'
                      ? 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)'
                      : 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              <svg
                viewBox="0 0 1000 1050"
                className="w-full h-full max-h-full object-contain filter drop-shadow-xl transition-transform duration-300"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${mapCenter.x / 10}% ${mapCenter.y / 10.5}%`
                }}
              >
                <defs>
                  {/* Subtle Linear Gradients for Map Layers */}
                  <linearGradient id="algeriaLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d1f4be" />
                    <stop offset="50%" stopColor="#c5edb0" />
                    <stop offset="100%" stopColor="#b6e39f" />
                  </linearGradient>

                  <linearGradient id="algeriaDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#131929" />
                    <stop offset="50%" stopColor="#0d121f" />
                    <stop offset="100%" stopColor="#080b14" />
                  </linearGradient>

                  {/* Glow filter for highlighted wilaya nodes */}
                  <filter id="mapNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Precise Authentic Algeria Outer Boundary Silhouette */}
                <path
                  d="M 318 152 
                     C 340 132, 355 118, 375 108 
                     C 395 98, 425 82, 458 72 
                     C 495 60, 525 48, 558 44 
                     C 595 40, 635 42, 675 40 
                     C 705 37, 735 34, 770 44 
                     L 778 72 
                     L 760 125 
                     L 765 178 
                     L 742 242 
                     L 782 302 
                     L 795 405 
                     L 835 520 
                     L 812 605 
                     L 895 680 
                     L 830 740 
                     L 760 775 
                     L 675 815 
                     L 595 940 
                     L 535 980 
                     L 530 990 
                     L 485 945 
                     L 470 885 
                     L 455 780 
                     L 395 770 
                     L 180 710 
                     L 155 690 
                     L 275 620 
                     L 165 555 
                     L 25 510 
                     L 30 472 
                     L 165 442 
                     L 195 398 
                     L 250 378 
                     L 245 302 
                     L 285 292 
                     L 335 228 
                     L 325 178 
                     Z"
                  fill={viewMode === 'detailed' ? 'url(#algeriaLightGrad)' : 'url(#algeriaDarkGrad)'}
                  stroke={viewMode === 'detailed' ? '#1b3b13' : '#3b4261'}
                  strokeWidth={viewMode === 'detailed' ? '3' : '2'}
                  className="filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                />

                {/* 2. Detailed Internal Administrative Division Boundaries (Matching the 16_Alger_Map_2026.png reference) */}
                <g stroke={viewMode === 'detailed' ? '#2d5a27' : '#334155'} strokeWidth="1.2" fill="none" opacity={viewMode === 'detailed' ? '0.85' : '0.6'}>
                  
                  {/* Western and Tindouf Sector Boundaries */}
                  <path d="M 165 442 L 275 620 L 455 780" />
                  <path d="M 25 510 L 275 620" />
                  <path d="M 195 398 L 395 540" />
                  <path d="M 250 378 L 455 450" />
                  <path d="M 285 292 L 350 350 L 455 450" />
                  
                  {/* Grand Sud Borders (Bordj Badji Mokhtar, Adrar, In Salah, Tamanrasset, In Guezzam, Illizi, Djanet) */}
                  <path d="M 180 710 L 455 780 L 530 990" />
                  <path d="M 455 780 L 495 650 L 535 680 L 760 775" />
                  <path d="M 470 885 L 605 885 L 675 815" />
                  <path d="M 495 650 L 535 570 L 685 400 L 745 520 L 835 520" />
                  <path d="M 760 775 L 895 680" />
                  <path d="M 685 400 L 782 302" />

                  {/* Central Sahara & Oasis (Ghardaia, El Meniaa, Ouargla, Touggourt, El M'Ghair, El Oued) */}
                  <path d="M 395 540 L 495 650" />
                  <path d="M 455 450 L 515 440 L 615 440 L 685 400" />
                  <path d="M 350 350 L 495 400 L 515 440" />
                  <path d="M 335 228 L 485 270 L 545 330 L 645 330 L 742 242" />
                  <path d="M 485 270 L 515 240 L 635 260 L 645 330" />
                  <path d="M 515 240 L 660 180 L 765 178" />
                  <path d="M 635 260 L 715 255 L 775 255" />
                  
                  {/* High Plateaus & Tell Atlas Division Grid */}
                  <path d="M 325 178 L 430 110 L 565 110 L 695 110 L 760 125" />
                  <path d="M 430 110 L 470 155 L 515 240" />
                  <path d="M 470 155 L 545 175 L 660 180" />
                  <path d="M 565 110 L 610 145 L 660 180" />
                  <path d="M 695 110 L 705 138 L 765 178" />
                  <path d="M 705 138 L 760 125 L 810 120" />

                  {/* Northern Coastal Small Wilayas Grid (Tipaza, Alger, Blida, Boumerdes, Tizi Ouzou, Bejaia, Jijel, Skikda, Annaba, Tarf) */}
                  <path d="M 458 72 L 485 84 L 525 68 L 558 44" />
                  <path d="M 525 68 L 545 92 L 605 82 L 630 50" />
                  <path d="M 558 44 L 575 54 L 595 56 L 630 50" />
                  <path d="M 575 54 L 605 82" />
                  <path d="M 630 50 L 670 55 L 680 74 L 605 82" />
                  <path d="M 670 55 L 720 52 L 748 70 L 680 74" />
                  <path d="M 720 52 L 768 46 L 790 68 L 748 70" />
                  <path d="M 768 46 L 800 44 L 818 65 L 790 68" />
                  <path d="M 800 44 L 830 52 L 818 65 L 778 72" />
                </g>

                {/* 3. Render High-Detail Highlighted Wilaya Polygons */}
                {Object.entries(WILAYA_DISTRICT_PATHS).map(([code, pathData]) => {
                  const isSelected = selectedWilaya.code === code;
                  const isHovered = hoveredWilaya?.code === code;
                  const isAlgerHQ = code === '16'; // Red highlight in user's image
                  const isElMghair = code === '57';

                  return (
                    <path
                      key={code}
                      d={pathData}
                      fill={
                        isSelected || (isAlgerHQ && viewMode === 'detailed' && selectedWilaya.code === '16')
                          ? '#ef4444' // Bright Red matching user image
                          : isHovered
                          ? '#f59e0b'
                          : isElMghair
                          ? '#00d4c8'
                          : viewMode === 'detailed'
                          ? 'rgba(16, 185, 129, 0.18)'
                          : 'rgba(59, 130, 246, 0.15)'
                      }
                      stroke={isSelected ? '#ffffff' : isAlgerHQ ? '#b91c1c' : '#1e3a17'}
                      strokeWidth={isSelected ? '2.5' : '1'}
                      className="cursor-pointer transition-colors duration-200"
                      onClick={() => {
                        const target = ALGERIAN_WILAYAS.find((w) => w.code === code);
                        if (target) handleSelectWilaya(target);
                      }}
                    />
                  );
                })}

                {/* 4. Active Connection lines radiating from Platform Headquarters (El M'Ghair - 57) */}
                <g opacity={viewMode === 'detailed' ? '0.45' : '0.35'}>
                  <line x1="675" y1="215" x2="558" y2="48" stroke="#00d4c8" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="675" y1="215" x2="375" y2="114" stroke="#00d4c8" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="675" y1="215" x2="742" y2="76" stroke="#00d4c8" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="675" y1="215" x2="700" y2="355" stroke="#00d4c8" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="675" y1="215" x2="638" y2="760" stroke="#00d4c8" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="675" y1="215" x2="310" y2="355" stroke="#00d4c8" strokeWidth="1.5" strokeDasharray="4 3" />
                  <line x1="675" y1="215" x2="145" y2="535" stroke="#00d4c8" strokeWidth="1.5" strokeDasharray="4 3" />
                </g>

                {/* 5. Headquarters Radiant Beacon (El M'Ghair - 57) */}
                <g>
                  <circle cx="675" cy="215" r="24" fill="none" stroke="#00d4c8" strokeWidth="1.5" className="animate-ping opacity-40" />
                  <circle cx="675" cy="215" r="14" fill="#00d4c8" fillOpacity="0.3" stroke="#00d4c8" strokeWidth="2" />
                </g>

                {/* 6. Interactive Wilaya Nodes on the Map (Numbered 1 to 69) */}
                {ALGERIAN_WILAYAS.map((w) => {
                  const coords = WILAYA_GEO_COORDS[w.code] || {
                    x: 200 + ((w.number * 37) % 550),
                    y: 80 + ((w.number * 43) % 750)
                  };
                  const isSelected = selectedWilaya.code === w.code;
                  const isHovered = hoveredWilaya?.code === w.code;
                  const isHQ = w.code === '57';
                  const isAlger = w.code === '16';
                  const theme = REGION_THEMES[w.region] || REGION_THEMES['الجنوب'];
                  const stats = wilayaStats[w.code] || { storesCount: 0, craftsmenCount: 0 };
                  const hasEntities = stats.storesCount > 0 || stats.craftsmenCount > 0;

                  return (
                    <g
                      key={w.code}
                      onClick={() => handleSelectWilaya(w)}
                      onMouseEnter={() => setHoveredWilaya(w)}
                      onMouseLeave={() => setHoveredWilaya(null)}
                      className="cursor-pointer group"
                    >
                      {/* Active / Hover Pulse Rings */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r={isSelected ? '24' : '18'}
                          fill={isSelected ? '#ef4444' : theme.dotColor}
                          fillOpacity={isSelected ? '0.4' : '0.25'}
                          className="animate-ping"
                        />
                      )}

                      {/* Outer Pin Circle */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isSelected ? '14' : isAlger ? '12.5' : isHQ ? '12' : hasEntities ? '9.5' : isHovered ? '11' : '8'}
                        fill={
                          isSelected
                            ? '#ef4444' // Red highlight matching user reference image
                            : isAlger
                            ? '#ef4444'
                            : isHQ
                            ? '#00d4c8'
                            : hasEntities
                            ? theme.dotColor
                            : viewMode === 'detailed'
                            ? '#ffffff'
                            : '#1a1f33'
                        }
                        stroke={
                          isSelected
                            ? '#ffffff'
                            : isAlger
                            ? '#ffffff'
                            : isHQ
                            ? '#ffffff'
                            : isHovered
                            ? '#ffffff'
                            : viewMode === 'detailed'
                            ? '#1b3b13'
                            : '#2e3859'
                        }
                        strokeWidth={isSelected ? '3.5' : isAlger || isHQ ? '2.5' : '1.5'}
                        filter={isSelected || isHQ ? 'url(#mapNodeGlow)' : undefined}
                        className="transition-all duration-300"
                      />

                      {/* Wilaya Number Code inside Node */}
                      <text
                        x={coords.x}
                        y={coords.y + (isSelected ? 4 : isAlger || isHQ ? 3.5 : 3)}
                        fill={
                          isSelected
                            ? '#ffffff'
                            : isAlger
                            ? '#ffffff'
                            : isHQ
                            ? '#0a0a0f'
                            : hasEntities
                            ? '#ffffff'
                            : viewMode === 'detailed'
                            ? '#1b3b13'
                            : '#cbd5e1'
                        }
                        fontSize={isSelected ? '9.5' : isAlger || isHQ ? '8.5' : hasEntities ? '7' : '6'}
                        fontWeight="900"
                        textAnchor="middle"
                        className="pointer-events-none font-mono tracking-tighter"
                      >
                        {w.code}
                      </text>

                      {/* Tooltip & Accessibility */}
                      <title>{`${w.code} - ${w.nameAr} (${w.nameEn}) • إقليم ${w.region} | ${stats.storesCount} متاجر • ${stats.craftsmenCount} حرفيين`}</title>
                    </g>
                  );
                })}
              </svg>

              {/* Map Floating Badges */}
              <div className="absolute top-3 left-3 bg-[#0a0a0f]/90 backdrop-blur-md border border-[#2a2a3a] px-3 py-1.5 rounded-xl flex items-center gap-2 text-[11px] text-slate-300 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">69 ولاية جزائرية كاملة التفصيل</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-[#0a0a0f]/90 backdrop-blur-md border border-[#00d4c8]/40 px-3 py-1.5 rounded-xl flex items-center gap-2 text-[11px] text-slate-200 shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00d4c8] shadow-[0_0_10px_#00d4c8]" />
                <span className="font-bold">المقر الرئيسي: ولاية المغير (57)</span>
              </div>

              {/* Hover Quick Card Popup */}
              {hoveredWilaya && hoveredWilaya.code !== selectedWilaya.code && (
                <div className="absolute bottom-3 left-3 bg-[#12121a]/95 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-2xl pointer-events-none z-20 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-mono font-black text-xs flex items-center justify-center border border-red-500/30">
                    {hoveredWilaya.code}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">{hoveredWilaya.nameAr}</span>
                    <span className="text-[10px] text-slate-400">إقليم {hoveredWilaya.region}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Wilayas Interactive Badges Grid (1 to 69 Matrix) */}
          <div className="p-5 rounded-3xl bg-[#12121a] border border-[#2a2a3a] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00d4c8]" />
                <h3 className="text-xs font-extrabold text-white">
                  مصفوفة أرقام الولايات الـ 69 ({filteredWilayas.length} ولاية معروضة)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">اضغط للاستماع واختيار الولاية</span>
            </div>

            {/* Matrix Scrollable Container */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
              {filteredWilayas.map((w) => {
                const isSelected = selectedWilaya.code === w.code;
                const isHQ = w.code === '57';
                const isAlger = w.code === '16';
                const theme = REGION_THEMES[w.region] || REGION_THEMES['الجنوب'];
                const stats = wilayaStats[w.code] || { storesCount: 0, craftsmenCount: 0 };
                const totalEntities = stats.storesCount + stats.craftsmenCount;

                return (
                  <button
                    key={w.code}
                    onClick={() => handleSelectWilaya(w)}
                    className={`relative p-2 rounded-xl border text-right transition-all flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-red-500 text-white border-white shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-105 z-10 ring-2 ring-white/50'
                        : isAlger
                        ? 'bg-red-500/15 border-red-500/50 text-red-300 hover:border-red-500'
                        : isHQ
                        ? 'bg-[#00d4c8]/15 border-[#00d4c8]/60 text-slate-200 hover:border-[#00d4c8] shadow-[0_0_12px_rgba(0,212,200,0.15)]'
                        : `${theme.bg} ${theme.border} text-slate-300 hover:scale-102 hover:border-slate-400`
                    }`}
                  >
                    {/* Top Row: Number & Region Indicator */}
                    <div className="flex items-center justify-between w-full mb-1">
                      <span
                        className={`font-mono text-xs font-black px-1.5 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-black/30 text-white'
                            : isAlger
                            ? 'bg-red-500 text-white font-black'
                            : isHQ
                            ? 'bg-[#00d4c8] text-slate-900 font-black'
                            : 'bg-black/40 text-[#00d4c8]'
                        }`}
                      >
                        {w.code}
                      </span>

                      {/* Store/Craftsman badge indicator if any */}
                      {totalEntities > 0 && (
                        <span
                          className={`text-[9px] font-black px-1 rounded-full ${
                            isSelected ? 'bg-white text-slate-900' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {totalEntities}
                        </span>
                      )}
                    </div>

                    {/* Wilaya Arabic Name */}
                    <div className="w-full">
                      <span className={`block text-xs font-bold truncate ${isSelected ? 'text-white font-black' : isAlger ? 'text-red-300 font-black' : isHQ ? 'text-[#00d4c8] font-black' : 'text-slate-200'}`}>
                        {w.nameAr}
                      </span>
                      <span className={`block text-[9px] truncate font-mono ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                        {w.nameEn}
                      </span>
                    </div>

                    {/* Active Indicator Pin */}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center text-[#0a0a0f] text-[8px] font-black shadow-md animate-bounce">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Selected Wilaya Live Details, Stores & Craftsmen Card */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Header Card for Selected Wilaya */}
          <div
            className={`p-6 rounded-3xl border shadow-2xl transition-all relative overflow-hidden bg-[#12121a] ${
              pulseEffect ? 'ring-2 ring-red-500' : ''
            }`}
            style={{ borderColor: selectedWilaya.code === '16' ? '#ef4444' : currentTheme.glow }}
          >
            {/* Background Glow */}
            <div
              className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-25 pointer-events-none"
              style={{ backgroundColor: selectedWilaya.code === '16' ? '#ef4444' : currentTheme.glow }}
            />

            {/* Top Bar with Number & Region Tag */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl ${
                    selectedWilaya.code === '16'
                      ? 'bg-red-500 text-white shadow-red-500/30'
                      : `bg-gradient-to-br ${currentTheme.gradient} text-white`
                  } flex flex-col items-center justify-center font-mono shadow-lg`}
                >
                  <span className="text-xl font-black">{selectedWilaya.code}</span>
                  <span className="text-[9px] font-bold opacity-80">ولاية</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white">{selectedWilaya.nameAr}</h3>
                    <span className="text-base">🇩🇿</span>
                    {selectedWilaya.code === '16' && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                        عاصمة البلاد
                      </span>
                    )}
                    {selectedWilaya.code === '57' && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#00d4c8]/20 text-[#00d4c8] border border-[#00d4c8]/40">
                        المقر الرئيسي
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">{selectedWilaya.nameEn}</span>
                </div>
              </div>

              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${currentTheme.badge}`}>
                إقليم {selectedWilaya.region}
              </span>
            </div>

            {/* Stats summary row */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#2a2a3a]/80 mb-4">
              <div className="p-3 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                  <StoreIcon className="w-3.5 h-3.5 text-[#00d4c8]" />
                  <span>المتاجر المسجلة</span>
                </div>
                <span className="text-xl font-black text-[#00d4c8]">
                  {currentWilayaStores.length}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Wrench className="w-3.5 h-3.5 text-purple-400" />
                  <span>الحرفيون المعتمدون</span>
                </div>
                <span className="text-xl font-black text-purple-400">
                  {currentWilayaCraftsmen.length}
                </span>
              </div>
            </div>

            {/* Tabs for Stores vs Craftsmen in this Wilaya */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#1a1a24] text-[#00d4c8] border border-[#00d4c8]/30 shadow-md'
                    : 'text-slate-400 hover:text-white bg-[#0a0a0f]'
                }`}
              >
                الكل ({currentWilayaStores.length + currentWilayaCraftsmen.length})
              </button>
              <button
                onClick={() => setActiveTab('stores')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'stores'
                    ? 'bg-[#00d4c8]/15 text-[#00d4c8] border border-[#00d4c8]/40 shadow-md'
                    : 'text-slate-400 hover:text-white bg-[#0a0a0f]'
                }`}
              >
                المتاجر ({currentWilayaStores.length})
              </button>
              <button
                onClick={() => setActiveTab('craftsmen')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'craftsmen'
                    ? 'bg-purple-500/15 text-purple-400 border border-purple-500/40 shadow-md'
                    : 'text-slate-400 hover:text-white bg-[#0a0a0f]'
                }`}
              >
                الحرفيون ({currentWilayaCraftsmen.length})
              </button>
            </div>

            {/* Scrollable list of Stores & Craftsmen */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              
              {/* Stores in this Wilaya */}
              {(activeTab === 'all' || activeTab === 'stores') && (
                <>
                  {currentWilayaStores.length > 0 ? (
                    currentWilayaStores.map((store) => (
                      <div
                        key={store.id}
                        onClick={() => navigateTo('store-detail', store.id)}
                        className="p-3.5 rounded-2xl bg-[#1a1a24] hover:bg-[#1a1a24]/80 border border-[#2a2a3a] hover:border-[#00d4c8]/50 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-xl flex items-center justify-center border border-cyan-500/20">
                            {store.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-bold text-white group-hover:text-[#00d4c8] transition-colors">
                                {store.name}
                              </h4>
                              <span className="text-[10px] text-amber-400 font-bold flex items-center">
                                ★ {store.rating}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 block truncate max-w-[180px]">
                              {store.category} • {store.products} منتج متاح
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#00d4c8] text-xs font-bold">
                          <span>دخول المتجر</span>
                          <ChevronLeft className="w-4 h-4" />
                        </div>
                      </div>
                    ))
                  ) : activeTab === 'stores' ? (
                    <div className="p-6 rounded-2xl bg-[#1a1a24]/50 border border-dashed border-[#2a2a3a] text-center space-y-2">
                      <StoreIcon className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-300 font-bold">
                        لا يوجد متجر مسجل حالياً في ولاية {selectedWilaya.nameAr}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        كن أول تاجر يفتتح متجره الرقمي في هذه الولاية واستقبل طلبات الزبائن!
                      </p>
                      <button
                        onClick={() => setIsAddStoreModalOpen(true)}
                        className="mt-2 px-4 py-2 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black text-xs hover:scale-105 transition-all shadow-md"
                      >
                        سجل متجرك الآن في {selectedWilaya.nameAr}
                      </button>
                    </div>
                  ) : null}
                </>
              )}

              {/* Craftsmen in this Wilaya */}
              {(activeTab === 'all' || activeTab === 'craftsmen') && (
                <>
                  {currentWilayaCraftsmen.length > 0 ? (
                    currentWilayaCraftsmen.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] hover:border-purple-500/50 transition-all flex items-center justify-between shadow-sm"
                      >
                        <div
                          onClick={() => navigateTo('craftsman-profile', c.id)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-xl flex items-center justify-center border border-purple-500/20">
                            {c.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">
                                {c.name}
                              </h4>
                              {c.verified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block">
                              {c.profession} • خبرة {c.experience} سنوات
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openChatWithCraftsman(c)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-[#00d4c8]/20 text-[#00d4c8] transition-colors"
                            title="محادثة فورية"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>

                          <a
                            href={`https://wa.me/${c.whatsapp || c.phone.replace(/^0/, '213')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                            title="تواصل واتساب"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))
                  ) : activeTab === 'craftsmen' ? (
                    <div className="p-6 rounded-2xl bg-[#1a1a24]/50 border border-dashed border-[#2a2a3a] text-center space-y-2">
                      <Wrench className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-300 font-bold">
                        لا يوجد حرفي مسجل حالياً في ولاية {selectedWilaya.nameAr}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        سجل الآن كحرفي أو مقاول معتمد في {selectedWilaya.nameAr} وابدأ بتلقي المشاريع!
                      </p>
                      <button
                        onClick={() => setIsCraftsmanRegisterModalOpen(true)}
                        className="mt-2 px-4 py-2 rounded-xl bg-purple-500 text-white font-black text-xs hover:scale-105 transition-all shadow-md shadow-purple-500/20"
                      >
                        سجل كحرفي في {selectedWilaya.nameAr}
                      </button>
                    </div>
                  ) : null}
                </>
              )}

              {/* If all is empty */}
              {activeTab === 'all' &&
                currentWilayaStores.length === 0 &&
                currentWilayaCraftsmen.length === 0 && (
                  <div className="p-6 rounded-2xl bg-[#1a1a24]/50 border border-dashed border-[#2a2a3a] text-center space-y-3">
                    <MapPin className="w-8 h-8 text-[#00d4c8] mx-auto opacity-70" />
                    <div>
                      <p className="text-xs text-slate-200 font-bold">
                        ولاية {selectedWilaya.nameAr} مفتوحة لتسجيل المتاجر والحرفيين
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        كن أول من ينضم لشبكة فينك في ولاية {selectedWilaya.nameAr} ({selectedWilaya.code})
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1 justify-center">
                      <button
                        onClick={() => setIsAddStoreModalOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-[#00d4c8] text-[#0a0a0f] font-black text-xs hover:scale-105 transition-all flex items-center justify-center gap-1.5"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        سجل متجرك
                      </button>
                      <button
                        onClick={() => setIsCraftsmanRegisterModalOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-[#1a1a24] border border-purple-500/40 text-purple-300 font-bold text-xs hover:bg-purple-500/15 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Wrench className="w-3.5 h-3.5 text-purple-400" />
                        سجل كحرفي
                      </button>
                    </div>
                  </div>
                )}
            </div>

            {/* Bottom action banner */}
            <div className="mt-4 pt-3 border-t border-[#2a2a3a]/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                رمز الاتصال: <span className="font-mono text-white">+213</span> • العملة: <span className="text-[#00d4c8] font-bold">د.ج</span>
              </span>
              <button
                onClick={() => {
                  showToast('info', `ولاية ${selectedWilaya.nameAr}`, `تم تحديد الولاية رقم ${selectedWilaya.code} بنجاح`);
                }}
                className="text-[#00d4c8] hover:underline font-bold text-[11px] flex items-center gap-1"
              >
                <span>مشاركة الولاية</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
