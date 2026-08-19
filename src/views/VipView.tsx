import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Crown,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  TrendingUp,
  Search,
  Building2,
  UserCheck,
  Zap,
  ArrowRight,
  Phone,
  MessageSquare,
  BadgePercent,
  Layers,
  Award,
  CreditCard,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VipPlan, Store, Craftsman } from '../types';

export const VipView: React.FC = () => {
  const {
    vipPlans,
    setIsVipModalOpen,
    stores,
    craftsmen,
    navigateTo,
    openChatWithCraftsman,
    selectedWilaya
  } = useApp();

  const [activeTab, setActiveTab] = useState<'plans' | 'stores' | 'craftsmen' | 'perks'>('plans');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('gold');

  // Filter VIP stores & craftsmen
  const vipStores = stores.filter((s) => s.isVip && s.status === 'active');
  const vipCraftsmen = craftsmen.filter((c) => c.isVip && c.status === 'active');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Royal VIP Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-amber-500/20 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        {/* Background glow & particles effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-amber-500/10 via-[#00d4c8]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-5">
          {/* VIP Elite Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>نادي نخبة المشتركين وكبار التجار والحرفيين VIP 👑</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight"
          >
            امتيازات استثنائية لصدارة <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              الصفحة الأولى والبحث في الجزائر
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            احصل على الأسبقية المطلقة لمتجرك أو خدماتك كحرفي، واجذب آلاف الزبائن عبر الـ 69 ولاية. اشتراك مدفوع مميز يُراجع ويُعتمد رسمياً من قبل مالك المنصة.
          </motion.p>

          {/* Quick CTA Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              id="vip-hero-subscribe-btn"
              onClick={() => setIsVipModalOpen(true)}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              <Crown className="w-5 h-5 text-slate-950" />
              <span>طلب ترقية حسابك إلى VIP الآن</span>
            </button>

            <button
              id="vip-hero-explore-btn"
              onClick={() => setActiveTab('stores')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition"
            >
              <Building2 className="w-4 h-4 text-[#00d4c8]" />
              <span>تصفح نخبة متاجر VIP ({vipStores.length})</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="flex items-center justify-center">
          <div className="flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md overflow-x-auto custom-scrollbar max-w-full">
            <button
              id="vip-tab-plans"
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'plans'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>باقات وأسعار VIP</span>
            </button>

            <button
              id="vip-tab-perks"
              onClick={() => setActiveTab('perks')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'perks'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>امتيازات العضوية</span>
            </button>

            <button
              id="vip-tab-stores"
              onClick={() => setActiveTab('stores')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'stores'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>متاجر VIP المعتمدة ({vipStores.length})</span>
            </button>

            <button
              id="vip-tab-craftsmen"
              onClick={() => setActiveTab('craftsmen')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'craftsmen'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>كبار الحرفيين VIP ({vipCraftsmen.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* TAB 1: VIP PLANS & PRICING */}
        {activeTab === 'plans' && (
          <div className="space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                اختر الباقة المناسبة لمضاعفة مبيعاتك ونشاطك
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                جميع الباقات مدفوعة وتمنحك أفضلية فورية في الواجهة والبحث بمجرد موافقة إدارة المنصة
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {vipPlans.map((plan) => {
                const isDiamond = plan.id === 'diamond';
                const isGold = plan.id === 'gold';

                return (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border bg-gradient-to-b ${plan.bgGradient} transition-all shadow-xl ${
                      plan.popular
                        ? 'border-amber-500 ring-2 ring-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.2)]'
                        : isDiamond
                        ? 'border-[#00d4c8]/60 shadow-[0_0_40px_rgba(0,212,200,0.2)]'
                        : 'border-slate-800'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black shadow-lg">
                        الباقة الأكثر اختياراً في الجزائر ⭐
                      </div>
                    )}

                    {isDiamond && (
                      <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00d4c8] to-teal-400 text-slate-950 text-xs font-black shadow-lg">
                        الباقة الملكية الماسية 👑
                      </div>
                    )}

                    <div className="space-y-5">
                      {/* Plan Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                          <span className="text-xs text-slate-400">{plan.period}</span>
                        </div>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-bold"
                          style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
                        >
                          {plan.badge}
                        </span>
                      </div>

                      {/* Price Display */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-black text-white">
                            {plan.price.toLocaleString()}
                          </span>
                          <span className="text-sm font-semibold text-slate-400">د.ج</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          تسديد عبر بريدي موب / CCP مع إيصال التحويل
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                          الميزات والامتيازات الحصرية:
                        </span>
                        <ul className="space-y-2.5">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-8">
                      <button
                        id={`choose-plan-btn-${plan.id}`}
                        onClick={() => {
                          setSelectedPlanId(plan.id);
                          setIsVipModalOpen(true);
                        }}
                        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                          isGold || isDiamond
                            ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 hover:brightness-110 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                            : 'bg-slate-800 text-white hover:bg-slate-700'
                        }`}
                      >
                        <Crown className="w-4 h-4" />
                        <span>طلب هذه الباقة الآن</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Approval Workflow Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-right">
                <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>كيف تتم عملية القبول والتفعيل؟</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  1. ترسل طلب الاشتراك مع رقم العملية وإيصال بريدي موب أو CCP. <br />
                  2. يقوم مالك المنصة بمراجعة البيانات واعتماد الطلب من لوحة الإدارة. <br />
                  3. يتم تفعيل شارة VIP فوراً ورفع متجرك/حسابك الحرفي إلى قمة الصفحة الأولى والبحث.
                </p>
              </div>

              <button
                onClick={() => setIsVipModalOpen(true)}
                className="shrink-0 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg"
              >
                تقديم طلب اشتراك الآن
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: VIP PERKS BREAKDOWN */}
        {activeTab === 'perks' && (
          <div className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                لماذا تشترك في نادي VIP منصة Fenk؟
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                مزايا تسويقية وتقنية حصرية تضمن لمتجرك أو خدمتك الوصول لأعلى نسبة تحويل وزبائن في ولايتك وكامل الجزائر
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: TrendingUp,
                  color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
                  title: 'الظهور في الصفحة الأولى للمنصة',
                  desc: 'يتم تثبيت متجرك أو ملفك كحرفي في بنرات الواجهة الرئيسية وقسم "نخبة VIP"، ليشاهده آلاف الزوار يومياً فور فتح التطبيق.'
                },
                {
                  icon: Search,
                  color: 'text-[#00d4c8] bg-[#00d4c8]/10 border-[#00d4c8]/30',
                  title: 'الصدارة في محرك البحث والتصنيفات',
                  desc: 'خوارزمية البحث تمنح مشتركي VIP المرتبة الأولى عند قيام العملاء بالبحث عن المنتجات أو الحرفيين في أي ولاية جزائرية.'
                },
                {
                  icon: Crown,
                  color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
                  title: 'شارة التوثيق والتميز الملكية VIP',
                  desc: 'شارة متوهجة باللون الذهبي أو الماسي تظهر بجانب اسمك ومنتجاتك، تمنح ثقة مضاعفة للعملاء وتزيد المبيعات بنسبة تفوق 300%.'
                },
                {
                  icon: Zap,
                  color: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
                  title: 'إشعارات Push Notification لعملاء الولاية',
                  desc: 'إمكانية إرسال إشعارات فورية وتنبيهات حصرية لجميع مستخدمي المنصة المسجلين في ولايتك عند إضافة منتج أو عرض خاص.'
                },
                {
                  icon: ShieldCheck,
                  color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
                  title: 'دعم فني وأولوية التوصيل والشحن',
                  desc: 'معاملة خاصة وتواصل مباشر عبر الواتساب مع فريق الإدارة لتسهيل عمليات التوصيل ومعالجة أي استفسارات على مدار الساعة.'
                },
                {
                  icon: Award,
                  color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
                  title: 'إحصائيات وتقارير تفصيلية للأداء',
                  desc: 'لوحة تحكم حصرية توضح عدد مشاهدات متجرك، الكلمات الأكثر بحثاً، ونقاط القوة لزيادة أرباحك بشكل مستمر.'
                }
              ].map((perk, i) => {
                const IconComp = perk.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-3"
                  >
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${perk.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{perk.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{perk.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: APPROVED VIP STORES DIRECTORY */}
        {activeTab === 'stores' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Crown className="w-6 h-6 text-amber-400" />
                  <span>دليل نخبة المتاجر المعتمدة VIP</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  المتاجر التي تمتلك عضوية VIP مفعلة ومتصدرة للواجهة والبحث
                </p>
              </div>

              <button
                onClick={() => setIsVipModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition"
              >
                <Crown className="w-4 h-4" />
                <span>ضم متجرك لنخبة VIP</span>
              </button>
            </div>

            {vipStores.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                <Crown className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">لا توجد متاجر VIP حالياً</h3>
                <p className="text-xs text-slate-400 mt-1">كن أول متجر ينضم إلى نخبة VIP في الجزائر!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vipStores.map((store) => (
                  <div
                    key={store.id}
                    id={`vip-store-card-${store.id}`}
                    className="relative group rounded-2xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 p-5 space-y-4 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all flex flex-col justify-between"
                  >
                    {/* VIP Top Ribbon */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        <span>{store.vipBadge || 'VIP معتمد'}</span>
                      </span>

                      <span className="text-xs text-slate-400 font-medium">
                        {store.wilaya || 'الجزائر'}
                      </span>
                    </div>

                    {/* Store Info */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shadow-inner shrink-0 group-hover:scale-105 transition">
                        {store.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                          {store.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1 text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {store.rating}
                          </span>
                          <span>•</span>
                          <span>{store.category}</span>
                          <span>•</span>
                          <span>{store.products} منتج</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {store.desc}
                    </p>

                    {/* Action Button */}
                    <button
                      onClick={() => navigateTo('store-detail', { storeId: store.id })}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2 border border-slate-700 hover:border-transparent"
                    >
                      <span>زيارة المتجر والتسوق</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: APPROVED VIP CRAFTSMEN DIRECTORY */}
        {activeTab === 'craftsmen' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Crown className="w-6 h-6 text-[#00d4c8]" />
                  <span>دليل كبار الحرفيين والمهنيين VIP</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  حرفيون معتمدون بعلامة VIP الملكية وأعلى تقييمات موثوقة
                </p>
              </div>

              <button
                onClick={() => setIsVipModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00d4c8] hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg"
              >
                <Crown className="w-4 h-4" />
                <span>انضم كحرفي VIP</span>
              </button>
            </div>

            {vipCraftsmen.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                <UserCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">لا يوجد حرفيون VIP حالياً</h3>
                <p className="text-xs text-slate-400 mt-1">سجل الآن لتكون الحرفي الأول المتصدر في ولايتك!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vipCraftsmen.map((craftsman) => (
                  <div
                    key={craftsman.id}
                    id={`vip-craftsman-card-${craftsman.id}`}
                    className="relative group rounded-2xl bg-slate-900 border border-[#00d4c8]/40 hover:border-[#00d4c8] p-5 space-y-4 shadow-[0_0_20px_rgba(0,212,200,0.1)] hover:shadow-[0_0_30px_rgba(0,212,200,0.2)] transition-all flex flex-col justify-between"
                  >
                    {/* VIP Ribbon */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                        <Crown className="w-3.5 h-3.5 text-[#00d4c8]" />
                        <span>{craftsman.vipBadge || 'حرفي VIP معتمد'}</span>
                      </span>

                      <span className="text-xs text-slate-400 font-medium">
                        {craftsman.city}
                      </span>
                    </div>

                    {/* Craftsman Info */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition">
                        {craftsman.avatar}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white group-hover:text-[#00d4c8] transition">
                          {craftsman.name}
                        </h3>
                        <p className="text-xs font-semibold text-amber-400">
                          {craftsman.profession}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1 text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {craftsman.rating}
                          </span>
                          <span>•</span>
                          <span>خبرة {craftsman.experience} سنوات</span>
                          <span>•</span>
                          <span>{craftsman.jobs} عمل منجز</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {craftsman.bio}
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {craftsman.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => openChatWithCraftsman(craftsman)}
                        className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1.5 border border-slate-700"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#00d4c8]" />
                        <span>دردشة فورية</span>
                      </button>

                      <a
                        href={`tel:${craftsman.phone}`}
                        className="py-2.5 rounded-xl bg-[#00d4c8] hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>اتصال مباشر</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
