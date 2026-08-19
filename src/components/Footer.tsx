import React from 'react';
import { useApp } from '../context/AppContext';
import { Store, Wrench, ShieldCheck, Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setIsAddStoreModalOpen, setIsCraftsmanRegisterModalOpen, platformSettings } = useApp();

  return (
    <footer className="bg-[#0a0a0f] border-t border-[#2a2a3a] mt-24 pt-16 pb-10 px-4 sm:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2a2a3a]">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(0,212,200,0.3)]">
              F
            </div>
            <span className="text-2xl font-black text-white">fenk</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            المنصة الأولى الشاملة التي تجمع أفضل المتاجر والمحلات التجارية المعتمدة ونخبة الحرفيين والمقاولين المحترفين في مكان واحد.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs text-[#00d4c8] font-bold">تسوق بأمان • دعم متواصل</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d4c8]" />
            روابط سريعة
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-[#00d4c8] transition-colors">
                الرئيسية
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('stores')} className="hover:text-[#00d4c8] transition-colors">
                دليل المحلات والمتاجر
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('products')} className="hover:text-[#00d4c8] transition-colors">
                تصفح جميع المنتجات
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('craftsmen')} className="hover:text-[#00d4c8] transition-colors">
                سوق الحرفيين والمهن
              </button>
            </li>
          </ul>
        </div>

        {/* Join as partner */}
        <div>
          <h4 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e676]" />
            انضم لشبكة فينك
          </h4>
          <div className="space-y-3">
            <button
              onClick={() => setIsAddStoreModalOpen(true)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#1a1a24] hover:bg-[#00d4c8]/15 border border-[#2a2a3a] hover:border-[#00d4c8]/40 text-xs font-bold text-slate-200 hover:text-[#00d4c8] flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#00d4c8]" />
                سجل متجرك الآن
              </span>
              <span className="text-[10px] text-[#00d4c8] bg-[#00d4c8]/10 px-2 py-0.5 rounded-full">
                مجاناً
              </span>
            </button>

            <button
              onClick={() => setIsCraftsmanRegisterModalOpen(true)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#1a1a24] hover:bg-purple-500/15 border border-[#2a2a3a] hover:border-purple-500/40 text-xs font-bold text-slate-200 hover:text-purple-400 flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-purple-400" />
                سجل كحرفي معتمد
              </span>
              <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                موثق
              </span>
            </button>
          </div>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff3366]" />
            خدمة العملاء والدعم
          </h4>
          <div className="space-y-3 text-xs text-slate-300">
            <a
              href={`mailto:${platformSettings.supportEmail}`}
              className="flex items-center gap-2.5 hover:text-[#00d4c8] transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] group-hover:border-[#00d4c8]/40 flex items-center justify-center text-[#00d4c8]">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono dir-ltr text-left">{platformSettings.supportEmail}</span>
            </a>

            <a
              href={`tel:${platformSettings.emergencyPhone}`}
              className="flex items-center gap-2.5 hover:text-[#00d4c8] transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] group-hover:border-[#00d4c8]/40 flex items-center justify-center text-[#00d4c8]">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono dir-ltr text-left tracking-wider font-bold">{platformSettings.emergencyPhone}</span>
            </a>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-[#00d4c8]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span>{platformSettings.location || 'ولاية المغير'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom credits */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 منصة فينك (Fenk) - جميع الحقوق محفوظة لمتجر الخدمات والمتاجر المتعددة</p>
        <div className="flex items-center gap-2">
          <span>صُمم بأعلى معايير الدقة والاحترافية</span>
          <span className="text-[#00d4c8]">✦</span>
        </div>
      </div>
    </footer>
  );
};
