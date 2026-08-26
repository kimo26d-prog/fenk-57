import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Star,
  MapPin,
  Car,
  Briefcase,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  Share2,
  Images,
  Send,
  MessageCircle,
  Plus,
  Upload,
  Camera,
  X,
  Sparkles,
  Crown,
  ThumbsUp,
  Award,
  Filter,
  MessageSquarePlus,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { MediaImage } from '../components/MediaImage';
import { ALGERIAN_WILAYAS } from '../data/algerianWilayas';

const SERVICE_HIGHLIGHT_OPTIONS = [
  'دقة المواعيد ⏱️',
  'إتقان واحترافية 🔨',
  'سعر عادل ومناسب 💰',
  'نظافة مكان العمل 🧹',
  'أمانة وحسن معاملة 🤝',
  'سرعة الإنجاز ⚡'
];

export const CraftsmanProfileView: React.FC = () => {
  const {
    craftsmen,
    selectedCraftsmanId,
    currentUser,
    navigateTo,
    openChatWithCraftsman,
    addCraftsmanGalleryPhoto,
    addCraftsmanReview,
    likeCraftsmanReview,
    showToast
  } = useApp();

  const craftsman = craftsmen.find((c) => c.id === selectedCraftsmanId) || craftsmen[0];

  // Review Form State
  const [newReviewName, setNewReviewName] = useState(
    currentUser.type !== 'guest' ? currentUser.name : ''
  );
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [newReviewWilaya, setNewReviewWilaya] = useState(
    currentUser.wilaya || craftsman.city || 'الجزائر العاصمة'
  );
  const [newReviewServiceTag, setNewReviewServiceTag] = useState(craftsman.profession || 'صيانة عامة');
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([
    'إتقان واحترافية 🔨',
    'دقة المواعيد ⏱️'
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Gallery & Preview State
  const [activeGalleryPreview, setActiveGalleryPreview] = useState<string | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Reviews Filter State
  const [filterRating, setFilterRating] = useState<'all' | number>('all');

  const reviewsList = craftsman.reviewsList || [];

  // Calculate Breakdown Statistics
  const totalReviewsCount = reviewsList.length;
  const ratingCounts = {
    5: reviewsList.filter((r) => r.rating === 5).length,
    4: reviewsList.filter((r) => r.rating === 4).length,
    3: reviewsList.filter((r) => r.rating === 3).length,
    2: reviewsList.filter((r) => r.rating === 2).length,
    1: reviewsList.filter((r) => r.rating === 1).length
  };

  const getPercentage = (count: number) => {
    if (totalReviewsCount === 0) return 0;
    return Math.round((count / totalReviewsCount) * 100);
  };

  const filteredReviews = reviewsList.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const toggleHighlight = (tag: string) => {
    if (selectedHighlights.includes(tag)) {
      setSelectedHighlights((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedHighlights((prev) => [...prev, tag]);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) {
      showToast('error', 'بيانات ناقصة', 'يرجى كتابة اسمك والتعليق حول الخدمة');
      return;
    }

    setIsSubmittingReview(true);

    // Combine text with selected highlights if any
    const fullText = selectedHighlights.length > 0
      ? `${newReviewText.trim()}\n\nالمميزات: ${selectedHighlights.join(' | ')}`
      : newReviewText.trim();

    addCraftsmanReview(craftsman.id, {
      name: newReviewName.trim(),
      rating: newReviewRating,
      text: fullText,
      wilaya: newReviewWilaya,
      serviceTag: newReviewServiceTag
    });

    setNewReviewText('');
    setShowReviewForm(false);
    setIsSubmittingReview(false);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        addCraftsmanGalleryPhoto(craftsman.id, result);
        showToast('success', 'تمت الإضافة', 'تمت إضافة صورة العمل بنجاح إلى المعرض');
        setIsAddingPhoto(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoByUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;
    addCraftsmanGalleryPhoto(craftsman.id, newPhotoUrl.trim());
    showToast('success', 'تمت الإضافة', 'تمت إضافة رابط الصورة إلى المعرض');
    setNewPhotoUrl('');
    setIsAddingPhoto(false);
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5:
        return 'ممتاز واستثنائي (5/5) 🌟';
      case 4:
        return 'جيد جداً ومتقن (4/5) ✨';
      case 3:
        return 'جيد ومرضي (3/5) 👍';
      case 2:
        return 'مقبول (2/5) ⚖️';
      case 1:
        return 'يحتاج لتحسين (1/5) ⚠️';
      default:
        return 'ممتاز (5/5)';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <input
        type="file"
        ref={galleryFileInputRef}
        onChange={handleGalleryUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Lightbox / Fullscreen Gallery Preview Modal */}
      {activeGalleryPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#12121a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2a3a]">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Images className="w-4 h-4 text-purple-400" />
                معاينة صورة العمل الحقيقي - {craftsman.name}
              </span>
              <button
                onClick={() => setActiveGalleryPreview(null)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-96 sm:h-[500px] flex items-center justify-center p-4">
              <MediaImage
                src={activeGalleryPreview}
                alt="عمل الحرفي"
                fallbackIcon="🏗️"
                className="max-h-full max-w-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Craftsman Hero Banner */}
      <div className="relative bg-gradient-to-b from-purple-950/70 via-[#1a1a24] to-[#0a0a0f] border-b border-[#2a2a3a] px-4 sm:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigateTo('craftsmen')}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-purple-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لدليل الحرفيين</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Big Real Avatar / Photo */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-600 border-4 border-[#1a1a24] overflow-hidden flex items-center justify-center text-5xl sm:text-6xl shadow-2xl shadow-purple-500/20 shrink-0">
              <MediaImage
                src={craftsman.photo || craftsman.avatarImage}
                alt={craftsman.name}
                fallbackIcon={craftsman.avatar}
                className="w-full h-full object-cover"
              />
              {craftsman.isVip && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] flex items-center gap-1 shadow-md">
                  <Crown className="w-3 h-3 fill-slate-950" /> VIP
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2.5">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white">{craftsman.name}</h1>
                <span className="px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black">
                  {craftsman.profession}
                </span>
                {craftsman.verified && (
                  <span className="px-3.5 py-1 rounded-full bg-[#00d4c8]/15 border border-[#00d4c8]/30 text-[#00d4c8] text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00d4c8]" />
                    حرفي موثق ومعتمد 🇩🇿
                  </span>
                )}
                {craftsman.isVip && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md">
                    <Crown className="w-3.5 h-3.5 fill-slate-950" /> {craftsman.vipBadge || 'حرفي VIP مميز'}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300 font-semibold">
                {/* Main Dynamic Rating */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm">{craftsman.rating.toFixed(1)}</span>
                  <span className="text-[11px] text-amber-300/80">({craftsman.reviews} تقييم)</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#00d4c8]" />
                  <span>{craftsman.city}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>{craftsman.jobs} عملية منجزة</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{craftsman.experience} سنوات خبرة</span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    craftsman.mobility
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  {craftsman.mobility ? 'متاح للتنقل لكافة البلديات' : 'في مدينته فقط'}
                </span>
              </div>
            </div>

            {/* Share and Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('success', 'تم نسخ الرابط', 'يمكنك الآن مشاركة ملف الحرفي');
                }}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center gap-2 text-xs font-bold transition-all"
              >
                <Share2 className="w-4 h-4" />
                مشاركة الملف
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Contact Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Bio, Skills, Gallery, Rating & Reviews System */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              نبذة وخبرات العمل
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {craftsman.bio}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-400 mb-2.5">المهارات والتخصصات المعتمدة:</h4>
              <div className="flex flex-wrap gap-2">
                {craftsman.skills.map((sk) => (
                  <span
                    key={sk}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Real Work Gallery with Upload Feature */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Images className="w-5 h-5 text-purple-400" />
                  معرض الصور الحقيقية للأعمال والمشاريع
                </h3>
                <span className="text-xs text-slate-400">
                  {craftsman.gallery.length} أعمال حقيقية موثقة - انقر على أي صورة لتكبيرها
                </span>
              </div>

              <button
                onClick={() => setIsAddingPhoto(!isAddingPhoto)}
                className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                إضافة صورة عمل جديدة
              </button>
            </div>

            {/* Inline Add Photo Form */}
            {isAddingPhoto && (
              <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-purple-500/40 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-purple-400" />
                  رفع صورة عمل حقيقي منجز
                </h4>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    اختر ملفاً من جهازك
                  </button>

                  <form onSubmit={handleAddPhotoByUrl} className="flex-1 flex gap-2">
                    <input
                      type="url"
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      placeholder="أو الصق رابط صورة (https://...)"
                      className="flex-1 px-3 py-2 rounded-xl bg-[#12121a] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                    >
                      إضافة
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {craftsman.gallery.map((g, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveGalleryPreview(g)}
                  className="aspect-square rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] hover:border-purple-500/60 overflow-hidden cursor-pointer hover:scale-105 transition-all shadow-md group relative"
                >
                  <MediaImage
                    src={g}
                    alt={`عمل ${idx + 1}`}
                    fallbackIcon="🏗️"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <Images className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ADVANCED RATING & REVIEWS SYSTEM */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-8 shadow-xl">
            {/* Header with CTA Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2a2a3a]">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2.5">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  نظام التقييم وآراء العملاء
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  تقييمات حقيقية من عملاء استفادوا من خدمات الحرفي مع تقييم النجوم والتعليقات الموثقة
                </p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-105 transition-all shrink-0"
              >
                <MessageSquarePlus className="w-4 h-4 fill-slate-950" />
                {showReviewForm ? 'إغلاق نموذج التقييم' : 'أضف تقييمك ورأيك ⭐'}
              </button>
            </div>

            {/* Rating Summary Breakdown Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-3xl bg-[#0a0a0f]/80 border border-[#2a2a3a]">
              {/* Aggregate Score Block */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-l border-[#2a2a3a] space-y-2">
                <div className="text-5xl font-black text-white tracking-tight">
                  {craftsman.rating.toFixed(1)}
                </div>
                <div className="flex text-amber-400 gap-1 text-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(craftsman.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-300">
                  بناءً على {totalReviewsCount} تقييم معتمد
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  98% نسبة رضا العملاء 👍
                </span>
              </div>

              {/* Progress Bars Breakdown */}
              <div className="md:col-span-8 space-y-2.5 justify-center flex flex-col">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingCounts[stars as keyof typeof ratingCounts] || 0;
                  const pct = getPercentage(count);
                  const isSelected = filterRating === stars;

                  return (
                    <button
                      key={stars}
                      onClick={() => setFilterRating(filterRating === stars ? 'all' : stars)}
                      className={`w-full flex items-center gap-3 text-xs p-1.5 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
                          : 'hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1 w-16 font-bold shrink-0">
                        <span>{stars} نجوم</span>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </div>

                      {/* Bar */}
                      <div className="flex-1 h-3 rounded-full bg-[#1a1a24] overflow-hidden border border-[#2a2a3a]">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <span className="w-12 text-left font-bold text-[11px] text-slate-400 shrink-0">
                        {count} ({pct}%)
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Add Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleAddReview}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#161622] to-[#0d0d14] border-2 border-amber-500/40 space-y-6 shadow-2xl animate-fadeIn"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#2a2a3a]">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-black text-white">
                      تقييم تجربة العمل مع {craftsman.name}
                    </h4>
                  </div>
                  <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    تقييم موثق ★
                  </span>
                </div>

                {/* 1. Interactive Star Picker */}
                <div className="space-y-2.5 text-center sm:text-right">
                  <label className="text-xs font-black text-slate-200 block">
                    1. حدد التقييم العام بالنجوم (انقر لاختيار عدد النجوم):
                  </label>
                  <div className="flex items-center justify-center sm:justify-start gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const activeScore = hoverRating !== null ? hoverRating : newReviewRating;
                      const isFilled = star <= activeScore;

                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setNewReviewRating(star)}
                          className="p-2 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] hover:border-amber-400 hover:scale-115 transition-all group"
                          aria-label={`${star} نجوم`}
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              isFilled
                                ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                                : 'text-slate-600 group-hover:text-amber-400'
                            }`}
                          />
                        </button>
                      );
                    })}

                    <span className="mr-3 text-xs sm:text-sm font-black text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                      {getRatingLabel(hoverRating !== null ? hoverRating : newReviewRating)}
                    </span>
                  </div>
                </div>

                {/* 2. Customer Name & Wilaya */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">اسم العميل الكريم:</label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="مثال: يوسف العربي"
                      className="w-full px-4 py-3 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">الولاية / المدينة:</label>
                    <select
                      value={newReviewWilaya}
                      onChange={(e) => setNewReviewWilaya(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                    >
                      {ALGERIAN_WILAYAS.map((w) => (
                        <option key={w.code} value={w.ar || w.name} className="bg-slate-900 text-white">
                          {w.code} - {w.ar} ({w.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Service Tag Done */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">نوع الخدمة المنجزة:</label>
                  <input
                    type="text"
                    value={newReviewServiceTag}
                    onChange={(e) => setNewReviewServiceTag(e.target.value)}
                    placeholder={`مثال: ${craftsman.profession} أو ترميم غرفة، تأسيس كهرباء...`}
                    className="w-full px-4 py-3 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* 4. Experience Highlights Multi-select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    أبرز مميزات تعامل الحرفي (انقر للاختيار):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_HIGHLIGHT_OPTIONS.map((tag) => {
                      const isSelected = selectedHighlights.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleHighlight(tag)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                              : 'bg-[#0a0a0f] text-slate-400 border border-[#2a2a3a] hover:text-white'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Detailed Review Text */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    رأيك المفصل والملاحظات حول دقة العمل والمواعيد:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="اكتب تعليقك الصادق لمساعدة باقي المستخدمين في تقييم جودة الخدمة..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-all"
                  >
                    <Send className="w-4 h-4 rotate-180 fill-slate-950" />
                    نشر التقييم فوراً ⭐
                  </button>
                </div>
              </form>
            )}

            {/* Filter Pills for Reviews */}
            <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-bold shrink-0">
                  <Filter className="w-3.5 h-3.5" /> تصفية:
                </span>

                <button
                  onClick={() => setFilterRating('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    filterRating === 'all'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-[#0a0a0f] text-slate-400 border border-[#2a2a3a] hover:text-white'
                  }`}
                >
                  جميع التقييمات ({totalReviewsCount})
                </button>

                {[5, 4, 3, 2, 1].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterRating(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shrink-0 ${
                      filterRating === st
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-[#0a0a0f] text-slate-400 border border-[#2a2a3a] hover:text-white'
                    }`}
                  >
                    <span>{st}</span>
                    <Star className={`w-3 h-3 ${filterRating === st ? 'fill-slate-950' : 'fill-amber-400 text-amber-400'}`} />
                    <span>({ratingCounts[st as keyof typeof ratingCounts] || 0})</span>
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-400 font-semibold">
                عرض {filteredReviews.length} من أصل {totalReviewsCount} تقييم
              </span>
            </div>

            {/* Reviews Cards List */}
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12 bg-[#0a0a0f] border border-[#2a2a3a] rounded-3xl p-6 text-slate-400">
                <Star className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                <h4 className="text-sm font-bold text-white mb-1">لا توجد تقييمات مطابقة لهذا الفلتر</h4>
                <p className="text-xs text-slate-500">اختر تصنيف نجوم آخر أو كن أول من يترك تقييماً</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((rev, idx) => (
                  <div
                    key={rev.id || idx}
                    className="p-5 sm:p-6 rounded-3xl bg-[#0a0a0f] border border-[#2a2a3a] hover:border-amber-500/30 transition-all space-y-3.5 shadow-lg"
                  >
                    {/* User Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-700 text-white flex items-center justify-center text-sm font-bold shadow-md">
                          {rev.avatar || '👤'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white">{rev.name}</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#00d4c8]/10 text-[#00d4c8] text-[10px] font-bold border border-[#00d4c8]/20 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              عميل موثق 🇩🇿
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            {rev.wilaya && (
                              <span className="flex items-center gap-1 text-slate-300">
                                <MapPin className="w-3 h-3 text-[#00d4c8]" />
                                {rev.wilaya}
                              </span>
                            )}
                            {rev.serviceTag && (
                              <span className="text-purple-300 font-semibold">
                                • خدمة: {rev.serviceTag}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stars & Date */}
                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="mr-1">{rev.rating}/5</span>
                        </div>

                        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
                          <Calendar className="w-3 h-3" />
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    {/* Review Body */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line pr-1 sm:pr-12">
                      {rev.text}
                    </p>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#1a1a24] text-xs">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>تم التحقق من تنفيذ الخدمة عبر المنصة</span>
                      </div>

                      <button
                        onClick={() => likeCraftsmanReview(craftsman.id, idx)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 flex items-center gap-1.5 text-xs font-bold transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                        <span>مفيد ({rev.likes || 0})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Contact and Direct Booking Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] sticky top-24 space-y-6 shadow-xl">
            <div className="text-center pb-4 border-b border-[#2a2a3a]">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 overflow-hidden flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/20">
                <MediaImage
                  src={craftsman.photo || craftsman.avatarImage}
                  alt={craftsman.name}
                  fallbackIcon={craftsman.avatar}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-black text-lg text-white">{craftsman.name}</h3>
              <span className="text-xs text-purple-400 font-bold">{craftsman.profession}</span>
            </div>

            {/* Quick Contact Info */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a]">
                <span className="text-slate-400">المدينة والولاية:</span>
                <span className="font-bold text-white">{craftsman.city}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a]">
                <span className="text-slate-400">رقم الهاتف:</span>
                <span className="font-bold text-white dir-ltr">{craftsman.phone}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a]">
                <span className="text-slate-400">معدل التقييم:</span>
                <span className="font-black text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {craftsman.rating.toFixed(1)} / 5.0 ({craftsman.reviews} تقييم)
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a]">
                <span className="text-slate-400">الاستجابة:</span>
                <span className="font-bold text-emerald-400">خلال دقائق ⚡</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => openChatWithCraftsman(craftsman)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                دردشة مباشرة مع الحرفي
              </button>

              <a
                href={`tel:${craftsman.phone}`}
                className="w-full py-3 rounded-2xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                اتصال هاتفي مباشر
              </a>

              {craftsman.whatsapp && (
                <a
                  href={`https://wa.me/${craftsman.whatsapp}?text=${encodeURIComponent(
                    `السلام عليكم يا ${craftsman.name}، تواصلت معك عبر منصة فينك Fenk بخصوص طلب خدمة.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-2xl bg-[#00e676]/10 hover:bg-[#00e676]/20 border border-[#00e676]/30 text-[#00e676] font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  محادثة عبر الواتساب
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

