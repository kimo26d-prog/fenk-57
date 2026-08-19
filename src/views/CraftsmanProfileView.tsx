import React, { useState } from 'react';
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
  MessageCircle
} from 'lucide-react';

export const CraftsmanProfileView: React.FC = () => {
  const { craftsmen, selectedCraftsmanId, navigateTo, openChatWithCraftsman, showToast } = useApp();
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [activeGalleryPreview, setActiveGalleryPreview] = useState<string | null>(null);

  const craftsman = craftsmen.find((c) => c.id === selectedCraftsmanId) || craftsmen[0];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    craftsman.reviewsList.unshift({
      name: newReviewName.trim(),
      avatar: '👤',
      rating: newReviewRating,
      date: 'اليوم',
      text: newReviewText.trim()
    });
    craftsman.reviews += 1;

    setNewReviewName('');
    setNewReviewText('');
    showToast('success', 'شكراً لتقييمك!', 'تمت إضافة تقييمك لملف الحرفي بنجاح');
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      
      {/* Craftsman Hero Banner */}
      <div className="relative bg-gradient-to-b from-purple-950/70 via-[#1a1a24] to-[#0a0a0f] border-b border-[#2a2a3a] px-4 sm:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          
          <button
            onClick={() => navigateTo('craftsmen')}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-purple-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لسوق الحرفيين</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Big Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-600 border-4 border-[#1a1a24] flex items-center justify-center text-5xl sm:text-6xl shadow-2xl shadow-purple-500/20 shrink-0">
              {craftsman.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white">{craftsman.name}</h1>
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black">
                  {craftsman.profession}
                </span>
                {craftsman.verified && (
                  <span className="px-3 py-1 rounded-full bg-[#00d4c8]/15 border border-[#00d4c8]/30 text-[#00d4c8] text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    حرفي معتمد
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300 font-semibold">
                <div className="flex items-center gap-1 text-amber-400 font-black">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{craftsman.rating} ({craftsman.reviews} تقييم)</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-4 h-4 text-[#00d4c8]" />
                  <span>{craftsman.city}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>{craftsman.jobs} عملية منجزة</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{craftsman.experience} سنوات خبرة</span>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                    craftsman.mobility
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <Car className="w-3 h-3" />
                  {craftsman.mobility ? 'متاح للتنقل' : 'في مدينته فقط'}
                </span>
              </div>
            </div>

            {/* Share action */}
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

      {/* Main Grid: Details + Contact Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Bio, Skills, Gallery, Reviews */}
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

          {/* Work Gallery */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Images className="w-5 h-5 text-purple-400" />
                معرض الأعمال والنماذج السابقة
              </h3>
              <span className="text-xs text-slate-400">{craftsman.gallery.length} أعمال موثقة</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {craftsman.gallery.map((g, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveGalleryPreview(g)}
                  className="aspect-square rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] hover:border-purple-500/50 flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition-all shadow-md group"
                >
                  <span className="group-hover:scale-125 transition-transform">{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List & Add Review */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                تقييمات وآراء العملاء
              </h3>
              <span className="text-xs text-slate-400">({craftsman.reviewsList.length} تقييم مسجل)</span>
            </div>

            <div className="space-y-4">
              {craftsman.reviewsList.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold">
                        {rev.avatar || '👤'}
                      </div>
                      <span className="text-xs font-bold text-white">{rev.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                      <span className="text-[11px] text-slate-500">{rev.date}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pr-10">
                    {rev.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="pt-6 border-t border-[#2a2a3a] space-y-3">
              <h4 className="text-xs font-black text-white">أضف تقييمك وتجربتك مع الحرفي:</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="اسمك الكريم"
                  className="px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white focus:outline-none focus:border-purple-500"
                />

                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs font-bold text-white focus:outline-none focus:border-purple-500"
                >
                  <option value={5}>★★★★★ (ممتاز 5/5)</option>
                  <option value={4}>★★★★☆ (جيد جداً 4/5)</option>
                  <option value={3}>★★★☆☆ (جيد 3/5)</option>
                  <option value={2}>★★☆☆☆ (مقبول 2/5)</option>
                </select>
              </div>

              <textarea
                required
                rows={2}
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="اكتب ملاحظاتك عن دقة المواعيد وجودة التنفيذ..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-white focus:outline-none focus:border-purple-500"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-500/20"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
                إرسال التقييم
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Contact and Direct Booking Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] sticky top-24 space-y-6 shadow-xl">
            <div className="text-center pb-4 border-b border-[#2a2a3a]">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-4xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/20">
                {craftsman.avatar}
              </div>
              <h3 className="font-black text-lg text-white">{craftsman.name}</h3>
              <span className="text-xs text-purple-400 font-bold">{craftsman.profession}</span>
            </div>

            {/* Quick Contact Info */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a]">
                <span className="text-slate-400">المدينة:</span>
                <span className="font-bold text-white">{craftsman.city}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a]">
                <span className="text-slate-400">رقم الهاتف:</span>
                <span className="font-bold text-white dir-ltr">{craftsman.phone}</span>
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
                    `السلام عليكم يا ${craftsman.name}، تواصلت معك عبر منصة Fenk بخصوص عمل.`
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
